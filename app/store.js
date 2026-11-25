/* Kapicua — stockage des données d'un commerce.
   Mode « demo » : tout reste sur l'appareil (localStorage).
   Mode « serveur » : Cloudflare Pages Functions + KV (functions/api/[[path]].js). */
(function () {
  var C = window.KP;
  var KEY = "kp:" + C.slug;
  var mem = {};
  function lget(k) { try { return localStorage.getItem(k); } catch (e) { return mem[k] || null; } }
  function lset(k, v) { try { localStorage.setItem(k, v); } catch (e) { mem[k] = v; } }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function dloc(d) { d = d || new Date(); var z = d.getTimezoneOffset() * 6e4; return new Date(d - z).toISOString().slice(0, 10); }
  function plus(n) { var d = new Date(); d.setDate(d.getDate() + n); return dloc(d); }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  async function sha(s) {
    try {
      var b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
      return Array.from(new Uint8Array(b)).map(function (x) { return x.toString(16).padStart(2, "0"); }).join("");
    } catch (e) { return "clair:" + s; }
  }

  /* Données d'exemple, toutes marquées « exemple » : elles se retirent d'un clic (Réglages). */
  function graine() {
    var e = {
      v: 1, site: clone(C.site), produits: [], commandes: [], rdv: [], ventes: [], depenses: [],
      stock: [], fournisseurs: [], clients: [], reglages: { pin: null }
    };
    var cl = [
      { id: uid(), nom: "Client exemple 1", tel: "0690 00 00 01", email: "", note: "", exemple: true, cree: plus(-20) },
      { id: uid(), nom: "Client exemple 2", tel: "0690 00 00 02", email: "", note: "Préfère être contacté par WhatsApp", exemple: true, cree: plus(-8) },
      { id: uid(), nom: "Client exemple 3", tel: "0690 00 00 03", email: "", note: "", exemple: true, cree: plus(-2) }
    ];
    e.clients = cl;
    var f = { id: uid(), nom: "Fournisseur exemple", tel: "0590 00 00 00", email: "", note: "Livraison le mardi", exemple: true };
    e.fournisseurs = [f];
    (C.exemples.stock || []).forEach(function (s, i) {
      e.stock.push({ id: uid(), nom: s[0], qte: s[1], unite: s[2], seuil: s[3], fournisseur: f.id, prixAchat: null, exemple: true });
    });
    (C.exemples.produits || []).forEach(function (p, i) {
      e.produits.push({ id: uid(), nom: p[0], desc: p[1], prix: null, dispo: true, stockId: e.stock[i] ? e.stock[i].id : "", photo: "", exemple: true });
    });
    var montants = [320, 280, 410, 190, 350, 460, 300];
    montants.forEach(function (m, j) {
      e.ventes.push({ id: uid(), date: plus(-j), montant: m, mode: j % 2 ? "Espèces" : "Carte", note: "Exemple — à remplacer par vos ventes", exemple: true });
    });
    e.depenses.push({ id: uid(), date: plus(-3), montant: 540, categorie: "Marchandises", fournisseur: f.id, note: "Exemple", exemple: true });
    if (C.type !== "boutique") {
      e.rdv.push({ id: uid(), date: plus(0), heure: C.type === "salon" ? "10:30" : "12:30", personnes: C.type === "salon" ? "" : "4", prestation: C.type === "salon" ? (C.site.cartes[0] || {}).fr || "" : "", nom: cl[0].nom, tel: cl[0].tel, client: cl[0].id, statut: "demandée", note: "", source: "site", exemple: true });
      e.rdv.push({ id: uid(), date: plus(1), heure: C.type === "salon" ? "15:00" : "19:30", personnes: C.type === "salon" ? "" : "2", prestation: C.type === "salon" ? (C.site.cartes[1] || {}).fr || "" : "", nom: cl[1].nom, tel: cl[1].tel, client: cl[1].id, statut: "confirmée", note: "", source: "téléphone", exemple: true });
    }
    if (e.produits[0]) {
      e.commandes.push({ id: uid(), cree: new Date().toISOString(), retrait: plus(0) + " " + "17:00", nom: cl[2].nom, tel: cl[2].tel, client: cl[2].id,
        lignes: [{ pid: e.produits[0].id, nom: e.produits[0].nom, qte: 2, prix: null }], statut: "nouvelle", note: "", exemple: true });
    }
    return e;
  }

  var serveur = C.mode === "serveur";
  var pin = null;

  async function api(chemin, opt) {
    opt = opt || {};
    opt.headers = Object.assign({ "content-type": "application/json" }, opt.headers || {}, pin ? { "x-pin": pin } : {});
    var r = await fetch("/api/" + C.slug + chemin, opt);
    if (r.status === 401) throw new Error("code");
    if (!r.ok) throw new Error("réseau " + r.status);
    return r.json();
  }

  function upsertClient(e, nom, tel, email) {
    var t = String(tel || "").replace(/\D/g, "");
    var c = e.clients.find(function (x) { return t && String(x.tel || "").replace(/\D/g, "") === t; });
    if (!c) { c = { id: uid(), nom: nom, tel: tel, email: email || "", note: "", cree: dloc() }; e.clients.push(c); }
    else { if (nom) c.nom = nom; if (email) c.email = email; }
    return c.id;
  }

  function verser(e, d) {
    var cid = upsertClient(e, d.nom, d.tel, d.email);
    if (d.genre === "rdv") {
      e.rdv.push({ id: d.id, date: d.date, heure: d.heure, personnes: d.personnes || "", prestation: d.prestation || "", nom: d.nom, tel: d.tel, client: cid, statut: "demandée", note: d.note || "", source: "site" });
    } else if (d.genre === "commande") {
      e.commandes.push({ id: d.id, cree: d.cree, retrait: d.retrait, nom: d.nom, tel: d.tel, client: cid, lignes: d.lignes, statut: "nouvelle", note: d.note || "" });
    }
  }

  window.KPStore = {
    uid: uid, dloc: dloc, plus: plus, serveur: serveur, sha: sha, verser: verser,
    setPin: function (p) { pin = p; },
    async verifierPin(p) {
      if (serveur) { pin = p; try { await api("/etat"); return true; } catch (e) { pin = null; return false; } }
      var e = await this.charger();
      var h = await sha(C.slug + ":" + p);
      if (!e.reglages.pin) return p === "0000";
      return e.reglages.pin === h;
    },
    async charger() {
      if (serveur) { var r = await api("/etat"); return r.etat || graine(); }
      var v = lget(KEY);
      if (!v) { var g = graine(); lset(KEY, JSON.stringify(g)); return g; }
      try { return JSON.parse(v); } catch (e) { return graine(); }
    },
    async sauver(e) {
      if (serveur) return api("/etat", { method: "PUT", body: JSON.stringify({ etat: e }) });
      lset(KEY, JSON.stringify(e));
    },
    async boite() {  /* demandes arrivées du site (mode serveur) */
      if (!serveur) return [];
      var r = await api("/boite"); return r.demandes || [];
    },
    async publique() {
      if (serveur) {
        try { var r = await fetch("/api/" + C.slug + "/public"); if (r.ok) return (await r.json()).public; } catch (e) {}
        return { site: C.site, produits: [] };
      }
      var e = await this.charger();
      return { site: e.site, produits: e.produits.filter(function (p) { return p.dispo; }) };
    },
    async demande(d) {
      d.id = uid(); d.cree = new Date().toISOString();
      if (serveur) {
        var r = await fetch("/api/" + C.slug + "/demande", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(d) });
        if (!r.ok) throw new Error("envoi");
        return;
      }
      var e = await this.charger(); verser(e, d); lset(KEY, JSON.stringify(e));
    },
    reinitialiser: function () { lset(KEY, JSON.stringify(graine())); },
    cle: KEY
  };
})();
