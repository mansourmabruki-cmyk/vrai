# U.N.A.M.DD – Fabriquer l'APK Android

Ce dossier est un **projet Capacitor prêt à compiler** : l'application web
(dans `www/`) est déjà en place, il ne reste qu'à générer l'APK.
Trois méthodes, de la plus simple à la plus technique.

---

## Méthode 1 – Dans le cloud, SANS rien installer (recommandée)

Un workflow GitHub Actions est fourni (`.github/workflows/build-apk.yml`).
Il compile l'APK automatiquement sur les serveurs de GitHub.

1. Créez un compte gratuit sur https://github.com .
2. Créez un nouveau dépôt (ex. `unamdd-app`).
3. Téléversez **tout le contenu de ce dossier** dans le dépôt
   (bouton *Add file → Upload files*, glissez les fichiers y compris `www/`).
4. Onglet **Actions** → le workflow *Build Android APK* se lance tout seul
   (ou cliquez *Run workflow*).
5. À la fin (≈ 5 min), ouvrez l'exécution → section **Artifacts** →
   téléchargez **UNAMDD-debug-apk**. Vous avez votre `app-debug.apk`.
6. Copiez l'APK sur un téléphone Android et installez-le
   (autorisez « Sources inconnues »).

---

## Méthode 2 – Sur votre ordinateur (Capacitor)

Prérequis : Node.js 18+, Java JDK 17, Android Studio (avec SDK).

```bash
# depuis ce dossier
npm install
npx cap add android
npx cap sync
# A) compiler directement en ligne de commande :
cd android && ./gradlew assembleDebug
#   -> android/app/build/outputs/apk/debug/app-debug.apk
# B) ou ouvrir dans Android Studio pour compiler / signer :
npx cap open android
```

---

## Méthode 3 – PWABuilder (sans Capacitor)

1. Hébergez le contenu de `www/` en HTTPS
   (Netlify, GitHub Pages, Vercel, Firebase Hosting…).
2. Allez sur https://www.pwabuilder.com , collez l'URL.
3. **Android → Generate Package** : vous obtenez un `.apk` / `.aab` signé,
   prêt pour le Play Store.

---

## Produire un APK signé (pour distribution)

```bash
cd android
keytool -genkey -v -keystore unamdd.keystore -alias unamdd -keyalg RSA -keysize 2048 -validity 10000
./gradlew assembleRelease
# puis signez app-release-unsigned.apk avec apksigner, ou utilisez Android Studio.
```

---

## Notes

- Le plugin `@capacitor/geolocation` est inclus pour un GPS natif fiable.
  Après `cap add android`, la permission de localisation est gérée par Android ;
  l'application demande l'autorisation au premier usage du bouton GPS.
- L'icône et le nom de l'app proviennent de `capacitor.config.json`
  et de `www/assets/`. Pour des icônes adaptatives complètes, utilisez
  `@capacitor/assets` (optionnel).
- Le logiciel (navigateur) et l'APK partagent les mêmes données via l'espace
  cloud configuré dans **Paramètres** (voir le Guide dans l'application).
