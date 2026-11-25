# Contenus des 5 premiers sites pilotes — uniquement des informations publiques vérifiées
# (base Assistant Rabe + access.sb / guides). Pas de prix, rien d'inventé.
from urllib.parse import quote


def fav(letter, bg, fg):
    svg = (f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='{bg}'/>"
           f"<text x='32' y='44' font-size='34' text-anchor='middle' font-family='Georgia,serif' fill='{fg}'>{letter}</text></svg>")
    return quote(svg)


def ico(path):
    return f'<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">{path}</svg>'


I_CUP = ico('<path d="M4 9h13v5a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6z"/><path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 2.5c-.6 1 .6 1.8 0 3M12 2.5c-.6 1 .6 1.8 0 3"/>')
I_FISH = ico('<path d="M3 12c3-5 9-6 13-3l5-3v12l-5-3c-4 3-10 2-13-3z"/><circle cx="8" cy="11" r=".8" fill="currentColor"/>')
I_BAG = ico('<path d="M5 8h14l-1 13H6z"/><path d="M9 8a3 3 0 0 1 6 0"/>')
I_LEAF = ico('<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19 14 10"/>')
I_STAR = ico('<path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"/>')
I_PIE = ico('<circle cx="12" cy="12" r="9"/><path d="M12 3v9l7 5"/><circle cx="9" cy="8" r=".8" fill="currentColor"/><circle cx="15" cy="9" r=".8" fill="currentColor"/><circle cx="8" cy="14" r=".8" fill="currentColor"/>')
I_GLASS = ico('<path d="M7 3h10l-1 7a4 4 0 0 1-8 0z"/><path d="M12 14v6M8 21h8"/>')
I_POT = ico('<path d="M4 10h16v3a8 8 0 0 1-16 0z"/><path d="M2 10h20M9 6c0-1 1-1 1-2M14 6c0-1 1-1 1-2"/>')
I_SUN = ico('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>')
I_FIRE = ico('<path d="M12 22c4 0 7-3 7-7 0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-3 3-5 6-5 8 0 4 3 7 7 7z"/>')
I_BOWL = ico('<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M8 7c1-2 3-2 4 0 1-2 3-2 4 0"/>')
I_SCIS = ico('<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.1 8.1 20 20M8.1 15.9 20 4"/>')
I_DROP = ico('<path d="M12 2.5S5 10 5 14.5a7 7 0 0 0 14 0C19 10 12 2.5 12 2.5z"/>')
I_SPARK = ico('<path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l3.5 3.5M15.5 15.5 19 19M5 19l3.5-3.5M15.5 8.5 19 5"/>')
I_WAVE = ico('<path d="M3 8c3-3 6 3 9 0s6 3 9 0M3 14c3-3 6 3 9 0s6 3 9 0"/>')

SITES = []

# ───────────────────────── 1. LA CRÊPERIE ─────────────────────────
crepe_svg = """
<svg viewBox="0 0 520 440" role="img" aria-label="Crêpe pliée et café">
 <defs>
  <radialGradient id="cg" cx="45%" cy="40%" r="70%"><stop offset="0" stop-color="#F6CF7E"/><stop offset=".7" stop-color="#E5A94A"/><stop offset="1" stop-color="#C98A2E"/></radialGradient>
  <pattern id="mar" width="40" height="22" patternUnits="userSpaceOnUse"><rect width="40" height="22" fill="#FBF6EC"/><rect y="0" width="40" height="9" fill="#1D2D50"/></pattern>
 </defs>
 <ellipse cx="230" cy="270" rx="200" ry="150" fill="url(#mar)" opacity=".18"/>
 <ellipse cx="225" cy="285" rx="178" ry="120" fill="#fff" stroke="#1D2D50" stroke-width="4"/>
 <ellipse cx="225" cy="285" rx="140" ry="92" fill="none" stroke="#1D2D50" stroke-opacity=".15" stroke-width="2"/>
 <path d="M95 300 Q120 170 300 150 Q360 230 340 330 Q220 360 95 300Z" fill="url(#cg)"/>
 <path d="M95 300 Q210 255 340 330" fill="none" stroke="#B5781F" stroke-width="3" opacity=".6"/>
 <path d="M300 150 Q300 250 340 330" fill="none" stroke="#B5781F" stroke-width="2" opacity=".35"/>
 <g fill="#B0701C" opacity=".45">
  <ellipse cx="190" cy="215" rx="9" ry="5"/><ellipse cx="240" cy="190" rx="6" ry="4"/><ellipse cx="160" cy="265" rx="7" ry="4"/>
  <ellipse cx="275" cy="245" rx="10" ry="5"/><ellipse cx="225" cy="285" rx="6" ry="3"/><ellipse cx="300" cy="295" rx="7" ry="4"/>
 </g>
 <path d="M140 250 C170 230 200 260 230 236 S290 230 315 205" fill="none" stroke="#5B2E12" stroke-width="7" stroke-linecap="round"/>
 <path d="M160 285 C190 270 215 292 250 275 S300 280 325 262" fill="none" stroke="#5B2E12" stroke-width="5" stroke-linecap="round" opacity=".85"/>
 <g transform="translate(330 70)">
  <ellipse cx="85" cy="128" rx="80" ry="22" fill="#fff" stroke="#1D2D50" stroke-width="4"/>
  <path d="M30 40 h110 v40 a55 55 0 0 1-110 0z" fill="#fff" stroke="#1D2D50" stroke-width="4"/>
  <path d="M140 52 h12 a20 20 0 0 1 0 40 h-14" fill="none" stroke="#1D2D50" stroke-width="4"/>
  <ellipse cx="85" cy="40" rx="55" ry="10" fill="#6B3B1A" stroke="#1D2D50" stroke-width="4"/>
  <path d="M30 62 h110" stroke="#C8102E" stroke-width="6"/>
  <g fill="none" stroke="#1D2D50" stroke-width="3" stroke-linecap="round" opacity=".55">
   <path d="M62 22 c-8-10 8-14 0-26"/><path d="M85 18 c-8-10 8-14 0-26"/><path d="M108 22 c-8-10 8-14 0-26"/>
  </g>
 </g>
</svg>"""

SITES.append(dict(
    slug="la-creperie", name="La Crêperie", logo="La Crêperie<span style='color:var(--accent2)'>.</span>",
    title="La Crêperie — Galettes, crêpes & café à Gustavia, Saint-Barth",
    meta_desc="La Crêperie, rue du Roi Oscar II à Gustavia : galettes, crêpes, salades, burgers, poisson frais et vrai café. Sur place ou à emporter.",
    theme_color="#1D2D50", favicon=fav("C", "#1D2D50", "#FBF6EC"),
    fonts=[("Fraunces", "fraunces-latin-400-normal.woff2", 400), ("Fraunces", "fraunces-latin-700-normal.woff2", 700),
           ("Fraunces", "fraunces-latin-400-italic.woff2", 400, "italic"),
           ("DM Sans", "dm-sans-latin-400-normal.woff2", 400), ("DM Sans", "dm-sans-latin-500-normal.woff2", 500),
           ("DM Sans", "dm-sans-latin-700-normal.woff2", 700)],
    vars="--display:'Fraunces',Georgia,serif;--body:'DM Sans',system-ui,sans-serif;--bg:#FBF6EC;--ink:#1D2D50;--accent:#1D2D50;--onaccent:#FBF6EC;--accent2:#C8102E;--card:#fff;--line:rgba(29,45,80,.14);--navbg:rgba(251,246,236,.9);--radius:14px;--dw:700",
    css="""
.hero{padding:56px 0 0;position:relative;overflow:hidden}
.hero .wrap{display:grid;grid-template-columns:1.05fr 1fr;gap:30px;align-items:center}
.hero h1{font-size:clamp(44px,7vw,82px);letter-spacing:-.02em}
.hero h1 em{font-style:italic;font-weight:400;color:var(--accent2)}
.hero p{font-size:20px;margin:20px 0 28px;max-width:480px}
.stripes{height:56px;margin-top:40px;background:repeating-linear-gradient(180deg,#1D2D50 0 9px,#FBF6EC 9px 22px)}
.about{background:#fff}
.menu .card{border-top:5px solid var(--accent2)}
@media (max-width:760px){.hero .wrap{grid-template-columns:1fr}.hero svg{max-width:400px;margin:0 auto}}
""",
    hero=f"""<section class="hero"><div class="wrap">
 <div>
  <p class="kicker">Gustavia · Saint-Barthélemy</p>
  <h1><span lang="fr">Galettes, crêpes <em>&amp; vrai café</em></span><span lang="en">Galettes, crêpes <em>&amp; real coffee</em></span></h1>
  <p><span lang="fr">Une institution de l'île, au cœur de Gustavia. Sur place, en terrasse ou à emporter.</span><span lang="en">An island institution in the heart of Gustavia. Eat in, on the terrace, or take away.</span></p>
  <div class="actions">
   <a class="btn main" href="tel:+590590278407"><span lang="fr">Réserver · 05 90 27 84 07</span><span lang="en">Book · +590 590 27 84 07</span></a>
   <a class="btn ghost" href="#carte"><span lang="fr">Voir la carte</span><span lang="en">See the menu</span></a>
  </div>
 </div>
 {crepe_svg}
</div><div class="stripes"></div></section>""",
    nav_menu=("La carte", "Menu"),
    about_kicker=("Bienvenue", "Welcome"),
    about_title=("Du petit-déjeuner au dîner", "From breakfast to dinner"),
    about=("Alexandra et Eric vous accueillent rue du Roi Oscar II, près de la boutique Mackeen, en plein cœur de Gustavia. "
           "Une adresse idéale en famille : galettes et crêpes préparées dans les règles de l'art, mais aussi salades, burgers et poisson frais, en service continu.",
           "Alexandra and Eric welcome you on Rue du Roi Oscar II, near the Mackeen boutique, right in the heart of Gustavia. "
           "A perfect spot for families: galettes and crêpes made the traditional way, plus salads, burgers and fresh fish, served all day long."),
    menu_kicker=("À la carte", "On the menu"),
    menu_title=("De quoi régaler toute la table", "Something for everyone"),
    cards=[
        dict(fr="Galettes salées", en="Savoury galettes", dfr="Préparées dans les règles de l'art, garnies selon vos envies.", den="Made the traditional way, with the filling of your choice.", ico=I_STAR),
        dict(fr="Crêpes sucrées", en="Sweet crêpes", dfr="Le dessert préféré des petits… et des grands.", den="Everyone's favourite dessert, kids and grown-ups alike.", ico=I_PIE),
        dict(fr="Salades & burgers", en="Salads & burgers", dfr="Salade exotique, Spécial Tim Burger et autres classiques de la maison.", den="Exotic salad, the Spécial Tim Burger and other house classics.", ico=I_LEAF),
        dict(fr="Poisson frais", en="Fresh fish", dfr="Mahi-mahi sauce chien : la touche créole de la carte.", den="Mahi-mahi with sauce chien: the Creole touch on the menu.", ico=I_FISH),
        dict(fr="Coffee Corner", en="Coffee Corner", dfr="Café en grains fraîchement moulus, à table, en terrasse ou à emporter.", den="Coffee from freshly ground beans, at the table, on the terrace or to go.", ico=I_CUP),
        dict(fr="À emporter", en="Takeaway", dfr="Commandez, nous préparons, vous passez récupérer au restaurant.", den="Order ahead and pick it up at the restaurant.", ico=I_BAG),
    ],
    hours=[("Lundi – samedi", "Monday – Saturday", "9h – 22h", "9 am – 10 pm")],
    hours_note=("Service continu toute la journée.", "Non-stop service all day."),
    address=("Rue du Roi Oscar II, Gustavia<br>97133 Saint-Barthélemy", "Rue du Roi Oscar II, Gustavia<br>97133 St. Barthélemy"),
    tel_e164="+590590278407", tel_display="05 90 27 84 07", email="creperiestbarth@gmail.com",
    maps="https://www.google.com/maps/search/?api=1&query=17.89775,-62.84912",
    cta_call=("Appeler", "Call"),
))

