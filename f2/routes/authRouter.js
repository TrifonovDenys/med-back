import express from 'express'
import { checkSignupUserData } from '../middlewares/authMiddleware'
import authController from '../controllers/authController'

const authRouter = express.Router() 

authRouter.post('/signup', checkSignupUserData, authController.signup)
authRouter.post('/login', authController.login)

export default authRouter