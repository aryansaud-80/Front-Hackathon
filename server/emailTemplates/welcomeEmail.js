export const welcomeTemplate = (fullname, username) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        /* General Styles */
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f8f9fa;
            color: #ffffff;
            margin: 0;
            padding: 0;
        }
        
        /* Container */
        .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 30px;
            background-color: #1b1b1b;
            border: 1px solid #f5c1e0;
            border-radius: 12px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
        }

        /* Headline Styling */
        .success {
            color: #f5c1e0;
            font-size: 1.8rem;
            text-align: center;
            border-bottom: 2px solid #f5c1e0;
            padding-bottom: 10px;
        }

        /* List Styling */
        ul {
            list-style: none;
            padding: 0;
        }

        li {
            margin: 10px 0;
            background-color: #f5c1e0;
            color: #1b1b1b;
            padding: 8px 12px;
            border-radius: 8px;
        }

        /* Paragraph Styling */
        p {
            color: #d4d4d4;
            line-height: 1.8;
        }

        strong {
            color: #ffffff;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2 class="success">Welcome to Our Platform! 🎉</h2>
        <p>Hello ${fullname},</p>
        <p>Your account has been successfully verified!</p>
        <p>Account details:</p>
        <ul>
            <li>Username: <strong>${username}</strong></li>
            <li>Registration Date: ${new Date().toLocaleDateString()}</li>
        </ul>
        <p>Start exploring your admin dashboard now!</p>
    </div>
</body>
</html>
`;