# ───────────────────────── 2. LES BANANIERS ─────────────────────────
leaf = lambda tr, c1, c2: f"""<g transform="{tr}"><path d="M0 0 C60 -40 180 -40 260 10 C180 40 60 40 0 0Z" fill="{c1}"/>
 <path d="M0 0 C90 -8 180 0 260 10" stroke="{c2}" stroke-width="4" fill="none"/>
 <g stroke="{c2}" stroke-width="2" opacity=".55">
  <path d="M40 -3 L60 -26"/><path d="M80 -5 L104 -31"/><path d="M120 -5 L146 -30"/><path d="M160 -3 L186 -24"/><path d="M200 1 L222 -12"/>
  <path d="M40 -3 L62 18"/><path d="M80 -5 L106 22"/><path d="M120 -5 L148 24"/><path d="M160 -3 L188 22"/><path d="M200 1 L224 16"/>
 </g></g>"""

bananiers_svg = f"""
<svg class="leaves l" viewBox="0 0 340 600" preserveAspectRatio="xMinYMid meet" aria-hidden="true">
 {leaf("translate(-30 90) rotate(22)", "#2F6B45", "#1F4A30")}
 {leaf("translate(-40 300) rotate(-6)", "#3E7F52", "#1F4A30")}
 {leaf("translate(-50 520) rotate(-30)", "#2F6B45", "#1F4A30")}
</svg>
<svg class="leaves r" viewBox="0 0 340 600" preserveAspectRatio="xMaxYMid meet" aria-hidden="true">
 {leaf("translate(370 80) rotate(158)", "#3E7F52", "#1F4A30")}
 {leaf("translate(380 300) rotate(186)", "#2F6B45", "#1F4A30")}
 {leaf("translate(370 530) rotate(210)", "#3E7F52", "#1F4A30")}
</svg>"""

pizza_svg = """
<svg class="pizza" viewBox="0 0 300 300" role="img" aria-label="Pizza">
 <circle cx="150" cy="150" r="140" fill="#E9C27A"/>
 <circle cx="150" cy="150" r="140" fill="none" stroke="#C98B3E" stroke-width="10"/>
 <circle cx="150" cy="150" r="118" fill="#C4562B"/>
 <g fill="#F7EBD0"><circle cx="110" cy="105" r="22"/><circle cx="190" cy="120" r="20"/><circle cx="150" cy="190" r="24"/><circle cx="90" cy="180" r="18"/><circle cx="205" cy="195" r="17"/></g>
 <g fill="#2F6B45"><ellipse cx="120" cy="140" rx="10" ry="5" transform="rotate(-30 120 140)"/><ellipse cx="175" cy="160" rx="10" ry="5" transform="rotate(20 175 160)"/><ellipse cx="160" cy="95" rx="9" ry="4.5" transform="rotate(50 160 95)"/><ellipse cx="200" cy="225" rx="9" ry="4.5"/></g>
 <g stroke="#8E3A18" stroke-width="3" opacity=".5"><path d="M150 32 L150 268"/><path d="M48 92 L252 208"/><path d="M48 208 L252 92"/></g>
</svg>"""

SITES.append(dict(
    slug="les-bananiers", name="Les Bananiers", logo="Les Bananiers",
    title="Les Bananiers — Pizzas de Luigi & cuisine de quartier à Colombier, Saint-Barth",
    meta_desc="Les Bananiers à Colombier : pizzas fines de Luigi, cuisine française, créole, italienne et méditerranéenne, terrasse sous les bananiers. Sur place ou à emporter.",
    theme_color="#1F3A2B", favicon=fav("B", "#2F6B45", "#F3EFE4"),
    fonts=[("Playfair Display", "playfair-display-latin-400-normal.woff2", 400), ("Playfair Display", "playfair-display-latin-700-normal.woff2", 700),
           ("DM Sans", "dm-sans-latin-400-normal.woff2", 400), ("DM Sans", "dm-sans-latin-700-normal.woff2", 700),
           ("Caveat", "caveat-latin-600-normal.woff2", 600)],
    vars="--display:'Playfair Display',Georgia,serif;--body:'DM Sans',system-ui,sans-serif;--bg:#F3EFE4;--ink:#1F3A2B;--accent:#C4562B;--onaccent:#fff;--accent2:#2F6B45;--card:#FBF8F1;--line:rgba(31,58,43,.15);--navbg:rgba(243,239,228,.92);--radius:10px;--dw:700",
    css="""
.hero{position:relative;background:#1F3A2B;color:#F3EFE4;overflow:hidden;padding:90px 0 100px;text-align:center}
.hero .leaves{position:absolute;top:0;height:100%;width:30%;max-width:340px;opacity:.95}.hero .leaves.l{left:0}.hero .leaves.r{right:0}
.hero .wrap{position:relative}
.hero .script{font-family:'Caveat',cursive;font-size:34px;color:#E9C27A}
.hero h1{font-size:clamp(50px,9vw,104px);margin:6px 0 12px}
.hero p{font-size:20px;max-width:560px;margin:0 auto 30px;opacity:.92}
.hero .actions{justify-content:center}
.hero .btn.ghost{color:#F3EFE4}
.hero .pizza{width:190px;margin:44px auto 0;filter:drop-shadow(0 18px 30px rgba(0,0,0,.35))}
.menu .card h3{color:var(--accent)}
.infos-s{background:#E9E3D3}
@media (max-width:760px){.hero{padding:64px 0 70px}.hero .pizza{width:150px}.hero .leaves{width:38%;opacity:.45}}
""",
    hero=f"""<section class="hero">{bananiers_svg}<div class="wrap">
 <p class="script"><span lang="fr">Colombier · Saint-Barth</span><span lang="en">Colombier · St. Barth</span></p>
 <h1>Les Bananiers</h1>
 <p><span lang="fr">Les pizzas de Luigi et une cuisine généreuse, sous les bananiers de Colombier.</span><span lang="en">Luigi's pizzas and generous cooking, under the banana trees of Colombier.</span></p>
 <div class="actions">
  <a class="btn main" href="tel:+590590279348"><span lang="fr">Réserver · 05 90 27 93 48</span><span lang="en">Book · +590 590 27 93 48</span></a>
  <a class="btn ghost" href="#carte"><span lang="fr">La carte</span><span lang="en">The menu</span></a>
 </div>
 {pizza_svg}
</div></section>""",
    nav_menu=("La carte", "Menu"),
    about_kicker=("Restaurant de quartier", "Neighbourhood restaurant"),
    about_title=("On y vient, et on revient", "Come once, come back often"),
    about=("À Colombier, Les Bananiers cultive l'esprit d'une vraie table de quartier : on s'y retrouve pour un plat du jour, une suggestion du chef ou l'une des pizzas fines de Luigi. "
           "La carte mêle recettes françaises, créoles, italiennes et méditerranéennes, à des prix doux, sur une terrasse entourée de verdure.",
           "In Colombier, Les Bananiers has the spirit of a true neighbourhood spot: come for a dish of the day, a chef's suggestion or one of Luigi's thin-crust pizzas. "
           "The menu blends French, Creole, Italian and Mediterranean recipes at friendly prices, on a terrace surrounded by greenery."),
    menu_kicker=("À la carte", "On the menu"),
    menu_title=("Simple, généreux, convivial", "Simple, generous, friendly"),
    cards=[
        dict(fr="Les pizzas de Luigi", en="Luigi's pizzas", dfr="Pâte fine, garnitures franches : la spécialité de la maison.", den="Thin crust, honest toppings: the house speciality.", ico=I_PIE),
        dict(fr="Suggestions du chef", en="Chef's suggestions", dfr="Des plats de saison qui changent au fil des arrivages.", den="Seasonal dishes that change with what comes in.", ico=I_STAR),
        dict(fr="Créole & méditerranéen", en="Creole & Mediterranean", dfr="Une cuisine traditionnelle et variée, entre la France et la Caraïbe.", den="Traditional, varied cooking between France and the Caribbean.", ico=I_POT),
        dict(fr="Burgers & salades", en="Burgers & salads", dfr="Pour un déjeuner rapide ou une envie plus légère.", den="For a quick lunch or something lighter.", ico=I_LEAF),
        dict(fr="Vins à prix doux", en="Wines at fair prices", dfr="Une sélection pour accompagner pizzas et plats.", den="A selection to go with pizzas and dishes.", ico=I_GLASS),
        dict(fr="À emporter", en="Takeaway", dfr="Pensez à commander tôt, surtout pour les pizzas du soir.", den="Order early, especially for evening pizzas.", ico=I_BAG),
    ],
    hours=[("Mardi – vendredi", "Tuesday – Friday", "11h30 – 14h · 18h30 – 22h", "11:30 am – 2 pm · 6:30 – 10 pm"),
           ("Samedi", "Saturday", "18h30 – 22h", "6:30 – 10 pm"),
           ("Dimanche & lundi", "Sunday & Monday", "Fermé", "Closed")],
    address=("Route de Colombier, à côté de la boulangerie<br>97133 Saint-Barthélemy", "Route de Colombier, next to the bakery<br>97133 St. Barthélemy"),
    tel_e164="+590590279348", tel_display="05 90 27 93 48", email="lesbananiers97@gmail.com",
    maps="https://www.google.com/maps/search/?api=1&query=17.9116,-62.85319",
    cta_call=("Appeler", "Call"),
))

