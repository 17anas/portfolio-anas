# Configuration de l'envoi d'emails

Pour que le formulaire de contact envoie réellement des emails, vous avez besoin de configurer EmailJS (service gratuit).

## 📧 Méthode 1 : EmailJS (Recommandé)

### Étapes de configuration :

1. **Créer un compte EmailJS**
   - Allez sur https://www.emailjs.com/
   - Créez un compte gratuit (100 emails/mois gratuitement)

2. **Créer un service email**
   - Dans le dashboard EmailJS, allez dans "Email Services"
   - Cliquez sur "Add New Service"
   - Choisissez votre fournisseur d'email (Gmail, Outlook, etc.)
   - Suivez les instructions pour connecter votre email
   - **Notez votre Service ID** (ex: `service_xxxxx`)

3. **Créer un template**
   - Allez dans "Email Templates"
   - Cliquez sur "Create New Template"
   - Utilisez ce template :
   ```
   Sujet: {{subject}}
   
   De: {{from_name}}
   Email: {{from_email}}
   
   Message:
   {{message}}
   ```
   - **Notez votre Template ID** (ex: `template_xxxxx`)

4. **Obtenir votre Public Key**
   - Allez dans "Account" > "General"
   - Copiez votre "Public Key"

5. **Configurer le code**
   - Ouvrez le fichier `script.js`
   - Remplacez :
     - `YOUR_PUBLIC_KEY` par votre Public Key
     - `YOUR_SERVICE_ID` par votre Service ID
     - `YOUR_TEMPLATE_ID` par votre Template ID
   
   Exemple :
   ```javascript
   emailjs.init("abc123xyz"); // Votre Public Key
   
   // Plus bas dans le code :
   await emailjs.send(
       'service_abc123',      // Votre Service ID
       'template_xyz789',     // Votre Template ID
       { ... }
   );
   ```

## 📧 Méthode 2 : Formspree (Plus simple, alternative)

Si vous préférez une solution encore plus simple, vous pouvez utiliser Formspree :

1. Allez sur https://formspree.io/
2. Créez un compte gratuit
3. Créez un nouveau formulaire
4. Formspree vous donnera une URL (ex: `https://formspree.io/f/xxxxx`)
5. Modifiez le formulaire dans `index.html` pour ajouter `action` et `method` :

```html
<form class="contact-form" id="contact-form" action="https://formspree.io/f/VOTRE_ID" method="POST">
```

## 🎯 Solution temporaire (pour tester)

Si vous voulez juste tester sans configurer de service, le formulaire peut ouvrir le client email par défaut :

Remplacez dans `script.js` la partie du formulaire par :

```javascript
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Ouvrir le client email par défaut
    const mailtoLink = `mailto:aelmouanid1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`De: ${name} (${email})\n\n${message}`)}`;
    window.location.href = mailtoLink;
    
    showNotification('Ouverture de votre client email...', 'success');
});
```

## ✅ Vérification

Une fois configuré, testez le formulaire :
1. Remplissez tous les champs
2. Cliquez sur "Envoyer le message"
3. Vous devriez recevoir un email à l'adresse configurée

## 🆘 Aide

Si vous avez des problèmes :
- Vérifiez la console du navigateur (F12) pour les erreurs
- Vérifiez que tous les IDs sont correctement remplacés
- Assurez-vous que votre service EmailJS est bien connecté

