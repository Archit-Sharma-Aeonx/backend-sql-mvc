import express from 'express';
import { authenticateUser } from '../middlewares/authenticate.middleware.js';
import { loginUser, registerUser } from '../controller/authenticate.controller.js';

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router ;



      