# ───────────────────────── 3. LE GRAIN DE SEL ─────────────────────────
saline_svg = """
<svg class="land" viewBox="0 120 1200 440" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
 <defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7C9A9"/><stop offset=".55" stop-color="#FBE3CF"/><stop offset="1" stop-color="#FBF7F2"/></linearGradient>
  <linearGradient id="pond" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E9B3A8"/><stop offset="1" stop-color="#F3D2C6"/></linearGradient>
 </defs>
 <path d="M0 330 C140 250 260 240 380 300 C470 230 600 210 720 290 C820 250 960 250 1060 300 C1120 280 1170 290 1200 300 V560 H0Z" fill="#8FA98A"/>
 <path d="M0 370 C180 320 300 330 420 360 C560 320 700 320 820 360 C960 330 1080 340 1200 350 V560 H0Z" fill="#6F8D6E"/>
 <path d="M0 410 C300 395 900 395 1200 410 V560 H0Z" fill="url(#pond)"/>
 <g stroke="#fff" stroke-width="3" opacity=".55" stroke-linecap="round"><path d="M180 440 h120"/><path d="M520 455 h160"/><path d="M880 438 h110"/><path d="M340 480 h90"/></g>
 <path d="M0 492 C300 480 900 480 1200 492 V560 H0Z" fill="#F3E6D3"/>
</svg>"""

SITES.append(dict(
    slug="le-grain-de-sel", name="Le Grain de Sel", logo="Grain de Sel",
    title="Le Grain de Sel — Cuisine créole & poisson local à Saline, Saint-Barth",
    meta_desc="Le Grain de Sel, route de Saline : cuisine créole généreuse, poisson local et terrasse en bois face à l'étang, à deux pas de la plage de Saline.",
    theme_color="#253238", favicon=fav("G", "#E0735A", "#FBF7F2"),
    fonts=[("DM Serif Display", "dm-serif-display-latin-400-normal.woff2", 400), ("DM Serif Display", "dm-serif-display-latin-400-italic.woff2", 400, "italic"),
           ("DM Sans", "dm-sans-latin-400-normal.woff2", 400), ("DM Sans", "dm-sans-latin-700-normal.woff2", 700)],
    vars="--display:'DM Serif Display',Georgia,serif;--body:'DM Sans',system-ui,sans-serif;--bg:#FBF7F2;--ink:#253238;--accent:#E0735A;--onaccent:#fff;--accent2:#2A8C8C;--card:#fff;--line:rgba(37,50,56,.13);--navbg:rgba(251,247,242,.9);--radius:22px",
    css="""
.hero .sun{position:absolute;right:14%;top:150px;width:150px;height:150px;border-radius:50%;background:#F2A07B}
.hero{position:relative;min-height:800px;display:flex;align-items:flex-start;padding-top:60px;overflow:hidden;background:linear-gradient(180deg,#F7C9A9 0%,#FBE3CF 45%,#FBEFE4 70%)}
.hero .land{position:absolute;left:0;right:0;bottom:0;width:100%;height:330px}
.hero .wrap{position:relative;padding-top:20px;width:100%}
.hero h1{font-size:clamp(48px,8vw,96px)}
.hero h1 em{color:var(--accent)}
.hero p{font-size:20px;max-width:520px;margin:18px 0 28px}
.about .wrap{display:grid;grid-template-columns:1fr;max-width:860px}
.menu{background:#F4EEE6}
.menu .card .ico{color:var(--accent)}
@media (max-width:760px){.hero .sun{width:80px;height:80px;top:auto;bottom:170px;right:10%}.hero{min-height:660px}.hero .wrap{padding-top:40px}.hero .land{height:220px}}
""",
    hero=f"""<section class="hero"><div class="sun"></div>{saline_svg}<div class="wrap">
 <p class="kicker"><span lang="fr">Route de Saline · Saint-Barth</span><span lang="en">Saline road · St. Barth</span></p>
 <h1><span lang="fr">Le Grain <em>de Sel</em></span><span lang="en">Le Grain <em>de Sel</em></span></h1>
 <p><span lang="fr">Cuisine créole et poisson local, à deux pas de la plage de Saline.</span><span lang="en">Creole cooking and local fish, a short stroll from Saline beach.</span></p>
 <div class="actions">
  <a class="btn main" href="tel:+590590524605"><span lang="fr">Réserver · 05 90 52 46 05</span><span lang="en">Book · +590 590 52 46 05</span></a>
  <a class="btn ghost" href="#carte"><span lang="fr">La carte</span><span lang="en">The menu</span></a>
 </div>
</div></section>""",
    nav_menu=("La carte", "Menu"),
    about_kicker=("Avant ou après la plage", "Before or after the beach"),
    about_title=("Une terrasse face à l'étang salé", "A deck overlooking the salt pond"),
    about=("Sur la route de Saline, Grain de Sel célèbre une cuisine créole généreuse, inspirée par la pêche locale et les saveurs de la Caraïbe. "
           "On s'installe sur la terrasse en bois, face à l'étang, cheveux encore salés, pour un vrai déjeuner ou une pause gourmande — en famille, entre amis ou en habitué.",
           "On the road to Saline, Grain de Sel celebrates generous Creole cooking inspired by the local catch and Caribbean flavours. "
           "Settle on the wooden deck facing the salt pond, hair still salty from the sea, for a proper lunch or a treat — with family, friends, or as a regular."),
    menu_kicker=("À la carte", "On the menu"),
    menu_title=("La mer, le soleil, les épices", "Sea, sun and spices"),
    cards=[
        dict(fr="Poisson local", en="Local fish", dfr="Les prises de l'île, cuisinées à la créole.", den="The island's catch, cooked Creole-style.", ico=I_FISH),
        dict(fr="Cuisine créole", en="Creole cooking", dfr="Des plats parfumés et généreux, aux saveurs familières de la Caraïbe.", den="Fragrant, generous dishes with familiar Caribbean flavours.", ico=I_POT),
        dict(fr="Salades & burgers", en="Salads & burgers", dfr="Pour un déjeuner simple entre deux baignades.", den="For an easy lunch between two swims.", ico=I_LEAF),
        dict(fr="Cocktails", en="Cocktails", dfr="Piña colada et rafraîchissements, face au paysage.", den="Piña coladas and cool drinks, with a view.", ico=I_GLASS),
        dict(fr="Pour tous", en="For everyone", dfr="Des options végétariennes et sans gluten à la carte.", den="Vegetarian and gluten-free options on the menu.", ico=I_SUN),
        dict(fr="À emporter", en="Takeaway", dfr="Commandez et passez récupérer en allant à la plage.", den="Order ahead and pick up on your way to the beach.", ico=I_BAG),
    ],
    hours=[("Mardi – samedi", "Tuesday – Saturday", "Midi & soir", "Lunch & dinner"),
           ("Dimanche", "Sunday", "Midi", "Lunch"),
           ("Lundi", "Monday", "Fermé", "Closed")],
    hours_note=("Horaires de saison : appelez-nous pour réserver.", "Seasonal hours: call us to book a table."),
    address=("Route de Saline, Salines<br>97133 Saint-Barthélemy", "Route de Saline, Salines<br>97133 St. Barthélemy"),
    tel_e164="+590590524605", tel_display="05 90 52 46 05", email="graindeselsaline@gmail.com",
    maps="https://www.google.com/maps/search/?api=1&query=17.8979,-62.83277",
    cta_call=("Appeler", "Call"),
))

# ───────────────────────── 4. CARIBBEAN TO GO ─────────────────────────
madras = """<svg class="madras" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true">
 <defs><pattern id="md" width="60" height="60" patternUnits="userSpaceOnUse">
  <rect width="60" height="60" fill="#FFC72C"/>
  <rect x="0" width="22" height="60" fill="#E63A2E" opacity=".85"/><rect y="0" width="60" height="22" fill="#E63A2E" opacity=".55"/>
  <rect x="34" width="8" height="60" fill="#0E8A4B" opacity=".8"/><rect y="34" width="60" height="8" fill="#0E8A4B" opacity=".6"/>
  <rect x="48" width="3" height="60" fill="#1B1B1B" opacity=".5"/><rect y="48" width="60" height="3" fill="#1B1B1B" opacity=".4"/>
 </pattern></defs>
 <rect width="1200" height="60" fill="url(#md)"/></svg>"""

