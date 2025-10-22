import { pool } from './database.js'
import './dotenv.js' 

const createCustomBagsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS diy_delight CASCADE;

    CREATE TABLE IF NOT EXISTS diy_delight (
      id SERIAL PRIMARY KEY,
      user_name VARCHAR(100) NOT NULL,
      bag_type VARCHAR(50) NOT NULL,
      material VARCHAR(50) NOT NULL,
      design VARCHAR(50), 
      color VARCHAR(30) NOT NULL,
      accessories VARCHAR(100), 
      total_price NUMERIC(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `

  try {
    await pool.query(createTableQuery)
    console.log('🎉 diy_delight table created successfully')
  } catch (err) {
    console.error('⚠️ Error creating diy_delight table:', err)
  }
}

const seedCustomBagsTable = async () => {
  const seedQuery = `
    INSERT INTO diy_delight (
      user_name,
      bag_type,
      material,
      design,
      color,
      accessories,
      total_price
    ) VALUES 
    (
      'Alice',
      'Backpack',
      'Canvas',
      'Printed',
      'Blue',
      'Charms',
      79.99
    ),
    (
      'Bob',
      'Tote',
      'Leather',
      'Embroidered',
      'Black',
      'Extra Pockets',
      99.99
    ),
    (
      'Charlie',
      'Duffel',
      'Nylon',
      'Plain',
      'Olive',
      NULL,
      89.50
    ),
    (
      'Diana',
      'Messenger',
      'Canvas',
      'Printed',
      'Red',
      'Shoulder Strap, Buckles',
      65.99
    ),
    (
      'Eve',
      'Clutch',
      'Leather',
      'Embroidered',
      'Gold',
      'Chain Strap',
      120.00
    );
  `

  try {
    await pool.query(seedQuery)
    console.log('🌱 diy_delight table seeded successfully')
  } catch (err) {
    console.error('⚠️ Error seeding diy_delight table:', err)
  }
}

const resetDatabase = async () => {
  try {
    console.log('🔄 Resetting database...')
    await createCustomBagsTable()
    await seedCustomBagsTable()
    console.log('✅ Database reset complete')
  } catch (err) {
    console.error('❌ Database reset failed:', err)
  } finally {
    await pool.end()
  }
}

resetDatabase()