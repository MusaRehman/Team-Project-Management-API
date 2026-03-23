import { sequelize } from "../config/database.js";
import createOrganization from "./orginazation.js";
import createUser from "./user.model.js";
import createProject from "./project.model.js";
import createTask from "./task.model.js";
import createProjectMember from "./projectmember.js";
import createOrganizationMember from "./orginazationMember.js";

const User = createUser(sequelize);
const Project = createProject(sequelize);
const Task = createTask(sequelize);
const Organization = createOrganization(sequelize);
const ProjectMember = createProjectMember(sequelize);
const OrganizationMember = createOrganizationMember(sequelize);

// ─── Org → Projects ───────────────────────────────────────────
Organization.hasMany(Project, {
  foreignKey: { name: "org_id", allowNull: false },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Project.belongsTo(Organization, {
  foreignKey: { name: "org_id", allowNull: false },
});

// ─── Project → Tasks ──────────────────────────────────────────
Project.hasMany(Task, {
  foreignKey: { name: "project_id", allowNull: false },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Task.belongsTo(Project, {
  foreignKey: { name: "project_id", allowNull: false },
});

// ─── User → Tasks (assignee) ──────────────────────────────────
User.hasMany(Task, {
  foreignKey: { name: "assignee_id", allowNull: true },
  as: "assignedTasks",
  onDelete: "SET NULL",  // don't delete task if user is deleted
  onUpdate: "CASCADE",
});
Task.belongsTo(User, {
  foreignKey: { name: "assignee_id", allowNull: true },
  as: "assignee",
});

// ─── User → Tasks (reporter) ──────────────────────────────────
User.hasMany(Task, {
  foreignKey: { name: "reporter_id", allowNull: false },
  as: "reportedTasks",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Task.belongsTo(User, {
  foreignKey: { name: "reporter_id", allowNull: false },
  as: "reporter",
});

// ─── User ↔ Project (many-to-many) ───────────────────────────
User.belongsToMany(Project, {
  through: ProjectMember,
  foreignKey: "user_id",
  otherKey: "project_id",
});
Project.belongsToMany(User, {
  through: ProjectMember,
  foreignKey: "project_id",
  otherKey: "user_id",
});

// ─── User ↔ Organization (many-to-many) ──────────────────────
User.belongsToMany(Organization, {
  through: OrganizationMember,
  foreignKey: "user_id",
  otherKey: "org_id",
});
Organization.belongsToMany(User, {
  through: OrganizationMember,
  foreignKey: "org_id",
  otherKey: "user_id",
});

// ─── Export ───────────────────────────────────────────────────
export const db = {
  sequelize,
  User,
  Project,
  Task,
  Organization,
  ProjectMember,
  OrganizationMember,
};