bokit_svg = """
<svg viewBox="0 0 420 320" role="img" aria-label="Bokit">
 <ellipse cx="210" cy="290" rx="170" ry="18" fill="#1B1B1B" opacity=".12"/>
 <path d="M50 172 C56 112 364 112 370 172 L370 180 C370 200 50 200 50 180Z" fill="#E3A44C"/>
 <path d="M66 152 C100 124 320 124 354 152" fill="none" stroke="#F3C77A" stroke-width="10" stroke-linecap="round" opacity=".7"/>
 <path d="M44 185 C80 165 120 200 160 180 S240 200 280 180 S350 198 376 184 L376 205 L44 205Z" fill="#0E8A4B"/>
 <path d="M48 200 C90 190 130 214 175 200 S260 214 300 200 S360 212 372 204 L372 222 L48 222Z" fill="#E63A2E"/>
 <rect x="52" y="214" width="316" height="26" rx="6" fill="#C98A3A"/>
 <path d="M52 236 C52 280 368 280 368 236Z" fill="#E3A44C"/>
 <g fill="#FFF3D6" opacity=".8"><circle cx="140" cy="125" r="3"/><circle cx="200" cy="112" r="3"/><circle cx="260" cy="122" r="3"/><circle cx="170" cy="140" r="2.5"/><circle cx="235" cy="138" r="2.5"/></g>
</svg>"""

SITES.append(dict(
    slug="caribbean-to-go", name="Caribbean To Go", logo="CARIBBEAN<span style='color:var(--accent)'> TO GO</span>",
    title="Caribbean To Go — Bokits, accras & street food antillais à Lorient, Saint-Barth",
    meta_desc="Caribbean To Go, centre L'Îlot à Lorient (face à L'Oasis) : bokits, accras, poulet boucané, wraps, bowls et shakes. Sur place ou à emporter.",
    theme_color="#E63A2E", favicon=fav("C", "#E63A2E", "#FFC72C"),
    fonts=[("Bebas Neue", "bebas-neue-latin-400-normal.woff2", 400),
           ("Poppins", "poppins-latin-400-normal.woff2", 400), ("Poppins", "poppins-latin-600-normal.woff2", 600)],
    vars="--display:'Bebas Neue',Impact,sans-serif;--body:'Poppins',system-ui,sans-serif;--bg:#FFF8E7;--ink:#1B1B1B;--accent:#E63A2E;--onaccent:#fff;--accent2:#0E8A4B;--card:#fff;--line:rgba(27,27,27,.14);--navbg:rgba(255,248,231,.94);--radius:16px",
    css="""
.logo{font-size:28px;letter-spacing:.02em}
.hero{background:#FFC72C;overflow:hidden}
.hero .wrap{display:grid;grid-template-columns:1.1fr 1fr;align-items:center;gap:24px;padding-top:50px;padding-bottom:40px}
.hero h1{font-size:clamp(64px,12vw,150px);line-height:.88;letter-spacing:.01em}
.hero h1 span.r{color:var(--accent)}
.hero p{font-size:19px;margin:18px 0 26px;max-width:470px;font-weight:600}
.hero .btn.ghost{border-color:#1B1B1B}
.madras{width:100%;height:46px}
h2{letter-spacing:.02em;font-size:clamp(40px,6vw,64px)}
.card h3{font-size:30px;letter-spacing:.02em}
.menu .card:nth-child(3n+1){border-top:6px solid #E63A2E}
.menu .card:nth-child(3n+2){border-top:6px solid #0E8A4B}
.menu .card:nth-child(3n){border-top:6px solid #FFC72C}
.box h3{font-size:30px}
@media (max-width:760px){.hero .wrap{grid-template-columns:1fr}.hero svg{max-width:360px;margin:0 auto}}
""",
    hero=f"""<section class="hero"><div class="wrap">
 <div>
  <p class="kicker" style="color:#1B1B1B"><span lang="fr">Lorient · centre L'Îlot</span><span lang="en">Lorient · L'Îlot centre</span></p>
  <h1>BOKIT,<br>ACCRAS <span class="r">&amp;</span><br>CO.</h1>
  <p><span lang="fr">La vraie street food des Antilles à Saint-Barth. Sur place, à emporter, ou direct à la plage.</span><span lang="en">Real French West Indies street food in St. Barth. Eat in, take away, or straight to the beach.</span></p>
  <div class="actions">
   <a class="btn main" href="tel:+590690315571"><span lang="fr">Commander · 06 90 31 55 71</span><span lang="en">Order · +590 690 31 55 71</span></a>
   <a class="btn ghost" href="#carte"><span lang="fr">Le menu</span><span lang="en">The menu</span></a>
  </div>
 </div>
 {bokit_svg}
</div>{madras}</section>""",
    nav_menu=("Le menu", "Menu"),
    about_kicker=("Saveurs des Antilles", "French Caribbean flavours"),
    about_title=("La Martinique et la Guadeloupe, à Lorient", "Martinique & Guadeloupe, in Lorient"),
    about=("Face au supermarché L'Oasis, Caribbean To Go sert les grands classiques de la street food antillaise : bokits, accras, poulet boucané. "
           "Une cuisine franche et colorée, rapide sans être pressée, à emporter pour un repas facile à la plage.",
           "Across from L'Oasis supermarket, Caribbean To Go serves the great classics of French West Indies street food: bokits, accras, poulet boucané. "
           "Bold, colourful food, quick but never rushed — perfect to take away for an easy meal on the beach."),
    menu_kicker=("Au menu", "On the menu"),
    menu_title=("Street food antillaise", "Caribbean street food"),
    cards=[
        dict(fr="Bokits", en="Bokits", dfr="Le sandwich star de la Guadeloupe. Le Crispy Mahi à la mayo colombo fait déjà parler de lui.", den="Guadeloupe's star sandwich. The Crispy Mahi with colombo mayo is already a favourite.", ico=I_STAR),
        dict(fr="Accras", en="Accras", dfr="Des beignets croustillants, dans une sélection qui change souvent.", den="Crispy fritters, in a selection that changes often.", ico=I_SUN),
        dict(fr="Poulet boucané", en="Poulet boucané", dfr="Le fumé à l'antillaise, une spécialité de Martinique.", den="Smoked the West Indies way, a Martinique speciality.", ico=I_FIRE),
        dict(fr="Travers & poisson local", en="Ribs & local fish", dfr="Travers de porc, poulet et poisson de l'île.", den="Pork ribs, chicken and fish from the island.", ico=I_FISH),
        dict(fr="Wraps & bowls", en="Wraps & bowls", dfr="Des options rapides et fraîches pour le midi.", den="Quick, fresh options for lunch.", ico=I_BOWL),
        dict(fr="Shakes", en="Shakes", dfr="Pour accompagner le tout, bien frais.", den="Ice-cold, to go with it all.", ico=I_GLASS),
    ],
    hours=[("Mardi – samedi", "Tuesday – Saturday", "12h – 14h · 19h – 22h30", "12 – 2 pm · 7 – 10:30 pm"),
           ("Dimanche", "Sunday", "12h – 15h", "12 – 3 pm"),
           ("Lundi", "Monday", "Fermé", "Closed")],
    address=("Centre L'Îlot, Lorient — face à L'Oasis<br>97133 Saint-Barthélemy", "L'Îlot centre, Lorient — across from L'Oasis<br>97133 St. Barthélemy"),
    tel_e164="+590690315571", tel_display="06 90 31 55 71", email="caribbeantasty.sbh@gmail.com",
    maps="https://www.google.com/maps/search/?api=1&query=" + quote("Caribbean To Go, Lorient, Saint-Barthélemy"),
    cta_call=("Appeler", "Call"),
))

# ───────────────────────── 5. TI SALON ─────────────────────────
salon_svg = """
<svg viewBox="0 0 480 520" role="img" aria-label="Chevelure stylisée">
 <defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6B4433"/><stop offset=".6" stop-color="#B07A5F"/><stop offset="1" stop-color="#E2BFA3"/></linearGradient></defs>
 <circle cx="240" cy="250" r="210" fill="#EFE3D8"/>
 <g fill="none" stroke="url(#hg)" stroke-linecap="round">
  <path d="M150 60 C60 160 120 260 90 360 C70 430 120 480 170 490" stroke-width="16"/>
  <path d="M185 50 C110 160 170 270 140 370 C125 430 160 470 215 492" stroke-width="12"/>
  <path d="M220 46 C160 160 220 280 195 380 C185 430 215 470 260 488" stroke-width="10"/>
  <path d="M255 48 C215 170 270 285 250 385 C240 430 265 465 300 478" stroke-width="8"/>
  <path d="M290 56 C265 180 320 290 305 385 C298 425 318 455 340 462" stroke-width="6"/>
  <path d="M320 70 C310 190 360 290 352 380" stroke-width="4"/>
 </g>
</svg>"""

