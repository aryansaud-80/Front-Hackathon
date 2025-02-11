import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.cookies.authToken; // Get token from cookies

  if (!token || typeof token !== 'string') {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized! Login Again',
    });
  }

  try {
    // Verify and decode the token
    const tokenDecode = jwt.verify(token, process.env.SECRET_STRING);
    // If token contains a valid ID, attach user to the request object
    if (tokenDecode.id) {
      req.user = tokenDecode;
      req.body.userId = tokenDecode.id; // Optionally add userId to request body
      next(); // Move to the next middleware or route handler
    } else {
      return res.status(401).json({
        success: false,
        message: 'Not authorized. Login Again',
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || 'Internal server error.',
    });
  }
};

export default authenticateToken;
