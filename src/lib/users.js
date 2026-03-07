// src/lib/users.js
import { dbConnect } from './dbConnect';
import bcrypt from 'bcryptjs';

// Register a new user
export async function createUser({ name, email, password }) {
  const collection = dbConnect('users');

  // Check if email already exists
  const existing = await collection.findOne({ email });
  if (existing) {
    throw new Error('An account with this email already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  const result = await collection.insertOne({
    name,
    email,
    password:  hashedPassword,
    provider:  'credentials',
    role:      'user',
    createdAt: new Date(),
  });

  return result;
}

// Get user by email
export async function getUserByEmail(email) {
  const collection = dbConnect('users');
  const user = await collection.findOne({ email });
  if (!user) return null;
  return { ...user, _id: user._id.toString() };
}