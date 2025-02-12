export const verifyAccount = (fullname, otp, expirationMinutes) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 20px auto; padding: 30px; background-color: #f8f9fa; }
        .header { color: #2c3e50; font-size: 24px; margin-bottom: 20px; }
        .otp-box { 
            background-color: #e9ecef; 
            padding: 15px; 
            margin: 20px 0; 
            text-align: center; 
            font-size: 24px; 
            font-weight: bold; 
            border-radius: 5px;
        }
        .footer { margin-top: 30px; font-size: 12px; color: #6c757d; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Account Verification</div>
        <p>Hello ${fullname},</p>
        <p>Thank you for registering! Please use the following OTP to verify your account:</p>
        
        <div class="otp-box">${otp}</div>
        
        <p>This OTP will expire in ${expirationMinutes} minutes.</p>
        <p>If you didn't request this verification, please ignore this email.</p>
        <div class="footer">
            Best regards,<br>
            Your Application Team
        </div>
    </div>
</body>
</html>
`;
