import { sequelize } from "../config/database.js";
import createUser from "./user.model.js";
import createProject from "./project.model.js";
import createTask from "./task.model.js";
import createOrgination from "./orginazation.js";

const User = createUser(sequelize);
const Project = createProject(sequelize);
const Task = createTask(sequelize);
const Orgination = createOrgination(sequelize);
// Define relationships

Orgination.hasMany(Project, {
  foreignKey: {
    name: "org_id",
    allowNull: false,
  },
});
Project.belongsTo(Orgination, {
  foreignKey: {
    name: "org_id",
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Project.hasMany(Task, {
  foreignKey: {
    name: "project_id",
    allowNull: false,
  },
});
Task.belongsTo(Project, {
  foreignKey: {
    name: "project_id",
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(Task, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
});
Task.belongsTo(User, {
  foreignKey: {
    name: "user_id",
    allowNull: true,
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Export everything
export const db = {
  sequelize,
  User,
  Project,
  Task,
  Orgination,
};