SITES.append(dict(
    slug="ti-salon", name="Ti Salon", logo="Ti Salon",
    title="Ti Salon — Coiffure à La Pointe, Gustavia, Saint-Barth",
    meta_desc="Ti Salon, 35 rue Victor Schoelcher, La Pointe, Gustavia : coupes, couleurs, balayages, lissage brésilien et soins profonds. Sur rendez-vous.",
    theme_color="#3B2A24", favicon=fav("T", "#3B2A24", "#F7F1EC"),
    fonts=[("Cormorant Garamond", "cormorant-garamond-latin-500-normal.woff2", 500), ("Cormorant Garamond", "cormorant-garamond-latin-600-normal.woff2", 600),
           ("Cormorant Garamond", "cormorant-garamond-latin-500-italic.woff2", 500, "italic"),
           ("Jost", "jost-latin-300-normal.woff2", 300), ("Jost", "jost-latin-400-normal.woff2", 400), ("Jost", "jost-latin-500-normal.woff2", 500)],
    vars="--display:'Cormorant Garamond',Georgia,serif;--body:'Jost',system-ui,sans-serif;--bg:#F7F1EC;--ink:#3B2A24;--accent:#3B2A24;--onaccent:#F7F1EC;--accent2:#B07A5F;--card:#FFFBF7;--line:rgba(59,42,36,.14);--navbg:rgba(247,241,236,.92);--radius:2px;--dw:500",
    css="""
body{font-weight:300}
.logo{font-style:italic;font-size:28px}
.hero .wrap{display:grid;grid-template-columns:1fr 1fr;gap:30px;align-items:center;padding-top:60px;padding-bottom:40px}
.hero h1{font-size:clamp(54px,8vw,100px);font-weight:500}
.hero h1 em{font-style:italic;color:var(--accent2)}
.hero p{font-size:19px;margin:18px 0 30px;max-width:440px}
.btn{text-transform:uppercase;letter-spacing:.12em;font-size:13px;font-weight:500}
.card{text-align:left}
.card h3{font-size:28px}
.kicker{font-weight:500}
.menu{background:#EFE3D8}
@media (max-width:760px){.hero .wrap{grid-template-columns:1fr}.hero svg{max-width:340px;margin:0 auto}}
""",
    hero=f"""<section class="hero"><div class="wrap">
 <div>
  <p class="kicker">La Pointe · Gustavia</p>
  <h1><span lang="fr">Vos cheveux, <em>au soleil de l'île</em></span><span lang="en">Your hair, <em>island-ready</em></span></h1>
  <p><span lang="fr">Coupes, couleurs et soins dans un salon intimiste, au cœur de La Pointe.</span><span lang="en">Cuts, colour and care in an intimate salon in the heart of La Pointe.</span></p>
  <div class="actions">
   <a class="btn main" href="tel:+590590520496"><span lang="fr">Prendre rendez-vous</span><span lang="en">Book an appointment</span></a>
   <a class="btn ghost" href="#carte"><span lang="fr">Prestations</span><span lang="en">Services</span></a>
  </div>
 </div>
 {salon_svg}
</div></section>""",
    nav_menu=("Prestations", "Services"),
    about_kicker=("Le salon", "The salon"),
    about_title=("Prendre soin, simplement", "Simply, beautifully cared for"),
    about=("Au 35 rue Victor Schoelcher, le Ti Salon vous accueille pour une coupe, une couleur ou un vrai moment de soin. "
           "Soleil, sel, baignades : l'équipe connaît ce que l'île fait subir aux cheveux, et vous propose les techniques pour les garder beaux et sains.",
           "At 35 rue Victor Schoelcher, Ti Salon welcomes you for a cut, a colour or a proper care treatment. "
           "Sun, salt, swims: the team knows what island life does to hair, and has the techniques to keep it healthy and beautiful."),
    menu_kicker=("Prestations", "Services"),
    menu_title=("Coupe, couleur & soins", "Cut, colour & care"),
    cards=[
        dict(fr="Coupe & brushing", en="Cut & blow-dry", dfr="Une coupe pensée pour vous et pour le climat de l'île.", den="A cut designed for you and for the island climate.", ico=I_SCIS),
        dict(fr="Couleur & balayage", en="Colour & balayage", dfr="Blonds lumineux, effet « sunkiss », reflets brownie.", den="Luminous blondes, sun-kissed effects, brownie tones.", ico=I_SUN),
        dict(fr="Lissage brésilien", en="Brazilian blowout", dfr="Des cheveux lisses et disciplinés, même avec l'humidité.", den="Smooth, frizz-free hair, even in the humidity.", ico=I_WAVE),
        dict(fr="Botox capillaire", en="Hair botox", dfr="Un soin profond qui redonne brillance et matière.", den="A deep treatment that restores shine and body.", ico=I_SPARK),
        dict(fr="Soins Olaplex", en="Olaplex treatments", dfr="Pour réparer la fibre après le soleil et la couleur.", den="To repair the hair fibre after sun and colour.", ico=I_DROP),
        dict(fr="Produits au salon", en="Products in salon", dfr="Les soins pour prolonger le résultat à la maison.", den="Care products to keep the results going at home.", ico=I_BAG),
    ],
    hours=[("Mardi – samedi", "Tuesday – Saturday", "Sur rendez-vous", "By appointment"),
           ("Dimanche & lundi", "Sunday & Monday", "Fermé", "Closed")],
    address=("35, rue Victor Schoelcher, La Pointe<br>Gustavia, 97133 Saint-Barthélemy", "35 rue Victor Schoelcher, La Pointe<br>Gustavia, 97133 St. Barthélemy"),
    tel_e164="+590590520496", tel_display="05 90 52 04 96", email="letisalon97133@gmail.com",
    maps="https://www.google.com/maps/search/?api=1&query=17.89641,-62.85193",
    cta_call=("Appeler", "Call"),
))

# ───────────────────────── 6. TI'CORAIL ─────────────────────────
corail_svg = """
<svg viewBox="0 0 560 420" role="img" aria-label="Cabane de plage sur le lagon">
 <defs><linearGradient id="lag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5FD3C6"/><stop offset="1" stop-color="#1FA4A0"/></linearGradient>
 <linearGradient id="ciel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE3D3"/><stop offset="1" stop-color="#E9F8F5"/></linearGradient>
 <clipPath id="arr"><rect width="560" height="420" rx="32"/></clipPath></defs>
 <g clip-path="url(#arr)">
 <rect width="560" height="420" fill="url(#ciel)"/>
 <circle cx="420" cy="90" r="46" fill="#FFB38A"/>
 <path d="M0 250 C120 235 440 235 560 250 V420 H0Z" fill="url(#lag)"/>
 <g stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6"><path d="M60 290h70"/><path d="M380 300h90"/><path d="M200 330h60"/><path d="M430 360h50"/></g>
 <path d="M0 330 C150 300 300 310 560 345 V420 H0Z" fill="#F4E3C3"/>
 <g transform="translate(150 150)">
  <rect x="0" y="70" width="170" height="90" fill="#E9C9A0" stroke="#0F3B44" stroke-width="4"/>
  <path d="M-25 75 L85 10 L195 75Z" fill="#FF6F59" stroke="#0F3B44" stroke-width="4" stroke-linejoin="round"/>
  <rect x="20" y="95" width="130" height="40" fill="#0F3B44" opacity=".85"/>
  <text x="85" y="122" text-anchor="middle" font-family="Caveat, cursive" font-size="24" fill="#fff">Ti'Corail</text>
  <g stroke="#0F3B44" stroke-width="4"><path d="M10 160v28"/><path d="M160 160v28"/></g>
  <rect x="-10" y="185" width="70" height="8" fill="#B88A5A"/><rect x="110" y="185" width="70" height="8" fill="#B88A5A"/>
 </g>
 <g transform="translate(470 330)">
  <path d="M0 0 C-6 -70 4 -140 26 -200" stroke="#7A5233" stroke-width="10" fill="none" stroke-linecap="round"/>
  <g fill="#2E8B57"><path d="M26 -200 C-20 -230 -70 -210 -90 -180 C-50 -200 -10 -195 26 -200Z"/><path d="M26 -200 C60 -240 110 -230 130 -200 C90 -215 55 -205 26 -200Z"/><path d="M26 -200 C0 -250 30 -280 60 -285 C40 -260 35 -230 26 -200Z"/><path d="M26 -200 C70 -200 100 -170 105 -140 C80 -170 50 -185 26 -200Z"/></g>
 </g>
 </g>
</svg>"""

