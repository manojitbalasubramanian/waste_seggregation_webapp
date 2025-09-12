import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
// import adminRoutes from "./routes/admin.routes.js";

import connecttomongodb from "./db/mdbConnection.js";

dotenv.config();

const app = express();

const PORT = 1234;

import cors from 'cors';

// CORS configuration
const corsOptions = {
    origin: "http://localhost:5678",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"]
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
// app.use("/api/donors", donorRoutes);
// app.use("/api/admin", adminRoutes);

app.listen(PORT,()=>{
    connecttomongodb()
    console.log(`server running in port ${PORT}`)
});
