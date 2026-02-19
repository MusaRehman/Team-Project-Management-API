import { sequelize } from "../config/database.js";
import createUser from "./user.model.js";
import createProject from "./project.model.js";
import createTask from "./task.model.js";

const User = createUser(sequelize);
const Project = createProject(sequelize);
const Task = createTask(sequelize);

// Define relationships
User.hasMany(Project, { foreignKey: "user_id" });
Project.belongsTo(User, { foreignKey: "user_id" });

Project.hasMany(Task, { foreignKey: "project_id" });
Task.belongsTo(Project, { foreignKey: "project_id" });

// Export everything
export const db = {
  sequelize,
  User,
  Project,
  Task,
};
