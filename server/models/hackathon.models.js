import mongoose from 'mongoose';

const hackathonSchema = new mongoose.Schema(
  {
    // Hackathon Information
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      trim: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    prizes: {
      type: String,
      default: 0,
    },

    status: {
      type: String,
      enum: ['upcoming', 'open', 'closed'],
      default: 'upcoming',
    },

    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    location: {
      type: String,
      default: 'Online',
    },
  },
  { timestamps: true }
);

const Hackathon = mongoose.model('Hackathon', hackathonSchema);

export default Hackathon;
