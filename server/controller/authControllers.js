const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users'); 
const { OAuth2Client } = require('google-auth-library');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../../.env') }); 
const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET_ID,
    'postmessage' 
);

const authController = {
    registerUser: async (req, res) => {
        try { 
            const { FirstName, LastName, dayOfBirth, email, phoneNumber, password } = req.body;
            const fullName = `${FirstName} ${LastName}`;
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "Email already exists" });
            }
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const newUser = await User.createUser(fullName, email, hashPassword, phoneNumber, dayOfBirth);
            res.status(201).json({
                message: "User registered successfully",
                user: {
                    id: newUser.id,
                    fullName: newUser.full_name,
                    email: newUser.email,
                    phoneNumber: newUser.phone_number,
                    createdAt: newUser.created_at
                }
            });
        }
        catch (error) {
            console.error("Error during user registration:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    loginCallback: (req, res) => { 
        const user = req.user;
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({
        message: "Đăng nhập thành công!",
        token: token,
        user: { id: user.id, fullName: user.full_name, email: user.email }
    });
    },

    exchangeCodeForToken: async (req, res, next) => {    
        if (!req.body) {
            const errorMessage = "req.body is undefined. This is likely because the express.json() middleware is missing or used after the router.";
            console.error(errorMessage);
            return res.status(500).json({ message: "Server configuration error: Missing JSON body parser." });
        }
        const { code } = req.body;
        if (!code) {
        return next();
        }
        try {
            const { tokens } = await googleClient.getToken(code);
            const idToken = tokens.id_token;

            if (!idToken) {
                return res.status(400).json({ message: 'Failed to retrieve ID token from Google.' });
            }
            req.body.id_token = idToken;
            return next();
        }
        catch (error) {
            console.error("Error exchanging code for token:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
module.exports = authController;