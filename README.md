# Sites pilotes Kapicua (Saint-Barthélemy)

Chaque commerce a :
- `public/<commerce>/` — le site public (FR/EN), avec réservations / rendez-vous et click & collect ;
- `public/<commerce>/gestion/` — l'espace de gestion (ordinateur, tablette, téléphone ; installable comme une app) :
  accueil, réservations/RDV, click & collect, produits, caisse (ventes, dépenses, bilan), stock & fournisseurs, clients, « Mon site », réglages.

Générer : `python3 build.py` (contenus dans `contenus.py`, code commun dans `app/`).

## Modes
- `demo` (par défaut, pilotes) : les données restent sur l'appareil, code 0000.
- `serveur` (commerce client) : données en ligne via `functions/api/[[path]].js`.
  1. Cloudflare Pages > Settings > Functions > KV namespace bindings : variable `KP`.
  2. Dans KV, créer la clé `pin-initial:<commerce>` = code remis au client.
  3. Dans `contenus.py`, mettre `mode="serveur"` pour ce commerce, regénérer, pousser.

Hébergement : Cloudflare Pages, dossier de sortie `public`, sans commande de build.
