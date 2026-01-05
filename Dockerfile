FROM node:20-alpine AS builder

# Install dependencies
COPY package*.json ./
COPY prisma ./prisma
RUN npm install

# Copy app source
COPY . .

# Prisma generate 
RUN npx prisma generate

# ---------- Production stage ----------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only required files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "start"]