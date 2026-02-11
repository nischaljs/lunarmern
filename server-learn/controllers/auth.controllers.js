import User from "../models/user.model.js";
import { genrateToken } from "../utils/tokens.js";

const authController = {
    LoginController: async (req, res) => {
        // user le haleko email ra password acept garnu paro     
        try {
            const uemail = req.body.email;
            const upassword = req.body.password;
            console.log("user le esto pathyo", uemail, upassword);

            // tyo email ko user xa ki xaina check grnu paro
            // tyo email bhako user ko password tehi hoki haina check garnu paro 
            const existingUser = await User.findOne({
                email: uemail,
                password: upassword
            })


            //testo user xa bhane login successful bhane message pathaunu parcha
            if (existingUser) {
                const token = genrateToken(
                    {
                        id: existingUser._id,
                        name: existingUser.name
                    }
                )
                res.status(200).json({ message: "Login successful", data: existingUser, token: token });
            }
            else {
                res.status(401).json({ message: "Invalid email or password" });
            }

        }
        catch (error) {
            console.log("error in login controller", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    RegisterController: async (req, res) => {
        try {
            //user le haleko value linu paro
            // tyo email ko arko manxe hunu bhayena
            //user account db ma create gardine with aht name password and email;

            const uemail = req.body.email;
            const upassword = req.body.password;
            const uname = req.body.name;

            console.log("user le esto pathayo", uemail, upassword, uname);

            const existingUser = await User.findOne({
                email: uemail
            })
            console.log("db ma xa ki xaina", existingUser);

            if (existingUser) {
                res.status(400).json({ message: "User already exists" });
            }
            else {
                const newUser = await User.create(
                    {
                        name: uname,
                        email: uemail,
                        password: upassword
                    }
                );

                const token = genrateToken(
                    {
                        id: newUser._id,
                        name: newUser.name
                    }
                )
                res.status(201).json({ message: "User registered successfully", data: newUser, token: token });
            }

        } catch (error) {
            console.log("error in register controller", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    GetMeController: async (req, res) => {
        try{
            const userId = req.user.id;

            const existingUser = await User.findById(userId);

            res.status(200).json({message:"User details fetched successfully", data: existingUser});    

        }
        catch(error){
            console.log("error in get me controller", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}


export default authController;