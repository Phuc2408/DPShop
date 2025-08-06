const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users'); 

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
    }
}
module.exports = authController;