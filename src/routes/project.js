import { Router } from "express";
import { createProject } from "../controllers/projects.js";
// import {
//   createProject
// } from "../controllers/projects.js";

let router = Router();

router.post("/createProject",createProject);


export default router;
