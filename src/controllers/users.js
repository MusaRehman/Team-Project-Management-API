
import { db } from "../models/index.js";
import bcrypt from "bcrypt";

const { User,ProjectMember } = db;

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, org_id } = req.body;

    // 1️⃣ Check duplicate email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 2️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role, // optional
      org_id, // optional
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

export const getUser = async (req, res) => {
  try {
    console.log("request get");

    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const plainUser = user.toJSON();
    delete plainUser.password;
    return res.status(200).json(plainUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getUsers = async (req, res) => {
  try {
    const { page, limit } = req.query;
    let totalUsers = await User.count();
    let pageNum = parseInt(page) || 1;
    let limitNum = parseInt(limit) || 10;
    limitNum > 2 && (limitNum = 2);
    const offset = (pageNum - 1) * limitNum;
    const users = await User.findAll({ limit: limitNum, offset });

    const plainUsers = users.map((user) => {
      const plainUser = user.toJSON();
      delete plainUser.password;
      return plainUser;
    });

    return res.status(200).json({
      success: true,
      data: plainUsers,
      pagination: {
        total: totalUsers,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(totalUsers / limitNum),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role, org_id } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    await user.update({
      name,
      email,
      password,
      role,
      org_id,
    });

    const updatedUser = user.toJSON();
    delete updatedUser.password;

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const delUser = await User.destroy({ where: { id } });
    if (!delUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addMemberToOrg = async (req, res) => {
  try {
    const { user_id, org_id, role,project_id } = req.body;

    const memberAdded = await ProjectMember.create({
      user_id,
      org_id,
      project_id,
      role,
    });
    return res.status(200).json({ message: "Member added to organization successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}