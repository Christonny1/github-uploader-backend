# GitHub Image Uploader - Backend (Render Ready)

Ce backend permet de recevoir une image via HTTP POST et de la stocker directement dans un dépôt GitHub public via l’API GitHub.

## Déploiement sur Render

1. Poussez ce projet dans un nouveau dépôt GitHub.
2. Allez sur https://render.com et créez un **Web Service**.
3. Remplissez :
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: `Node`
4. Ajoutez une **variable d'environnement** :  
   `GITHUB_TOKEN = votre_token_personnel`
5. Cliquez sur "Deploy".

## Exemple d'appel POST

```bash
POST /upload
FormData : image (fichier)
```

## Exemple de retour :

```json
{
  "url": "https://raw.githubusercontent.com/..."
}
```