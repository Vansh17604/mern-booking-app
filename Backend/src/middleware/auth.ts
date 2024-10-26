import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth_token"];
 

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECERT_KEY as string) as JwtPayload;
    req.userId = decoded.userId;
    next(); 
  } catch (error) {
    res.status(401).json({ message: "Unauthorized access" });
    console.log(error);
    return;
  }
};

export default verifyToken;
