import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../models/db.js'

export const registerUser = async (req, res) => {
  const { email, username, password, hint } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: 'Email, username, and password are required.' });
  }

  try {

    // 1. Check for existing user
    const doesUserExist = await pool.query('SELECT * from users where email = $1 or username = $2', [email, username]);
    if (doesUserExist.rowCount > 0) {
      return res.status(400).json({ message: 'Email or username is already registered.' });
    }

    // 2. Hash password and store new user
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(`
      INSERT into users (email, username, password_hash, hint)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, username, date_created`,
      [email, username, hashPassword, hint || null]
    );
    const user = result.rows[0]

    // 3. Sign new JTW and authorize new user
    const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, {expiresIn: '7d'});

    res.status(201).json({ token, user});

  } catch (err) {
    console.error('Error during registration: ', err.message);
    res.status(500).json({ message: 'Sorry, an error occurred during registration.' });
  }
}

export const loginUser = async (req, res) => {
  res.status(200).json({ message: 'loginUser route not implemented yet' });
}

export const getUserInfo = async (req, res) => {
  res.status(200).json({ message: 'getUserInfo route not implemented yet' });
}