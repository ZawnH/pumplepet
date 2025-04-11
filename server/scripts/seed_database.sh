#!/bin/bash

# Get the directory where the script is located using Bash parameter expansion
SCRIPT_DIR=$(cd -- "${BASH_SOURCE[0]%/*}" &> /dev/null && pwd)

# Load environment variables from .env file located one level up
ENV_FILE="$SCRIPT_DIR/../.env"
if [ -f "$ENV_FILE" ]; then
  # Source the .env file directly for better variable handling
  set -o allexport
  source "$ENV_FILE"
  set +o allexport
else
  echo "Error: .env file not found at $ENV_FILE"
  exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
  echo "Error: PostgreSQL client (psql) not found. Please install PostgreSQL."
  exit 1
fi

# Explicitly check if DB_HOST is set
if [ -z "$DB_HOST" ]; then
  echo "Error: DB_HOST environment variable is not set or is empty in $ENV_FILE"
  exit 1
fi

echo "Seeding database: $DB_NAME on host $DB_HOST..."

# Run the SQL seed file with quoted variables
SEED_SQL_FILE="$SCRIPT_DIR/../pkg/mockdata/seed.sql"
export PGPASSWORD="$DB_PASSWORD" # Export password explicitly
psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -p "$DB_PORT" -f "$SEED_SQL_FILE"

EXIT_CODE=$?
export PGPASSWORD= # Unset password after use

if [ $EXIT_CODE -eq 0 ]; then
  echo "Database seeding completed successfully."
else
  echo "Error: Failed to seed database (Exit code: $EXIT_CODE)."
  exit 1
fi 