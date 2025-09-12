import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    isAdmin: { type: Boolean, default: false },
    isVendor: { type: Boolean, default: false },
    isUser: { type: Boolean, default: true }
}, { timestamps: true });

const User = mongoose.model("User",userSchema);

export default User;
