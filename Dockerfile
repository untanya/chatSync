# Étape 1 : Utilisation de l'image Node.js officielle
FROM node:22.13.1

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du projet dans le conteneur
COPY . .

# Commande pour exécuter l'application
CMD ["node", "--watch", "--loader", "ts-node/esm", "src/server.ts"]

# Exposer le port de l'application
EXPOSE 8080