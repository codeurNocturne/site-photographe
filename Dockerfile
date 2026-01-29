# Étape 1 : image officielle Node.js
FROM node:18-alpine

# Étape 2 : définir le répertoire de travail
WORKDIR /app

# Étape 3 : copier package.json et package-lock.json
COPY package*.json ./

# Étape 4 : installer les dépendances
RUN npm install --production

# Étape 5 : copier le reste du projet
COPY . .

# Étape 6 : exposer le port
EXPOSE 3000

# Étape 7 : commande pour lancer le serveur
CMD ["node", "server.js"]
