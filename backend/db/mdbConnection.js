
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mdbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to mongodb");
    } catch (error) {
        console.log("error to connect mongodb", error.message);
    }
};

export default mdbConnection;
