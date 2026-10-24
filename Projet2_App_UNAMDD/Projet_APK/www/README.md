# U.N.A.M.DD – Bureau d'Exploration
### Application de gestion (Société Minière sarl)

Application web professionnelle, **100 % hors-ligne** (aucun serveur requis), pour :

1. **Rapports d'exploration** – personnel & affectation, positionnement GPS / concession,
   spécifications techniques dynamiques (Puits / Tranchée / Sondage), rendement & suivi.
2. **Évaluation des agents** – grille de compétences notes 1–4 (Technique / Rendement /
   Savoir-être), calcul automatique de la note globale et de la mention, synthèse,
   plan d'action et signatures.
3. **Archives** – historique de tous les rapports et évaluations (modifiables, supprimables),
   export / restauration des données au format JSON.
4. **Paramètres** – **tout est modifiable** : liste des géologues/agents, des périmètres (PE)
   et des critères d'évaluation.

Les données sont enregistrées localement sur l'appareil (localStorage) : elles restent
disponibles sans connexion internet.

### Fonctions avancées
- **Carte interactive** (Leaflet / OpenStreetMap) : tous les sites géolocalisés sont
  plottés automatiquement, colorés selon la décision (vert / orange / rouge).
- **Feuille de coordonnées automatique** alimentée dès qu'un rapport est géolocalisé.
- **Photos** du site et des échantillons (compressées et stockées dans le rapport).
- **Échantillons** et **décision sur le site** (favorable / à confirmer / défavorable).
- **Envoyer au DG** (rapport) et **Envoyer à l'agent** (évaluation) via partage natif,
  e-mail ou WhatsApp.
- **Tableau de bord récapitulatif** : rendement moyen, sites favorables, échantillons,
  répartition des décisions, activité récente.
- **Exports** : JSON (sauvegarde complète), CSV (rapports, évaluations, coordonnées), PDF.
- **Liste d'agents non exhaustive** : saisie libre, ajout automatique.
- **Synchronisation cloud** : l'APK et le logiciel partagent les mêmes données via un
  espace cloud (Firebase RTDB ou API REST) dès qu'une connexion est disponible.
- **Guide intégré** (onglet Guide) + ce fichier README.

---

## 1. Utiliser l'application tout de suite

Ouvrez simplement **`index.html`** dans un navigateur (Chrome, Edge, Firefox) sur
ordinateur ou smartphone.

## 2. L'installer comme une « vraie » application (PWA)

L'application est une **Progressive Web App** : elle peut s'installer sur l'écran
d'accueil du téléphone et fonctionner hors-ligne.

Pour que l'installation fonctionne, les fichiers doivent être servis en HTTPS
(ou en local). Deux options :

- **Hébergement gratuit** : déposez le dossier sur Netlify, GitHub Pages,
  Vercel ou Firebase Hosting. Ouvrez l'URL sur Android → menu Chrome →
  « Ajouter à l'écran d'accueil / Installer l'application ».
- **Test local** : lancez un petit serveur depuis le dossier :
  ```bash
  python3 -m http.server 8080
  ```
  puis ouvrez `http://localhost:8080`.

## 3. Générer un fichier APK Android

Comme l'application est une PWA, le plus simple est de l'emballer en APK :

### Option A – PWABuilder (sans coder, recommandé)
1. Hébergez le dossier en HTTPS (voir étape 2).
2. Allez sur https://www.pwabuilder.com, collez l'URL.
3. Cliquez sur **Android → Generate Package**. Vous obtenez un `.apk` /
   `.aab` signé, prêt à installer ou à publier sur le Play Store.

### Option B – Capacitor (pour développeurs)
```bash
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "UNAMDD" "cd.unamdd.exploration" --web-dir=.
npx cap add android
npx cap sync
npx cap open android   # ouvre Android Studio pour compiler l'APK
```

### Option C – Bubblewrap (ligne de commande Google)
```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest https://VOTRE-URL/manifest.webmanifest
bubblewrap build   # produit app-release-signed.apk
```

---

## 4. Connecter l'APK et le logiciel (cloud partagé)

1. Créez une base **Firebase Realtime Database** gratuite sur
   https://console.firebase.google.com (Règles de test pour commencer).
2. Récupérez l'URL, ex. `https://votre-projet.firebaseio.com/unamdd.json`.
3. Dans l'application (logiciel **et** APK), ouvrez **Paramètres → Espace cloud**,
   collez l'URL (et un jeton si besoin), puis **Enregistrer**.
4. Boutons **Envoyer** / **Récupérer** (onglet Accueil ou Paramètres) : dès qu'une
   connexion existe, les deux appareils partagent les mêmes données.

> Toute API REST acceptant `GET` et `PUT` d'un objet JSON fonctionne également.
> Sans cloud, l'application reste 100 % fonctionnelle en local.

## Contenu du dossier
```
index.html            Interface (pages Accueil / Exploration / Évaluation / Archives / Paramètres)
styles.css            Charte graphique professionnelle (bleu nuit + or)
app.js                Logique : formulaires dynamiques, calculs, stockage, import/export
manifest.webmanifest  Déclaration PWA (nom, icônes, couleurs)
sw.js                 Service worker (fonctionnement hors-ligne)
assets/               Logo et icônes de l'application
```

> Astuce : le bouton **« Exporter PDF »** de chaque formulaire utilise l'impression
> du navigateur — choisissez « Enregistrer au format PDF » comme imprimante.
