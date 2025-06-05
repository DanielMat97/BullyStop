#!/bin/bash

# Function to check if a container exists
container_exists() {
    local container_name=$1
    docker ps -a --format '{{.Names}}' | grep -q "^${container_name}$"
}

# Function to stop and remove a container if it exists
clean_container() {
    local container_name=$1
    if container_exists "$container_name"; then
        echo "Stopping and removing existing container: $container_name"
        docker stop "$container_name" >/dev/null 2>&1
        docker rm "$container_name" >/dev/null 2>&1
    fi
}

# Function to check if a service is healthy
check_service_health() {
    local container_name=$1
    local max_attempts=$2
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        echo "Checking health of $container_name (attempt $attempt/$max_attempts)..."
        if docker inspect --format='{{.State.Health.Status}}' "$container_name" | grep -q "healthy"; then
            echo "$container_name is healthy!"
            return 0
        fi
        sleep 10
        ((attempt++))
    done
    
    echo "Health check failed for $container_name after $max_attempts attempts"
    return 1
}

# Function to check for migration locks
check_migration_locks() {
    local max_attempts=6
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        echo "Checking for migration locks (attempt $attempt/$max_attempts)..."
        if docker logs metabase 2>&1 | grep -q "Database has migration lock"; then
            echo "Migration lock detected. Attempting to release..."
            ./release-migration-lock.sh
            return 0
        fi
        sleep 10
        ((attempt++))
    done
    
    return 1
}

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "Please review the .env file and make any necessary adjustments."
fi

# Create necessary directories
echo "Creating required directories..."
mkdir -p metabase-data

# Clean up existing containers
echo "Cleaning up existing containers..."
clean_container "metabase"

# Set up Docker
echo "Starting Metabase service..."
docker-compose up -d

# Wait for Metabase to be healthy
echo "Waiting for Metabase to be ready..."
if ! check_service_health "metabase" 18; then
    echo "Metabase failed to become healthy. Checking logs..."
    docker-compose logs metabase
    
    # Check for migration locks
    if check_migration_locks; then
        echo "Migration locks released. Waiting for Metabase to become healthy..."
        if ! check_service_health "metabase" 12; then
            echo "Metabase still not healthy after releasing migration locks."
            docker-compose logs metabase
            exit 1
        fi
    else
        echo "No migration locks detected, but Metabase is not healthy."
        exit 1
    fi
fi

echo "Setup complete! Metabase should be available at http://localhost:3000"
echo "You can check the status with: docker-compose ps"
echo "To view logs: docker-compose logs -f" 