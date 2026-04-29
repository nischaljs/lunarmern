import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const sanitizeUser = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
});

const AuthController = {
    Register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                name,
                email,
                password: hashedPassword,
            });

            res.status(201).json({
                message: "User registered successfully",
                user: sanitizeUser(newUser),
            });
        } catch (error) {
            console.log("Error during registration:", error);
            res.status(500).json({ message: "An error occurred during registration" });
        }
    },

    Login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: "Email and password are required" });
            }

            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const isMatch = await bcrypt.compare(password, existingUser.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign(
                { id: existingUser._id, role: existingUser.role },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            res.status(200).json({
                message: "User logged in successfully",
                token,
                user: sanitizeUser(existingUser),
            });
        } catch (error) {
            console.log("Error during login:", error);
            res.status(500).json({ message: "An error occurred during login" });
        }
    },
};

export default AuthController;
