import { db } from "../models/index.js";
import bcrypt from "bcrypt";

const { User } = db;

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, org_id } = req.body;

    // 1️⃣ Check duplicate email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
/    }o5

    // 2️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,      // optional
      org_id,    // optional
    });

    // 4️⃣ Remove password from response
    const userData = user.toJSON();
    delete userData.password;

    return res.status(201).json(userData);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};