SITES.append(dict(
    slug="ti-corail", name="Ti'Corail", logo="Ti'Corail",
    title="Ti'Corail — Cuisine de la pêche locale sur la plage de Grand Cul-de-Sac, Saint-Barth",
    meta_desc="Ti'Corail, sur la plage du lagon de Grand Cul-de-Sac : une ardoise du jour autour de la pêche locale et des épices caribéennes, les pieds dans le sable.",
    theme_color="#0F3B44", favicon=fav("T", "#FF6F59", "#F2FBF9"),
    fonts=[("Caveat", "caveat-latin-600-normal.woff2", 600),
           ("Poppins", "poppins-latin-400-normal.woff2", 400), ("Poppins", "poppins-latin-600-normal.woff2", 600)],
    vars="--display:'Poppins',system-ui,sans-serif;--body:'Poppins',system-ui,sans-serif;--bg:#F2FBF9;--ink:#0F3B44;--accent:#FF6F59;--onaccent:#fff;--accent2:#138A8A;--card:#fff;--line:rgba(15,59,68,.13);--navbg:rgba(242,251,249,.92);--radius:18px;--dw:600",
    css="""
.logo{font-family:'Caveat',cursive;font-size:32px}
.hero .wrap{display:grid;grid-template-columns:1fr 1.05fr;gap:24px;align-items:center;padding-top:50px;padding-bottom:30px}
.hero h1{font-size:clamp(40px,6vw,68px);letter-spacing:-.02em}
.hero h1 .hand{font-family:'Caveat',cursive;font-weight:600;color:var(--accent);font-size:1.15em}
.hero p{font-size:19px;margin:16px 0 26px;max-width:470px}
.ardoise{background:#123B3F;color:#F2FBF9;border-radius:var(--radius);padding:34px;margin-top:36px}
.ardoise h3{font-family:'Caveat',cursive;font-size:38px;font-weight:600;color:#FFB38A}
.ardoise p{opacity:.9}
.menu{background:#E3F4F1}
@media (max-width:760px){.hero .wrap{grid-template-columns:1fr}.hero svg{max-width:420px;margin:0 auto}}
""",
    hero=f"""<section class="hero"><div class="wrap">
 <div>
  <p class="kicker"><span lang="fr">Plage du lagon · Grand Cul-de-Sac</span><span lang="en">Lagoon beach · Grand Cul-de-Sac</span></p>
  <h1><span lang="fr">La pêche du jour, <span class="hand">les pieds dans le sable</span></span><span lang="en">Today's catch, <span class="hand">toes in the sand</span></span></h1>
  <p><span lang="fr">Un « food-truck sans roues » posé au bord du lagon, et une ardoise qui change chaque jour.</span><span lang="en">A "food truck without wheels" on the edge of the lagoon, with a menu board that changes every day.</span></p>
  <div class="actions">
   <a class="btn main" href="tel:+590690417859"><span lang="fr">Réserver · 06 90 41 78 59</span><span lang="en">Book · +590 690 41 78 59</span></a>
   <a class="btn ghost" href="#carte"><span lang="fr">L'ardoise</span><span lang="en">The menu</span></a>
  </div>
 </div>
 {corail_svg}
</div></section>""",
    nav_menu=("L'ardoise", "Menu"),
    about_kicker=("Simple et sincère", "Simple and honest"),
    about_title=("Une cabane, un lagon, un chef", "A shack, a lagoon, a chef"),
    about=("Sur la plage du lagon de Grand Cul-de-Sac, Ti'Corail cuisine en toute simplicité les produits de l'île : le poisson des pêcheurs locaux, les herbes et légumes des jardins d'ici, relevés d'épices caribéennes. "
           "Aux fourneaux, le chef Yann Vinsot, passé par les cuisines du Cheval Blanc et du Toiny. On déjeune sous les tables couvertes, face à l'eau turquoise.",
           "On the lagoon beach at Grand Cul-de-Sac, Ti'Corail keeps things simple with island produce: fish from local fishermen, herbs and greens from local gardens, lifted with Caribbean spices. "
           "In the kitchen is chef Yann Vinsot, formerly of Cheval Blanc and Le Toiny. Lunch is served at covered tables facing the turquoise water."),
    menu_kicker=("Au menu", "On the menu"),
    menu_title=("Ce que la mer et l'île donnent", "What the sea and the island provide"),
    cards=[
        dict(fr="La pêche du jour", en="Catch of the day", dfr="Servie crue, grillée ou frite, selon l'arrivage.", den="Served raw, grilled or fried, depending on the catch.", ico=I_FISH),
        dict(fr="Tartare de poisson", en="Fish tartare", dfr="Le classique de la maison, avec le poisson du jour.", den="The house classic, made with the catch of the day.", ico=I_STAR),
        dict(fr="Épices caribéennes", en="Caribbean spices", dfr="Une cuisine créole et parfumée, sans chichis.", den="Fragrant, Creole-inspired cooking, no fuss.", ico=I_FIRE),
        dict(fr="Légumes des jardins", en="Garden greens", dfr="Herbes et légumes cultivés sur l'île.", den="Herbs and greens grown on the island.", ico=I_LEAF),
        dict(fr="Options végétariennes", en="Vegetarian options", dfr="Il y en a pour tout le monde autour de la table.", den="Something for everyone at the table.", ico=I_BOWL),
        dict(fr="Vue sur le lagon", en="Lagoon views", dfr="Tables couvertes sur le sable, face à l'eau.", den="Covered tables on the sand, facing the water.", ico=I_WAVE),
    ],
    menu_note=("Places limitées : pensez à réserver.", "Seating is limited: booking is recommended."),
    hours=[("Mercredi & jeudi", "Wednesday & Thursday", "Déjeuner", "Lunch"),
           ("Vendredi & samedi", "Friday & Saturday", "Déjeuner & début de soirée", "Lunch & early evening")],
    hours_note=("Horaires de saison : appelez-nous pour réserver.", "Seasonal hours: call us to book."),
    address=("Plage du lagon, Grand Cul-de-Sac<br>97133 Saint-Barthélemy", "Lagoon beach, Grand Cul-de-Sac<br>97133 St. Barthélemy"),
    tel_e164="+590690417859", tel_display="06 90 41 78 59", email="ticorailsbh@gmail.com",
    maps="https://www.google.com/maps/search/?api=1&query=17.9096,-62.80335",
    cta_call=("Appeler", "Call"),
))

# ───────────────────────── 7. L'ESPRIT ─────────────────────────
esprit_svg = """
<svg class="jungle" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
 <defs><radialGradient id="glow" cx="50%" cy="55%" r="45%"><stop offset="0" stop-color="#C9A86A" stop-opacity=".28"/><stop offset="1" stop-color="#C9A86A" stop-opacity="0"/></radialGradient></defs>
 <rect width="1200" height="600" fill="url(#glow)"/>
 <g fill="#1F3329">
  <path d="M0 0 C120 60 160 160 140 260 C110 200 60 150 0 130Z"/>
  <path d="M0 220 C140 230 230 320 240 430 C190 370 110 330 0 330Z"/>
  <path d="M0 420 C110 440 170 520 180 600 H0Z"/>
  <path d="M1200 0 C1080 60 1040 160 1060 260 C1090 200 1140 150 1200 130Z"/>
  <path d="M1200 220 C1060 230 970 320 960 430 C1010 370 1090 330 1200 330Z"/>
  <path d="M1200 420 C1090 440 1030 520 1020 600 H1200Z"/>
 </g>
 <g fill="none" stroke="#2C4A3B" stroke-width="3">
  <path d="M0 130 C50 150 100 200 140 260"/><path d="M0 330 C90 340 170 380 240 430"/><path d="M1200 130 C1150 150 1100 200 1060 260"/><path d="M1200 330 C1110 340 1030 380 960 430"/>
 </g>
</svg>"""

SITES.append(dict(
    slug="l-esprit", name="L'Esprit Jean-Claude Dufour", logo="L'Esprit",
    title="L'Esprit Jean-Claude Dufour — Restaurant gastronomique à Saline, Saint-Barth",
    meta_desc="L'Esprit Jean-Claude Dufour, route de Saline : cuisine d'auteur, menus renouvelés selon la saison, dans un jardin tropical couvert. Dîner du mardi au samedi.",
    theme_color="#14201A", favicon=fav("E", "#14201A", "#C9A86A"),
    fonts=[("Cormorant Garamond", "cormorant-garamond-latin-500-normal.woff2", 500), ("Cormorant Garamond", "cormorant-garamond-latin-600-normal.woff2", 600),
           ("Cormorant Garamond", "cormorant-garamond-latin-500-italic.woff2", 500, "italic"),
           ("Jost", "jost-latin-300-normal.woff2", 300), ("Jost", "jost-latin-400-normal.woff2", 400), ("Jost", "jost-latin-500-normal.woff2", 500)],
    vars="--display:'Cormorant Garamond',Georgia,serif;--body:'Jost',system-ui,sans-serif;--bg:#14201A;--ink:#F1EADC;--accent:#C9A86A;--onaccent:#14201A;--accent2:#C9A86A;--card:#1B2A22;--line:rgba(241,234,220,.14);--navbg:rgba(20,32,26,.9);--radius:2px;--dw:500",
    css="""
body{font-weight:300}
.pilote{background:#C9A86A;color:#14201A}
.logo{font-style:italic;font-size:30px}
.hero{position:relative;min-height:640px;display:flex;align-items:center;text-align:center;overflow:hidden}
.hero .jungle{position:absolute;inset:0;width:100%;height:100%}
.hero .wrap{position:relative}
.hero .sig{font-family:var(--display);font-style:italic;font-size:26px;color:var(--accent)}
.hero h1{font-size:clamp(64px,11vw,140px);font-weight:500;line-height:.95;margin:6px 0 14px}
.hero p{font-size:19px;max-width:520px;margin:0 auto 30px;opacity:.85}
.hero .actions{justify-content:center}
.btn{text-transform:uppercase;letter-spacing:.14em;font-size:13px;font-weight:500}
.about{text-align:center}.about .lead{margin:0 auto}
.card h3{color:var(--accent)}
.contact-list a{border-bottom-color:var(--accent)}
.callbar .btn.ghost{color:var(--ink)}
@media (max-width:760px){.hero{min-height:560px}}
""",
    hero=f"""<section class="hero">{esprit_svg}<div class="wrap">
 <p class="sig">Jean-Claude Dufour</p>
 <h1>L'Esprit</h1>
 <p><span lang="fr">Une cuisine d'auteur, dans un jardin tropical à deux pas de la plage de Saline.</span><span lang="en">Chef-driven cuisine in a tropical garden, a short walk from Saline beach.</span></p>
 <div class="actions">
  <a class="btn main" href="tel:+590590524610"><span lang="fr">Réserver une table</span><span lang="en">Book a table</span></a>
  <a class="btn ghost" href="#carte"><span lang="fr">La cuisine</span><span lang="en">The cuisine</span></a>
 </div>
</div></section>""",
    nav_menu=("La cuisine", "Cuisine"),
    about_kicker=("Le restaurant", "The restaurant"),
    about_title=("Comme reçu à la maison", "Like being welcomed home"),
    about=("Jean-Claude Dufour cuisine à Saint-Barth depuis plus de vingt-cinq ans. Avec Sonia, il vous accueille sur la route de Saline, dans un jardin tropical couvert, "
           "pour une cuisine française personnelle et ouverte sur le monde, où chaque assiette porte sa signature.",
           "Jean-Claude Dufour has been cooking in St. Barth for more than twenty-five years. With Sonia, he welcomes you on the road to Saline, in a covered tropical garden, "
           "for personal French cuisine open to the world, where every plate carries his signature."),
    menu_kicker=("La cuisine", "The cuisine"),
    menu_title=("Chaque dîner, une découverte", "Every dinner, a discovery"),
    cards=[
        dict(fr="Une cuisine d'auteur", en="Chef-driven cuisine", dfr="Française, intuitive, nourrie par un parcours entre la France, le Sénégal et Saint-Barth.", den="French and intuitive, shaped by a journey from France to Senegal to St. Barth.", ico=I_STAR),
        dict(fr="Au fil des saisons", en="Seasonal menus", dfr="La carte se renouvelle selon les produits du moment et l'inspiration du chef.", den="The menu changes with the season, the best produce and the chef's inspiration.", ico=I_LEAF),
        dict(fr="Les sauces signature", en="Signature sauces", dfr="Le savoir-faire qui fait la réputation de la maison.", den="The craft the house is known for.", ico=I_DROP),
        dict(fr="La cave", en="The wine list", dfr="Une belle sélection de vins, à prix justes.", den="A fine selection of wines, fairly priced.", ico=I_GLASS),
        dict(fr="Pour chaque convive", en="For every guest", dfr="Des options végétariennes, vegan et sans gluten.", den="Vegetarian, vegan and gluten-free options.", ico=I_SPARK),
        dict(fr="Un jardin tropical", en="A tropical garden", dfr="Un cadre intime et verdoyant, à quelques minutes de la plage.", den="An intimate, leafy setting, minutes from the beach.", ico=I_SUN),
    ],
    hours=[("Mardi – samedi", "Tuesday – Saturday", "Dîner, dès 19h", "Dinner, from 7 pm"),
           ("Dimanche & lundi", "Sunday & Monday", "Fermé", "Closed")],
    hours_note=("Réservation recommandée.", "Reservations recommended."),
    address=("Route de Saline, Salines<br>97133 Saint-Barthélemy", "Route de Saline, Salines<br>97133 St. Barthélemy"),
    tel_e164="+590590524610", tel_display="05 90 52 46 10", email="espritsbh@gmail.com",
    maps="https://www.google.com/maps/search/?api=1&query=" + quote("L'Esprit Jean-Claude Dufour, Saline, Saint-Barthélemy"),
    cta_call=("Réserver", "Book"),
))

