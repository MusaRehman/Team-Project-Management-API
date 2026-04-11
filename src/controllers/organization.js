import { set } from "zod";
import { db } from "../models/index.js";
import { getCache, setCache } from "../utils/cache.js";
const { Organization, OrganizationMember, User } = db;

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
    const cr = creator.get({ plain: true });
    if (cr.role !== "ADMIN" && cr.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Only admin users can create organizations" });
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
    const cacheKey = "org:list:all";

    // 1. check redis
    const cached = await getCache(cacheKey);
    if (cached) {
      console.log("✅ CACHE HIT");
      return res.json(cached);
    }

    // 2. miss → hit DB
    console.log("❌ CACHE MISS → hitting DB");
    const orgs = await Organization.findAll();

    // 3. store in redis
    await setCache(cacheKey, orgs, 60);

    res.json(orgs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch organizations" });
  }
};

// get orginization by id
export const getOrganizationById = async (req, res) => {
  try {
    let cacheKey = `org:yamaloko:${req.params.id}`;
    // redis check
    const cachePresent = await getCache(cacheKey);
    if (cachePresent) {
      console.log("✅ CACHE HIT");
      return res.json(cachePresent);
    }
    console.log("❌ CACHE MISS → hitting DB");
    const { id } = req.params;
    const organization = await Organization.findByPk(id);
    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }
    res.status(200).json(organization);
    await setCache(cacheKey, organization, 60); // cache for 60 seconds
  } catch (error) {
    console.error("Error fetching organization:", error);
    res.status(500).json({ error: "Failed to fetch organization" });
  }
};

// export
