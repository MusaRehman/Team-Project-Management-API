import { db } from "../models/index.js";
import { getCache, setCache } from "../utils/cache.js";
export const createProject = async (req, res) => {
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

export const getTasks = async (req, res) => {
  try {
    const { project_id, is_completed, assignee, project_title } = req.params;
    console.log(project_id, is_completed, assignee, project_title);

    let cacheKey = `projectId:${project_id}:isCompleted:${is_completed}:assignee:${assignee}:projectTitle:${project_title}`;
    // hit or miss method
    const cacheExists = await getCache(cacheKey);

    if(cacheExists){
      console.log(cacheExists);
      console.log("Cache hit, returning data...");
      return res.status(200).json({ message: "Tasks retrieved from cache", data: cacheExists });
    }
    console.log("Cache miss, querying database...");
    let task = await db.Task.findAll({
      where: {
        project_id,
        completed:is_completed,
        assignee_id:assignee,
      },
      include: [
        {
          model: db.Project,
          where: {
            id: project_id,
            title: project_title,
          },
          required: true,
        },
      ],
    });
    await setCache(cacheKey, task, 100);

    return res.status(200).json({ message: "Tasks retrieved successfully", data: task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
