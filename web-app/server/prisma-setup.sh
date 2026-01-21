#!/bin/sh

echo "Waiting for Postgres to be ready..."

until nc -z postgres 5432; do
  sleep 2
done

echo "Running migrations..."
npx prisma migrate deploy

echo "Creating dummy data..."
npm run prisma:seed

echo "Starting backend..."
# npm run start
exec node dist/server.js
