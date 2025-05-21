import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../models/db.js'

export const registerUser = async (req, res) => {
  res.status(200).json({ message: 'registerUser route not implemented yet' })
}

export const loginUser = async (req, res) => {
  res.status(200).json({ message: 'Login route not implemented yet' })
}