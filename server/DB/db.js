import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connectionUri = process.env.DB_URL;
    await mongoose.connect(connectionUri);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Cannot connect to the database:', error.message);
  }
};

export default connectDB;
