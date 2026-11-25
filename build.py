#!/usr/bin/env python3
"""Génère les sites pilotes SBH (Kapicua) — un dossier par commerce, HTML autonome (polices intégrées)."""
import base64, json, os, html

ICI = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.join(ICI, "fonts")


def font_face(family, fichier, weight, style="normal"):
    data = base64.b64encode(open(os.path.join(FONTS, fichier), "rb").read()).decode()
    return (f"@font-face{{font-family:'{family}';src:url(data:font/woff2;base64,{data}) format('woff2');"
            f"font-weight:{weight};font-style:{style};font-display:swap}}")


def t(fr, en):
    """Texte bilingue."""
    return f'<span lang="fr">{fr}</span><span lang="en">{en}</span>'


BASE_CSS = """
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
html[data-lang=fr] [lang=en]{display:none!important}
html[data-lang=en] [lang=fr]{display:none!important}
body{font-family:var(--body);color:var(--ink);background:var(--bg);line-height:1.6;font-size:17px}
img,svg{display:block;max-width:100%}
a{color:inherit}
.wrap{max-width:1120px;margin:0 auto;padding:0 22px}
.pilote{background:var(--ink);color:var(--bg);font:500 12px/1 var(--body);letter-spacing:.08em;text-transform:uppercase;text-align:center;padding:7px 10px}
header.nav{position:sticky;top:0;z-index:20;background:var(--navbg);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
header.nav .wrap{display:flex;align-items:center;justify-content:space-between;height:64px;gap:14px}
.logo{font-family:var(--display);font-size:24px;text-decoration:none;color:var(--ink);white-space:nowrap}
.navlinks{display:flex;gap:22px;align-items:center}
.navlinks a{text-decoration:none;font-size:15px;opacity:.8}
.navlinks a:hover{opacity:1}
.lang{border:1px solid var(--line);background:transparent;color:var(--ink);border-radius:99px;padding:6px 12px;font:600 13px var(--body);cursor:pointer}
.btn{display:inline-flex;align-items:center;gap:8px;padding:14px 22px;border-radius:var(--radius);font:600 16px var(--body);text-decoration:none;border:2px solid transparent;transition:transform .15s}
.btn:hover{transform:translateY(-2px)}
.btn.main{background:var(--accent);color:var(--onaccent)}
.btn.ghost{border-color:currentColor}
.btn svg{width:18px;height:18px}
section{padding:84px 0}
h1,h2,h3{font-family:var(--display);font-weight:var(--dw,400);line-height:1.1}
h2{font-size:clamp(32px,5vw,48px);margin-bottom:18px}
.kicker{font:600 13px var(--body);letter-spacing:.14em;text-transform:uppercase;color:var(--accent2);margin-bottom:12px}
.lead{font-size:19px;max-width:640px;opacity:.9}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:18px;margin-top:40px}
.card{background:var(--card);border:1px solid var(--line);border-radius:var(--radius);padding:26px}
.card h3{font-size:24px;margin-bottom:8px}
.card p{font-size:16px;opacity:.85}
.card .ico{width:44px;height:44px;margin-bottom:14px;color:var(--accent2)}
.infos{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:36px}
.box{background:var(--card);border:1px solid var(--line);border-radius:var(--radius);padding:28px}
.box h3{font-size:24px;margin-bottom:14px}
.hours{width:100%;border-collapse:collapse;font-size:16px}
.hours td{padding:9px 0;border-bottom:1px dashed var(--line);vertical-align:top}
.hours td:last-child{text-align:right;font-weight:600}
.hours tr:last-child td{border-bottom:0}
.note{font-size:14px;opacity:.7;margin-top:12px}
.contact-list{list-style:none;display:grid;gap:12px;font-size:17px}
.contact-list a{text-decoration:none;font-weight:600;border-bottom:2px solid var(--accent)}
.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:22px}
footer{padding:36px 0 90px;font-size:14px;border-top:1px solid var(--line)}
footer .wrap{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;opacity:.75}
.callbar{display:none}
@media (max-width:760px){
 body{font-size:16px}
 .navlinks a{display:none}
 section{padding:60px 0}
 .infos{grid-template-columns:1fr}
 .callbar{display:flex;position:fixed;left:12px;right:12px;bottom:12px;z-index:30;gap:10px}
 .callbar a{flex:1;justify-content:center;box-shadow:0 8px 24px rgba(0,0,0,.18)}
}
"""

