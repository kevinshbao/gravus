import express from 'express'
import { createWorkout, retrieveWorkout } from '../controllers/workoutController.js'

const router = express.Router()

// Attach POST and GET routes
router.post('/create', createWorkout)
router.get('/workouts', retrieveWorkout)

export default router