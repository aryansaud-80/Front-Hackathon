export const passwordResetTemplate = (fullname, otp, expirationMinutes) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 20px auto; padding: 30px; background-color: #f8f9fa; }
        .alert { color: #dc3545; font-weight: bold; }
        .otp-box { 
            background-color: #fff3cd; 
            padding: 15px; 
            margin: 20px 0; 
            text-align: center; 
            font-size: 24px; 
            font-weight: bold; 
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2 style="color: #dc3545;">Password Reset Request</h2>
        <p>Hello ${fullname},</p>
        <p class="alert">You requested a password reset. Use this OTP to proceed:</p>
        
        <div class="otp-box">${otp}</div>
        
        <p>This OTP is valid for ${expirationMinutes} minutes.</p>
        <p>If you didn't initiate this request, please contact support immediately.</p>
    </div>
</body>
</html>
`;
