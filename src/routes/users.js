import { Router } from "express";
import { createUser, getUser, getUsers } from "../controllers/users.js";

let router = Router();

router.post('/create', createUser);
router.get('/get/:id', getUser);
router.get('/get-all', getUsers);


export default router;