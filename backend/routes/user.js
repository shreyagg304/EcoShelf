const router = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth.js");

//Sign Up
router.post("/signup", async (req, res) => {
    try {
        const {username, email, password, address } = req.body;

        //check username length is more than 4
        if (username.length < 4) {
            return res.status(400).json({message : "Username length should be greater than 3"});
        }

        //check username already exists
        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            return res
            .status(400)
            .json({message : "Username already exists"});
        }

        //check email already exists
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res
            .status(400)
            .json({message : "Email already exists"});
        }

        //check password's length
        if (password.length <= 7) {
            return res
            .status(400)
            .json({message : "Password's length should be greater than 8"});
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User ({ 
            username: username, 
            email: email, 
            password: hashPassword, 
            address: address, 
        });
        await newUser.save();
        return res.status(200).json({ message: "SignUp Successfully" });

    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
});

//Sign in
router.post("/login", async (req, res) => {
    try {
        const { login, password } = req.body;

        const existingUser = await User.findOne({
            $or: [{ username: login }, { email: login }]
        });
        if (!existingUser){
            res.status(400).json({ message: "Invalid Credentials "});
        }

        await bcrypt.compare(password, existingUser.password, (err, data) => {
            if (err) {
                return res.status(500).json({ message: "Error comparing passwords" });
            }
            if(data){
                const authClaims = [
                    { name: existingUser.username }, 
                    { role: existingUser.role },
                ];
                const token = jwt.sign({ authClaims }, "ecoshelf", {expiresIn: "30d",
                });
                res.status(200).json({ 
                    id: existingUser._id, 
                    role: existingUser.role, 
                    token: token, 
                });   
            } else {
                res.status(400).json({ message: "Invalid credentials" })
            }
        })
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
});

//get user imformation
router.get("/getUserInfo", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const data  = await User.findById(id).select('-password');
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
})

//update address and username
router.put("/updateAddUn", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { address, username } = req.body;
        const updateData = {};
        if (address) {
            updateData.address = address;
        }
        if (username) {
            updateData.username = username;
        }
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No fields to update" });
        }
        await User.findByIdAndUpdate(id, updateData);

        return res.status(200).json({ message: "Address and/or username updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;