ICONS = {
    "tel": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    "map": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    "mail": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
}


def page(s):
    tel_href = "tel:" + s["tel_e164"]
    carte = "".join(
        f'<article class="card">{c.get("ico","")}<h3>{t(c["fr"], c["en"])}</h3><p>{t(c["dfr"], c["den"])}</p></article>'
        for c in s["cards"])
    heures = "".join(f'<tr><td>{t(a, b)}</td><td>{t(c, d)}</td></tr>' for a, b, c, d in s["hours"])
    note_h = f'<p class="note">{t(*s["hours_note"])}</p>' if s.get("hours_note") else ""
    fonts = "\n".join(font_face(*f) for f in s["fonts"])
    desc = html.escape(s["meta_desc"])
    return f"""<!DOCTYPE html>
<html lang="fr" data-lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html.escape(s['title'])}</title>
<meta name="description" content="{desc}">
<meta name="robots" content="noindex,nofollow">
<meta name="theme-color" content="{s['theme_color']}">
<link rel="icon" href="data:image/svg+xml,{s['favicon']}">
<style>
{fonts}
:root{{{s['vars']}}}
{BASE_CSS}
{s['css']}
</style>
</head>
<body>
<div class="pilote">{t('Aperçu — site pilote pour ' + s['name'], 'Preview — pilot website for ' + s['name'])}</div>
<header class="nav"><div class="wrap">
 <a class="logo" href="#top">{s['logo']}</a>
 <nav class="navlinks">
  <a href="#carte">{t(*s['nav_menu'])}</a>
  <a href="#infos">{t('Horaires & accès', 'Hours & directions')}</a>
  <a href="#contact">Contact</a>
  <button class="lang" id="lang" aria-label="Changer de langue / Switch language">EN</button>
 </nav>
</div></header>
<main id="top">
{s['hero']}
<section id="about" class="about"><div class="wrap">
 <p class="kicker">{t(*s['about_kicker'])}</p>
 <h2>{t(*s['about_title'])}</h2>
 <p class="lead">{t(*s['about'])}</p>
</div></section>
<section id="carte" class="menu"><div class="wrap">
 <p class="kicker">{t(*s['menu_kicker'])}</p>
 <h2>{t(*s['menu_title'])}</h2>
 <div class="cards" id="kp-cartes">{carte}</div>
 {f'<p class="note">{t(*s["menu_note"])}</p>' if s.get('menu_note') else ''}
</div></section>
<div id="kp-plus"></div>
<section id="infos" class="infos-s"><div class="wrap">
 <p class="kicker">{t('Infos pratiques', 'Practical info')}</p>
 <h2>{t('Horaires & accès', 'Hours & directions')}</h2>
 <div class="infos">
  <div class="box"><h3>{t('Horaires', 'Opening hours')}</h3><table class="hours"><tbody id="kp-h">{heures}</tbody></table>{note_h}</div>
  <div class="box" id="contact"><h3>{t('Nous trouver', 'Find us')}</h3>
   <ul class="contact-list">
    <li>{t(*s['address'])}</li>
    <li><a href="{tel_href}">{s['tel_display']}</a></li>
    <li><a href="mailto:{s['email']}">{s['email']}</a></li>
   </ul>
   <div class="actions">
    <a class="btn main" href="{tel_href}">{ICONS['tel']}{t(*s['cta_call'])}</a>
    <a class="btn ghost" href="{s['maps']}" target="_blank" rel="noopener">{ICONS['map']}{t('Itinéraire', 'Directions')}</a>
   </div>
  </div>
 </div>
</div></section>
</main>
<footer><div class="wrap">
 <span>© 2026 {s['name']} · Saint-Barthélemy</span>
 <span>{t('Site pilote réalisé par Kapicua', 'Pilot website by Kapicua')}</span>
</div></footer>
<div class="callbar">
 <a class="btn main" href="{tel_href}">{ICONS['tel']}{t(*s['cta_call'])}</a>
 <a class="btn ghost" style="background:var(--bg)" href="{s['maps']}" target="_blank" rel="noopener">{ICONS['map']}{t('Y aller', 'Go')}</a>
</div>
<script>
(function(){{
 var h=document.documentElement,b=document.getElementById('lang');
 function set(l){{h.setAttribute('data-lang',l);h.lang=l;b.textContent=l==='fr'?'EN':'FR';try{{localStorage.setItem('lang',l)}}catch(e){{}}}}
 var l;try{{l=localStorage.getItem('lang')}}catch(e){{}}
 if(!l)l=(navigator.language||'fr').slice(0,2)==='fr'?'fr':'en';
 set(l);b.onclick=function(){{set(h.getAttribute('data-lang')==='fr'?'en':'fr')}};
}})();
</script>
<script src="config.js"></script>
<script src="../kp-app/store.js"></script>
<script src="../kp-app/site.js"></script>
</body>
</html>
"""


