import { db } from "../models/index.js";
export  const createProject = async (req, res) => {
  try {
    const { title, description, org_id } = req.body;
    await db.Project.create({ title, description, org_id });
    return res.status(201).json({
      message: "Project created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
