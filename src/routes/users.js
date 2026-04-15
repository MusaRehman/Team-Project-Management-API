import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser, addMemberToOrg } from "../controllers/users.js";

let router = Router();

router.post('/create', createUser);
router.post('/add-member', addMemberToOrg);
router.get('/get/:id', getUser);
router.get('/get-all', getUsers);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;