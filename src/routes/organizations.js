import { Router } from "express";
import {
  createOrganization,
  getOrganizationById,
  getOrganizations,
  getOrganizationMembers,
} from "../controllers/organization.js";

let router = Router();

router.post("/create", createOrganization);
router.get("/", getOrganizations);
router.get("/:id", getOrganizationById);
router.get("/org-members/:id", getOrganizationMembers);

export default router;
