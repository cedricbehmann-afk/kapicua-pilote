/* Espace client, newsletter et consentement cookies — partagé par Kapicua et Encárgalo.
   Le site est donné par <body data-site="kapicua|encargalo">. Textes en fr / en / es,
   suivant <html lang>. Aucune donnée n'est envoyée ailleurs que sur /compte/api/. */
(function () {
  "use strict";
  var SITE = document.body.getAttribute("data-site");
  if (SITE !== "kapicua" && SITE !== "encargalo") return;
  var API = "/compte/api/";

  var I = {
    fr: {
      account: "Mon espace", close: "Fermer", login: "Connexion", register: "Créer mon espace",
      email: "E-mail", password: "Mot de passe", pwHint: "8 caractères minimum", name: "Nom et prénom", company: "Entreprise", phone: "Téléphone",
      nlOpt: "Je souhaite recevoir les nouveautés par e-mail (désinscription à tout moment).",
      terms: "J’accepte la <a href=\"/confidentialite/\" target=\"_blank\" rel=\"noopener\">politique de confidentialité</a>.",
      doLogin: "Se connecter", doRegister: "Créer mon espace", toRegister: "Pas encore d’espace ? Créer un compte", toLogin: "Déjà un espace ? Se connecter",
      forgot: "Mot de passe oublié ? Écrivez-nous, nous le réinitialisons.",
      loginLead: "Retrouvez vos demandes et leur avancement.", registerLead: "Votre espace pour suivre vos demandes, sans passer par la messagerie.",
      hello: "Bonjour", myRequests: "Mes demandes", none: "Aucune demande pour l’instant.", newReq: "Nouvelle demande",
      myInfo: "Mes informations", save: "Enregistrer", saved: "Enregistré.", prefs: "Préférences", nlToggle: "Recevoir les nouveautés par e-mail",
      logout: "Se déconnecter", del: "Supprimer mon espace", delConfirm: "Confirmer la suppression définitive", deleted: "Votre espace a été supprimé.",
      sent: "Demande envoyée. Nous revenons vers vous rapidement.", priceLbl: "Prix", noteLbl: "Message",
      pendingNote: "Créez votre espace ou connectez-vous : votre demande sera enregistrée juste après.",
      e: { invalid_email: "Adresse e-mail invalide.", weak_password: "Le mot de passe doit contenir au moins 8 caractères.", terms_required: "Merci d’accepter la politique de confidentialité.", email_taken: "Un espace existe déjà avec cet e-mail. Connectez-vous.", bad_credentials: "E-mail ou mot de passe incorrect.", too_many: "Trop de tentatives. Réessayez dans quelques minutes.", consent_required: "Merci de cocher la case de consentement.", login_required: "Merci de vous connecter.", invalid_request: "Merci de compléter les champs obligatoires.", generic: "Le service est momentanément indisponible. Réessayez plus tard." },
      nlTitle: "Newsletter", nlLead: "Nouveautés et conseils, une à deux fois par mois.", nlPh: "Votre e-mail", nlConsent: "J’accepte de recevoir la newsletter. <a href=\"/confidentialite/\">Confidentialité</a>", nlBtn: "S’inscrire", nlOk: "Merci, votre inscription est enregistrée.",
      ck: "Nous utilisons uniquement les cookies nécessaires (connexion à votre espace) et, avec votre accord, une préférence de langue enregistrée sur votre appareil. Aucun traceur publicitaire.",
      ckAccept: "Tout accepter", ckRefuse: "Refuser", ckCustom: "Personnaliser", ckSave: "Enregistrer mes choix", ckNeeded: "Nécessaires — connexion et sécurité (toujours actifs)", ckPrefs: "Préférences — mémoriser la langue choisie", ckMore: "En savoir plus",
      pTitle: "Demander mon site pilote", pLead: "Quelques informations pour préparer votre site pilote, offert et sans engagement.", sector: "Secteur d’activité", city: "Ville / île", website: "Site, Instagram ou Facebook actuel", message: "Ce que vous souhaitez (réservations, boutique, rendez-vous…)", pSend: "Envoyer ma demande", req: "obligatoire",
      kind: { pilote: "Site pilote", cotizacion: "Devis" },
      st: { "new": "Reçue", preparing: "En préparation", ready: "Site pilote prêt", won: "Validée", closed: "Clôturée", quoted: "Devis envoyé", paid: "Payée", ordered: "Achetée", shipped: "En route", delivered: "Livrée", cancelled: "Annulée" },
      encNew: "Faire un devis", encSaved: "Devis enregistré dans votre espace. Nous le confirmons avant tout paiement."
    },
    en: {
      account: "My account", close: "Close", login: "Sign in", register: "Create my account",
      email: "Email", password: "Password", pwHint: "At least 8 characters", name: "Full name", company: "Company", phone: "Phone",
      nlOpt: "I would like to receive news by email (unsubscribe at any time).",
      terms: "I accept the <a href=\"/confidentialite/\" target=\"_blank\" rel=\"noopener\">privacy policy</a>.",
      doLogin: "Sign in", doRegister: "Create my account", toRegister: "No account yet? Create one", toLogin: "Already have an account? Sign in",
      forgot: "Forgot your password? Write to us and we will reset it.",
      loginLead: "Find your requests and their progress.", registerLead: "Your own space to follow your requests, no messaging app needed.",
      hello: "Hello", myRequests: "My requests", none: "No requests yet.", newReq: "New request",
      myInfo: "My details", save: "Save", saved: "Saved.", prefs: "Preferences", nlToggle: "Receive news by email",
      logout: "Sign out", del: "Delete my account", delConfirm: "Confirm permanent deletion", deleted: "Your account has been deleted.",
      sent: "Request sent. We will get back to you shortly.", priceLbl: "Price", noteLbl: "Message",
      pendingNote: "Create your account or sign in: your request will be saved right after.",
      e: { invalid_email: "Invalid email address.", weak_password: "The password must be at least 8 characters long.", terms_required: "Please accept the privacy policy.", email_taken: "An account already exists with this email. Please sign in.", bad_credentials: "Incorrect email or password.", too_many: "Too many attempts. Please try again in a few minutes.", consent_required: "Please tick the consent box.", login_required: "Please sign in.", invalid_request: "Please fill in the required fields.", generic: "The service is temporarily unavailable. Please try again later." },
      nlTitle: "Newsletter", nlLead: "News and tips, once or twice a month.", nlPh: "Your email", nlConsent: "I agree to receive the newsletter. <a href=\"/confidentialite/\">Privacy</a>", nlBtn: "Subscribe", nlOk: "Thank you, you are subscribed.",
      ck: "We only use necessary cookies (signing in to your account) and, with your consent, a language preference stored on your device. No advertising trackers.",
      ckAccept: "Accept all", ckRefuse: "Decline", ckCustom: "Customise", ckSave: "Save my choices", ckNeeded: "Necessary — sign-in and security (always on)", ckPrefs: "Preferences — remember the chosen language", ckMore: "Learn more",
      pTitle: "Request my pilot site", pLead: "A few details to prepare your pilot site, complimentary and with no commitment.", sector: "Line of business", city: "Town / island", website: "Current website, Instagram or Facebook", message: "What you need (bookings, shop, appointments…)", pSend: "Send my request", req: "required",
      kind: { pilote: "Pilot site", cotizacion: "Quote" },
      st: { "new": "Received", preparing: "In preparation", ready: "Pilot site ready", won: "Confirmed", closed: "Closed", quoted: "Quote sent", paid: "Paid", ordered: "Purchased", shipped: "On its way", delivered: "Delivered", cancelled: "Cancelled" },
      encNew: "Get a quote", encSaved: "Quote saved in your account. We confirm it before any payment."
    },
    es: {
      account: "Mi cuenta", close: "Cerrar", login: "Iniciar sesión", register: "Crear mi cuenta",
      email: "Correo", password: "Contraseña", pwHint: "Mínimo 8 caracteres", name: "Nombre y apellido", company: "Empresa", phone: "Teléfono",
      nlOpt: "Quiero recibir novedades por correo (baja en cualquier momento).",
      terms: "Acepto la <a href=\"/confidentialite/\" target=\"_blank\" rel=\"noopener\">política de privacidad</a>.",
      doLogin: "Entrar", doRegister: "Crear mi cuenta", toRegister: "¿Aún no tienes cuenta? Crear una", toLogin: "¿Ya tienes cuenta? Entrar",
      forgot: "¿Olvidaste tu contraseña? Escríbenos y la restablecemos.",
      loginLead: "Encuentra tus pedidos y su avance.", registerLead: "Tu espacio para seguir tus pedidos, sin pasar por la mensajería.",
      hello: "Hola", myRequests: "Mis pedidos", none: "Todavía no hay pedidos.", newReq: "Nuevo pedido",
      myInfo: "Mis datos", save: "Guardar", saved: "Guardado.", prefs: "Preferencias", nlToggle: "Recibir novedades por correo",
      logout: "Cerrar sesión", del: "Eliminar mi cuenta", delConfirm: "Confirmar la eliminación definitiva", deleted: "Tu cuenta ha sido eliminada.",
      sent: "Pedido enviado. Te respondemos muy pronto.", priceLbl: "Precio", noteLbl: "Mensaje",
      pendingNote: "Crea tu cuenta o inicia sesión: tu pedido se guarda justo después.",
      e: { invalid_email: "Correo no válido.", weak_password: "La contraseña debe tener al menos 8 caracteres.", terms_required: "Acepta la política de privacidad.", email_taken: "Ya existe una cuenta con este correo. Inicia sesión.", bad_credentials: "Correo o contraseña incorrectos.", too_many: "Demasiados intentos. Vuelve a intentarlo en unos minutos.", consent_required: "Marca la casilla de consentimiento.", login_required: "Inicia sesión.", invalid_request: "Completa los campos obligatorios.", generic: "El servicio no está disponible por el momento. Inténtalo más tarde." },
      nlTitle: "Boletín", nlLead: "Novedades y consejos, una o dos veces al mes.", nlPh: "Tu correo", nlConsent: "Acepto recibir el boletín. <a href=\"/confidentialite/\">Privacidad</a>", nlBtn: "Suscribirme", nlOk: "Gracias, tu suscripción está registrada.",
      ck: "Solo usamos las cookies necesarias (inicio de sesión en tu cuenta) y, con tu permiso, una preferencia de idioma guardada en tu dispositivo. Ningún rastreador publicitario.",
      ckAccept: "Aceptar todo", ckRefuse: "Rechazar", ckCustom: "Personalizar", ckSave: "Guardar mis opciones", ckNeeded: "Necesarias — inicio de sesión y seguridad (siempre activas)", ckPrefs: "Preferencias — recordar el idioma elegido", ckMore: "Más información",
      pTitle: "Solicitar mi sitio piloto", pLead: "Algunos datos para preparar su sitio piloto, de cortesía y sin compromiso.", sector: "Sector de actividad", city: "Ciudad / isla", website: "Sitio, Instagram o Facebook actual", message: "Lo que necesita (reservas, tienda, citas…)", pSend: "Enviar mi solicitud", req: "obligatorio",
      kind: { pilote: "Sitio piloto", cotizacion: "Cotización" },
      st: { "new": "Recibido", preparing: "En preparación", ready: "Sitio piloto listo", won: "Validado", closed: "Cerrado", quoted: "Cotizado", paid: "Pagado", ordered: "Comprado", shipped: "En camino", delivered: "Entregado", cancelled: "Cancelado" },
      encNew: "Hacer una cotización", encSaved: "Cotización guardada en tu cuenta. La confirmamos antes de cualquier pago."
    }
  };
  function lang() { var l = document.documentElement.lang; return I[l] ? l : (SITE === "encargalo" ? "es" : "fr"); }
  function t() { return I[lang()]; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function errText(code) { var e = t().e; return e[code] || e.generic; }

  function api(path, method, data) {
    var o = { method: method || "GET", credentials: "same-origin", headers: {} };
    if (data !== undefined) { o.headers["content-type"] = "application/json"; o.body = JSON.stringify(data); }
    return fetch(API + path, o).then(function (r) {
      return r.json().catch(function () { return { ok: false, error: "generic" }; });
    }).catch(function () { return { ok: false, error: "generic" }; });
  }

  /* ---------------- Consentement ---------------- */
  var CK = "ks-consent";
  function consent() { try { return JSON.parse(localStorage.getItem(CK) || "null"); } catch (e) { return null; } }
  function setConsent(prefs) {
    try {
      localStorage.setItem(CK, JSON.stringify({ v: 1, prefs: !!prefs, at: new Date().toISOString() }));
      if (!prefs) { localStorage.removeItem("kap-lang"); localStorage.removeItem("enc-lang"); }
      else localStorage.setItem(SITE === "kapicua" ? "kap-lang" : "enc-lang", lang());
    } catch (e) {}
    hideCookie();
  }
  var ckEl = null, ckCustom = false;
  function renderCookie() {
    if (!ckEl) return;
    var x = t(), c = consent();
    ckEl.innerHTML = '<p>' + esc(x.ck) + ' <a href="/confidentialite/#cookies">' + esc(x.ckMore) + '</a></p>' +
      (ckCustom ? '<div class="ks-ck-opts"><label><input type="checkbox" checked disabled> ' + esc(x.ckNeeded) + '</label><label><input type="checkbox" id="ks-ck-prefs"' + (c && c.prefs ? " checked" : "") + '> ' + esc(x.ckPrefs) + '</label></div>' : "") +
      '<div class="ks-ck-btns">' + (ckCustom ? '<button type="button" class="ks-b" data-ck="save">' + esc(x.ckSave) + '</button>' :
        '<button type="button" class="ks-b" data-ck="all">' + esc(x.ckAccept) + '</button><button type="button" class="ks-b o" data-ck="none">' + esc(x.ckRefuse) + '</button><button type="button" class="ks-link" data-ck="custom">' + esc(x.ckCustom) + '</button>') + '</div>';
  }
  function showCookie(custom) {
    ckCustom = !!custom;
    if (!ckEl) {
      ckEl = document.createElement("div"); ckEl.className = "ks-cookie"; ckEl.setAttribute("role", "region"); ckEl.setAttribute("aria-label", "Cookies");
      ckEl.addEventListener("click", function (ev) {
        var b = ev.target.closest("[data-ck]"); if (!b) return;
        var a = b.getAttribute("data-ck");
        if (a === "all") setConsent(true);
        else if (a === "none") setConsent(false);
        else if (a === "custom") { ckCustom = true; renderCookie(); }
        else if (a === "save") setConsent(document.getElementById("ks-ck-prefs").checked);
      });
      document.body.appendChild(ckEl);
    }
    renderCookie();
    requestAnimationFrame(function () { ckEl.classList.add("on"); });
  }
  function hideCookie() { if (ckEl) { ckEl.classList.remove("on"); var el = ckEl; ckEl = null; setTimeout(function () { el.remove(); }, 500); } }

  /* ---------------- Panneau compte ---------------- */
  var panel, body, opener = null, state = { user: null, requests: [], view: "login", msg: "", err: "", pending: null, armed: false };
  function build() {
    panel = document.createElement("div");
    panel.className = "ks-panel"; panel.hidden = true;
    panel.innerHTML = '<div class="ks-scrim" data-ks-close></div><aside class="ks-box" role="dialog" aria-modal="true" aria-labelledby="ks-h"><div class="ks-top"><span class="ks-brand"></span><button type="button" class="ks-x" data-ks-close><span></span></button></div><div class="ks-body"></div></aside>';
    document.body.appendChild(panel);
    body = panel.querySelector(".ks-body");
    panel.addEventListener("click", function (ev) { if (ev.target.closest("[data-ks-close]")) close(); });
    panel.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape") { ev.stopPropagation(); close(); }
      if (ev.key === "Tab") {
        var f = panel.querySelectorAll("a[href],button:not([disabled]),input:not([disabled]),textarea,select");
        if (!f.length) return;
        var a = f[0], z = f[f.length - 1];
        if (ev.shiftKey && document.activeElement === a) { ev.preventDefault(); z.focus(); }
        else if (!ev.shiftKey && document.activeElement === z) { ev.preventDefault(); a.focus(); }
      }
    });
    body.addEventListener("submit", onSubmit);
    body.addEventListener("click", onClick);
    body.addEventListener("change", onChange);
  }
  function open(view) {
    opener = document.activeElement;
    panel.hidden = false;
    document.documentElement.classList.add("ks-lock");
    requestAnimationFrame(function () { panel.classList.add("on"); });
    state.msg = ""; state.err = "";
    load().then(function () {
      if (state.user) state.view = view === "pilote" ? "pilote" : "home";
      else { state.wantPilote = view === "pilote"; state.view = view === "pilote" || state.pending ? "register" : "login"; }
      render(true);
    });
  }
  function close() {
    panel.classList.remove("on");
    document.documentElement.classList.remove("ks-lock");
    setTimeout(function () { panel.hidden = true; }, 450);
    state.armed = false;
    if (opener && opener.focus) opener.focus();
  }
  function load() {
    return api("me?site=" + SITE).then(function (r) {
      state.user = r && r.ok ? r.user : null;
      state.requests = r && r.ok && r.requests ? r.requests : [];
      syncHeader();
    });
  }
  function syncHeader() {
    document.querySelectorAll("[data-ks-open]").forEach(function (b) { b.classList.toggle("ks-in", !!state.user); });
  }
  function fdate(s) {
    try { return new Date(s).toLocaleDateString({ fr: "fr-FR", en: "en-GB", es: "es-DO" }[lang()], { day: "numeric", month: "short", year: "numeric" }); } catch (e) { return ""; }
  }
  function rd(n) { return "RD$" + Math.round(n || 0).toLocaleString("en-US"); }
  function field(id, label, type, val, req, extra) {
    return '<label class="ks-f"><span>' + esc(label) + (req ? ' <em>' + esc(t().req) + '</em>' : "") + '</span><input id="' + id + '" name="' + id + '" type="' + (type || "text") + '" value="' + esc(val || "") + '"' + (req ? " required" : "") + (extra || "") + '></label>';
  }
  function notes() {
    return (state.err ? '<p class="ks-err" role="alert">' + esc(state.err) + '</p>' : "") + (state.msg ? '<p class="ks-ok" role="status">' + esc(state.msg) + '</p>' : "");
  }
  function summary(r) {
    var x = t(), d = r.data || {};
    if (r.kind === "pilote") return '<b>' + esc(d.company) + '</b>' + (d.sector || d.city ? '<span>' + esc([d.sector, d.city].filter(Boolean).join(" · ")) + '</span>' : "");
    var host = ""; try { host = d.link ? new URL(d.link).hostname.replace(/^www\./, "") : ""; } catch (e) {}
    return '<b>' + esc(rd(d.total)) + '</b><span>' + esc([host, d.qty ? "× " + d.qty : "", d.lb ? d.lb + " lb" : ""].filter(Boolean).join(" · ")) + '</span>';
  }
  function render(focus) {
    var x = t(), v = state.view, h = "";
    panel.querySelector(".ks-brand").textContent = SITE === "kapicua" ? "Kapicua" : "Encárgalo";
    panel.querySelector(".ks-x").setAttribute("aria-label", x.close);
    if (v === "login" || v === "register") {
      var reg = v === "register";
      h = '<p class="ks-caps">' + esc(x.account) + '</p><h2 id="ks-h">' + esc(reg ? x.register : x.login) + '</h2><p class="ks-lead">' + esc(reg ? x.registerLead : x.loginLead) + '</p>' +
        (state.pending ? '<p class="ks-note">' + esc(x.pendingNote) + '</p>' : "") + notes() +
        '<form class="ks-form" data-f="' + v + '" novalidate>' +
        (reg ? field("ks-name", x.name, "text", "", false, ' autocomplete="name" maxlength="100"') + (SITE === "kapicua" ? field("ks-company", x.company, "text", "", false, ' autocomplete="organization" maxlength="120"') : "") : "") +
        field("ks-email", x.email, "email", "", true, ' autocomplete="email" maxlength="254"') +
        field("ks-pw", x.password + (reg ? " — " + x.pwHint : ""), "password", "", true, ' autocomplete="' + (reg ? "new-password" : "current-password") + '" minlength="' + (reg ? 8 : 1) + '" maxlength="200"') +
        (reg ? field("ks-phone", x.phone, "tel", "", false, ' autocomplete="tel" maxlength="40"') +
          '<label class="ks-c"><input type="checkbox" id="ks-nl"> <span>' + esc(x.nlOpt) + '</span></label><label class="ks-c"><input type="checkbox" id="ks-terms" required> <span>' + x.terms + '</span></label>' : "") +
        '<button class="ks-b ks-full" type="submit">' + esc(reg ? x.doRegister : x.doLogin) + '</button></form>' +
        '<button type="button" class="ks-link" data-go="' + (reg ? "login" : "register") + '">' + esc(reg ? x.toLogin : x.toRegister) + '</button>' +
        (reg ? "" : '<p class="ks-small">' + esc(x.forgot) + '</p>');
    } else if (v === "pilote") {
      h = '<p class="ks-caps">' + esc(x.account) + '</p><h2 id="ks-h">' + esc(x.pTitle) + '</h2><p class="ks-lead">' + esc(x.pLead) + '</p>' + notes() +
        '<form class="ks-form" data-f="pilote" novalidate>' + field("ks-pc", x.company, "text", state.user && state.user.company, true, ' maxlength="120"') + field("ks-ps", x.sector, "text", "", false, ' maxlength="60"') + field("ks-pv", x.city, "text", "", false, ' maxlength="80"') + field("ks-pw2", x.website, "text", "", false, ' maxlength="300"') +
        '<label class="ks-f"><span>' + esc(x.message) + '</span><textarea id="ks-pm" rows="4" maxlength="1500"></textarea></label><button class="ks-b ks-full" type="submit">' + esc(x.pSend) + '</button></form>' +
        '<button type="button" class="ks-link" data-go="home">← ' + esc(x.myRequests) + '</button>';
    } else {
      var u = state.user || {};
      h = '<p class="ks-caps">' + esc(x.account) + '</p><h2 id="ks-h">' + esc(x.hello) + (u.name ? ", " + esc(u.name.split(" ")[0]) : "") + '.</h2>' + notes() +
        '<section class="ks-sec"><div class="ks-row"><h3>' + esc(x.myRequests) + '</h3><button type="button" class="ks-b sm" data-go="' + (SITE === "kapicua" ? "pilote" : "cotiza") + '">' + esc(SITE === "kapicua" ? x.newReq : x.encNew) + '</button></div>' +
        (state.requests.length ? '<ul class="ks-reqs">' + state.requests.map(function (r) {
          return '<li><div class="ks-rq"><span class="ks-caps">' + esc((x.kind[r.kind] || r.kind) + " · " + fdate(r.created_at)) + '</span>' + summary(r) + '</div><span class="ks-st s-' + esc(r.status) + '">' + esc(x.st[r.status] || r.status) + '</span>' +
            (r.price || r.note ? '<p class="ks-adm">' + (r.price ? '<b>' + esc(x.priceLbl) + ' :</b> ' + esc(r.price) + (r.note ? "<br>" : "") : "") + (r.note ? esc(r.note) : "") + '</p>' : "") + '</li>';
        }).join("") + '</ul>' : '<p class="ks-small">' + esc(x.none) + '</p>') + '</section>' +
        '<section class="ks-sec"><h3>' + esc(x.myInfo) + '</h3><form class="ks-form" data-f="profile" novalidate>' + field("ks-name", x.name, "text", u.name, false, ' autocomplete="name" maxlength="100"') + (SITE === "kapicua" ? field("ks-company", x.company, "text", u.company, false, ' autocomplete="organization" maxlength="120"') : "") + field("ks-phone", x.phone, "tel", u.phone, false, ' autocomplete="tel" maxlength="40"') +
        '<p class="ks-small">' + esc(x.email) + ' : ' + esc(u.email) + '</p><button class="ks-b o" type="submit">' + esc(x.save) + '</button></form></section>' +
        '<section class="ks-sec"><h3>' + esc(x.prefs) + '</h3><label class="ks-c"><input type="checkbox" id="ks-nlt"' + (u.newsletter ? " checked" : "") + '> <span>' + esc(x.nlToggle) + '</span></label></section>' +
        '<section class="ks-sec ks-end"><button type="button" class="ks-link" data-act="logout">' + esc(x.logout) + '</button><button type="button" class="ks-link danger" data-act="delete">' + esc(state.armed ? x.delConfirm : x.del) + '</button></section>';
    }
    /* Conserver la saisie quand on réaffiche la même vue (message d'erreur, changement de langue). */
    var keep = {};
    if (body.getAttribute("data-v") === v) body.querySelectorAll("input[id],textarea[id]").forEach(function (el) { keep[el.id] = el.type === "checkbox" ? el.checked : el.value; });
    body.innerHTML = h;
    body.setAttribute("data-v", v);
    Object.keys(keep).forEach(function (id) { var el = document.getElementById(id); if (!el || id === "ks-nlt") return; if (el.type === "checkbox") el.checked = keep[id]; else el.value = keep[id]; });
    if (focus) { var f = v === "home" ? body.querySelector("h2") : body.querySelector("input:not([type=checkbox]),h2"); body.scrollTop = 0; if (f) { if (f.tagName === "H2") f.setAttribute("tabindex", "-1"); f.focus({ preventScroll: true }); } }
  }
  function val(id) { var e = document.getElementById(id); return e ? e.value.trim() : ""; }
  function busy(form, on) { var b = form.querySelector("button[type=submit]"); if (b) { b.disabled = on; b.classList.toggle("busy", on); } }
  function afterAuth() {
    return load().then(function () {
      if (state.pending) {
        var p = state.pending; state.pending = null;
        return api("request", "POST", { site: SITE, kind: p.kind, data: p.data }).then(function (r) {
          if (r.ok) { state.msg = SITE === "kapicua" ? t().sent : t().encSaved; return load(); }
          state.err = errText(r.error);
        });
      }
    }).then(function () { state.view = state.wantPilote ? "pilote" : "home"; state.wantPilote = false; render(true); });
  }
  function onSubmit(ev) {
    ev.preventDefault();
    var form = ev.target, f = form.getAttribute("data-f"), x = t();
    state.err = ""; state.msg = "";
    var done = function (r) { busy(form, false); if (!r.ok) { state.err = errText(r.error); render(); } return r; };
    busy(form, true);
    if (f === "login") {
      api("login", "POST", { site: SITE, email: val("ks-email"), password: document.getElementById("ks-pw").value }).then(done).then(function (r) { if (r.ok) afterAuth(); });
    } else if (f === "register") {
      if (!document.getElementById("ks-terms").checked) { busy(form, false); state.err = x.e.terms_required; return render(); }
      var pw = document.getElementById("ks-pw").value;
      if (pw.length < 8) { busy(form, false); state.err = x.e.weak_password; return render(); }
      api("register", "POST", { site: SITE, email: val("ks-email"), password: pw, name: val("ks-name"), company: val("ks-company"), phone: val("ks-phone"), lang: lang(), newsletter: document.getElementById("ks-nl").checked, terms: true })
        .then(done).then(function (r) { if (r.ok) afterAuth(); });
    } else if (f === "pilote") {
      var d = { company: val("ks-pc"), sector: val("ks-ps"), city: val("ks-pv"), website: val("ks-pw2"), message: val("ks-pm") };
      if (!d.company) { busy(form, false); state.err = x.e.invalid_request; return render(); }
      api("request", "POST", { site: SITE, kind: "pilote", data: d }).then(done).then(function (r) { if (r.ok) { state.msg = x.sent; load().then(function () { state.view = "home"; render(true); }); } });
    } else if (f === "profile") {
      api("me?site=" + SITE, "PATCH", { name: val("ks-name"), company: SITE === "kapicua" ? val("ks-company") : undefined, phone: val("ks-phone"), lang: lang() }).then(done).then(function (r) { if (r.ok) { state.msg = x.saved; load().then(function () { render(); }); } });
    }
  }
  function onClick(ev) {
    var go = ev.target.closest("[data-go]"), act = ev.target.closest("[data-act]");
    if (go) {
      var v = go.getAttribute("data-go");
      state.err = ""; state.msg = ""; state.armed = false;
      if (v === "cotiza") { close(); var c = document.getElementById("cotiza"); if (c) c.scrollIntoView({ behavior: "smooth" }); return; }
      state.view = v; render(true);
    }
    if (act) {
      var a = act.getAttribute("data-act");
      if (a === "logout") api("logout", "POST", { site: SITE }).then(function () { state.user = null; state.requests = []; syncHeader(); state.view = "login"; state.msg = ""; render(true); });
      if (a === "delete") {
        if (!state.armed) { state.armed = true; return render(); }
        api("me?site=" + SITE, "DELETE").then(function (r) { state.armed = false; if (!r.ok) { state.err = errText(r.error); return render(); } state.user = null; state.requests = []; syncHeader(); state.view = "login"; state.msg = t().deleted; render(true); });
      }
    }
  }
  function onChange(ev) {
    if (ev.target.id === "ks-nlt") {
      var on = ev.target.checked;
      api("me?site=" + SITE, "PATCH", { newsletter: on }).then(function (r) { if (r.ok) { state.user.newsletter = on; state.msg = t().saved; state.err = ""; } else { state.err = errText(r.error); } render(); });
    }
  }

  /* ---------------- Newsletter (pied de page) ---------------- */
  function renderNewsletters() {
    document.querySelectorAll("[data-ks-newsletter]").forEach(function (box) {
      var x = t(), done = box.getAttribute("data-done") === "1";
      box.innerHTML = '<p class="ks-caps ks-nl-t">' + esc(x.nlTitle) + '</p><p class="ks-nl-l">' + esc(x.nlLead) + '</p>' +
        (done ? '<p class="ks-ok" role="status">' + esc(x.nlOk) + '</p>' :
          '<form class="ks-nl" novalidate><div class="ks-nl-row"><input type="email" name="email" required maxlength="254" autocomplete="email" placeholder="' + esc(x.nlPh) + '" aria-label="' + esc(x.nlPh) + '"><button type="submit">' + esc(x.nlBtn) + '</button></div><label class="ks-c"><input type="checkbox" name="consent"> <span>' + x.nlConsent + '</span></label><p class="ks-err" role="alert" hidden></p></form>');
    });
  }
  document.addEventListener("submit", function (ev) {
    var form = ev.target;
    if (!form.classList || !form.classList.contains("ks-nl")) return;
    ev.preventDefault();
    var box = form.closest("[data-ks-newsletter]"), errEl = form.querySelector(".ks-err"), x = t();
    var show = function (m) { errEl.textContent = m; errEl.hidden = false; };
    if (!form.consent.checked) return show(x.e.consent_required);
    var b = form.querySelector("button"); b.disabled = true;
    api("newsletter", "POST", { site: SITE, email: form.email.value.trim(), lang: lang(), consent: true }).then(function (r) {
      b.disabled = false;
      if (r.ok) { box.setAttribute("data-done", "1"); renderNewsletters(); } else show(errText(r.error));
    });
  });

  /* ---------------- API publique pour les pages ---------------- */
  window.KS = {
    open: function (v) { open(v); },
    save: function (kind, data) {
      return load().then(function () {
        if (!state.user) { state.pending = { kind: kind, data: data }; return open(); }
        return api("request", "POST", { site: SITE, kind: kind, data: data }).then(function (r) {
          state.msg = r.ok ? t().encSaved : ""; state.err = r.ok ? "" : errText(r.error);
          opener = document.activeElement; panel.hidden = false; document.documentElement.classList.add("ks-lock");
          requestAnimationFrame(function () { panel.classList.add("on"); });
          return load().then(function () { state.view = "home"; render(true); });
        });
      });
    },
    cookies: function () { showCookie(true); }
  };

  /* ---------------- Démarrage ---------------- */
  build();
  document.addEventListener("click", function (ev) {
    var o = ev.target.closest("[data-ks-open]");
    if (o) { ev.preventDefault(); if (o.closest(".overlay")) { var c = document.querySelector("[data-menu-close]"); if (c) c.click(); } open(o.getAttribute("data-ks-open")); }
    var c2 = ev.target.closest("[data-ks-cookies]");
    if (c2) { ev.preventDefault(); showCookie(true); }
  });
  renderNewsletters();
  if (!consent()) setTimeout(function () { showCookie(false); }, 900);
  new MutationObserver(function () { renderNewsletters(); renderCookie(); if (!panel.hidden) render(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  load();
})();
