# Utiliser une image Nginx officielle légère
FROM nginx:alpine

# Métadonnées du projet So-Close
LABEL maintainer="Caron Anthony & Jolivalt Guillaume"
LABEL description="So-Close Project - SOCRA SIGL 2026"
LABEL version="1.0"

# Copier votre index.html (remplace automatiquement la page par défaut)
COPY index.html /usr/share/nginx/html/

# Exposer le port 80
EXPOSE 80

# Ajouter des informations de build
RUN echo "Build date: $(date)" > /usr/share/nginx/html/build-info.txt

# Permissions correctes pour Nginx
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Healthcheck pour vérifier que le container fonctionne
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Nginx démarre automatiquement avec cette image