def teinte(hexa, k=0.88):
    h = hexa.lstrip("#"); r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    return "#%02x%02x%02x" % tuple(round(c + (255 - c) * k) for c in (r, g, b))


def config(s):
    site = dict(
        horaires=[list(h) for h in s["hours"]],
        cartes=[dict(fr=c["fr"], en=c["en"], dfr=c["dfr"], den=c["den"], ico=c.get("ico", "")) for c in s["cards"]],
        annonce="", annonce_en="", ferme=False, ferme_msg="",
        resa=s["type"] != "boutique", cc=True, creneaux=s["creneaux"])
    kp = dict(slug=s["slug"], nom=s["name"], type=s["type"], mode=s.get("mode", "demo"),
              tel=s["tel_display"], email=s["email"], site=site, exemples=s["exemples"])
    return "window.KP = " + json.dumps(kp, ensure_ascii=False) + ";\n"


def gestion(s):
    ac = s["gestion_couleur"]
    return f"""<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="noindex,nofollow">
<title>Gestion — {html.escape(s['name'])}</title>
<meta name="theme-color" content="{ac}">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="{html.escape(s['name'])}">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="data:image/svg+xml,{s['favicon']}">
<link rel="stylesheet" href="../../kp-app/gestion.css">
<style>:root{{--ac:{ac};--ac2:{teinte(ac)}}}</style>
</head>
<body>
<noscript>Activez JavaScript pour utiliser l'espace de gestion.</noscript>
<script src="../config.js"></script>
<script src="../../kp-app/store.js"></script>
<script src="../../kp-app/gestion.js"></script>
</body>
</html>
"""


def manifeste(s):
    from urllib.parse import unquote
    return json.dumps({"name": "Gestion — " + s["name"], "short_name": s["name"][:12], "start_url": "./", "scope": "./",
                       "display": "standalone", "background_color": "#f5f6f8", "theme_color": s["gestion_couleur"],
                       "icons": [{"src": "icone.svg", "sizes": "any", "type": "image/svg+xml", "purpose": "any"}]}, ensure_ascii=False, indent=1)


if __name__ == "__main__":
    import importlib.util, shutil
    from urllib.parse import unquote
    spec = importlib.util.spec_from_file_location("contenus", os.path.join(ICI, "contenus.py"))
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    lot = getattr(m, "LOT", None)
    pub = os.path.join(ICI, "public")
    app = os.path.join(pub, "kp-app"); os.makedirs(app, exist_ok=True)
    for f in ("store.js", "site.js", "gestion.js", "gestion.css"):
        shutil.copy(os.path.join(ICI, "app", f), os.path.join(app, f))
    for s in m.SITES:
        if lot and s["slug"] not in lot: continue
        d = os.path.join(pub, s["slug"]); g = os.path.join(d, "gestion"); os.makedirs(g, exist_ok=True)
        open(os.path.join(d, "index.html"), "w", encoding="utf-8").write(page(s))
        open(os.path.join(d, "config.js"), "w", encoding="utf-8").write(config(s))
        open(os.path.join(g, "index.html"), "w", encoding="utf-8").write(gestion(s))
        open(os.path.join(g, "manifest.webmanifest"), "w", encoding="utf-8").write(manifeste(s))
        open(os.path.join(g, "icone.svg"), "w", encoding="utf-8").write(unquote(s["favicon"]))
        print("ok", s["slug"], os.path.getsize(os.path.join(d, "index.html")) // 1024, "Ko")
