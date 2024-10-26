import  express  from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { check, validationResult } from "express-validator";


const router = express.Router();


router.post("/register",[
  check("firstName","firstName is required").isString(),
  check("lastName","lastName is required").isString(),
  check("email","email is required").isEmail(),
  check("password","Password muxt in 6 charcter or more than that").isLength({min:6,})
], async (req:Request, res:Response):Promise<void> => {
  const errors =validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({message: errors.array()});
    }
  
  try {
    let user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      res.status(400).json({ message: "User already exists" });
      return; 
    }
    user = new User(req.body);
    await user.save();

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECERT_KEY as string,
      { expiresIn: "1d" }
    );
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    res.status(200).send({ message:"User register OK"});
    
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

export default router;