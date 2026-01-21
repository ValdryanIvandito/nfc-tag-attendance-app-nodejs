# ===== BUILD STAGE =====
FROM node:20-alpine AS builder

WORKDIR /app

ARG VITE_API_URL
ARG VITE_API_STREAM_URL

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_STREAM_URL=$VITE_API_STREAM_URL

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


# ===== RUNTIME STAGE =====
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]