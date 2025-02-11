import jwt from 'jsonwebtoken';

const generateJwt = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    iat: Math.floor(Date.now() / 1000), // Current timestamp in seconds
  };

  // Check if the SECRET_STRING is present
  if (!process.env.SECRET_STRING) {
    throw new Error(
      'SECRET_STRING is not defined in the environment variables.'
    );
  }

  return jwt.sign(payload, process.env.SECRET_STRING, {
    expiresIn: '24h',
  });
};

export default generateJwt;
