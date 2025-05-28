import express from 'express'
import { registerUser, loginUser, getUserInfo  } from '../controllers/userController.js'

const router = express.Router()

// Attach POST routes
router.post('/register', registerUser)
router.post('/login', loginUser)

// Attach GET routes
router.get('me', getUserInfo)

export default router