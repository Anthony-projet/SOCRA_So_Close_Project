# So-Close Project

Ce projet fait partie du cours SOCRA d'EPITA SIGL 2026.

## Description

So-Close est une application web moderne visant à simplifier la gestion des tâches quotidiennes.

## 🚀 Déploiement Automatique

Le site est **automatiquement déployé** via GitHub Actions sur chaque push vers la branche `main`.

**Site en ligne :** [https://so-close.groupe28.socra-sigl.fr](https://so-close.groupe28.socra-sigl.fr)

### Pipeline CI/CD

Notre pipeline GitHub Actions inclut :
- ✅ **Vérification Markdown** (markdownlint)
- ✅ **Copie automatique** des fichiers via SCP
- ✅ **Déploiement** vers le serveur Nginx
- ✅ **Tests de santé** du site
- ✅ **Résumé détaillé** de chaque déploiement

### Workflow

1. **Push** vers `main` → Déclenchement automatique
2. **Build** et vérifications
3. **Déploiement** vers le serveur de production
4. **Validation** que le site fonctionne

## 🛠️ Configuration Manuelle (pour référence)

### 1. Se connecter au serveur

```bash
ssh -i <chemin_vers_votre_cle_privee> sigl@so-close.groupe28.socra-sigl.fr
```

### 2. Installer Nginx

```bash
sudo apt update
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 3. Configuration Nginx

Le serveur utilise la configuration par défaut de Nginx avec les fichiers dans `/var/www/html/`.

### 4. (Optionnel) HTTPS avec Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d so-close.groupe28.socra-sigl.fr
```

## 🔧 Développement Local

### Prérequis

- Un navigateur web moderne
- Un serveur web local (optionnel)

### Lancer en local

```bash
# Option 1: Serveur Python simple
python3 -m http.server 8000

# Option 2: Serveur Node.js
npx serve .

# Option 3: Ouvrir directement index.html dans le navigateur
```

## 📁 Structure du Projet

```
so-close/
├── index.html              # Page principale
├── README.md               # Documentation
├── .github/
│   └── workflows/
│       └── deploy.yml      # Pipeline CI/CD
└── docs/                   # Documentation additionnelle
```

## 🚦 Statut du Projet

![Déploiement](https://github.com/votreusername/so-close/actions/workflows/deploy.yml/badge.svg)

## 👥 Équipe

- **Caron Anthony** - Développeur Full-Stack
- **Jolivalt Guillaume** - Développeur Full-Stack

## 🔒 Secrets et Configuration

Le projet utilise les secrets GitHub suivants :
- `HOST` : Adresse du serveur
- `USER` : Nom d'utilisateur SSH
- `SSH_KEY` : Clé privée SSH pour l'authentification

**Dernière mise à jour :** $(date)  
**Version du pipeline :** v2.0  
**Statut :** 🟢 Production