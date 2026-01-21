# ===== BUILD STAGE =====
FROM node:20-alpine AS builder

WORKDIR /app

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build


# ===== RUNTIME STAGE =====
FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache netcat-openbsd

RUN mkdir -p logs

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma-setup.sh .

RUN chmod +x prisma-setup.sh

EXPOSE 3000

CMD ["sh", "prisma-setup.sh"]

