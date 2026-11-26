/* Dossier de création de site — /offre/dossier/ */
(function () {
  "use strict";
  var LANGS = ["fr", "en", "es"];
  var M = {
    fr: { saving: "Enregistrement…", saved: "Enregistré à ", offline: "Non enregistré : vérifiez votre connexion.", req: "Ce champ est obligatoire.", contact: "Indiquez au moins un téléphone, un WhatsApp ou un e-mail.", droits: "Merci de confirmer que vous pouvez utiliser ces images.",
      fmt: "Format non pris en charge. Utilisez une photo JPG ou PNG.", big: "Image trop lourde, même après compression.", maxp: "12 photos maximum.", upfail: "L’envoi de l’image a échoué. Réessayez.", del: "Supprimer",
      sent: "Dossier envoyé. Merci ! Nous préparons votre site pilote et revenons vers vous très vite.", sentOn: "Dossier envoyé le ", changed: "Vous avez modifié votre dossier depuis l’envoi : pensez à renvoyer les modifications.", draft: "Brouillon enregistré. Envoyez-le quand il est prêt.",
      resend: "Envoyer les modifications", missing: "À compléter", edit: "compléter", empty: "—", photos: "Photos", logo: "Logo", none: "Aucune", yes: "Oui", no: "Non", fail: "L’envoi a échoué. Réessayez dans un instant.", next: "Continuer", last: "Voir le récapitulatif" },
    en: { saving: "Saving…", saved: "Saved at ", offline: "Not saved: check your connection.", req: "This field is required.", contact: "Give at least a phone number, a WhatsApp number or an email.", droits: "Please confirm you may use these images.",
      fmt: "Unsupported format. Please use a JPG or PNG photo.", big: "Image too large, even after compression.", maxp: "12 photos maximum.", upfail: "The image upload failed. Please try again.", del: "Remove",
      sent: "File sent. Thank you! We are preparing your pilot site and will be in touch very soon.", sentOn: "File sent on ", changed: "You have edited your file since sending it: remember to send the changes.", draft: "Draft saved. Send it when it is ready.",
      resend: "Send the changes", missing: "To complete", edit: "complete", empty: "—", photos: "Photos", logo: "Logo", none: "None", yes: "Yes", no: "No", fail: "Sending failed. Please try again in a moment.", next: "Continue", last: "See the summary" },
    es: { saving: "Guardando…", saved: "Guardado a las ", offline: "No guardado: revise su conexión.", req: "Este campo es obligatorio.", contact: "Indique al menos un teléfono, un WhatsApp o un correo.", droits: "Confirme que puede usar estas imágenes.",
      fmt: "Formato no compatible. Use una foto JPG o PNG.", big: "Imagen demasiado pesada, incluso comprimida.", maxp: "Máximo 12 fotos.", upfail: "No se pudo enviar la imagen. Inténtelo de nuevo.", del: "Eliminar",
      sent: "Expediente enviado. ¡Gracias! Preparamos su sitio piloto y le contactamos muy pronto.", sentOn: "Expediente enviado el ", changed: "Ha modificado su expediente desde el envío: recuerde enviar los cambios.", draft: "Borrador guardado. Envíelo cuando esté listo.",
      resend: "Enviar los cambios", missing: "Por completar", edit: "completar", empty: "—", photos: "Fotos", logo: "Logo", none: "Ninguna", yes: "Sí", no: "No", fail: "No se pudo enviar. Inténtelo de nuevo en un momento.", next: "Continuar", last: "Ver el resumen" }
  };
  var L = "fr";
  function m() { return M[L]; }
  var $ = function (id) { return document.getElementById(id); };
  var form = $("brief"), steps = [].slice.call(document.querySelectorAll(".step")), navBtns = [].slice.call(document.querySelectorAll(".steps button"));
  var cur = 0, state = { logo: "", photos: [] }, meta = { submitted_at: null, updated_at: null }, ready = false, dirty = false, timer = null, saving = null;

  /* ---------- Langue ---------- */
  function setLang(l) {
    L = LANGS.indexOf(l) >= 0 ? l : "fr";
    document.documentElement.lang = L;
    document.querySelectorAll(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.l === L); });
    try { if ((JSON.parse(localStorage.getItem("ks-consent") || "{}")).prefs === true) localStorage.setItem("kap-lang", L); } catch (e) {}
    if (ready) { show(cur, true); status(); }
  }
  document.querySelectorAll(".lang button").forEach(function (b) { b.addEventListener("click", function () { setLang(b.dataset.l); }); });
  var start = "fr";
  try { var n = (navigator.language || "fr").slice(0, 2).toLowerCase(); start = localStorage.getItem("kap-lang") || (LANGS.indexOf(n) >= 0 ? n : "fr"); } catch (e) {}
  setLang(start);

  function api(p, method, data, keep) {
    var o = { method: method || "GET", credentials: "same-origin", headers: {}, keepalive: !!keep };
    if (data !== undefined) { o.headers["content-type"] = "application/json"; o.body = JSON.stringify(data); }
    return fetch("/compte/api/" + p, o).then(function (r) { return r.json().then(function (j) { j._status = r.status; return j; }); }).catch(function () { return { ok: false, error: "network" }; });
  }
  function txt(el) { if (!el) return ""; var s = el.querySelector('[lang="' + L + '"]'); return (s || el).textContent.trim(); }

  /* ---------- Lecture / écriture du formulaire ---------- */
  function collect() {
    var d = {};
    form.querySelectorAll("input[id^=b-]:not([type=checkbox]):not([type=radio]),textarea[id^=b-]").forEach(function (el) { d[el.name] = el.value.trim(); });
    ["fonctions", "langues"].forEach(function (k) { d[k] = [].slice.call(form.querySelectorAll('input[name="' + k + '"]:checked')).map(function (x) { return x.value; }); });
    ["ambiance", "domaine_existant"].forEach(function (k) { var x = form.querySelector('input[name="' + k + '"]:checked'); d[k] = x ? x.value : ""; });
    d.droits = $("b-droits").checked ? "oui" : "";
    d.logo = state.logo; d.photos = state.photos.slice();
    return d;
  }
  function fill(b) {
    form.querySelectorAll("input[id^=b-]:not([type=checkbox]):not([type=radio]),textarea[id^=b-]").forEach(function (el) { el.value = b[el.name] || ""; });
    ["fonctions", "langues"].forEach(function (k) { form.querySelectorAll('input[name="' + k + '"]').forEach(function (x) { x.checked = (b[k] || []).indexOf(x.value) >= 0; }); });
    ["ambiance", "domaine_existant"].forEach(function (k) { form.querySelectorAll('input[name="' + k + '"]').forEach(function (x) { x.checked = b[k] === x.value; }); });
    $("b-droits").checked = b.droits === "oui";
    state.logo = b.logo || ""; state.photos = (b.photos || []).slice();
  }

  /* ---------- Enregistrement automatique ---------- */
  function hhmm(d) { try { return new Date(d).toLocaleTimeString({ fr: "fr-FR", en: "en-GB", es: "es-DO" }[L], { hour: "2-digit", minute: "2-digit" }); } catch (e) { return ""; } }
  function saveNow(keep) {
    if (!ready) return Promise.resolve();
    clearTimeout(timer);
    if (!dirty) return saving || Promise.resolve();
    dirty = false;
    $("saveState").textContent = m().saving;
    saving = api("brief", "PUT", { data: collect() }, keep).then(function (r) {
      saving = null;
      if (r.ok) { meta.updated_at = r.saved_at; $("saveState").textContent = m().saved + hhmm(r.saved_at); status(); }
      else { dirty = true; $("saveState").textContent = r.error === "login_required" ? "" : m().offline; if (r.error === "login_required") location.reload(); }
    });
    return saving;
  }
  function touch() { if (!ready) return; dirty = true; clearTimeout(timer); timer = setTimeout(saveNow, 1200); }
  form.addEventListener("input", function (e) { var f = e.target.closest(".bf,.cbx"); if (f) f.classList.remove("bad"); touch(); });
  form.addEventListener("change", touch);
  document.addEventListener("visibilitychange", function () { if (document.visibilityState === "hidden") saveNow(true); });
  window.addEventListener("pagehide", function () { saveNow(true); });

  /* ---------- Étapes ---------- */
  function err(el, msg) {
    var box = el.closest(".bf,.cbx"); if (!box) return;
    box.classList.add("bad");
    var p = box.querySelector(".ferr");
    if (!p) { p = document.createElement("span"); p.className = "fh ferr"; p.style.color = "#8a2a1e"; p.setAttribute("role", "alert"); box.appendChild(p); }
    p.textContent = msg;
  }
  function clearErr(stepEl) { stepEl.querySelectorAll(".bad").forEach(function (b) { b.classList.remove("bad"); }); stepEl.querySelectorAll(".ferr").forEach(function (p) { p.remove(); }); }
  function check(i) {
    var s = steps[i], first = null, d = collect();
    clearErr(s);
    s.querySelectorAll("[required]").forEach(function (el) { if (!el.value.trim()) { err(el, m().req); first = first || el; } });
    if (i === 1 && !d.telephone && !d.whatsapp && !d.email_pub) { err($("b-telephone"), m().contact); first = first || $("b-telephone"); }
    if (i === 1 && d.email_pub && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(d.email_pub)) { err($("b-email_pub"), "E-mail ?"); first = first || $("b-email_pub"); }
    if (i === 4 && (d.logo || d.photos.length) && d.droits !== "oui") { err($("b-droits"), m().droits); first = first || $("b-droits"); }
    if (first) { first.focus({ preventScroll: true }); first.scrollIntoView({ behavior: "smooth", block: "center" }); return false; }
    return true;
  }
  function done(i) {
    var d = collect();
    if (i === 0) return !!(d.nom && d.activite && d.description);
    if (i === 1) return !!(d.telephone || d.whatsapp || d.email_pub);
    if (i === 2) return !!(d.offre || d.fonctions.length);
    if (i === 3) return !!(d.ambiance || d.couleurs);
    if (i === 4) return !!(d.logo || d.photos.length || d.lien_photos);
    if (i === 5) return !!(d.domaine_existant || d.domaine || d.raison_sociale);
    return false;
  }
  function show(i, noScroll) {
    cur = Math.max(0, Math.min(steps.length - 1, i));
    steps.forEach(function (s, k) { s.classList.toggle("on", k === cur); });
    navBtns.forEach(function (b, k) { if (k === cur) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current"); b.classList.toggle("done", k < steps.length - 1 && done(k)); });
    $("prev").style.visibility = cur === 0 ? "hidden" : "visible";
    $("next").hidden = cur === steps.length - 1;
    $("next").textContent = cur === steps.length - 2 ? m().last : m().next;
    if (cur === steps.length - 1) recap();
    status();
    var a = navBtns[cur]; if (a && a.scrollIntoView && window.innerWidth < 900) a.scrollIntoView({ block: "nearest", inline: "center" });
    if (!noScroll) window.scrollTo({ top: document.querySelector(".app").offsetTop - 90, behavior: "smooth" });
  }
  navBtns.forEach(function (b) { b.addEventListener("click", function () { saveNow(); show(+b.dataset.go); }); });
  $("prev").addEventListener("click", function () { saveNow(); show(cur - 1); });
  $("next").addEventListener("click", function () { if (!check(cur)) return; saveNow(); show(cur + 1); });

  /* ---------- Récapitulatif ---------- */
  var REQ = { nom: 0, activite: 0, description: 0 };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function recap() {
    var d = collect(), x = m(), rows = [];
    steps.slice(0, -1).forEach(function (s, i) {
      rows.push('<div><dt style="color:#111">' + esc(txt(s.querySelector("h2"))) + "</dt><dd></dd></div>");
      s.querySelectorAll(".bf").forEach(function (lab) {
        var el = lab.querySelector("input,textarea"); var v = d[el.name];
        var miss = !v && (REQ[el.name] === i || (el.name === "telephone" && !d.whatsapp && !d.email_pub));
        if (!v && !miss) return;
        rows.push("<div><dt>" + esc(txt(lab.querySelector(".fl")).replace(/\s*(obligatoire|required|obligatorio)$/i, "")) + "</dt><dd" + (miss ? ' class="miss"' : "") + ">" + (miss ? esc(el.name === "telephone" ? x.contact : x.missing) + ' — <button type="button" data-go="' + i + '">' + esc(x.edit) + "</button>" : esc(v)) + "</dd></div>");
      });
      s.querySelectorAll(".chk,.rad").forEach(function (g) {
        var on = [].slice.call(g.querySelectorAll("input:checked")).map(function (c) { return txt(c.nextElementSibling); });
        if (!on.length) return;
        var lbl = g.previousElementSibling && g.previousElementSibling.classList.contains("sub") ? txt(g.previousElementSibling) : "";
        rows.push("<div><dt>" + esc(lbl) + "</dt><dd>" + esc(on.join(", ")) + "</dd></div>");
      });
      if (i === 4) {
        rows.push("<div><dt>" + esc(x.logo) + "</dt><dd>" + (d.logo ? "✓" : esc(x.none)) + "</dd></div><div><dt>" + esc(x.photos) + "</dt><dd>" + (d.photos.length || esc(x.none)) + "</dd></div>");
        if ((d.logo || d.photos.length) && d.droits !== "oui") rows.push('<div><dt></dt><dd class="miss">' + esc(x.droits) + ' — <button type="button" data-go="4">' + esc(x.edit) + "</button></dd></div>");
      }
    });
    $("recap").innerHTML = '<dl class="recap">' + rows.join("") + "</dl>";
    if (meta.submitted_at) $("send").textContent = x.resend; else $("send").innerHTML = $("send").getAttribute("data-label");
  }
  $("send").setAttribute("data-label", $("send").innerHTML);
  $("recap").addEventListener("click", function (e) { var b = e.target.closest("[data-go]"); if (b) show(+b.dataset.go); });
  $("send").addEventListener("click", function () {
    var b = $("send"); b.disabled = true; $("sendErr").textContent = ""; $("sendOk").textContent = "";
    clearTimeout(timer); dirty = false;
    api("brief/submit", "POST", { data: collect() }).then(function (r) {
      b.disabled = false;
      if (r.ok) { meta.submitted_at = r.submitted_at; meta.updated_at = r.saved_at; $("sendOk").textContent = m().sent; status(); recap(); $("saveState").textContent = m().saved + hhmm(r.saved_at); return; }
      if (r.error === "incomplete") {
        var miss = r.missing || [], go = miss.indexOf("nom") >= 0 || miss.indexOf("activite") >= 0 || miss.indexOf("description") >= 0 ? 0 : miss.indexOf("contact") >= 0 ? 1 : 4;
        show(go); check(go); return;
      }
      $("sendErr").textContent = m().fail;
    });
  });
  function status() {
    var s = $("status"), x = m();
    if (!meta.submitted_at) { s.hidden = !meta.updated_at || cur !== steps.length - 1; s.textContent = x.draft; return; }
    s.hidden = false;
    var d = new Date(meta.submitted_at).toLocaleDateString({ fr: "fr-FR", en: "en-GB", es: "es-DO" }[L], { day: "numeric", month: "long", year: "numeric" });
    s.textContent = x.sentOn + d + "." + (meta.updated_at && meta.updated_at > meta.submitted_at ? " " + x.changed : "");
  }

  /* ---------- Photos et logo ---------- */
  function readAsData(file) { return new Promise(function (res, rej) { var r = new FileReader(); r.onload = function () { res(r.result); }; r.onerror = rej; r.readAsDataURL(file); }); }
  function shrink(file, isLogo) {
    return readAsData(file).then(function (src) {
      return new Promise(function (res, rej) {
        var img = new Image();
        img.onload = function () {
          var keepPng = isLogo && /png|webp/.test(file.type);
          var max = isLogo ? 1200 : 1800, w = img.naturalWidth, h = img.naturalHeight, k = Math.min(1, max / Math.max(w, h));
          var tries = [0.84, 0.74, 0.62], out = null;
          for (var t = 0; t < 3; t++) {
            var c = document.createElement("canvas"), kk = k * (t === 2 ? 0.75 : 1);
            c.width = Math.max(1, Math.round(w * kk)); c.height = Math.max(1, Math.round(h * kk));
            var g = c.getContext("2d");
            if (!keepPng) { g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height); }
            g.drawImage(img, 0, 0, c.width, c.height);
            out = keepPng ? c.toDataURL("image/png") : c.toDataURL("image/jpeg", tries[t]);
            if (out.length < 1300000) break;
            if (keepPng) { keepPng = false; t = -1; }
          }
          if (!out || out.length >= 1300000) rej("big"); else res(out);
        };
        img.onerror = function () { rej("fmt"); };
        img.src = src;
      });
    });
  }
  function thumb(id, isLogo, busy) {
    var d = document.createElement("div");
    d.className = "th" + (isLogo ? " logo" : "") + (busy ? " busy" : "");
    if (id) { d.dataset.id = id; d.innerHTML = '<img alt="" src="/compte/api/file/' + id + '"><button type="button" aria-label="' + m().del + '">×</button>'; }
    return d;
  }
  function renderFiles() {
    var lb = $("logoBox"), pb = $("photoBox");
    lb.textContent = ""; pb.textContent = "";
    if (state.logo) lb.appendChild(thumb(state.logo, true));
    state.photos.forEach(function (id) { pb.appendChild(thumb(id, false)); });
    $("phCount").textContent = state.photos.length ? "(" + state.photos.length + " / 12)" : "";
  }
  function upErr(msg) { $("upErr").textContent = msg || ""; }
  function upload(files, isLogo) {
    upErr("");
    var list = [].slice.call(files);
    if (!isLogo && state.photos.length + list.length > 12) { upErr(m().maxp); list = list.slice(0, Math.max(0, 12 - state.photos.length)); }
    var box = isLogo ? $("logoBox") : $("photoBox");
    return list.reduce(function (p, f) {
      return p.then(function () {
        var ph = thumb(null, isLogo, true); if (isLogo) box.textContent = ""; box.appendChild(ph);
        return shrink(f, isLogo).then(function (data) {
          return api("file", "POST", { kind: isLogo ? "logo" : "photo", name: f.name, data: data });
        }).then(function (r) {
          ph.remove();
          if (!r.ok) { upErr(r.error === "file_too_big" ? m().big : r.error === "too_many_files" ? m().maxp : m().upfail); return; }
          if (isLogo) { var old = state.logo; state.logo = r.id; if (old) api("file/" + old, "DELETE"); }
          else state.photos.push(r.id);
          renderFiles(); dirty = true; saveNow();
        }, function (e) { ph.remove(); upErr(e === "big" ? m().big : m().fmt); });
      });
    }, Promise.resolve()).then(function () { renderFiles(); });
  }
  $("logoIn").addEventListener("change", function (e) { if (e.target.files.length) upload([e.target.files[0]], true); e.target.value = ""; });
  $("photoIn").addEventListener("change", function (e) { if (e.target.files.length) upload(e.target.files, false); e.target.value = ""; });
  document.querySelector('[data-up="logo"]').parentNode.addEventListener("click", function (e) {
    var b = e.target.closest(".th button"); if (!b) return;
    var t = b.closest(".th"), id = t.dataset.id;
    if (state.logo === id) state.logo = ""; else state.photos = state.photos.filter(function (x) { return x !== id; });
    api("file/" + id, "DELETE"); renderFiles(); dirty = true; saveNow();
  });

  /* ---------- Connexion ---------- */
  function boot(user) {
    document.body.classList.remove("wait");
    if (!user) { ready = false; document.body.classList.remove("in"); document.body.classList.add("out"); return; }
    document.body.classList.remove("out"); document.body.classList.add("in");
    if (ready) return;
    api("brief").then(function (r) {
      if (!r.ok) return;
      var b = r.brief || { langues: L === "fr" ? ["fr"] : ["fr", L], telephone: user.phone || "", nom: user.company || "", email_pub: "" };
      fill(b); meta.submitted_at = r.submitted_at; meta.updated_at = r.updated_at;
      renderFiles(); ready = true; status(); show(0, true);
    });
  }
  document.addEventListener("ks:user", function (e) { boot(e.detail); });
})();
