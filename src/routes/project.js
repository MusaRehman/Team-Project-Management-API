import { Router } from "express";
import { createProject, getTasks } from "../controllers/projects.js";
// import {
//   createProject
// } from "../controllers/projects.js";

let router = Router();

router.post("/createProject",createProject);
router.get("/get/projects/:project_id/tasks/:is_completed/:assignee/:project_title", getTasks);
// router.get("")

export default router;
