#!/bin/bash

# Function to check if a container exists
container_exists() {
    local container_name=$1
    docker ps -a --format '{{.Names}}' | grep -q "^${container_name}$"
}

# Check if Metabase container exists
if ! container_exists "metabase"; then
    echo "Metabase container not found. Please start the services first."
    exit 1
fi

echo "Stopping Metabase container..."
docker stop metabase

echo "Removing Metabase container..."
docker rm metabase

echo "Cleaning up Metabase data directory..."
rm -rf ./metabase-data/*

echo "Starting Metabase with migration lock release..."
docker run --rm \
    -v $(pwd)/metabase-data:/metabase-data \
    -e MB_DB_TYPE=postgres \
    -e MB_DB_HOST=${DB_HOST} \
    -e MB_DB_PORT=${DB_PORT} \
    -e MB_DB_DBNAME=${DB_DATABASE} \
    -e MB_DB_USER=${DB_USERNAME} \
    -e MB_DB_PASS=${DB_PASSWORD} \
    -e MB_ENCRYPTION_SECRET_KEY=${MB_ENCRYPTION_SECRET_KEY} \
    -e MB_DB_MIGRATION_TIMEOUT_MS=300000 \
    -e MB_DB_CONNECTION_TIMEOUT_MS=60000 \
    -e MB_DB_CONNECTION_MAX_LIFETIME_MS=1800000 \
    -e JAVA_TOOL_OPTIONS="-Djava.security.egd=file:/dev/./urandom" \
    metabase/metabase:latest \
    java --add-opens java.base/java.nio=ALL-UNNAMED -jar metabase.jar migrate release-locks

echo "Restarting Metabase..."
docker-compose up -d

echo "Migration locks released. Metabase restarted."
echo "Please wait a few minutes for Metabase to initialize properly." 