# ───────────────────────── 8. WE PLAY ─────────────────────────
play_svg = """
<svg viewBox="0 0 480 400" role="img" aria-label="Cubes, ballon et cerf-volant">
 <g transform="translate(330 30) rotate(12)">
  <path d="M60 0 L110 60 L60 130 L10 60Z" fill="#FFBE0B" stroke="#22223B" stroke-width="4" stroke-linejoin="round"/>
  <path d="M60 0 L60 130 M10 60 L110 60" stroke="#22223B" stroke-width="3"/>
  <path d="M60 130 C40 170 80 190 55 230 C35 260 70 280 50 310" fill="none" stroke="#22223B" stroke-width="3"/>
  <path d="M50 175 l-14 -8 l4 16Z M58 230 l-15 -6 l6 15Z" fill="#FF5A5F"/>
 </g>
 <g stroke="#22223B" stroke-width="4" stroke-linejoin="round">
  <rect x="40" y="250" width="100" height="100" rx="10" fill="#3A86FF"/>
  <rect x="140" y="250" width="100" height="100" rx="10" fill="#FF5A5F"/>
  <rect x="90" y="150" width="100" height="100" rx="10" fill="#8AC926"/>
 </g>
 <g font-family="Poppins, sans-serif" font-weight="600" font-size="58" fill="#fff" text-anchor="middle">
  <text x="90" y="320">W</text><text x="190" y="320">E</text><text x="140" y="220">!</text>
 </g>
 <circle cx="330" cy="300" r="55" fill="#fff" stroke="#22223B" stroke-width="4"/>
 <path d="M275 300 a55 55 0 0 1 110 0" fill="#FF5A5F" stroke="#22223B" stroke-width="4"/>
 <path d="M300 255 C320 290 340 290 360 255" fill="none" stroke="#22223B" stroke-width="4"/>
 <circle cx="330" cy="300" r="10" fill="#FFBE0B" stroke="#22223B" stroke-width="4"/>
 <ellipse cx="200" cy="372" rx="180" ry="10" fill="#22223B" opacity=".08"/>
</svg>"""

SITES.append(dict(
    slug="we-play", name="We Play", logo="We Play<span style='color:var(--accent)'>!</span>",
    title="We Play — Boutique de jouets et de jeux à Saint-Jean, Saint-Barth",
    meta_desc="We Play, centre Neptune à Saint-Jean : la boutique de jouets et de jeux de Saint-Barth, pour tous les âges. Ouvert du lundi au samedi.",
    theme_color="#22223B", favicon=fav("W", "#FF5A5F", "#FFFDF6"),
    fonts=[("Poppins", "poppins-latin-400-normal.woff2", 400), ("Poppins", "poppins-latin-600-normal.woff2", 600),
           ("Caveat", "caveat-latin-600-normal.woff2", 600)],
    vars="--display:'Poppins',system-ui,sans-serif;--body:'Poppins',system-ui,sans-serif;--bg:#FFFDF6;--ink:#22223B;--accent:#FF5A5F;--onaccent:#fff;--accent2:#3A86FF;--card:#fff;--line:rgba(34,34,59,.13);--navbg:rgba(255,253,246,.94);--radius:22px;--dw:600",
    css="""
.logo{font-weight:600;font-size:26px}
.hero{background:linear-gradient(180deg,#FFF3C4 0%,#FFFDF6 100%)}
.hero .wrap{display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:center;padding-top:50px;padding-bottom:50px}
.hero h1{font-size:clamp(42px,6.5vw,76px);letter-spacing:-.03em}
.hero h1 .s{font-family:'Caveat',cursive;color:var(--accent);font-size:1.1em}
.hero p{font-size:19px;margin:16px 0 26px;max-width:460px}
.menu .card:nth-child(4n+1) .ico{color:#FF5A5F}.menu .card:nth-child(4n+2) .ico{color:#3A86FF}
.menu .card:nth-child(4n+3) .ico{color:#8AC926}.menu .card:nth-child(4n) .ico{color:#FFBE0B}
.card{box-shadow:0 6px 0 rgba(34,34,59,.08)}
@media (max-width:760px){.hero .wrap{grid-template-columns:1fr}.hero svg{max-width:360px;margin:0 auto}}
""",
    hero=f"""<section class="hero"><div class="wrap">
 <div>
  <p class="kicker"><span lang="fr">Centre Neptune · Saint-Jean</span><span lang="en">Neptune centre · Saint-Jean</span></p>
  <h1><span lang="fr">Ici, on joue <span class="s">pour de vrai !</span></span><span lang="en">Where play <span class="s">gets real!</span></span></h1>
  <p><span lang="fr">La boutique de jouets et de jeux de Saint-Barth, pour les petits, les grands et tous ceux qui ont gardé l'envie de jouer.</span><span lang="en">St. Barth's toy and game shop, for little ones, big ones and anyone who still loves to play.</span></p>
  <div class="actions">
   <a class="btn main" href="tel:+590690559268"><span lang="fr">Appeler · 06 90 55 92 68</span><span lang="en">Call · +590 690 55 92 68</span></a>
   <a class="btn ghost" href="#infos"><span lang="fr">Horaires</span><span lang="en">Opening hours</span></a>
  </div>
 </div>
 {play_svg}
</div></section>""",
    nav_menu=("La boutique", "The shop"),
    about_kicker=("La boutique", "The shop"),
    about_title=("Des jouets à deux pas de chez vous", "Toys right here on the island"),
    about=("Au centre Neptune, à Saint-Jean, We Play réunit jouets et jeux pour tous les âges. "
           "Un anniversaire, Noël, une journée de pluie ou des vacances en famille : passez nous voir, on vous aide à trouver le bon cadeau.",
           "At the Neptune centre in Saint-Jean, We Play brings together toys and games for all ages. "
           "A birthday, Christmas, a rainy day or a family holiday: drop by and we'll help you find the right gift."),
    menu_kicker=("Chez We Play", "At We Play"),
    menu_title=("Pour toutes les envies de jouer", "Something for every kind of play"),
    cards=[
        dict(fr="Pour les tout-petits", en="For little ones", dfr="Des premiers jouets pour éveiller et amuser.", den="First toys to stimulate and delight.", ico=I_STAR),
        dict(fr="Jeux de société", en="Board games", dfr="Pour les soirées en famille ou entre amis.", den="For evenings with family or friends.", ico=I_SPARK),
        dict(fr="Créer & imaginer", en="Create & imagine", dfr="De quoi construire, dessiner et inventer.", den="Things to build, draw and invent.", ico=I_PIE),
        dict(fr="Idées cadeaux", en="Gift ideas", dfr="Anniversaires, Noël, petites attentions.", den="Birthdays, Christmas, little treats.", ico=I_BAG),
        dict(fr="Pour les vacances", en="Holiday fun", dfr="Pour occuper les enfants en vacances sur l'île.", den="To keep kids busy on their island holiday.", ico=I_SUN),
        dict(fr="Des conseils", en="Friendly advice", dfr="On vous aide à choisir selon l'âge et les goûts.", den="We'll help you choose by age and interests.", ico=I_DROP),
    ],
    hours=[("Lundi – samedi", "Monday – Saturday", "9h30 – 13h · 15h – 19h", "9:30 am – 1 pm · 3 – 7 pm"),
           ("Dimanche", "Sunday", "Fermé", "Closed")],
    address=("Centre Neptune, Saint-Jean<br>97133 Saint-Barthélemy", "Neptune centre, Saint-Jean<br>97133 St. Barthélemy"),
    tel_e164="+590690559268", tel_display="06 90 55 92 68", email="weplaysbh@gmail.com",
    maps="https://www.google.com/maps/search/?api=1&query=" + quote("Centre Neptune, Saint-Jean, Saint-Barthélemy"),
    cta_call=("Appeler", "Call"),
))

LOT = ["les-bananiers", "ti-salon", "ti-corail", "l-esprit", "we-play"]

