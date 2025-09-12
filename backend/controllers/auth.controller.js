import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generatetokenandsetcookie from "../utils/generatetokens.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const { username, email, password, confirmpassword, isAdmin, isVendor, isUser } = req.body;
        if (!username || !email || !password || !confirmpassword) {
            return res.status(400).json({ error: "Please fill all the fields" });
        }
        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            if (user.username === username) {
                return res.status(400).json({ error: "Username already exists" });
            }
            if (user.email === email) {
                return res.status(400).json({ error: "Email already exists" });
            }
        }
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);
        const newuser = new User({
            username,
            email,
            password: hashedpassword,
            isAdmin: !!isAdmin,
            isVendor: !!isVendor,
            isUser: isUser !== undefined ? !!isUser : true
        });
        await newuser.save();
        const token = jwt.sign(
            { userId: newuser._id },
            process.env.JWT_SECRET,
            { expiresIn: "15d" }
        );
        generatetokenandsetcookie(newuser._id, res);
        return res.status(201).json({ 
            message: "User registered successfully", 
            user: {
                _id: newuser._id,
                username: newuser.username,
                email: newuser.email,
                isAdmin: newuser.isAdmin,
                isVendor: newuser.isVendor,
                isUser: newuser.isUser
            },
            token 
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Please provide username and password" });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "15d" }
        );
        generatetokenandsetcookie(user._id, res);
        return res.status(200).json({ 
            message: "Login successful", 
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                isVendor: user.isVendor,
                isUser: user.isUser
            },
            token 
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const logout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    return res.status(200).json({ message: "Logged out successfully" });
};
