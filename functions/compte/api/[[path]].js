// Comptes clients pour /offre/ (Kapicua) et /encargalo/ (Encárgalo), et espace d'administration.
// Base D1 liée sous le nom DB (voir wrangler.toml). Mots de passe : PBKDF2-SHA256, 100 000 itérations.

const SITES = ["kapicua", "encargalo"];
const LANGS = ["fr", "en", "es"];
const SESSION_DAYS = 30;
const ADMIN_SALT = "61b752541a547ee9c9cee75f7141118f";
const ADMIN_HASH = "bf21d19d0eef3b747a975ecbbbbb72b7fc6a20ee10213193c7aedc1af5900c70";
const STATUSES = {
  kapicua: ["new", "preparing", "ready", "won", "closed"],
  encargalo: ["new", "quoted", "paid", "ordered", "shipped", "delivered", "cancelled"],
};

const enc = new TextEncoder();
const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
const unhex = (s) => new Uint8Array(s.match(/../g).map((h) => parseInt(h, 16)));
const now = () => new Date().toISOString();
const rid = () => hex(crypto.getRandomValues(new Uint8Array(12)));

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers },
  });
}
const fail = (code, status = 400) => json({ ok: false, error: code }, status);

async function pbkdf2(password, saltHex) {
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: unhex(saltHex), iterations: 100000 }, key, 256);
  return hex(bits);
}
function same(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}
async function sha256(s) { return hex(await crypto.subtle.digest("SHA-256", enc.encode(s))); }

