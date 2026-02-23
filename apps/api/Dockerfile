# -- Étape 1 : Build --
FROM node:20-alpine AS builder

# Installe OpenSSL pour Prisma pendant le build
RUN apk add --no-cache openssl

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
RUN npx turbo run build --filter=api...

# -- Étape 2 : Production --
FROM node:20-alpine

WORKDIR /app

# Installe OpenSSL pour Prisma car node:20-alpine ne l'a pas par défaut
RUN apk add --no-cache openssl

# Copie de la structure minimale
COPY package*.json ./
COPY turbo.json ./
COPY packages ./packages 
COPY apps/api/package.json ./apps/api/

# Installe uniquement les libs de prod
RUN npm ci --production

# Génère le client Prisma
RUN npx prisma generate --schema=./packages/database/prisma/schema.prisma

# Récupère le code compilé depuis le builder
COPY --from=builder /app/apps/api/dist ./apps/api/dist

EXPOSE 3000

CMD ["sh", "-c", "npx prisma db push --schema=./packages/database/prisma/schema.prisma --accept-data-loss && node apps/api/dist/index.js"]
