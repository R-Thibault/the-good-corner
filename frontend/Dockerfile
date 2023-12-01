FROM node:20.10.0-alpine3.18 

WORKDIR /app

COPY package.json package.json
#COPY package-lock.json package-lock.json
RUN npm i

COPY src src
COPY public public
COPY .eslintrc.json .eslintrc.json
COPY next.config.js next.config.js
COPY next-env.d.ts next-env.d.ts
COPY tsconfig.json tsconfig.json
#RUN npm run build
# ENV NEXT_TELEMETRY_DISABLED 1
CMD npm start


# FROM node:18-alpine AS deps
# RUN apk add --no-cache libc6-compat
# WORKDIR /app

# COPY package.json package-lock.json ./
# RUN  npm install --production

# FROM node:18-alpine AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .

# ENV NEXT_TELEMETRY_DISABLED 1

# RUN npm run build

# FROM node:18-alpine AS runner
# WORKDIR /app

# ENV NODE_ENV production
# ENV NEXT_TELEMETRY_DISABLED 1

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# USER nextjs

# EXPOSE 3000

# ENV PORT 3000

# CMD ["npm", "start"]