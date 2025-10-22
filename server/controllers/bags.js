import { pool } from '../config/database.js'

// Get all bags
const getBags = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM diy_delight ORDER BY id ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

// Get bag by ID
const getBagById = async (req, res) => {
  try {
    const bagId = req.params.id
    const results = await pool.query('SELECT * FROM diy_delight WHERE id = $1', [bagId])
    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Bag not found' })
    }
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

// Create new bag
const createBag = async (req, res) => {
  const {
    user_name,
    bag_type,
    material,
    design,
    color,
    accessories,
    total_price
  } = req.body

  try {
    const result = await pool.query(
      `INSERT INTO diy_delight (
        user_name,
        bag_type,
        material,
        design,
        color,
        accessories,
        total_price
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [user_name, bag_type, material, design, color, accessories, total_price]
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Update bag by ID
const updateBag = async (req, res) => {
  const id = req.params.id
  const {
    user_name,
    bag_type,
    material,
    design,
    color,
    accessories,
    total_price
  } = req.body

  try {
    const result = await pool.query(
      `UPDATE diy_delight SET
        user_name = $1,
        bag_type = $2,
        material = $3,
        design = $4,
        color = $5,
        accessories = $6,
        total_price = $7
      WHERE id = $8
      RETURNING *`,
      [user_name, bag_type, material, design, color, accessories, total_price, id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Bag not found' })
    }
    res.status(200).json(result.rows[0])
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Delete bag by ID
const deleteBag = async (req, res) => {
  const id = req.params.id

  try {
    const result = await pool.query('DELETE FROM diy_delight WHERE id = $1 RETURNING *', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Bag not found' })
    }
    res.status(200).json({ message: 'Bag deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Validate bag configuration (for impossible combinations)
const validateBagConfiguration = (req, res, next) => {
  const { material, bag_type, accessories } = req.body
  
  // Example validation rules for impossible combinations
  const invalidCombinations = [
    {
      condition: material === 'Leather' && bag_type === 'Beach Bag',
      message: 'Leather material cannot be used for Beach Bags'
    },
    {
      condition: bag_type === 'Clutch' && accessories?.includes('Laptop Compartment'),
      message: 'Clutch bags cannot have laptop compartments'
    },
    {
      condition: material === 'Paper' && accessories?.includes('Water Bottle Holder'),
      message: 'Paper bags cannot have water bottle holders'
    }
  ]
  
  for (const rule of invalidCombinations) {
    if (rule.condition) {
      return res.status(400).json({ error: rule.message })
    }
  }
  
  next()
}

export default {
  getBags,
  getBagById,
  createBag,
  updateBag,
  deleteBag,
  validateBagConfiguration
}