# ───────────────────────── 9. BRIN D'ÎLE ─────────────────────────
brin_svg = """
<svg viewBox="0 0 480 420" role="img" aria-label="Sandales sur le sable">
 <defs><radialGradient id="sab" cx="50%" cy="55%" r="60%"><stop offset="0" stop-color="#F6E3C6"/><stop offset="1" stop-color="#EBCB9E"/></radialGradient></defs>
 <circle cx="240" cy="215" r="190" fill="url(#sab)"/>
 <g fill="#D9B07A" opacity=".55"><ellipse cx="110" cy="320" rx="16" ry="9"/><ellipse cx="135" cy="290" rx="14" ry="8"/><ellipse cx="375" cy="140" rx="16" ry="9"/><ellipse cx="350" cy="110" rx="14" ry="8"/></g>
 <g transform="translate(118 100) rotate(-12)">
  <path d="M40 0 C80 0 92 40 88 100 C85 160 80 220 46 230 C12 232 0 170 2 100 C4 40 10 0 40 0Z" fill="#B5532E"/>
  <path d="M40 8 C74 8 82 42 79 100 C76 158 72 214 46 221 C20 222 10 168 12 100 C14 44 18 8 40 8Z" fill="#F3D9B8"/>
  <path d="M10 70 C30 95 60 95 82 70" fill="none" stroke="#1F5F5B" stroke-width="16" stroke-linecap="round"/>
  <path d="M14 130 C34 150 58 150 78 130" fill="none" stroke="#1F5F5B" stroke-width="12" stroke-linecap="round"/>
 </g>
 <g transform="translate(275 105) rotate(10)">
  <path d="M40 0 C80 0 92 40 88 100 C85 160 80 220 46 230 C12 232 0 170 2 100 C4 40 10 0 40 0Z" fill="#B5532E"/>
  <path d="M40 8 C74 8 82 42 79 100 C76 158 72 214 46 221 C20 222 10 168 12 100 C14 44 18 8 40 8Z" fill="#F3D9B8"/>
  <path d="M10 70 C30 95 60 95 82 70" fill="none" stroke="#1F5F5B" stroke-width="16" stroke-linecap="round"/>
  <path d="M14 130 C34 150 58 150 78 130" fill="none" stroke="#1F5F5B" stroke-width="12" stroke-linecap="round"/>
 </g>
 <path d="M70 70 q10 -14 20 0 q10 -14 20 0" fill="none" stroke="#1F5F5B" stroke-width="3" stroke-linecap="round" opacity=".5"/>
</svg>"""

SITES.append(dict(
    slug="brin-d-ile", name="Brin d'Île", logo="Brin d'Île",
    title="Brin d'Île — Boutique de chaussures au centre L'Îlot, Lorient, Saint-Barth",
    meta_desc="Brin d'Île, boutique de chaussures au centre commercial L'Îlot à Lorient, Saint-Barthélemy. Ouvert du lundi au samedi.",
    theme_color="#1F5F5B", favicon=fav("B", "#B5532E", "#FBF5EC"),
    fonts=[("DM Serif Display", "dm-serif-display-latin-400-normal.woff2", 400), ("DM Serif Display", "dm-serif-display-latin-400-italic.woff2", 400, "italic"),
           ("DM Sans", "dm-sans-latin-400-normal.woff2", 400), ("DM Sans", "dm-sans-latin-700-normal.woff2", 700)],
    vars="--display:'DM Serif Display',Georgia,serif;--body:'DM Sans',system-ui,sans-serif;--bg:#FBF5EC;--ink:#23312F;--accent:#1F5F5B;--onaccent:#fff;--accent2:#B5532E;--card:#fff;--line:rgba(35,49,47,.13);--navbg:rgba(251,245,236,.92);--radius:16px",
    css="""
.hero .wrap{display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:center;padding-top:50px;padding-bottom:40px}
.hero h1{font-size:clamp(46px,7vw,86px)}
.hero h1 em{color:var(--accent2)}
.hero p{font-size:19px;margin:16px 0 26px;max-width:460px}
.menu{background:#F4EADB}
@media (max-width:760px){.hero .wrap{grid-template-columns:1fr}.hero svg{max-width:360px;margin:0 auto}}
""",
    hero=f"""<section class="hero"><div class="wrap">
 <div>
  <p class="kicker"><span lang="fr">Centre L'Îlot · Lorient</span><span lang="en">L'Îlot centre · Lorient</span></p>
  <h1><span lang="fr">Bien chaussé, <em>de la plage à la ville</em></span><span lang="en">Well shod, <em>from beach to town</em></span></h1>
  <p><span lang="fr">Votre boutique de chaussures à Lorient. Passez essayer, ou réservez en ligne et venez chercher.</span><span lang="en">Your shoe shop in Lorient. Drop in to try on, or reserve online and collect.</span></p>
  <div class="actions">
   <a class="btn main" href="tel:+590690754049"><span lang="fr">Appeler · 06 90 75 40 49</span><span lang="en">Call · +590 690 75 40 49</span></a>
   <a class="btn ghost" href="#infos"><span lang="fr">Horaires</span><span lang="en">Opening hours</span></a>
  </div>
 </div>
 {brin_svg}
</div></section>""",
    nav_menu=("La boutique", "The shop"),
    about_kicker=("La boutique", "The shop"),
    about_title=("Des chaussures pour la vie sur l'île", "Shoes for island life"),
    about=("Au centre commercial L'Îlot, à Lorient, Brin d'Île vous accueille du lundi au samedi. "
           "Prenez le temps d'essayer : on vous conseille pour trouver la bonne paire, pour la plage comme pour la ville.",
           "At L'Îlot shopping centre in Lorient, Brin d'Île welcomes you Monday to Saturday. "
           "Take your time trying on: we'll help you find the right pair, for the beach or for town."),
    menu_kicker=("Chez Brin d'Île", "At Brin d'Île"),
    menu_title=("Venez essayer", "Come and try on"),
    cards=[
        dict(fr="Conseil & essayage", en="Advice & fitting", dfr="On prend le temps de trouver la bonne pointure et le bon modèle.", den="We take the time to find the right size and style.", ico=I_STAR),
        dict(fr="Pour la plage", en="For the beach", dfr="De quoi marcher pieds au frais, du sable à la terrasse.", den="Cool footwear from the sand to the terrace.", ico=I_SUN),
        dict(fr="Pour la ville", en="For town", dfr="Des modèles pour tous les jours et les sorties.", den="Styles for every day and evenings out.", ico=I_LEAF),
        dict(fr="Nouveautés", en="New arrivals", dfr="Passez voir les derniers arrivages en boutique.", den="Drop by to see the latest arrivals.", ico=I_SPARK),
        dict(fr="Click & collect", en="Click & collect", dfr="Réservez en ligne, essayez et réglez en boutique.", den="Reserve online, try on and pay in store.", ico=I_BAG),
        dict(fr="Idées cadeaux", en="Gift ideas", dfr="Une paire à offrir ? On vous aide à choisir.", den="A pair as a gift? We'll help you choose.", ico=I_DROP),
    ],
    hours=[("Lundi – samedi", "Monday – Saturday", "9h30 – 13h · 15h – 18h30", "9:30 am – 1 pm · 3 – 6:30 pm"),
           ("Dimanche", "Sunday", "Fermé", "Closed")],
    address=("Centre commercial L'Îlot, Lorient<br>97133 Saint-Barthélemy", "L'Îlot shopping centre, Lorient<br>97133 St. Barthélemy"),
    tel_e164="+590690754049", tel_display="06 90 75 40 49", email="brindile.sbh@gmail.com",
    maps="https://www.google.com/maps/search/?api=1&query=" + quote("Centre commercial L'Îlot, Lorient, Saint-Barthélemy"),
    cta_call=("Appeler", "Call"),
))

# ───────── Paramètres de l'espace de gestion (type, créneaux, exemples) ─────────
GESTION = {
    "les-bananiers": dict(type="restaurant", gestion_couleur="#2F6B45",
        creneaux=dict(ouv="11:30", fer="21:30", pas=30, fermes=[0, 1]),
        exemples=dict(produits=[["Pizza du moment (exemple)", "À emporter, pâte fine."], ["Plat du jour à emporter (exemple)", "Selon les suggestions du chef."]],
                      stock=[["Farine (exemple)", 3, "sac(s)", 2], ["Mozzarella (exemple)", 4, "kg", 5], ["Vin rouge (exemple)", 24, "bouteille(s)", 12], ["Boîtes à pizza (exemple)", 60, "pièce(s)", 50]])),
    "ti-salon": dict(type="salon", gestion_couleur="#8A5A44",
        creneaux=dict(ouv="10:00", fer="18:00", pas=30, fermes=[0, 1]),
        exemples=dict(produits=[["Soin réparateur (exemple)", "À utiliser à la maison après votre passage au salon."], ["Shampooing doux (exemple)", "Pour cheveux exposés au soleil et au sel."]],
                      stock=[["Soin réparateur (exemple)", 6, "flacon(s)", 3], ["Shampooing doux (exemple)", 2, "flacon(s)", 3], ["Coloration (exemple)", 12, "tube(s)", 5]])),
    "ti-corail": dict(type="restaurant", gestion_couleur="#138A8A",
        creneaux=dict(ouv="12:00", fer="14:30", pas=30, fermes=[0, 1, 2]),
        exemples=dict(produits=[["Plat du jour à emporter (exemple)", "Selon la pêche du jour."], ["Tartare de poisson à emporter (exemple)", "Avec le poisson du jour."]],
                      stock=[["Poisson du jour (exemple)", 6, "kg", 3], ["Barquettes à emporter (exemple)", 30, "pièce(s)", 40], ["Citrons verts (exemple)", 50, "pièce(s)", 20]])),
    "we-play": dict(type="boutique", gestion_couleur="#3A86FF",
        creneaux=dict(ouv="09:30", fer="18:30", pas=30, fermes=[0]),
        exemples=dict(produits=[["Jeu de société (exemple)", "Pour jouer en famille."], ["Jouet d'éveil (exemple)", "Pour les tout-petits."], ["Jeu de plage (exemple)", "Pour s'amuser au bord de l'eau."]],
                      stock=[["Jeu de société (exemple)", 5, "pièce(s)", 2], ["Jouet d'éveil (exemple)", 1, "pièce(s)", 2], ["Jeu de plage (exemple)", 12, "pièce(s)", 4]])),
    "brin-d-ile": dict(type="boutique", gestion_couleur="#1F5F5B",
        creneaux=dict(ouv="09:30", fer="18:00", pas=30, fermes=[0]),
        exemples=dict(produits=[["Sandales (exemple)", "Légères, pour la plage et la ville."], ["Baskets (exemple)", "Pour tous les jours."]],
                      stock=[["Sandales — pointure 38 (exemple)", 3, "paire(s)", 2], ["Sandales — pointure 40 (exemple)", 1, "paire(s)", 2], ["Baskets — pointure 42 (exemple)", 4, "paire(s)", 2]])),
}
for _s in SITES:
    if _s["slug"] in GESTION:
        _s.update(GESTION[_s["slug"]])

LOT = ["les-bananiers", "ti-salon", "ti-corail", "we-play", "brin-d-ile"]
