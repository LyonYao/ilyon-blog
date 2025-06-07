import sqlite3
import os
from datetime import datetime

def backup_sqlite_db(db_path, output_file=None):
    """
    Backup SQLite database to SQL file with schema and data
    """
    if output_file is None:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_file = f"backup_{os.path.basename(db_path)}_{timestamp}.sql"
    
    # Connect to the database
    conn = sqlite3.connect(db_path)
    
    with open(output_file, 'w') as f:
        # Write header
        f.write(f"-- SQLite database backup of {db_path}\n")
        f.write(f"-- Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        
        # Get list of tables
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        
        for table in tables:
            table_name = table[0]
            
            # Skip SQLite internal tables
            if table_name.startswith('sqlite_'):
                continue
                
            # Get table schema
            cursor.execute(f"SELECT sql FROM sqlite_master WHERE type='table' AND name='{table_name}';")
            schema = cursor.fetchone()[0]
            
            # Write table schema
            f.write(f"{schema};\n\n")
            
            # Get table data
            cursor.execute(f"SELECT * FROM {table_name};")
            rows = cursor.fetchall()
            
            if rows:
                # Get column names
                column_names = [description[0] for description in cursor.description]
                
                # Write INSERT statements
                f.write(f"-- Data for table {table_name}\n")
                for row in rows:
                    values = []
                    for value in row:
                        if value is None:
                            values.append("NULL")
                        elif isinstance(value, (int, float)):
                            values.append(str(value))
                        else:
                            # Escape single quotes in string values
                            escaped_value = str(value).replace("'", "''")
                            values.append(f"'{escaped_value}'")
                    f.write(f"INSERT INTO {table_name} ({', '.join(column_names)}) VALUES ({', '.join(values)});\n")
                f.write("\n")
    
    conn.close()
    return output_file

if __name__ == "__main__":
    db_path = "blog.db"  # Path to your SQLite database
    output_file = "blog_backup.sql"  # Output SQL file
    
    backup_file = backup_sqlite_db(db_path, output_file)
    print(f"Database backed up to {backup_file}")