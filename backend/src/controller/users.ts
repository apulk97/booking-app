import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

import { CustomRequest } from "../middleware/auth";

export const getUserDetails = async (req: CustomRequest, res: Response) => {
  const { userId } = req
  console.log(userId);
  
  try {
    const result = await User.findById(userId).select("-password")
    if (!result) {
      return res.status(404).json({message: 'User does not exists'})
  }
    res.status(200).json(result)
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const signin = async (req: Request, res: Response) => {
  const { password, email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        return res.status(404).json({message: 'User does not exists'})
    }
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
    if (!isPasswordCorrect) {
        return res.status(400).json({message: 'Invalid credentials'})
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY as string, {
        expiresIn: "1d",
      });
      return res.status(200).json({result: existingUser, token})
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, password, email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email: email, password: hashedPassword, name: `${firstName} ${lastName}` });
    const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "1d",
    });
    return res.status(201).json({ result, token });
  } catch (err) {
    console.log(err);
  }
};
