import mongoose from 'mongoose';

const hackathonRegSchema = new mongoose.Schema(
  {
    // Hackathon Information
    hackathon: {
      name: String,
    },

    teamname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phonenumber: {
      type: String,
      required: true,
    },

    members: {
      type: [String],
      required: true,
    },

    type: {
      type: String,
      enum: ['online', 'physical'],
      default: 'individual',
    },
  },
  { timestamps: true }
);

const hackathonReg = mongoose.model('HackathonForm', hackathonRegSchema);

export default hackathonReg;
