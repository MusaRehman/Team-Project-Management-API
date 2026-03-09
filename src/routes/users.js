import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/users.js";

let router = Router();

router.post('/create', createUser);
router.get('/get/:id', getUser);
router.get('/get-all', getUsers);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;