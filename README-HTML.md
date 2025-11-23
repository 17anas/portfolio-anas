# Portfolio HTML - Anas Elmouanid

Portfolio moderne et attractif créé avec HTML, CSS et JavaScript pur.

## 📁 Fichiers

- `index.html` - Page principale du portfolio
- `styles.css` - Tous les styles CSS
- `script.js` - Toutes les interactions JavaScript

## 🚀 Utilisation

### Option 1 : Ouvrir directement dans le navigateur

Double-cliquez sur `index.html` pour l'ouvrir dans votre navigateur.

### Option 2 : Serveur local (recommandé)

Pour éviter les problèmes CORS, utilisez un serveur local :

#### Avec Python :
```bash
python -m http.server 8000
```
Puis ouvrez : http://localhost:8000

#### Avec Node.js (http-server) :
```bash
npx http-server
```

#### Avec PHP :
```bash
php -S localhost:8000
```

## ✨ Fonctionnalités

- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Navigation fluide entre sections
- ✅ Animations au scroll
- ✅ Formulaire de contact
- ✅ Menu mobile
- ✅ Barres de progression animées
- ✅ Effets de parallaxe

## 🎨 Personnalisation

### Modifier les informations personnelles

Éditez directement `index.html` pour changer :
- Nom et titre
- Expériences
- Compétences
- Informations de contact
- Liens sociaux

### Modifier les couleurs

Dans `styles.css`, modifiez les variables CSS :
```css
:root {
    --primary: #6366f1;    /* Couleur principale */
    --secondary: #8b5cf6;  /* Couleur secondaire */
    --dark: #1e293b;       /* Couleur sombre */
    --light: #f8fafc;      /* Couleur claire */
}
```

### Ajouter votre CV

1. Placez votre fichier PDF dans le même dossier
2. Modifiez le lien dans `index.html` :
```html
<a href="votre-cv.pdf" class="btn btn--outline" download>
```

## 🌐 Déploiement

Vous pouvez déployer ce portfolio sur :
- GitHub Pages
- Netlify
- Vercel
- Tout hébergeur web statique

## 📝 Notes

- Les icônes utilisent Font Awesome (chargé via CDN)
- Le formulaire de contact nécessite une intégration backend pour fonctionner (actuellement il affiche juste une alerte)
- Pensez à mettre à jour les liens sociaux avec vos vrais profils

## 📧 Contact

Pour toute question ou personnalisation, n'hésitez pas à me contacter !

