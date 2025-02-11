// routes/admin.auth.routes.js
import express from 'express';
import authenticateToken from '../../middlewares/authenticateToken.js';
import {
  registerAdmin,
  sendVerifyOtp,
  verifyOtp,
  sendResetOtp,
  resetPassword,
  logOut,
  updateAdmin,
  loginAdmin,
} from '../../controllers/Auth/adminauth.controllers.js';

const route = express.Router();

// Authentication routes

route.post('/register', registerAdmin);
route.post('/login', loginAdmin);
route.patch('/register/:id', authenticateToken, updateAdmin);

// Admin-specific routes, protected with authenticateToken and authorizeRoles
route.post('/send-verify-otp', authenticateToken, sendVerifyOtp);
route.post('/verify-otp', authenticateToken, verifyOtp);
route.post('/send-reset-otp', sendResetOtp);
route.post('/reset-password', resetPassword);
route.post('/logout', authenticateToken, logOut);

export default route;
