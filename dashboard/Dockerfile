FROM metabase/metabase:v0.50.0

# Set environment variables for PostgreSQL connection
ENV MB_DB_TYPE=postgres
ENV MB_DB_HOST=containers-us-west-201.railway.app
ENV MB_DB_PORT=7941
ENV MB_DB_DBNAME=railway
ENV MB_DB_USER=postgres
ENV MB_DB_PASS=PvMRMFhnLeMXYKxpyAduNEAAxBPZXmHB
ENV MB_ENCRYPTION_SECRET_KEY=bullystop_metabase_encryption_key_2024
ENV MB_SITE_URL=http://localhost:3000
ENV MB_JETTY_HOST=0.0.0.0
ENV MB_JETTY_PORT=3000
ENV MB_DB_CONNECTION_TIMEOUT_MS=60000
ENV MB_DB_CONNECTION_MAX_LIFETIME_MS=1800000
ENV MB_DB_MIGRATION_TIMEOUT_MS=300000
ENV JAVA_TOOL_OPTIONS=-Djava.security.egd=file:/dev/./urandom
ENV MB_DB_MIGRATION_RETRY_COUNT=5
ENV MB_DB_MIGRATION_RETRY_DELAY_MS=5000

# Expose the port Metabase runs on
EXPOSE 3000

# Use the parent image's entrypoint
ENTRYPOINT ["/app/run_metabase.sh"] 