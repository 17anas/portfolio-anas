# 📧 Activer l'envoi d'email direct (sans ouvrir l'application)

Actuellement, le formulaire utilise **mailto** qui ouvre votre client email. Pour envoyer directement sans ouvrir d'application, vous devez configurer **EmailJS**.

## 🚀 Configuration rapide EmailJS (5 minutes)

### Étape 1 : Créer un compte EmailJS
1. Allez sur https://www.emailjs.com/
2. Cliquez sur "Sign Up" (gratuit)
3. Créez votre compte

### Étape 2 : Connecter Gmail
1. Dans le dashboard, allez dans **"Email Services"**
2. Cliquez sur **"Add New Service"**
3. Sélectionnez **"Gmail"**
4. Connectez votre compte Gmail (aelmouanid1@gmail.com)
5. **Copiez le Service ID** (ex: `service_abc123`)

### Étape 3 : Créer un template
1. Allez dans **"Email Templates"**
2. Cliquez sur **"Create New Template"**
3. Utilisez ce template :

**To Email:** `{{to_email}}` ou mettez directement `aelmouanid1@gmail.com`

**Subject:** `{{subject}}`

**Content:**
```
Bonjour Anas,

Vous avez reçu un nouveau message depuis votre portfolio :

Nom: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Ce message a été envoyé depuis le formulaire de contact de votre portfolio.
```

4. **Copiez le Template ID** (ex: `template_xyz789`)

### Étape 4 : Obtenir votre Public Key
1. Allez dans **"Account"** > **"General"**
2. **Copiez votre Public Key** (ex: `abc123xyz456`)

### Étape 5 : Activer dans le code
Ouvrez `script.js` et modifiez ces lignes (vers la ligne 142) :

```javascript
// Changez ces valeurs :
const EMAILJS_ENABLED = true; // ← Changez false en true
const EMAILJS_PUBLIC_KEY = "abc123xyz456"; // ← Votre Public Key
const EMAILJS_SERVICE_ID = "service_abc123"; // ← Votre Service ID  
const EMAILJS_TEMPLATE_ID = "template_xyz789"; // ← Votre Template ID
```

### ✅ C'est tout !
Après avoir fait ces modifications, le formulaire enverra les emails directement sans ouvrir d'application.

**Test :** Remplissez le formulaire et cliquez sur "Envoyer". Vous devriez recevoir l'email directement dans votre boîte Gmail !

---

## 💡 Alternative : Garder mailto (actuel)

Si vous préférez garder la solution actuelle (mailto), c'est déjà configuré et le message est maintenant formaté de manière professionnelle. L'utilisateur devra juste cliquer sur "Envoyer" dans son client email.

