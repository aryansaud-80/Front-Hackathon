import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
    // Basic Information
    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },

    verifyOtp:{
      type: String,
      default: '',
    },

    verifyOtpExpriesAt:{
      type: Date,
      default: Date.now,
    },

    resetOtp:{
      type: String,
      default: '',
    },

    resetOtpExpiresAt:{
      type: Date,
      default: Date.now,
    },


    // Authentication
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phonenumber: {
      type: String,
      required: true,
      unique: true,
    },
    
    // Audit Information
    lastLogin: {
      type: Date,
      default: Date.now,
    },

    // Security and Activity
    lastPasswordChange: {
      type: Date,
      default: Date.now,
    },

    // Admin Description
    description: {
      type: String, // Text-based description
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
