import { Router } from "express";
import {
  createOrganization,
  getOrganizationById,
  getOrganizations,
} from "../controllers/organization.js";

let router = Router();

router.post("/create", createOrganization);
router.get("/", getOrganizations);
router.get("/:id", getOrganizationById);

export default router;
