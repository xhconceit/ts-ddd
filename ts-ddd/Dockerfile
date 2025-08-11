# syntax=docker/dockerfile:1.6
FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

FROM base AS deps
COPY package.json pnpm-lock.yaml* package-lock.json* yarn.lock* ./
RUN \
  if [ -f pnpm-lock.yaml ]; then npm i -g pnpm@9 && pnpm i --frozen-lockfile; \
  elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  else npm ci; fi

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build && npm run prisma:generate

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./package.json
CMD ["node", "dist/index.js"]