function str(v, max) { return typeof v === "string" ? v.trim().slice(0, max) : ""; }
function validEmail(e) { return /^[^\s@<>"']{1,64}@[^\s@<>"']{1,190}\.[a-zA-Z]{2,}$/.test(e) && e.length <= 254; }
function cookieName(scope) { return "__Host-ks_" + scope; }
function readCookie(req, name) {
  const c = req.headers.get("cookie") || "";
  for (const part of c.split(";")) { const [k, ...v] = part.trim().split("="); if (k === name) return v.join("="); }
  return "";
}
function setCookie(name, value, maxAge) {
  return `${name}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}

async function limited(db, key, max, windowSec) {
  const t = Math.floor(Date.now() / 1000);
  const row = await db.prepare("SELECT n, since FROM attempts WHERE k = ?").bind(key).first();
  if (!row || t - row.since > windowSec) {
    await db.prepare("INSERT INTO attempts (k, n, since) VALUES (?, 1, ?) ON CONFLICT(k) DO UPDATE SET n = 1, since = excluded.since").bind(key, t).run();
    return false;
  }
  if (row.n >= max) return true;
  await db.prepare("UPDATE attempts SET n = n + 1 WHERE k = ?").bind(key).run();
  return false;
}

async function newSession(db, userId, scope) {
  const token = hex(crypto.getRandomValues(new Uint8Array(32)));
  const exp = new Date(Date.now() + SESSION_DAYS * 864e5).toISOString();
  await db.prepare("INSERT INTO sessions (token_hash, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)").bind(await sha256(token), userId, now(), exp).run();
  return setCookie(cookieName(scope), token, SESSION_DAYS * 86400);
}
async function sessionUser(db, req, scope) {
  const token = readCookie(req, cookieName(scope));
  if (!/^[0-9a-f]{64}$/.test(token)) return null;
  const row = await db.prepare("SELECT user_id, expires_at FROM sessions WHERE token_hash = ?").bind(await sha256(token)).first();
  if (!row || row.expires_at < now()) return null;
  return row.user_id;
}

function publicUser(u) {
  return { email: u.email, name: u.name, company: u.company, phone: u.phone, lang: u.lang, newsletter: !!u.newsletter, created_at: u.created_at };
}
function cleanRequest(site, kind, d) {
  d = d && typeof d === "object" ? d : {};
  if (site === "kapicua" && kind === "pilote") {
    const out = { company: str(d.company, 120), sector: str(d.sector, 60), city: str(d.city, 80), website: str(d.website, 300), message: str(d.message, 1500) };
    if (!out.company) return null;
    return out;
  }
  if (site === "encargalo" && kind === "cotizacion") {
    const link = str(d.link, 600);
    if (link && !/^https?:\/\/[^\s<>"']+$/i.test(link)) return null;
    const price = Math.min(100000, Math.max(0, Number(d.price) || 0));
    const qty = Math.min(20, Math.max(1, Math.round(Number(d.qty) || 1)));
    const lb = Math.min(500, Math.max(0, Number(d.lb) || 0));
    const delivery = Number(d.delivery) === 250 ? 250 : 0;
    const total = Math.min(10000000, Math.max(0, Math.round(Number(d.total) || 0)));
    const out = { link, price, qty, lb, delivery, total, notes: str(d.notes, 400) };
    if (!out.link && !out.notes) return null;
    return out;
  }
  return null;
}

async function body(req) {
  const ct = req.headers.get("content-type") || "";
  if (!ct.includes("application/json")) return null;
  try { const b = await req.json(); return b && typeof b === "object" ? b : null; } catch (e) { return null; }
}

export async function onRequest(ctx) {
  const { request: req, env, params } = ctx;
  const db = env.DB;
  if (!db) return fail("not_configured", 503);
  const url = new URL(req.url);
  const path = (Array.isArray(params.path) ? params.path : [params.path]).filter(Boolean).join("/");
  const method = req.method;
  // L'adresse IP n'est jamais conservée en clair : seule une empreinte sert à limiter les tentatives.
  const ip = (await sha256("ks:" + (req.headers.get("cf-connecting-ip") || "local"))).slice(0, 24);
  if (Math.random() < 0.05 && ctx.waitUntil) {
    ctx.waitUntil(db.batch([
      db.prepare("DELETE FROM attempts WHERE since < ?").bind(Math.floor(Date.now() / 1000) - 86400),
      db.prepare("DELETE FROM sessions WHERE expires_at < ?").bind(now()),
    ]).catch(() => {}));
  }

  if (method !== "GET") {
    const origin = req.headers.get("origin");
    if (!origin || new URL(origin).host !== url.host) return fail("bad_origin", 403);
  }

  try {
    // ---------- Public newsletter ----------
    if (path === "newsletter" && method === "POST") {
      const b = await body(req); if (!b) return fail("bad_request");
      const site = SITES.includes(b.site) ? b.site : null;
      const email = str(b.email, 254).toLowerCase();
      const lang = LANGS.includes(b.lang) ? b.lang : "fr";
      if (!site || !validEmail(email)) return fail("invalid_email");
      if (b.consent !== true) return fail("consent_required");
      if (await limited(db, "nl:" + ip, 20, 3600)) return fail("too_many", 429);
      await db.prepare("INSERT INTO subscribers (site, email, lang, created_at) VALUES (?, ?, ?, ?) ON CONFLICT(site, email) DO NOTHING").bind(site, email, lang, now()).run();
      return json({ ok: true });
    }

    // ---------- Accounts ----------
    if (path === "register" && method === "POST") {
      const b = await body(req); if (!b) return fail("bad_request");
      const site = SITES.includes(b.site) ? b.site : null;
      const email = str(b.email, 254).toLowerCase();
      const pw = typeof b.password === "string" ? b.password : "";
      if (!site) return fail("bad_request");
      if (!validEmail(email)) return fail("invalid_email");
      if (pw.length < 8 || pw.length > 200) return fail("weak_password");
      if (b.terms !== true) return fail("terms_required");
      if (await limited(db, "reg:" + ip, 10, 3600)) return fail("too_many", 429);
      const exists = await db.prepare("SELECT id FROM users WHERE site = ? AND email = ?").bind(site, email).first();
      if (exists) return fail("email_taken", 409);
      const salt = hex(crypto.getRandomValues(new Uint8Array(16)));
      const id = rid();
      const nl = b.newsletter === true ? 1 : 0;
      await db.prepare("INSERT INTO users (id, site, email, name, company, phone, lang, pass_hash, salt, newsletter, newsletter_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
        .bind(id, site, email, str(b.name, 100), str(b.company, 120), str(b.phone, 40), LANGS.includes(b.lang) ? b.lang : "fr", await pbkdf2(pw, salt), salt, nl, nl ? now() : null, now()).run();
      return json({ ok: true }, 201, { "set-cookie": await newSession(db, id, site) });
    }

    if (path === "login" && method === "POST") {
      const b = await body(req); if (!b) return fail("bad_request");
      const site = SITES.includes(b.site) ? b.site : null;
      const email = str(b.email, 254).toLowerCase();
      if (!site || !email) return fail("bad_request");
      if (await limited(db, "login:" + ip, 20, 900) || await limited(db, "login:" + site + ":" + email, 8, 900)) return fail("too_many", 429);
      const u = await db.prepare("SELECT * FROM users WHERE site = ? AND email = ?").bind(site, email).first();
      const ok = u && same(await pbkdf2(typeof b.password === "string" ? b.password : "", u.salt), u.pass_hash);
      if (!ok) return fail("bad_credentials", 401);
      return json({ ok: true }, 200, { "set-cookie": await newSession(db, u.id, site) });
    }

    if (path === "logout" && method === "POST") {
      const b = await body(req) || {};
      const scope = SITES.includes(b.site) ? b.site : "admin";
      const token = readCookie(req, cookieName(scope));
      if (/^[0-9a-f]{64}$/.test(token)) await db.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(await sha256(token)).run();
      return json({ ok: true }, 200, { "set-cookie": setCookie(cookieName(scope), "", 0) });
    }

    if (path === "me") {
      const site = SITES.includes(url.searchParams.get("site")) ? url.searchParams.get("site") : null;
      if (!site) return fail("bad_request");
      const uid = await sessionUser(db, req, site);
      const u = uid ? await db.prepare("SELECT * FROM users WHERE id = ? AND site = ?").bind(uid, site).first() : null;
      if (!u) return json({ ok: true, user: null });
      if (method === "GET") {
        const { results } = await db.prepare("SELECT id, kind, data, status, price, note, created_at, updated_at FROM requests WHERE user_id = ? ORDER BY created_at DESC LIMIT 50").bind(u.id).all();
        return json({ ok: true, user: publicUser(u), requests: results.map((r) => ({ ...r, data: JSON.parse(r.data) })) });
      }
      if (method === "PATCH") {
        const b = await body(req); if (!b) return fail("bad_request");
        const nl = typeof b.newsletter === "boolean" ? (b.newsletter ? 1 : 0) : u.newsletter;
        await db.prepare("UPDATE users SET name = ?, company = ?, phone = ?, lang = ?, newsletter = ?, newsletter_at = ? WHERE id = ?")
          .bind(b.name !== undefined ? str(b.name, 100) : u.name, b.company !== undefined ? str(b.company, 120) : u.company, b.phone !== undefined ? str(b.phone, 40) : u.phone,
            LANGS.includes(b.lang) ? b.lang : u.lang, nl, nl && !u.newsletter ? now() : (nl ? u.newsletter_at : null), u.id).run();
        return json({ ok: true });
      }
      if (method === "DELETE") {
        await db.batch([
          db.prepare("DELETE FROM requests WHERE user_id = ?").bind(u.id),
          db.prepare("DELETE FROM sessions WHERE user_id = ?").bind(u.id),
          db.prepare("DELETE FROM users WHERE id = ?").bind(u.id),
        ]);
        return json({ ok: true }, 200, { "set-cookie": setCookie(cookieName(site), "", 0) });
      }
    }

    if (path === "request" && method === "POST") {
      const b = await body(req); if (!b) return fail("bad_request");
      const site = SITES.includes(b.site) ? b.site : null;
      if (!site) return fail("bad_request");
      const uid = await sessionUser(db, req, site);
      if (!uid) return fail("login_required", 401);
      const data = cleanRequest(site, str(b.kind, 20), b.data);
      if (!data) return fail("invalid_request");
      if (await limited(db, "req:" + uid, 30, 86400)) return fail("too_many", 429);
      const id = rid();
      await db.prepare("INSERT INTO requests (id, site, user_id, kind, data, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, 'new', ?, ?)")
        .bind(id, site, uid, str(b.kind, 20), JSON.stringify(data), now(), now()).run();
      return json({ ok: true, id }, 201);
    }

    // ---------- Administration ----------
    if (path === "admin/login" && method === "POST") {
      const b = await body(req); if (!b) return fail("bad_request");
      if (await limited(db, "admin:" + ip, 6, 900)) return fail("too_many", 429);
      const ok = same(await pbkdf2(typeof b.password === "string" ? b.password : "", ADMIN_SALT), ADMIN_HASH);
      if (!ok) return fail("bad_credentials", 401);
      return json({ ok: true }, 200, { "set-cookie": await newSession(db, "admin", "admin") });
    }
    if (path.startsWith("admin/")) {
      const uid = await sessionUser(db, req, "admin");
      if (uid !== "admin") return fail("login_required", 401);
      if (path === "admin/data" && method === "GET") {
        const reqs = await db.prepare("SELECT r.*, u.email, u.name, u.company, u.phone, u.lang FROM requests r JOIN users u ON u.id = r.user_id ORDER BY r.created_at DESC LIMIT 500").all();
        const users = await db.prepare("SELECT site, email, name, company, phone, lang, newsletter, created_at FROM users ORDER BY created_at DESC LIMIT 1000").all();
        const subs = await db.prepare("SELECT site, email, lang, created_at FROM subscribers ORDER BY created_at DESC LIMIT 2000").all();
        return json({ ok: true, requests: reqs.results.map((r) => ({ ...r, data: JSON.parse(r.data) })), users: users.results, subscribers: subs.results, statuses: STATUSES });
      }
      if (path === "admin/request" && method === "PATCH") {
        const b = await body(req); if (!b) return fail("bad_request");
        const r = await db.prepare("SELECT site FROM requests WHERE id = ?").bind(str(b.id, 40)).first();
        if (!r) return fail("not_found", 404);
        const status = STATUSES[r.site].includes(b.status) ? b.status : null;
        if (!status) return fail("bad_status");
        await db.prepare("UPDATE requests SET status = ?, price = ?, note = ?, updated_at = ? WHERE id = ?").bind(status, str(b.price, 40), str(b.note, 600), now(), str(b.id, 40)).run();
        return json({ ok: true });
      }
    }
    return fail("not_found", 404);
  } catch (e) {
    return fail("server_error", 500);
  }
}
