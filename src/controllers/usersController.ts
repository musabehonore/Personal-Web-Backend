import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import IUser from '../models/User';
import { Error } from 'mongoose';
import { loginVal, signInVal } from '../validations/usersValidation';
import * as dotenv from 'dotenv';

dotenv.config();

const jwtSecret = `${process.env.JWT_SECRET}`;

const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email, role } = req.body;

    const { error } = signInVal.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const existingUser = await IUser.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new IUser({ username, password: hashedPassword, email, role });
    await newUser.save();

    const token = jwt.sign({ username: newUser.username, email: newUser.email, role: newUser.role }, jwtSecret, {
      expiresIn: '3h'
    });

    res.status(201)
      .header('Authorization', `Bearer ${token}`)
      .send({ message: 'User created successfully', token });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const { error } = loginVal.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await IUser.findOne({ $or: [{ username }, { email: username }] });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username: user.username, email: user.email, role: user.role }, jwtSecret, {
      expiresIn: '10h'
    });

    res.status(200)
      .header('Authorization', `Bearer ${token}`)
      .send({ message: 'Login successful!!', token: token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export { createUser, loginUser }