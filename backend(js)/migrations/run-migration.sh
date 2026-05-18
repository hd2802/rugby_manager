# From root
psql -h localhost rugby_manager < backend/migrations/<migration_name>.sql

# From backend
psql -h localhost rugby_manager < migrations/<migration_name>.sql

# From migrations
psql -h localhost rugby_manager < <migration_name>.sql