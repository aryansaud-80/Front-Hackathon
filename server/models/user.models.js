import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    // Basic Information
    username: {
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

    password: {
      type: String,
      required: true,
    },

    hackathon: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hackathon',
      },
    ],

    // Project Information
    // projectsLink: [
    //   {
    //     title: { type: String, required: true },
    //     description: { type: String, default: '' },
    //   },
    // ],

    bio: {
      type: String,
      default: '',
      trim: true,
    },

    // Security and Audit
    lastLogin: {
      type: Date,
      default: Date.now,
    },

    lastPasswordChange: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
