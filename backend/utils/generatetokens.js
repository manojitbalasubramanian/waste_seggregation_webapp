import jwt from "jsonwebtoken";

const generatetoken =(userId,res)=>{
    const token =jwt.sign(
        {userId},
        process.env.JWT_SECRET,
        {expiresIn:"15d"}
    );
    res.cookie("jwt", token, {
        maxAge: 15*24*60*60*1000,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV !== "development",
        path: "/",
    });
    console.log("Cookie set:", token);
};

export default generatetoken;
