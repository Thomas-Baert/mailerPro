# -- Étape 1 : Build --
FROM node:20-alpine AS builder

WORKDIR /app

# Copie des fichiers de configuration globaux
COPY package*.json ./
COPY turbo.json ./
# Copie des workspaces
COPY packages ./packages 
COPY apps/api ./apps/api
COPY apps/bot ./apps/bot

# Installation de TOUTES les dépendances (nécessaire pour le build TypeScript)
RUN npm ci

# Compilation de l'API
RUN npm run build --filter=api...

# -- Étape 2 : Production --
FROM node:20-alpine

WORKDIR /app

# Copie de la structure minimale
COPY package*.json ./
COPY turbo.json ./
COPY packages ./packages 
COPY apps/api/package.json ./apps/api/

# Installe uniquement les libs de prod
RUN npm ci --production

# Récupère le code compilé depuis le builder
COPY --from=builder /app/apps/api/dist ./apps/api/dist

EXPOSE 3000

CMD ["node", "apps/api/dist/index.js"]
