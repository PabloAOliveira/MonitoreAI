#!/bin/sh

# Exit on any error
set -e

echo "Starting MonitoreAI application..."

# Run Prisma migrations
echo "Running Prisma migrations..."
npx prisma migrate deploy

# Initialize database if needed
echo "Initializing database..."
node scripts/init-db.js

# Start the application
echo "Starting Node.js application..."
exec node src/index.js