const Authcontroller = {
    Register: async (req, res) => {
        try {
                const { username, email, password } = req.body;
                if (!username || !email || !password) {
                    return res.status(400).send("All fields are required");
                }   
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    return res.status(400).send("User already exists");
                }

                const newuser = new User({ username, email, password });
                res.status(201).send("user registered successfully");
                
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred during registration");
        }

      res.send("user registered successfully");
    },
    Login: async (req, res) => {
      res.send("user logged in successfully");
    },

};

export default Authcontroller;
