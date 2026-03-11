import { sequelize } from "../config/database.js";
import createOrganization from "./orginazation.js";
import createUser from "./user.model.js";
import createProject from "./project.model.js";
import createTask from "./task.model.js";
import createProjectMember from "./projectmember.js";

const User = createUser(sequelize);
const Project = createProject(sequelize);
const Task = createTask(sequelize);
const Organization = createOrganization(sequelize);
const ProjectMember = createProjectMember(sequelize);
// Define relationships

Organization.hasMany(Project, {
  foreignKey: {
    name: "org_id",
    allowNull: false,
  },
});
Project.belongsTo(Organization, {
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

User.belongsToMany(Project, {
  through: ProjectMember,
  foreignKey: "user_id",
});

Project.belongsToMany(User, {
  through: ProjectMember,
  foreignKey: "project_id",
});

// Export everything
export const db = {
  sequelize,
  User,
  Project,
  Task,
  Organization,
};
