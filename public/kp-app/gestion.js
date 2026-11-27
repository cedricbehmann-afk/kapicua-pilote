/* Kapicua — espace de gestion d'un commerce (ordinateur, tablette, téléphone). */
(function () {
  var C = window.KP, S = window.KPStore, E = null;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.from((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function eur(n) { return n == null || n === "" ? "—" : (Number(n) || 0).toLocaleString("fr-FR", { style: "currency", currency: "EUR" }); }
  function fdate(s) { return s ? new Date(s + "T12:00").toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" }) : ""; }
  var dloc = S.dloc;
  var RESA = C.type !== "boutique";
  var BTP = C.type === "btp";
  var MOT_RDV = C.type === "salon" ? "Rendez-vous" : BTP ? "Devis & chantiers" : "Réservations";
  var MOT_CC = BTP ? "Location de matériel" : "Click & collect";

  /* ───────── icônes ───────── */
  var I = {
    accueil: '<path d="M3 11 12 4l9 7v9H3z"/><path d="M9 20v-6h6v6"/>',
    rdv: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    commandes: '<path d="M5 8h14l-1 13H6z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
    produits: '<path d="M4 7 12 3l8 4v10l-8 4-8-4z"/><path d="m4 7 8 4 8-4M12 11v10"/>',
    caisse: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h3"/>',
    stock: '<path d="M3 7h18v13H3z"/><path d="M3 7l2-4h14l2 4M9 12h6"/>',
    clients: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.8c1.8.8 3 2.6 3.5 5.2"/>',
    site: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>',
    reglages: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    plus: '<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    wa: '<path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.4z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-2-1-1 .8a4 4 0 0 1-2-2l.8-1-1-2z"/>',
    tel: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>'
  };
  function ico(n) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + I[n] + "</svg>"; }

  var MODULES = [
    ["accueil", "Accueil"],
    RESA ? ["rdv", MOT_RDV] : null,
    ["commandes", MOT_CC],
    ["produits", "Produits"],
    ["caisse", "Caisse"],
    ["stock", "Stock"],
    ["clients", "Clients"],
    ["site", "Mon site"],
    ["reglages", "Réglages"]
  ].filter(Boolean);
  var BAS = RESA ? ["accueil", "rdv", "commandes", "caisse"] : ["accueil", "commandes", "caisse", "stock"];

  /* ───────── outils ───────── */
  function wa(tel, texte) {
    var d = String(tel || "").replace(/\D/g, "");
    if (/^0(590|690|69|59)/.test(d)) d = "590" + d.slice(1);
    else if (/^0\d{9}$/.test(d)) d = "33" + d.slice(1);
    return "https://wa.me/" + d + "?text=" + encodeURIComponent(texte);
  }
  function telh(t) { return "tel:" + String(t || "").replace(/[^\d+]/g, ""); }
  function nomF(id) { var f = E.fournisseurs.find(function (x) { return x.id === id; }); return f ? f.nom : ""; }
  function total(c) { var t = 0, inconnu = false; c.lignes.forEach(function (l) { if (l.prix == null || l.prix === "") inconnu = true; else t += l.prix * l.qte; }); return inconnu ? null : t; }
  var timer;
  function toast(m) { var t = $("#toast"); t.textContent = m; t.classList.add("on"); clearTimeout(timer); timer = setTimeout(function () { t.classList.remove("on"); }, 2600); }
  async function sauver(m) { try { await S.sauver(E); if (m) toast(m); } catch (e) { toast("Enregistrement impossible : " + e.message); } }
  function chip(s) { var k = { "demandée": "or", "nouvelle": "or", "confirmée": "ok", "devis envoyé": "bleu", "accepté": "ok", "en cours": "bleu", "terminé": "gris", "prête": "bleu", "retirée": "gris", "venue": "gris", "refusée": "rouge", "annulée": "rouge" }[s] || "gris"; return '<span class="chip ' + k + '">' + esc(s) + "</span>"; }
  var Reco = window.SpeechRecognition || window.webkitSpeechRecognition;

  /* ───────── formulaire générique ───────── */
  function champHTML(f, v) {
    var val = v == null ? (typeof f.def === "function" ? f.def() : (f.def == null ? "" : f.def)) : v;
    var id = "f_" + f.k, mic = Reco && (f.t === "text" || f.t === "textarea") ? '<button type="button" class="mic" data-mic="' + id + '" title="Dicter">' + ico("mic") + "</button>" : "";
    var inp;
    if (f.t === "textarea") inp = '<textarea id="' + id + '" rows="3">' + esc(val) + "</textarea>";
    else if (f.t === "select") {
      var opts = typeof f.o === "function" ? f.o() : f.o;
      inp = '<select id="' + id + '">' + opts.map(function (o) { var ov = Array.isArray(o) ? o[0] : o, ol = Array.isArray(o) ? o[1] : o; return '<option value="' + esc(ov) + '"' + (String(ov) === String(val) ? " selected" : "") + ">" + esc(ol) + "</option>"; }).join("") + "</select>";
    } else if (f.t === "checkbox") inp = '<label class="sw"><input type="checkbox" id="' + id + '"' + (val ? " checked" : "") + "><span></span></label>";
    else if (f.t === "photo") inp = '<div class="ph">' + (val ? '<img src="' + val + '" alt="">' : "") + '<input type="file" accept="image/*" id="' + id + '"><input type="hidden" id="' + id + '_v" value="' + esc(val) + '"></div>';
    else {
      var ty = { money: "number", number: "number", date: "date", time: "time", tel: "tel", email: "email" }[f.t] || "text";
      inp = '<input id="' + id + '" type="' + ty + '"' + (f.t === "money" ? ' step="0.01" inputmode="decimal"' : "") + (f.t === "number" ? ' inputmode="numeric"' : "") + ' value="' + esc(val) + '">';
    }
    return '<label class="fl' + (f.large ? " large" : "") + '"><span>' + esc(f.l) + "</span><div class=\"in\">" + inp + mic + "</div></label>";
  }
  function lireChamp(f) {
    var el = $("#f_" + f.k);
    if (f.t === "checkbox") return el.checked;
    if (f.t === "photo") return $("#f_" + f.k + "_v").value;
    if (f.t === "money" || f.t === "number") return el.value === "" ? null : Number(el.value);
    return el.value.trim();
  }
  function brancherMicros(racine) {
    $$("[data-mic]", racine).forEach(function (b) {
      b.onclick = function () {
        var r = new Reco(); r.lang = "fr-FR"; r.interimResults = false;
        var cible = $("#" + b.dataset.mic); b.classList.add("rec");
        r.onresult = function (ev) { var t = ev.results[0][0].transcript; cible.value = (cible.value ? cible.value + " " : "") + t; };
        r.onend = function () { b.classList.remove("rec"); };
        r.start();
      };
    });
    $$('.ph input[type=file]', racine).forEach(function (inp) {
      inp.onchange = function () {
        var f = inp.files[0]; if (!f) return;
        var rd = new FileReader();
        rd.onload = function () {
          var im = new Image();
          im.onload = function () {
            var k = Math.min(1, 900 / Math.max(im.width, im.height)), cv = document.createElement("canvas");
            cv.width = Math.round(im.width * k); cv.height = Math.round(im.height * k);
            cv.getContext("2d").drawImage(im, 0, 0, cv.width, cv.height);
            var url = cv.toDataURL("image/jpeg", 0.78);
            $("#" + inp.id + "_v").value = url;
            var old = inp.parentNode.querySelector("img"); if (old) old.src = url; else inp.insertAdjacentHTML("beforebegin", '<img src="' + url + '" alt="">');
          };
          im.src = rd.result;
        };
        rd.readAsDataURL(f);
      };
    });
  }
  function ouvrir(titre, champs, obj, surOk, surSuppr) {
    var d = $("#dlg");
    d.innerHTML = '<form method="dialog" class="dform"><header><h3>' + esc(titre) + '</h3><button type="button" class="x" aria-label="Fermer">×</button></header><div class="grid">' +
      champs.map(function (f) { return champHTML(f, obj ? obj[f.k] : null); }).join("") +
      '</div><footer>' + (surSuppr ? '<button type="button" class="b danger" id="suppr">Supprimer</button>' : "<span></span>") +
      '<button class="b main" id="ok">Enregistrer</button></footer></form>';
    brancherMicros(d);
    $(".x", d).onclick = function () { d.close(); };
    $("#ok", d).onclick = function (ev) {
      ev.preventDefault();
      var o = obj ? Object.assign({}, obj) : { id: S.uid() };
      champs.forEach(function (f) { o[f.k] = lireChamp(f); });
      delete o.exemple;
      surOk(o); d.close();
    };
    if (surSuppr) $("#suppr", d).onclick = function () { if (confirm("Supprimer définitivement ?")) { surSuppr(); d.close(); } };
    d.showModal();
  }

  /* ───────── listes génériques ───────── */
  var DEF = {
    ventes: { titre: "Vente", champs: [{ k: "date", l: "Date", t: "date", def: dloc }, { k: "montant", l: "Montant (€)", t: "money" }, { k: "mode", l: "Paiement", t: "select", o: ["Carte", "Espèces", "Virement", "Chèque", "Click & collect"] }, { k: "note", l: "Note", t: "text", large: true }],
      cols: ["Date", "Montant", "Paiement", "Note"], ligne: function (v) { return [fdate(v.date), eur(v.montant), esc(v.mode), esc(v.note)]; }, tri: function (a, b) { return String(b.date).localeCompare(a.date); } },
    depenses: { titre: "Dépense", champs: [{ k: "date", l: "Date", t: "date", def: dloc }, { k: "montant", l: "Montant (€)", t: "money" }, { k: "categorie", l: "Catégorie", t: "select", o: ["Marchandises", "Loyer", "Salaires", "Électricité / eau", "Téléphone / internet", "Assurance", "Fournitures", "Entretien", "Autre"] }, { k: "fournisseur", l: "Fournisseur", t: "select", o: function () { return [["", "—"]].concat(E.fournisseurs.map(function (f) { return [f.id, f.nom]; })); } }, { k: "note", l: "Note", t: "text", large: true }],
      cols: ["Date", "Montant", "Catégorie", "Fournisseur"], ligne: function (v) { return [fdate(v.date), eur(v.montant), esc(v.categorie), esc(nomF(v.fournisseur))]; }, tri: function (a, b) { return String(b.date).localeCompare(a.date); } },
    stock: { titre: "Article en stock", champs: [{ k: "nom", l: "Article", t: "text", large: true }, { k: "qte", l: "Quantité", t: "number", def: 0 }, { k: "unite", l: "Unité", t: "text", def: "pièce(s)" }, { k: "seuil", l: "Alerte sous", t: "number", def: 2 }, { k: "prixAchat", l: "Prix d'achat (€)", t: "money" }, { k: "fournisseur", l: "Fournisseur", t: "select", o: function () { return [["", "—"]].concat(E.fournisseurs.map(function (f) { return [f.id, f.nom]; })); } }],
      cols: ["Article", "Quantité", "Fournisseur", ""], tri: function (a, b) { return a.nom.localeCompare(b.nom); },
      ligne: function (v) { var bas = Number(v.qte) <= Number(v.seuil); return [esc(v.nom) + (bas ? ' <span class="chip rouge">à commander</span>' : ""), '<span class="qte"><button data-q="-1" data-id="' + v.id + '">−</button><b>' + esc(v.qte) + " " + esc(v.unite || "") + '</b><button data-q="1" data-id="' + v.id + '">+</button></span>', esc(nomF(v.fournisseur)), ""]; } },
    fournisseurs: { titre: "Fournisseur", champs: [{ k: "nom", l: "Nom", t: "text", large: true }, { k: "tel", l: "Téléphone", t: "tel" }, { k: "email", l: "E-mail", t: "email" }, { k: "note", l: "Note", t: "textarea", large: true }],
      cols: ["Nom", "Téléphone", "E-mail", "Note"], ligne: function (v) { return [esc(v.nom), v.tel ? '<a href="' + telh(v.tel) + '">' + esc(v.tel) + "</a>" : "", esc(v.email), esc(v.note)]; }, tri: function (a, b) { return a.nom.localeCompare(b.nom); } },
    clients: { titre: "Client", champs: [{ k: "nom", l: "Nom", t: "text", large: true }, { k: "tel", l: "Téléphone", t: "tel" }, { k: "email", l: "E-mail", t: "email" }, { k: "note", l: "Note (préférences, allergies…)", t: "textarea", large: true }],
      cols: ["Nom", "Téléphone", "Visites", "Note"], tri: function (a, b) { return a.nom.localeCompare(b.nom); },
      ligne: function (v) { var n = E.rdv.filter(function (r) { return r.client === v.id; }).length + E.commandes.filter(function (r) { return r.client === v.id; }).length; return [esc(v.nom), v.tel ? '<a href="' + telh(v.tel) + '">' + esc(v.tel) + "</a>" : "", String(n), esc(v.note)]; } },
    produits: { titre: BTP ? "Matériel à louer" : "Produit (click & collect)", champs: [{ k: "nom", l: "Nom", t: "text", large: true }, { k: "desc", l: "Description", t: "textarea", large: true }, { k: "prix", l: "Prix (€)", t: "money" }, { k: "dispo", l: "En vente sur le site", t: "checkbox", def: true }, { k: "stockId", l: "Lié au stock", t: "select", o: function () { return [["", "— (pas de suivi)"]].concat(E.stock.map(function (s) { return [s.id, s.nom]; })); } }, { k: "photo", l: "Photo", t: "photo", large: true }],
      cols: ["Produit", "Prix", "Sur le site", "Stock"], tri: function (a, b) { return a.nom.localeCompare(b.nom); },
      ligne: function (v) { var s = E.stock.find(function (x) { return x.id === v.stockId; }); return [(v.photo ? '<img class="mini" src="' + v.photo + '" alt="">' : "") + esc(v.nom), v.prix == null ? '<span class="muted">à définir</span>' : eur(v.prix), v.dispo ? '<span class="chip ok">oui</span>' : '<span class="chip gris">non</span>', s ? esc(s.qte + " " + (s.unite || "")) : "—"]; } }
  };
  if (RESA) DEF.rdv = {
    titre: MOT_RDV === "Rendez-vous" ? "Rendez-vous" : BTP ? "Demande de devis" : "Réservation",
    champs: [{ k: "date", l: BTP ? "Date souhaitée" : "Date", t: "date", def: dloc }].concat(BTP ? [] : [{ k: "heure", l: "Heure", t: "time" }])
      .concat(C.type === "salon" || BTP ? [{ k: "prestation", l: BTP ? "Type de travaux" : "Prestation", t: "select", o: function () { return E.site.cartes.map(function (c) { return c.fr; }); } }] : [{ k: "personnes", l: "Personnes", t: "number", def: 2 }])
      .concat([{ k: "nom", l: "Client", t: "text" }, { k: "tel", l: "Téléphone", t: "tel" }, { k: "statut", l: "Statut", t: "select", o: BTP ? ["demandée", "devis envoyé", "accepté", "en cours", "terminé", "refusée"] : ["demandée", "confirmée", "venue", "refusée", "annulée"], def: BTP ? "demandée" : "confirmée" }])
      .concat(BTP ? [{ k: "montant", l: "Montant du devis (€)", t: "money" }] : [])
      .concat([{ k: "note", l: BTP ? "Description / adresse du chantier" : "Note", t: "textarea", large: true }])
  };

  function liste(cle, zone, opts) {
    opts = opts || {};
    var def = DEF[cle], items = E[cle].slice().sort(def.tri || function () { return 0; });
    var q = (opts.q || "").toLowerCase();
    if (q) items = items.filter(function (v) { return JSON.stringify(v).toLowerCase().indexOf(q) >= 0; });
    zone.innerHTML = '<div class="tools"><input class="search" placeholder="Rechercher…" value="' + esc(opts.q || "") + '"><button class="b main" data-add>+ Ajouter</button></div>' +
      '<div class="table"><div class="tr th">' + def.cols.map(function (c) { return "<div>" + c + "</div>"; }).join("") + "</div>" +
      (items.length ? items.map(function (v) { return '<div class="tr" data-id="' + v.id + '">' + def.ligne(v).map(function (c, i) { return '<div data-c="' + esc(def.cols[i]) + '">' + c + (i === 0 && v.exemple ? ' <span class="ex">exemple</span>' : "") + "</div>"; }).join("") + "</div>"; }).join("") : '<p class="vide">Rien pour l\'instant.</p>') + "</div>";
    var s = $(".search", zone); s.oninput = function () { var p = s.selectionStart; liste(cle, zone, { q: s.value }); var n = $(".search", zone); n.focus(); n.setSelectionRange(p, p); };
    $("[data-add]", zone).onclick = function () { ouvrir("Nouveau — " + def.titre.toLowerCase(), def.champs, null, function (o) { E[cle].push(o); sauver("Ajouté"); route(); }); };
    $$(".tr[data-id]", zone).forEach(function (tr) {
      tr.onclick = function (ev) {
        if (ev.target.closest("a,button")) return;
        var v = E[cle].find(function (x) { return x.id === tr.dataset.id; });
        ouvrir(def.titre, def.champs, v, function (o) { Object.assign(v, o); delete v.exemple; sauver("Enregistré"); route(); }, function () { E[cle] = E[cle].filter(function (x) { return x !== v; }); sauver("Supprimé"); route(); });
      };
    });
    $$("[data-q]", zone).forEach(function (b) {
      b.onclick = function () { var v = E.stock.find(function (x) { return x.id === b.dataset.id; }); v.qte = Math.max(0, (Number(v.qte) || 0) + Number(b.dataset.q)); sauver(); route(); };
    });
  }

  /* ───────── vues ───────── */
  var V = {};
  V.accueil = function (z) {
    var auj = dloc(), mois = auj.slice(0, 7);
    var caJ = sum(E.ventes.filter(function (v) { return v.date === auj; }), "montant");
    var caM = sum(E.ventes.filter(function (v) { return String(v.date).slice(0, 7) === mois; }), "montant");
    var dpM = sum(E.depenses.filter(function (v) { return String(v.date).slice(0, 7) === mois; }), "montant");
    var rdvJ = E.rdv.filter(function (r) { return BTP ? ["terminé", "refusée"].indexOf(r.statut) < 0 : (r.date === auj && ["refusée", "annulée"].indexOf(r.statut) < 0); }).sort(function (a, b) { return String(a.heure).localeCompare(b.heure); });
    var aTraiter = E.rdv.filter(function (r) { return r.statut === "demandée"; }).length;
    var cmd = E.commandes.filter(function (c) { return ["nouvelle", "prête"].indexOf(c.statut) >= 0; });
    var alertes = E.stock.filter(function (s) { return Number(s.qte) <= Number(s.seuil); });
    var j7 = []; for (var i = 6; i >= 0; i--) { var d = S.plus(-i); j7.push([d, sum(E.ventes.filter(function (v) { return v.date === d; }), "montant")]); }
    var max = Math.max.apply(null, j7.map(function (x) { return x[1]; }).concat([1]));
    z.innerHTML =
      '<div class="kpis">' +
      kpi("Ventes du jour", eur(caJ)) + kpi("Ventes du mois", eur(caM)) + kpi("Dépenses du mois", eur(dpM)) + kpi("Résultat du mois", eur(caM - dpM), caM - dpM < 0 ? "neg" : "pos") +
      "</div>" +
      '<div class="cols">' +
      (RESA ? '<section class="panel"><h3>' + (BTP ? "Devis & chantiers en cours " : MOT_RDV + " aujourd'hui ") + (aTraiter ? '<span class="chip or">' + aTraiter + " à confirmer</span>" : "") + "</h3>" + (rdvJ.length ? rdvJ.map(function (r) { return '<div class="row">' + (r.heure ? "<b>" + esc(r.heure) + "</b> " : "") + esc(r.nom) + (r.personnes ? " · " + esc(r.personnes) + " pers." : "") + (r.prestation ? " · " + esc(r.prestation) : "") + " " + chip(r.statut) + "</div>"; }).join("") : '<p class="muted">Aucun pour aujourd\'hui.</p>') + '<a class="lien" href="#/rdv">Tout voir →</a></section>' : "") +
      '<section class="panel"><h3>' + MOT_CC + ' en cours</h3>' + (cmd.length ? cmd.map(function (c) { var rd = String(c.retrait).slice(0, 10), rh = String(c.retrait).slice(11); return '<div class="row"><b>' + (rd === auj ? "" : esc(fdate(rd)) + " ") + esc(rh) + "</b> " + esc(c.nom) + " · " + c.lignes.reduce(function (a, l) { return a + l.qte; }, 0) + " article(s) " + chip(c.statut) + "</div>"; }).join("") : '<p class="muted">Aucune commande en attente.</p>') + '<a class="lien" href="#/commandes">Tout voir →</a></section>' +
      '<section class="panel"><h3>Ventes des 7 derniers jours</h3><div class="bars">' + j7.map(function (x) { return '<div class="bar"><i style="height:' + Math.round(x[1] / max * 100) + '%"></i><span>' + new Date(x[0] + "T12:00").toLocaleDateString("fr-FR", { weekday: "narrow" }) + "</span></div>"; }).join("") + "</div></section>" +
      '<section class="panel"><h3>Stock à surveiller</h3>' + (alertes.length ? alertes.map(function (s) { return '<div class="row">' + esc(s.nom) + ' <span class="chip rouge">' + esc(s.qte) + " " + esc(s.unite || "") + "</span></div>"; }).join("") : '<p class="muted">Tout va bien.</p>') + '<a class="lien" href="#/stock">Stock →</a></section>' +
      "</div>" +
      '<div class="raccourcis"><button class="b" data-go="vente">+ Vente</button><button class="b" data-go="depense">+ Dépense</button>' + (RESA ? '<button class="b" data-go="rdv">+ ' + (C.type === "salon" ? "Rendez-vous" : BTP ? "Demande de devis" : "Réservation") + "</button>" : "") + '<a class="b" href="../" target="_blank">Voir mon site ↗</a></div>';
    $$("[data-go]", z).forEach(function (b) {
      b.onclick = function () {
        var k = { vente: "ventes", depense: "depenses", rdv: "rdv" }[b.dataset.go];
        ouvrir("Nouveau — " + DEF[k].titre.toLowerCase(), DEF[k].champs, null, function (o) { E[k].push(o); sauver("Ajouté"); route(); });
      };
    });
  };
  function sum(a, k) { return a.reduce(function (s, x) { return s + (Number(x[k]) || 0); }, 0); }
  function kpi(l, v, c) { return '<div class="kpi ' + (c || "") + '"><span>' + l + "</span><b>" + v + "</b></div>"; }

  var filtreRdv = "avenir";
  V.rdv = function (z) {
    var auj = dloc();
    var f = { jour: function (r) { return r.date === auj; }, avenir: function (r) { return r.date >= auj; }, passes: function (r) { return r.date < auj; }, tout: function () { return true; } }[filtreRdv];
    var items = E.rdv.filter(f).sort(function (a, b) { return (a.date + a.heure).localeCompare(b.date + b.heure); });
    if (filtreRdv === "passes") items.reverse();
    var parJour = {}; items.forEach(function (r) { (parJour[r.date] = parJour[r.date] || []).push(r); });
    z.innerHTML = '<div class="tools"><div class="seg">' + [["jour", "Aujourd'hui"], ["avenir", "À venir"], ["passes", "Passés"], ["tout", "Tout"]].map(function (x) { return '<button data-f="' + x[0] + '"' + (filtreRdv === x[0] ? ' class="on"' : "") + ">" + x[1] + "</button>"; }).join("") + '</div><button class="b main" data-add>+ Ajouter</button></div>' +
      (items.length ? Object.keys(parJour).map(function (d) {
        return '<h4 class="jour">' + fdate(d) + "</h4>" + parJour[d].map(function (r) {
          return '<div class="carte" data-id="' + r.id + '"><div class="h">' + (r.heure ? "<b>" + esc(r.heure) + "</b> " : "") + esc(r.nom) + " " + chip(r.statut) + (r.exemple ? ' <span class="ex">exemple</span>' : "") + '</div><div class="muted">' + (r.personnes ? esc(r.personnes) + " personne(s)" : "") + (r.prestation ? esc(r.prestation) : "") + (r.montant != null && r.montant !== "" ? " · devis " + eur(r.montant) : "") + (r.source === "site" ? " · via le site" : "") + (r.note ? " · " + esc(r.note) : "") + '</div><div class="acts">' +
            (BTP ? (r.statut === "demandée" ? '<a class="b main" data-a="recu" href="' + wa(r.tel, "Bonjour " + r.nom + ", c'est " + C.nom + " : nous avons bien reçu votre demande (" + (r.prestation || "travaux") + "). Nous vous rappelons pour convenir d'une visite et vous envoyer le devis.") + '" target="_blank">Accuser réception ' + ico("wa") + '</a><button class="b" data-a="devis">Devis envoyé</button>' : r.statut === "devis envoyé" ? '<button class="b main" data-a="accepte">Devis accepté</button><button class="b" data-a="non">Refusé</button>' : r.statut === "accepté" ? '<button class="b main" data-a="encours">Chantier commencé</button>' : r.statut === "en cours" ? '<button class="b main" data-a="fini">Chantier terminé</button>' : "") : "") +
            (!BTP && r.statut === "demandée" ? '<a class="b main" data-a="ok" href="' + wa(r.tel, "Bonjour " + r.nom + ", c'est " + C.nom + " : votre " + (C.type === "salon" ? "rendez-vous" : "réservation") + " du " + fdate(r.date) + " à " + r.heure + " est confirmé(e). À bientôt !") + '" target="_blank">Confirmer ' + ico("wa") + '</a><button class="b" data-a="non">Refuser</button>' : "") +
            (!BTP && r.statut === "confirmée" && r.date <= auj ? '<button class="b" data-a="venue">Venu(e)</button>' : "") +
            '<a class="b" href="' + telh(r.tel) + '">' + ico("tel") + "</a><button class=\"b\" data-a=\"edit\">Modifier</button></div></div>";
        }).join("");
      }).join("") : '<p class="vide">Rien ici.</p>');
    $$("[data-f]", z).forEach(function (b) { b.onclick = function () { filtreRdv = b.dataset.f; route(); }; });
    $("[data-add]", z).onclick = function () { ouvrir("Nouveau — " + DEF.rdv.titre.toLowerCase(), DEF.rdv.champs, null, function (o) { o.source = "téléphone"; if (o.nom || o.tel) o.client = S.verser ? lierClient(o) : ""; E.rdv.push(o); sauver("Ajouté"); route(); }); };
    $$(".carte", z).forEach(function (c) {
      var r = E.rdv.find(function (x) { return x.id === c.dataset.id; });
      $$("[data-a]", c).forEach(function (b) {
        b.addEventListener("click", function () {
          var a = b.dataset.a;
          if (a === "ok") { r.statut = "confirmée"; delete r.exemple; sauver("Confirmé — message WhatsApp prêt"); setTimeout(route, 50); }
          if (a === "recu") { delete r.exemple; sauver("Message WhatsApp prêt"); return; }
          if (a === "devis") { var m = prompt("Montant du devis (€) — facultatif :", r.montant == null ? "" : r.montant); if (m === null) return; if (m !== "") r.montant = Number(String(m).replace(",", ".")) || 0; r.statut = "devis envoyé"; delete r.exemple; sauver("Devis noté comme envoyé"); route(); return; }
          if (a === "accepte") { r.statut = "accepté"; sauver("Devis accepté"); route(); return; }
          if (a === "encours") { r.statut = "en cours"; sauver("Chantier en cours"); route(); return; }
          if (a === "fini") { r.statut = "terminé"; sauver("Chantier terminé"); if (r.montant && confirm("Ajouter " + eur(r.montant) + " aux ventes ?")) { E.ventes.push({ id: S.uid(), date: dloc(), montant: r.montant, mode: "Virement", note: "Chantier — " + r.nom, ref: r.id }); sauver("Ajouté aux ventes"); } route(); return; }
          if (a === "non" && BTP) { r.statut = "refusée"; sauver("Noté"); route(); return; }
          if (a === "non") { r.statut = "refusée"; sauver("Refusé"); window.open(wa(r.tel, "Bonjour " + r.nom + ", c'est " + C.nom + " : désolé, nous ne pouvons pas vous accueillir le " + fdate(r.date) + " à " + r.heure + ". Voulez-vous un autre créneau ?"), "_blank"); route(); }
          if (a === "venue") { r.statut = "venue"; sauver("Noté"); route(); }
          if (a === "edit") ouvrir(DEF.rdv.titre, DEF.rdv.champs, r, function (o) { Object.assign(r, o); delete r.exemple; sauver("Enregistré"); route(); }, function () { E.rdv = E.rdv.filter(function (x) { return x !== r; }); sauver("Supprimé"); route(); });
        });
      });
    });
  };
  function lierClient(o) {
    var t = String(o.tel || "").replace(/\D/g, "");
    var c = E.clients.find(function (x) { return t && String(x.tel || "").replace(/\D/g, "") === t; });
    if (!c) { c = { id: S.uid(), nom: o.nom, tel: o.tel, email: "", note: "", cree: dloc() }; E.clients.push(c); }
    return c.id;
  }

  var filtreCmd = "cours";
  V.commandes = function (z) {
    var items = E.commandes.filter(function (c) { return filtreCmd === "tout" || (filtreCmd === "cours" ? ["nouvelle", "prête"].indexOf(c.statut) >= 0 : ["retirée", "annulée"].indexOf(c.statut) >= 0); })
      .sort(function (a, b) { return String(a.retrait).localeCompare(b.retrait); });
    z.innerHTML = '<div class="tools"><div class="seg">' + [["cours", "En cours"], ["fini", "Terminées"], ["tout", "Tout"]].map(function (x) { return '<button data-f="' + x[0] + '"' + (filtreCmd === x[0] ? ' class="on"' : "") + ">" + x[1] + "</button>"; }).join("") + '</div><a class="b" href="#/produits">Gérer les produits</a></div>' +
      '<p class="muted petit">' + (BTP ? "Vos clients réservent du matériel sur votre site ; vous confirmez la disponibilité et le tarif." : "Les clients commandent sur votre site et paient au retrait.") + " " + MOT_CC + " : " + (E.site.cc ? "<b>ouvert</b>" : "<b>fermé</b>") + ' (Mon site).</p>' +
      (items.length ? items.map(function (c) {
        var t = total(c);
        return '<div class="carte" data-id="' + c.id + '"><div class="h"><b>Retrait ' + esc(fdate(String(c.retrait).slice(0, 10)) + " à " + String(c.retrait).slice(11)) + "</b> · " + esc(c.nom) + " " + chip(c.statut) + (c.exemple ? ' <span class="ex">exemple</span>' : "") + '</div><ul class="lignes">' + c.lignes.map(function (l) { return "<li>" + l.qte + " × " + esc(l.nom) + (l.prix != null ? " — " + eur(l.prix * l.qte) : "") + "</li>"; }).join("") + '</ul><div class="muted">Total : ' + (t == null ? "à calculer (prix à définir)" : eur(t)) + (c.note ? " · " + esc(c.note) : "") + '</div><div class="acts">' +
          (c.statut === "nouvelle" ? '<a class="b main" data-a="prete" href="' + wa(c.tel, "Bonjour " + c.nom + ", c'est " + C.nom + (BTP ? " : votre matériel est prêt. Vous pouvez passer le récupérer." : " : votre commande est prête ! Vous pouvez passer la récupérer. À tout de suite.")) + '" target="_blank">Prête ' + ico("wa") + "</a>" : "") +
          (c.statut === "prête" ? '<button class="b main" data-a="retiree">Retirée et payée</button>' : "") +
          (["nouvelle", "prête"].indexOf(c.statut) >= 0 ? '<button class="b" data-a="annuler">Annuler</button>' : "") +
          '<a class="b" href="' + telh(c.tel) + '">' + ico("tel") + "</a></div></div>";
      }).join("") : '<p class="vide">Aucune commande.</p>');
    $$("[data-f]", z).forEach(function (b) { b.onclick = function () { filtreCmd = b.dataset.f; route(); }; });
    $$(".carte", z).forEach(function (el) {
      var c = E.commandes.find(function (x) { return x.id === el.dataset.id; });
      $$("[data-a]", el).forEach(function (b) {
        b.addEventListener("click", function () {
          var a = b.dataset.a;
          if (a === "prete") { c.statut = "prête"; sauver("Commande prête — message WhatsApp ouvert"); setTimeout(route, 50); }
          if (a === "annuler" && confirm("Annuler cette commande ?")) { c.statut = "annulée"; sauver("Annulée"); route(); }
          if (a === "retiree") {
            var t = total(c);
            if (t == null) { var m = prompt("Montant encaissé (€) :", ""); if (m === null) return; t = Number(String(m).replace(",", ".")) || 0; }
            c.statut = "retirée";
            E.ventes.push({ id: S.uid(), date: dloc(), montant: t, mode: "Click & collect", note: "Commande de " + c.nom, ref: c.id });
            c.lignes.forEach(function (l) { var p = E.produits.find(function (x) { return x.id === l.pid; }); var s = p && E.stock.find(function (x) { return x.id === p.stockId; }); if (s) s.qte = Math.max(0, (Number(s.qte) || 0) - l.qte); });
            sauver("Vente enregistrée et stock mis à jour"); route();
          }
        });
      });
    });
  };

  V.produits = function (z) { liste("produits", z); };
  var ongletCaisse = "ventes";
  V.caisse = function (z) {
    z.innerHTML = '<div class="seg big">' + [["ventes", "Ventes"], ["depenses", "Dépenses"], ["bilan", "Bilan du mois"]].map(function (x) { return '<button data-o="' + x[0] + '"' + (ongletCaisse === x[0] ? ' class="on"' : "") + ">" + x[1] + "</button>"; }).join("") + '</div><div id="sous"></div>';
    $$("[data-o]", z).forEach(function (b) { b.onclick = function () { ongletCaisse = b.dataset.o; route(); }; });
    var sous = $("#sous", z);
    if (ongletCaisse !== "bilan") return liste(ongletCaisse, sous);
    var mois = (sessionStorageGet("mois") || dloc().slice(0, 7));
    var v = E.ventes.filter(function (x) { return String(x.date).slice(0, 7) === mois; }), d = E.depenses.filter(function (x) { return String(x.date).slice(0, 7) === mois; });
    var parMode = {}, parCat = {};
    v.forEach(function (x) { parMode[x.mode] = (parMode[x.mode] || 0) + (Number(x.montant) || 0); });
    d.forEach(function (x) { parCat[x.categorie] = (parCat[x.categorie] || 0) + (Number(x.montant) || 0); });
    var ca = sum(v, "montant"), dp = sum(d, "montant");
    sous.innerHTML = '<div class="tools"><input type="month" id="mois" value="' + mois + '"><button class="b" id="csv">Exporter (CSV)</button></div><div class="kpis">' + kpi("Ventes", eur(ca)) + kpi("Dépenses", eur(dp)) + kpi("Résultat", eur(ca - dp), ca - dp < 0 ? "neg" : "pos") + kpi("Nombre de ventes", String(v.length)) + '</div><div class="cols"><section class="panel"><h3>Ventes par paiement</h3>' + tab(parMode) + '</section><section class="panel"><h3>Dépenses par catégorie</h3>' + tab(parCat) + "</section></div>" +
      '<p class="muted petit">Ce bilan aide au suivi quotidien ; il ne remplace pas votre comptabilité ni votre expert-comptable.</p>';
    $("#mois", sous).onchange = function (e) { sessionStorageSet("mois", e.target.value); route(); };
    $("#csv", sous).onclick = function () {
      var lignes = [["type", "date", "montant", "mode/catégorie", "note"]];
      v.forEach(function (x) { lignes.push(["vente", x.date, x.montant, x.mode, x.note || ""]); });
      d.forEach(function (x) { lignes.push(["dépense", x.date, x.montant, x.categorie, (nomF(x.fournisseur) + " " + (x.note || "")).trim()]); });
      telecharger(C.slug + "-" + mois + ".csv", "﻿" + lignes.map(function (l) { return l.map(function (c) { return '"' + String(c == null ? "" : c).replace(/"/g, '""') + '"'; }).join(";"); }).join("\n"), "text/csv");
    };
  };
  var memo = {};
  function sessionStorageGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return memo[k]; } }
  function sessionStorageSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { memo[k] = v; } }
  function tab(o) { var k = Object.keys(o); return k.length ? '<table class="t">' + k.map(function (x) { return "<tr><td>" + esc(x) + "</td><td>" + eur(o[x]) + "</td></tr>"; }).join("") + "</table>" : '<p class="muted">Rien ce mois-ci.</p>'; }
  function telecharger(nom, contenu, type) { var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([contenu], { type: type })); a.download = nom; document.body.appendChild(a); a.click(); a.remove(); }

  var ongletStock = "stock";
  V.stock = function (z) {
    z.innerHTML = '<div class="seg big">' + [["stock", "Articles"], ["fournisseurs", "Fournisseurs"]].map(function (x) { return '<button data-o="' + x[0] + '"' + (ongletStock === x[0] ? ' class="on"' : "") + ">" + x[1] + "</button>"; }).join("") + '</div><div id="sous"></div>';
    $$("[data-o]", z).forEach(function (b) { b.onclick = function () { ongletStock = b.dataset.o; route(); }; });
    liste(ongletStock, $("#sous", z));
  };
  V.clients = function (z) { liste("clients", z); $(".tools", z).insertAdjacentHTML("afterend", '<p class="muted petit">Les clients qui réservent ou commandent sur votre site sont ajoutés automatiquement.</p>'); };

  V.site = function (z) {
    var s = E.site;
    function ligneH(h, i) { return '<div class="hrow" data-i="' + i + '"><input value="' + esc(h[0]) + '" placeholder="Jour"><input value="' + esc(h[2]) + '" placeholder="Horaire"><input value="' + esc(h[1]) + '" placeholder="Day (EN)"><input value="' + esc(h[3]) + '" placeholder="Hours (EN)"><button class="b" data-del>×</button></div>'; }
    function ligneC(c, i) { return '<div class="crow" data-i="' + i + '"><div class="grid2"><input value="' + esc(c.fr) + '" placeholder="Titre"><input value="' + esc(c.en) + '" placeholder="Title (EN)"><textarea rows="2" placeholder="Description">' + esc(c.dfr) + '</textarea><textarea rows="2" placeholder="Description (EN)">' + esc(c.den) + '</textarea></div><div class="acts"><button class="b" data-up>↑</button><button class="b" data-del>×</button></div></div>'; }
    z.innerHTML =
      '<section class="panel"><h3>Annonce & fermeture</h3><div class="grid">' +
      champHTML({ k: "annonce", l: "Annonce en haut du site (laisser vide pour aucune)", t: "text", large: true }, s.annonce || "") +
      champHTML({ k: "annonce_en", l: "Annonce en anglais", t: "text", large: true }, s.annonce_en || "") +
      champHTML({ k: "ferme", l: "Fermé exceptionnellement", t: "checkbox" }, !!s.ferme) +
      champHTML({ k: "ferme_msg", l: "Message de fermeture", t: "text", large: true }, s.ferme_msg || "") +
      "</div></section>" +
      '<section class="panel"><h3>En ligne</h3><div class="grid">' +
      (RESA ? champHTML({ k: "resa", l: (C.type === "salon" ? "Prise de rendez-vous" : BTP ? "Demandes de devis" : "Réservations") + " sur le site", t: "checkbox" }, !!s.resa) : "") +
      champHTML({ k: "cc", l: MOT_CC + " sur le site", t: "checkbox" }, !!s.cc) +
      champHTML({ k: "ouv", l: "Premier créneau", t: "time" }, s.creneaux.ouv) + champHTML({ k: "fer", l: "Dernier créneau", t: "time" }, s.creneaux.fer) +
      champHTML({ k: "pas", l: "Créneau toutes les (min)", t: "select", o: ["15", "30", "60"] }, String(s.creneaux.pas)) +
      champHTML({ k: "jours", l: "Jours fermés (créneaux)", t: "text" }, (s.creneaux.fermes || []).join(", ")) +
      '</div><p class="muted petit">Jours fermés : numéros séparés par des virgules (0 = dimanche, 1 = lundi…).</p></section>' +
      '<section class="panel"><h3>Horaires affichés</h3><div id="hrs">' + s.horaires.map(ligneH).join("") + '</div><button class="b" id="addh">+ Ligne</button></section>' +
      '<section class="panel"><h3>' + (C.type === "salon" ? "Prestations" : BTP ? "Nos métiers" : C.type === "boutique" ? "Rayons" : "La carte") + '</h3><div id="crt">' + s.cartes.map(ligneC).join("") + '</div><button class="b" id="addc">+ Ajouter</button></section>' +
      '<div class="raccourcis"><button class="b main" id="save">Enregistrer et publier</button><a class="b" href="../" target="_blank">Voir mon site ↗</a></div>';
    brancherMicros(z);
    function lire() {
      s.annonce = $("#f_annonce").value.trim(); s.annonce_en = $("#f_annonce_en").value.trim();
      s.ferme = $("#f_ferme").checked; s.ferme_msg = $("#f_ferme_msg").value.trim();
      if (RESA) s.resa = $("#f_resa").checked; s.cc = $("#f_cc").checked;
      s.creneaux = { ouv: $("#f_ouv").value, fer: $("#f_fer").value, pas: Number($("#f_pas").value), fermes: $("#f_jours").value.split(",").map(function (x) { return x.trim(); }).filter(function (x) { return x !== "" && !isNaN(x); }).map(Number) };
      s.horaires = $$(".hrow", z).map(function (r) { var i = $$("input", r).map(function (x) { return x.value.trim(); }); return [i[0], i[2], i[1], i[3]]; });
      s.cartes = $$(".crow", z).map(function (r) { var i = $$("input,textarea", r).map(function (x) { return x.value.trim(); }); return { fr: i[0], en: i[1], dfr: i[2], den: i[3], ico: "" }; });
    }
    $("#addh", z).onclick = function () { lire(); s.horaires.push(["", "", "", ""]); route(); };
    $("#addc", z).onclick = function () { lire(); s.cartes.push({ fr: "", en: "", dfr: "", den: "" }); route(); };
    $$("[data-del]", z).forEach(function (b) { b.onclick = function () { lire(); var r = b.closest("[data-i]"), i = Number(r.dataset.i); (r.classList.contains("hrow") ? s.horaires : s.cartes).splice(i, 1); route(); }; });
    $$("[data-up]", z).forEach(function (b) { b.onclick = function () { lire(); var i = Number(b.closest("[data-i]").dataset.i); if (i > 0) { var t = s.cartes[i - 1]; s.cartes[i - 1] = s.cartes[i]; s.cartes[i] = t; } route(); }; });
    $("#save", z).onclick = function () { lire(); sauver("Site mis à jour"); route(); };
  };

  V.reglages = function (z) {
    z.innerHTML =
      '<section class="panel"><h3>Code d\'accès</h3><div class="grid">' + champHTML({ k: "p1", l: "Nouveau code (4 à 8 chiffres)", t: "number" }, "") + champHTML({ k: "p2", l: "Confirmer", t: "number" }, "") + '</div><button class="b main" id="pin">Changer le code</button></section>' +
      '<section class="panel"><h3>Sauvegarde</h3><p class="muted">Téléchargez toutes vos données (fichier) ou restaurez une sauvegarde.</p><div class="raccourcis"><button class="b" id="exp">Télécharger une sauvegarde</button><label class="b">Restaurer<input type="file" id="imp" accept="application/json" hidden></label><button class="b" id="csvc">Exporter les clients (CSV)</button></div></section>' +
      '<section class="panel"><h3>Données d\'exemple</h3><p class="muted">Les lignes marquées « exemple » servent à découvrir l\'outil.</p><div class="raccourcis"><button class="b danger" id="clean">Retirer tous les exemples</button>' + (S.serveur ? "" : '<button class="b" id="reset">Remettre la démo à zéro</button>') + "</div></section>" +
      '<section class="panel"><h3>À propos</h3><p class="muted">' + (S.serveur ? "Vos données sont enregistrées en ligne et accessibles depuis tous vos appareils." : "Mode démonstration : les données restent sur cet appareil.") + "<br>Espace de gestion réalisé par Kapicua — cedric.behmann@assistant-rabe.com</p></section>";
    $("#pin", z).onclick = async function () {
      var a = $("#f_p1").value, b = $("#f_p2").value;
      if (!/^\d{4,8}$/.test(a)) return toast("Le code doit faire 4 à 8 chiffres");
      if (a !== b) return toast("Les deux codes ne sont pas identiques");
      E.reglages.pin = await S.sha(C.slug + ":" + a); await sauver("Code changé"); if (S.serveur) S.setPin(a); route();
    };
    $("#exp", z).onclick = function () { telecharger(C.slug + "-sauvegarde-" + dloc() + ".json", JSON.stringify(E, null, 1), "application/json"); };
    $("#imp", z).onchange = function (e) { var f = e.target.files[0]; if (!f) return; f.text().then(function (t) { try { var o = JSON.parse(t); if (!o.site || !o.ventes) throw 0; if (confirm("Remplacer toutes les données actuelles par cette sauvegarde ?")) { E = o; sauver("Sauvegarde restaurée"); route(); } } catch (x) { toast("Fichier non reconnu"); } }); };
    $("#csvc", z).onclick = function () { telecharger(C.slug + "-clients.csv", "﻿" + [["nom", "téléphone", "e-mail", "note"]].concat(E.clients.map(function (c) { return [c.nom, c.tel, c.email, c.note]; })).map(function (l) { return l.map(function (c) { return '"' + String(c || "").replace(/"/g, '""') + '"'; }).join(";"); }).join("\n"), "text/csv"); };
    $("#clean", z).onclick = function () { if (!confirm("Retirer toutes les données d'exemple ?")) return; ["produits", "commandes", "rdv", "ventes", "depenses", "stock", "fournisseurs", "clients"].forEach(function (k) { E[k] = E[k].filter(function (x) { return !x.exemple; }); }); sauver("Exemples retirés"); route(); };
    var r = $("#reset", z); if (r) r.onclick = function () { if (confirm("Remettre la démo à zéro ?")) { S.reinitialiser(); location.reload(); } };
  };

  /* ───────── coquille ───────── */
  function route() {
    var m = (location.hash.replace("#/", "") || "accueil");
    if (!V[m] || (m === "rdv" && !RESA)) m = "accueil";
    $$(".nav a, .bas a").forEach(function (a) { a.classList.toggle("on", a.dataset.m === m); });
    var titre = MODULES.find(function (x) { return x[0] === m; })[1];
    $("#titre").textContent = titre;
    document.title = titre + " — " + C.nom;
    var z = $("#zone"); V[m](z); window.scrollTo(0, 0);
    $("#plus").classList.remove("on");
  }
  function coquille() {
    document.body.innerHTML =
      '<div class="app"><aside class="nav"><div class="marque"><b>' + esc(C.nom) + '</b><span>Espace de gestion</span></div>' +
      MODULES.map(function (x) { return '<a href="#/' + x[0] + '" data-m="' + x[0] + '">' + ico(x[0]) + "<span>" + x[1] + "</span></a>"; }).join("") +
      '<div class="pied">' + (S.serveur ? "" : '<span class="chip or">Démo — données sur cet appareil</span>') + '<a href="../" target="_blank">Voir mon site ↗</a></div></aside>' +
      '<main><header class="top"><h1 id="titre"></h1><span class="nomc">' + esc(C.nom) + '</span></header><div id="zone"></div></main>' +
      '<nav class="bas">' + BAS.map(function (k) { var x = MODULES.find(function (m) { return m[0] === k; }); return '<a href="#/' + k + '" data-m="' + k + '">' + ico(k) + "<span>" + x[1] + "</span></a>"; }).join("") + '<a href="javascript:void 0" id="plusb">' + ico("plus") + "<span>Plus</span></a></nav>" +
      '<div id="plus" class="plus">' + MODULES.filter(function (x) { return BAS.indexOf(x[0]) < 0; }).map(function (x) { return '<a href="#/' + x[0] + '" data-m="' + x[0] + '">' + ico(x[0]) + "<span>" + x[1] + "</span></a>"; }).join("") + "</div>" +
      '<dialog id="dlg"></dialog><div id="toast" class="toast"></div></div>';
    $("#plusb").onclick = function () { $("#plus").classList.toggle("on"); };
    window.onhashchange = route;
    route();
  }

  async function rafraichir() {
    try {
      var neuf = await S.charger();
      if (S.serveur) { var d = await S.boite(); if (d.length) { d.forEach(function (x) { S.verser(neuf, x); }); await S.sauver(neuf); toast(d.length + " nouvelle(s) demande(s) du site"); } }
      if (JSON.stringify(neuf) !== JSON.stringify(E)) { E = neuf; if (!$("#dlg").open && !/site|reglages/.test(location.hash)) route(); }
    } catch (e) {}
  }

  function verrou() {
    document.body.innerHTML = '<div class="lock"><form><div class="marque"><b>' + esc(C.nom) + '</b><span>Espace de gestion</span></div><label>Code d\'accès<input id="pin" type="password" inputmode="numeric" autocomplete="current-password" autofocus></label><button class="b main">Entrer</button><p class="muted petit">' + (S.serveur ? "" : "Démonstration : le code est <b>0000</b>.") + '</p><p id="err" class="err"></p></form></div>';
    $("form").onsubmit = async function (ev) {
      ev.preventDefault();
      var p = $("#pin").value;
      if (await S.verifierPin(p)) { S.setPin(p); try { sessionStorage.setItem("kp-ok:" + C.slug, S.serveur ? p : "1"); } catch (e) {} demarrer(); }
      else $("#err").textContent = "Code incorrect.";
    };
  }
  async function demarrer() {
    E = await S.charger();
    coquille();
    window.addEventListener("storage", function (ev) { if (ev.key === S.cle) rafraichir(); });
    window.addEventListener("focus", rafraichir);
    setInterval(rafraichir, 60000);
    rafraichir();
  }
  var ok = null; try { ok = sessionStorage.getItem("kp-ok:" + C.slug); } catch (e) {}
  if (ok) { if (S.serveur) S.setPin(ok); demarrer(); } else verrou();
})();
