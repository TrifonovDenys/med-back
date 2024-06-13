import express from 'express'
import authMiddleware from '../middlewares/authMiddleware'
import authController from '../controllers/authController'

const authRouter = express.Router() 

authRouter.post('/signup', authMiddleware.checkSignupUserData, authController.signup)
authRouter.post('/login', authController.login)

export default authRouter