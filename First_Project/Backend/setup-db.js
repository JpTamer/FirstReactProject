const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_9cvkqiam5xtK@ep-dawn-cake-ah38af4g-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

async function setupDatabase() {
  try {
    console.log('Connecting to database...');
    
    // Read SQL file
    const sqlFile = fs.readFileSync(path.join(__dirname, 'create_tables.sql'), 'utf8');
    
    // Execute SQL
    console.log('Creating tables...');
    await pool.query(sqlFile);
    
    console.log('✅ Database setup complete!');
    console.log('Tables created:');
    console.log('  - Users');
    console.log('  - MenuItems');
    console.log('  - Cart');
    console.log('  - Orders');
    console.log('  - OrderItems');
    console.log('  - Reviews');
    console.log('Sample menu items inserted.');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error setting up database:', err);
    process.exit(1);
  }
}

setupDatabase();
