// routes/admin.auth.routes.js
import express from 'express';
// import authenticateToken from '../../middlewares/authenticateToken.js';

import {
  loginUser,
  registerUser,
} from '../../controllers/Auth/userAuth.controller.js';

const route = express.Router();

// Authentication routes

route.post('/register', registerUser);
route.post('/login', loginUser);
// route.patch('/register/:id', authenticateToken, updateAdmin);

// Admin-specific routes, protected with authenticateToken and authorizeRoles
// route.post('/send-verify-otp', authenticateToken, sendVerifyOtp);
// route.post('/verify-otp', authenticateToken, verifyOtp);
// route.post('/send-reset-otp', sendResetOtp);
// route.post('/reset-password', resetPassword);
// route.post('/logout', authenticateToken, logOut);

export default route;
