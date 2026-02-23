import User from "../models/user.model.js";


const AuthController = {
    Register: async (req, res) => {
        try {
            //extract the user sent data
            const {name, email, password } = req.body;

            //check if each data is sent
            if(!name || !email || !password){
                return res.status(400).send("All fields are required");
            }
            //check if user is already registered

            const existingUser = await User.findOne({
                email
            })
            //if user already exists, send error response
            if(existingUser){
                return res.status(400).send("User already exists");
            }
            //if user is new, create a new user
            const newUser = await User.create({
                name,
                email,
                password
            })

            //send success response
            res.status(201).json({
                message:"User registered successfully",
                user: newUser
            })
    
        } catch (error) {
            console.log("Error during registration:", error);
            res.status(500).send("An error occurred during registration");
        }
    },

    Login: async (req, res) => {
        try {
            //extract the user sent data
            const {email, password } = req.body;

            //check if both email and password is sent or not
            if(!email || !password){
                return res.status(400).send("Email and password are required");
            }
            //check if user is already registered
            const existingUser = await User.findOne({
                email
            })
            //if user does not exist, send error response
            if(!existingUser){
                return res.status(400).send("User does not exist");
            }
            if(existingUser.password !== password){
                return res.status(400).send("Invalid password");
            }
            //if user is valid, send success response
            res.status(200).json({
                message:"User logged in successfully",
                user: existingUser
            })
            
        } catch (error) {
            console.log("Error during login:", error);
            res.status(500).send("An error occurred during login");
        }
    }
}

export default AuthController;