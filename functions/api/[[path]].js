// Kapicua — API des espaces de gestion (Cloudflare Pages Functions + KV).
// Liaison KV à créer dans Pages > Settings > Functions : nom de variable « KP ».
// Un commerce passe en mode « serveur » quand son config.js porte mode: "serveur".
//   GET  /api/<slug>/public   contenu public (site + produits en vente)
//   POST /api/<slug>/demande  réservation / commande envoyée depuis le site
//   GET  /api/<slug>/etat     toutes les données (code requis : en-tête x-pin)
//   PUT  /api/<slug>/etat     enregistre les données (code requis)
//   GET  /api/<slug>/boite    demandes arrivées depuis le site, puis vidées (code requis)

const j = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });

async function sha(s) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
}

async function autorise(env, slug, etat, pin) {
  if (!pin) return false;
  if (!etat || !etat.reglages || !etat.reglages.pin) {
    const init = await env.KP.get("pin-initial:" + slug);   // posé par Kapicua à l'activation
    return init ? init === pin : false;
  }
  return etat.reglages.pin === (await sha(slug + ":" + pin));
}

export async function onRequest({ request, env, params }) {
  if (!env.KP) return j({ erreur: "stockage non branché" }, 503);
  const p = params.path || [];
  const slug = String(p[0] || "").replace(/[^a-z0-9-]/g, "");
  const action = p[1] || "";
  if (!slug) return j({ erreur: "commerce manquant" }, 400);
  const cle = "etat:" + slug;

  if (action === "public" && request.method === "GET") {
    const e = await env.KP.get(cle, "json");
    if (!e) return j({ erreur: "inconnu" }, 404);
    return j({ public: { site: e.site, produits: (e.produits || []).filter((x) => x.dispo) } });
  }

  if (action === "demande" && request.method === "POST") {
    const len = Number(request.headers.get("content-length") || 0);
    if (len > 20000) return j({ erreur: "trop long" }, 413);
    let d; try { d = await request.json(); } catch { return j({ erreur: "format" }, 400); }
    if (!["rdv", "commande"].includes(d.genre) || !d.nom || !d.tel) return j({ erreur: "incomplet" }, 400);
    const propre = {
      genre: d.genre, id: String(d.id || crypto.randomUUID()).slice(0, 40), cree: new Date().toISOString(),
      nom: String(d.nom).slice(0, 80), tel: String(d.tel).slice(0, 30), email: String(d.email || "").slice(0, 120), note: String(d.note || "").slice(0, 500),
      date: String(d.date || "").slice(0, 10), heure: String(d.heure || "").slice(0, 5), personnes: String(d.personnes || "").slice(0, 3),
      prestation: String(d.prestation || "").slice(0, 120), retrait: String(d.retrait || "").slice(0, 16),
      lignes: Array.isArray(d.lignes) ? d.lignes.slice(0, 40).map((l) => ({ pid: String(l.pid).slice(0, 40), nom: String(l.nom).slice(0, 120), qte: Math.max(1, Math.min(99, Number(l.qte) || 1)), prix: l.prix == null ? null : Number(l.prix) })) : []
    };
    await env.KP.put("in:" + slug + ":" + Date.now() + "-" + Math.random().toString(36).slice(2, 7), JSON.stringify(propre), { expirationTtl: 60 * 60 * 24 * 60 });
    return j({ ok: true });
  }

  const etat = await env.KP.get(cle, "json");
  if (!(await autorise(env, slug, etat, request.headers.get("x-pin")))) return j({ erreur: "code" }, 401);

  if (action === "etat" && request.method === "GET") return j({ etat });
  if (action === "etat" && request.method === "PUT") {
    let b; try { b = await request.json(); } catch { return j({ erreur: "format" }, 400); }
    if (!b.etat || !b.etat.site) return j({ erreur: "incomplet" }, 400);
    await env.KP.put(cle, JSON.stringify(b.etat));
    await env.KP.put("sauvegarde:" + slug + ":" + new Date().toISOString().slice(0, 10), JSON.stringify(b.etat), { expirationTtl: 60 * 60 * 24 * 30 });
    return j({ ok: true });
  }
  if (action === "boite" && request.method === "GET") {
    const l = await env.KP.list({ prefix: "in:" + slug + ":" });
    const demandes = [];
    for (const k of l.keys) { const v = await env.KP.get(k.name, "json"); if (v) demandes.push(v); await env.KP.delete(k.name); }
    return j({ demandes });
  }
  return j({ erreur: "inconnu" }, 404);
}
