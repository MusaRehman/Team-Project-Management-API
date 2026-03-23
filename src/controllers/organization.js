
import { db } from "../models/index.js";
const { Organization,OrganizationMember } = db;
// create orginization

export const createOrganization = async (req, res) => {
  try {
    const { name, description, creator_id } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!creator_id) {
      return res.status(400).json({ error: "Creator ID is required" });
    }

    // Make sure creator exists
    const creator = await User.findByPk(creator_id);
    if (!creator) {
      return res.status(404).json({ error: "Creator user not found" });
    }

    const organization = await Organization.create({
      name,
      description: description || null,
    });

    // Add creator as admin member
    await OrganizationMember.create({
      org_id: organization.id,
      user_id: creator_id,
      role: "admin",
    });

    res.status(201).json(organization);
  } catch (error) {
    console.error("Error creating organization:", error);
    res.status(500).json({ error: "Failed to create organization" });
  }
};

// get all orginization
export const getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.findAll();
    res.status(200).json(organizations);
  } catch (error) {
    console.error("Error fetching organizations:", error);
    res.status(500).json({ error: "Failed to fetch organizations" });
  }
};

// get orginization by id
export const getOrganizationById = async (req, res) => {
  try {
    const { id } = req.params;
    const organization = await Organization.findByPk(id);
    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }
    res.status(200).json(organization);
  } catch (error) {
    console.error("Error fetching organization:", error);
    res.status(500).json({ error: "Failed to fetch organization" });
  }
};


// export  