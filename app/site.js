/* Kapicua — partie dynamique du site public : annonce, horaires et carte tenus
   depuis l'espace de gestion, réservations / rendez-vous et click & collect. */
(function () {
  var C = window.KP, S = window.KPStore;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.from((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function L(fr, en) { return '<span lang="fr">' + fr + '</span><span lang="en">' + (en || fr) + "</span>"; }
  function eur(n) { return (Number(n) || 0).toLocaleString("fr-FR", { style: "currency", currency: "EUR" }); }
  var RESA = C.type !== "boutique";

  var css = document.createElement("style");
  css.textContent =
    ".kp-annonce{background:var(--accent);color:var(--onaccent);text-align:center;padding:10px 16px;font-weight:600}" +
    ".kp-annonce.ferme{background:#B42318;color:#fff}" +
    ".kp-form{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:28px;max-width:720px}" +
    ".kp-form label{display:flex;flex-direction:column;gap:6px;font-size:14px;font-weight:600}" +
    ".kp-form .large{grid-column:1/-1}" +
    ".kp-form input,.kp-form select,.kp-form textarea{padding:12px 14px;border:1px solid var(--line);border-radius:10px;font:inherit;background:var(--card);color:var(--ink)}" +
    ".kp-form .btn{justify-self:start;cursor:pointer}" +
    ".kp-ok{margin-top:24px;padding:18px 20px;border-radius:var(--radius);background:var(--card);border:2px solid var(--accent2);max-width:720px}" +
    ".kp-prod{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin-top:30px}" +
    ".kp-p{background:var(--card);border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;display:flex;flex-direction:column}" +
    ".kp-p img{width:100%;aspect-ratio:4/3;object-fit:cover}" +
    ".kp-p .c{padding:18px;display:flex;flex-direction:column;gap:6px;flex:1}" +
    ".kp-p h3{font-size:22px}.kp-p p{font-size:15px;opacity:.8;flex:1}" +
    ".kp-p .pr{display:flex;justify-content:space-between;align-items:center;margin-top:8px;font-weight:700}" +
    ".kp-q{display:inline-flex;align-items:center;gap:10px}.kp-q button{width:36px;height:36px;border-radius:50%;border:1px solid var(--line);background:var(--bg);color:var(--ink);font-size:18px;cursor:pointer}" +
    ".kp-ex{font-size:11px;text-transform:uppercase;letter-spacing:.08em;opacity:.6}" +
    ".kp-panier{margin-top:22px;padding:18px 20px;border-radius:var(--radius);background:var(--card);border:1px solid var(--line);max-width:720px}" +
    ".kp-legal{font-size:13px;opacity:.65;grid-column:1/-1;font-weight:400}" +
    ".kp-gestion{opacity:.6;text-decoration:none}" +
    "@media(max-width:760px){.kp-form{grid-template-columns:1fr}}";
  document.head.appendChild(css);

  function creneaux(date, cr) {
    var out = [], j = new Date(date + "T12:00").getDay();
    if ((cr.fermes || []).indexOf(j) >= 0) return out;
    var h = cr.ouv.split(":").map(Number), f = cr.fer.split(":").map(Number), m = h[0] * 60 + h[1], fin = f[0] * 60 + f[1];
    var maint = new Date(), aujourd = S.dloc() === date, min = maint.getHours() * 60 + maint.getMinutes() + 30;
    for (; m <= fin; m += cr.pas) { if (aujourd && m < min) continue; out.push(String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0")); }
    return out;
  }
  function remplirHeures(sel, date, cr) {
    var c = creneaux(date, cr);
    sel.innerHTML = c.length ? c.map(function (x) { return "<option>" + x + "</option>"; }).join("") : '<option value="">' + "Fermé ce jour-là / Closed that day" + "</option>";
  }

  function appliquer(p) {
    var s = p.site;
    var pil = $(".pilote");
    if (s.ferme) pil.insertAdjacentHTML("afterend", '<div class="kp-annonce ferme">' + L(esc(s.ferme_msg || "Fermé exceptionnellement"), esc(s.ferme_msg || "Exceptionally closed")) + "</div>");
    else if (s.annonce) pil.insertAdjacentHTML("afterend", '<div class="kp-annonce">' + L(esc(s.annonce), esc(s.annonce_en || s.annonce)) + "</div>");
    var tb = $("#kp-h");
    if (tb && s.horaires) tb.innerHTML = s.horaires.map(function (h) { return "<tr><td>" + L(esc(h[0]), esc(h[1] || h[0])) + "</td><td>" + L(esc(h[2]), esc(h[3] || h[2])) + "</td></tr>"; }).join("");
    var cartes = $("#kp-cartes");
    if (cartes && s.cartes) cartes.innerHTML = s.cartes.map(function (c) { return '<article class="card">' + (c.ico || "") + "<h3>" + L(esc(c.fr), esc(c.en || c.fr)) + "</h3><p>" + L(esc(c.dfr), esc(c.den || c.dfr)) + "</p></article>"; }).join("");

    var zone = $("#kp-plus"), liens = [];
    if (RESA && s.resa) { zone.insertAdjacentHTML("beforeend", resaHTML(s)); liens.push(["#reserver", C.type === "salon" ? L("Rendez-vous", "Book") : L("Réserver", "Book")]); brancherResa(s); }
    var prods = (p.produits || []).filter(function (x) { return x.dispo; });
    if (s.cc && prods.length) { zone.insertAdjacentHTML("beforeend", ccHTML(prods)); liens.push(["#commander", L("Click & collect", "Click & collect")]); brancherCC(s, prods); }
    var nav = $(".navlinks"), lang = $("#lang");
    liens.forEach(function (l) { lang.insertAdjacentHTML("beforebegin", '<a href="' + l[0] + '">' + l[1] + "</a>"); });
    var pied = $("footer .wrap");
    if (pied) pied.insertAdjacentHTML("beforeend", '<a class="kp-gestion" href="gestion/">' + L("Espace gestion", "Staff area") + "</a>");
  }

  function resaHTML(s) {
    var salon = C.type === "salon", auj = S.dloc();
    return '<section id="reserver"><div class="wrap"><p class="kicker">' + L(salon ? "Rendez-vous" : "Réservation", salon ? "Appointments" : "Reservations") + "</p><h2>" +
      L(salon ? "Prenez rendez-vous en ligne" : "Réservez votre table", salon ? "Book your appointment online" : "Book your table") + "</h2>" +
      '<p class="lead">' + L("Envoyez votre demande : nous vous confirmons rapidement par téléphone ou WhatsApp.", "Send your request: we'll confirm quickly by phone or WhatsApp.") + "</p>" +
      '<form class="kp-form" id="kp-resa">' +
      "<label>" + L("Date", "Date") + '<input type="date" name="date" min="' + auj + '" value="' + auj + '" required></label>' +
      "<label>" + L("Heure", "Time") + '<select name="heure" required></select></label>' +
      (salon ? '<label class="large">' + L("Prestation", "Service") + '<select name="prestation">' + s.cartes.map(function (c) { return '<option value="' + esc(c.fr) + '">' + esc(c.fr) + "</option>"; }).join("") + "</select></label>"
        : "<label>" + L("Personnes", "Guests") + '<input type="number" name="personnes" min="1" max="30" value="2" required></label><span></span>') +
      "<label>" + L("Nom", "Name") + '<input name="nom" autocomplete="name" required></label>' +
      "<label>" + L("Téléphone", "Phone") + '<input name="tel" type="tel" autocomplete="tel" required></label>' +
      '<label class="large">' + L("Message (facultatif)", "Message (optional)") + '<textarea name="note" rows="2"></textarea></label>' +
      '<p class="kp-legal">' + L("Vos coordonnées servent uniquement à traiter votre demande.", "Your details are only used to handle your request.") + "</p>" +
      '<button class="btn main">' + L("Envoyer la demande", "Send request") + "</button></form></div></section>";
  }
  function brancherResa(s) {
    var f = $("#kp-resa"), sel = f.heure;
    remplirHeures(sel, f.date.value, s.creneaux);
    f.date.onchange = function () { remplirHeures(sel, f.date.value, s.creneaux); };
    f.onsubmit = async function (ev) {
      ev.preventDefault();
      if (!sel.value) return;
      var d = { genre: "rdv", date: f.date.value, heure: sel.value, nom: f.nom.value.trim(), tel: f.tel.value.trim(), note: f.note.value.trim() };
      if (f.personnes) d.personnes = f.personnes.value; if (f.prestation) d.prestation = f.prestation.value;
      try { await S.demande(d); f.outerHTML = '<div class="kp-ok"><b>' + L("Demande envoyée, merci !", "Request sent, thank you!") + "</b><br>" + L("Nous vous confirmons très vite.", "We'll confirm very soon.") + "</div>"; }
      catch (e) { alert("Envoi impossible pour le moment. Appelez-nous, merci !"); }
    };
  }

  var panier = {};
  function ccHTML(prods) {
    return '<section id="commander"><div class="wrap"><p class="kicker">Click & collect</p><h2>' + L("Commandez, passez récupérer", "Order online, pick up in store") + "</h2>" +
      '<p class="lead">' + L("Choisissez, indiquez l'heure de retrait, et réglez sur place.", "Choose, pick a collection time, and pay when you collect.") + "</p>" +
      '<div class="kp-prod">' + prods.map(function (p) {
        return '<div class="kp-p">' + (p.photo ? '<img src="' + p.photo + '" alt="' + esc(p.nom) + '" loading="lazy">' : "") + '<div class="c">' + (p.exemple ? '<span class="kp-ex">' + L("exemple", "example") + "</span>" : "") + "<h3>" + esc(p.nom) + "</h3><p>" + esc(p.desc) + '</p><div class="pr"><span>' + (p.prix == null ? L("Prix à définir", "Price TBC") : eur(p.prix)) + '</span><span class="kp-q"><button type="button" data-m="' + p.id + '">−</button><b id="q-' + p.id + '">0</b><button type="button" data-p="' + p.id + '">+</button></span></div></div></div>';
      }).join("") + '</div><div class="kp-panier" id="kp-panier" hidden></div></div></section>';
  }
  function brancherCC(s, prods) {
    function maj() {
      var lignes = prods.filter(function (p) { return panier[p.id]; });
      prods.forEach(function (p) { $("#q-" + p.id).textContent = panier[p.id] || 0; });
      var z = $("#kp-panier");
      if (!lignes.length) { z.hidden = true; return; }
      var inconnu = lignes.some(function (p) { return p.prix == null; });
      var tot = lignes.reduce(function (a, p) { return a + (p.prix || 0) * panier[p.id]; }, 0);
      var auj = S.dloc(), dem = S.plus(1);
      z.hidden = false;
      var recap = "<b>" + L("Votre commande", "Your order") + "</b><ul style=\"margin:8px 0 0 18px\">" + lignes.map(function (p) { return "<li>" + panier[p.id] + " × " + esc(p.nom) + "</li>"; }).join("") + "</ul><p style=\"margin-top:8px\">" + L("Total", "Total") + " : <b>" + (inconnu ? L("confirmé par le commerce", "confirmed by the shop") : eur(tot)) + "</b> — " + L("paiement au retrait", "pay on collection") + "</p>";
      if ($("#kp-cmd")) { $("#kp-recap").innerHTML = recap; return; }
      z.innerHTML = '<div id="kp-recap">' + recap + '</div>' +
        '<form class="kp-form" id="kp-cmd"><label>' + L("Jour de retrait", "Collection day") + '<select name="jour"><option value="' + auj + '">Aujourd\'hui / Today</option><option value="' + dem + '">Demain / Tomorrow</option></select></label>' +
        "<label>" + L("Heure", "Time") + '<select name="heure"></select></label>' +
        "<label>" + L("Nom", "Name") + '<input name="nom" autocomplete="name" required></label><label>' + L("Téléphone", "Phone") + '<input name="tel" type="tel" autocomplete="tel" required></label>' +
        '<label class="large">' + L("Précisions (facultatif)", "Notes (optional)") + '<textarea name="note" rows="2"></textarea></label>' +
        '<p class="kp-legal">' + L("Vos coordonnées servent uniquement à préparer votre commande.", "Your details are only used to prepare your order.") + "</p>" +
        '<button class="btn main">' + L("Envoyer la commande", "Place order") + "</button></form>";
      var f = $("#kp-cmd");
      remplirHeures(f.heure, f.jour.value, s.creneaux);
      f.jour.onchange = function () { remplirHeures(f.heure, f.jour.value, s.creneaux); };
      f.onsubmit = async function (ev) {
        ev.preventDefault(); if (!f.heure.value) return;
        var d = { genre: "commande", retrait: f.jour.value + " " + f.heure.value, nom: f.nom.value.trim(), tel: f.tel.value.trim(), note: f.note.value.trim(),
          lignes: prods.filter(function (p) { return panier[p.id]; }).map(function (p) { return { pid: p.id, nom: p.nom, qte: panier[p.id], prix: p.prix }; }) };
        if (!d.lignes.length) return;
        try { await S.demande(d); panier = {}; prods.forEach(function (p) { $("#q-" + p.id).textContent = 0; }); z.innerHTML = "<b>" + L("Commande envoyée, merci !", "Order sent, thank you!") + "</b><br>" + L("Nous vous prévenons dès qu'elle est prête.", "We'll let you know as soon as it's ready."); }
        catch (e) { alert("Envoi impossible pour le moment. Appelez-nous, merci !"); }
      };
    }
    $$("[data-p]").forEach(function (b) { b.onclick = function () { panier[b.dataset.p] = (panier[b.dataset.p] || 0) + 1; maj(); }; });
    $$("[data-m]").forEach(function (b) { b.onclick = function () { panier[b.dataset.m] = Math.max(0, (panier[b.dataset.m] || 0) - 1); maj(); }; });
  }

  S.publique().then(appliquer).catch(function () {});
})();
