#!/bin/bash

db_file="omnihook-store.db"
init_sql_file="sql_queries/init.sql"

# Check if the database file exists
if [ -f "$db_file" ]; then
  echo "Deleting existing database file: $db_file"
  rm "$db_file"
fi

# Create a new database file
echo "Creating new database file: $db_file"
sqlite3 "$db_file" ""

# Run the queries from init.sql on the new database
echo "Running queries from $init_sql_file on $db_file"
sqlite3 "$db_file" ".read $init_sql_file"

echo "Database initialization completed!"
