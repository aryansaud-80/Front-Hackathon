import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import generateJwt from '../../helper/generateJwt.js';
import generateOtp from '../../helper/generateOtp.js';
import sendEmail from '../../helper/sendMail.js';
import User from '../../models/user.models.js';

export const registerUser = async (req, res) => {
  let { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: 'Bad request. Missing required fields.',
    });
  }

  const existingUsername = await User.findOne({ username });

  if (existingUsername) {
    return res.status(400).json({
      message: 'Username already taken.',
    });
  }

  // Hash the password
  const hashedPw = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPw,
  });

  try {
    await user.save();
    return res.status(201).json({
      message: 'Admin registered successfully.',
      success: true,
      user: user,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: 'Server error.',
      success: false,
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, fullname, phonenumber, bio, projectsLink } =
    req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: 'Invalid user ID.',
    });
  }

  const updateData = {
    username,
    email,
    fullname,
    phonenumber,
    description,
  };

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        message: 'Admin not found.',
      });
    }

    return res.status(200).json({
      message: 'Admin updated successfully.',
      data: updatedAdmin,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: 'Server error.',
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check either it is empty or not

    if (!email || !password) {
      return res.status(400).json({
        message: 'All fields are required.',
      });
    }

    //search for existingAdmin or not
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        message: 'Admin not found.',
        success: false,
      });
    }

    //check either password is correct or not
    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    //applying condition for password doesn't match

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: 'Incorrect password.',
      });
    }

    //generating token for establishing session
    const token = generateJwt(existingUser);

    //cookie generating
    res.cookie('authToken', token, {
      httpOnly: true,
    });

    return res.status(200).json({
      message: 'Login successful.',
      data: existingUser,
      token,
      success: true,
    });
  } catch (error) {
    return res.json({
      message: 'Internal server erro',
      error: error.message,
    });
  }
};

export const sendVerifyOtp = async (req, res) => {
  try {
    const { email } = req.body; // Receive user email instead of userId

    // Find the user by email
    const admin = await User.findOne({ email: email });
    if (!admin) {
      return res.json({
        success: false,
        message: 'User doesn’t exist in the database.',
      });
    }

    // Check if the account is already verified
    if (admin.isAccountVerified) {
      return res.json({
        success: false,
        message: 'Account is already verified.',
      });
    }

    // Generate OTP
    const otp = generateOtp();
    admin.verifyOtp = otp;
    admin.verifyOtpExpriesAt = Date.now() + 24 * 60 * 60 * 1000; // OTP expires in 24 hours

    try {
      await admin.save();
      await sendEmail(
        admin.email,
        'Welcome to Pawalaya',
        `<h1>Your OTP is ${otp}</h1><p>Welcome to PawaLaya!</p>`
      );
    } catch (mailError) {
      console.log(mailError);
      return res.json({
        message: 'Mail error',
        error: mailError.message,
      });
    }

    return res.json({
      success: true,
      message: 'OTP sent successfully.',
      otp,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: 'Server error.',
      success: false,
      error: error.message,
    });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  const { otp, userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId) || !otp) {
    return res.json({
      message: 'Invalid input.',
    });
  }

  try {
    const admin = await Admin.findById(userId);
    if (!admin) {
      return res.json({
        success: false,
        message: 'User not found.',
      });
    }

    if (admin.isAccountVerified) {
      return res.json({
        success: false,
        message: 'Account is already verified.',
      });
    }

    if (otp !== admin.verifyOtp) {
      return res.json({
        message: 'OTP doesn’t match.',
        success: false,
      });
    }

    if (admin.verifyOtpExpriesAt < Date.now()) {
      return res.json({
        message: 'OTP is expired.',
      });
    }

    admin.verifyOtpExpriesAt = null;
    admin.verifyOtp = '';
    admin.isAccountVerified = true;

    await admin.save();

    return res.json({
      message: 'Email verified successfully.',
      success: true,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: 'Server error.',
      success: false,
      error: error.message,
    });
  }
};

export const sendResetOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.json({
        message: 'Admin not found in the database.',
      });
    }

    const otp = generateOtp();
    admin.resetOtp = otp;
    admin.resetOtpExpiresAt = Date.now() + 15 * 60 * 1000;

    try {
      await admin.save();
      await sendEmail(
        admin.email,
        'Welcome to Pawalaya',
        `<h1>Your OTP is ${otp}</h1><p>Reset your password!</p>`
      );
    } catch (mailError) {
      console.error('Error sending email:', mailError.message);
      return res.status(500).json({
        message: 'Failed to send reset OTP .',
        success: false,
        error: mailError.message,
        otp,
      });
    }

    return res.json({
      message: 'OTP sent successfully.',
      success: true,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: 'Server error.',
      success: false,
      error: error.message,
    });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !newPassword || !otp) {
      return res.json({
        message: 'All fields are required.',
        success: false,
      });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.json({
        message: 'User not found.',
        success: false,
      });
    }

    const checkPrevPassword = await bcrypt.compare(newPassword, admin.password);

    if (checkPrevPassword) {
      return res.status(404).json({
        message: 'Your previous and new password is same!',
      });
    }

    if (otp !== admin.resetOtp) {
      return res.json({
        message: 'OTP doesn’t match.',
      });
    }

    if (admin.resetOtpExpiresAt < Date.now()) {
      return res.json({
        message: 'OTP expired.',
        success: false,
      });
    }

    const hashedNewPw = await bcrypt.hash(newPassword, 10);
    admin.password = hashedNewPw;
    await admin.save();

    await sendEmail(
      admin.email,
      'Pawlaya Team',
      `<h1>Your password reset succesfully</h1>`
    );
    return res.json({
      message: 'Password reset successfully.',
      success: true,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: 'Server error.',
      success: false,
      error: error.message,
    });
  }
};

export const logOut = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return res.json({
      thau: 'Logout',
      message: 'All fields are required',
    });
  }

  if (password !== confirmPassword) {
    return res.json({
      message: 'Password and confirmPassword should be same',
    });
  }
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.json({
        message: 'User not found',
      });
    }

    const matchPassword = await bcrypt.compare(password, admin.password);
    if (!matchPassword) {
      return res.json({
        message: "Password doesn't match",
      });
    }

    res.clearCookie('authToken', {
      httpOnly: true,
    });

    return res.json({
      success: true,
      message: 'Admin logout succesfully',
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      error: error.message,
      message: 'Cannot logout',
    });
  }
};
