# Utilise Node.js 20
FROM node:20-alpine

WORKDIR /app

# On copie la structure de base pour installer les dépendances du monorepo
COPY package*.json ./
COPY turbo.json ./
# (Optionnel) Si vous avez des packages partagés (ex: @mailerpro/database)
COPY packages ./packages 

# On copie le code de l'API et du Bot (déjà transpilé en JS par Turborepo)
COPY apps/api ./apps/api
COPY apps/bot ./apps/bot

# On installe UNIQUEMENT les dépendances de production
RUN npm ci --production

EXPOSE 3000

# Par défaut, on lance le process de l'API
CMD ["node", "apps/api/dist/index.js"]
