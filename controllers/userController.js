import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../models/db.js'

export const registerUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const hashed = await bcrypt.hash(password, 10)
    const result = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
      [email, hashed]
    )
    const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.status(201).json({ token })
  } catch (err) {
    res.status(500).json({ message: 'User registration failed', error: err.message })
  }
}