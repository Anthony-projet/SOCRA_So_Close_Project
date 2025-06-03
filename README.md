# So-Close Project

Ce projet fait partie du cours SOCRA d'EPITA SIGL 2026.

## Description

So-Close est une application web moderne visant à simplifier la gestion des tâches quotidiennes.

## Déploiement

1. Se connecter au serveur :
```bash
ssh -i <chemin_vers_votre_cle_privee> ubuntu@so-close.groupXX.socra-sigl.fr
```

2. Installer Nginx :
```bash
sudo apt update
sudo apt install nginx -y
```

3. Copier les fichiers du site :
```bash
scp -i <chemin_vers_votre_cle_privee> -r src/public/* ubuntu@so-close.groupXX.socra-sigl.fr:/var/www/html/
```

4. (Optionnel) Pour HTTPS avec Let's Encrypt :
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d so-close.groupXX.socra-sigl.fr
```

## Équipe

- [Membre 1]
- [Membre 2]