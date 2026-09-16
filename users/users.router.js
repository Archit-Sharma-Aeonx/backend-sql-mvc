import express from "express";
import { createUser ,
    getSingleUser,
    allUsers,
    updateUser,
    deleteUser,
    userByName
 } from "./users.controller.js";

 const router = express.Router();

 router.route("/").get(allUsers).post(createUser);
 router.route("/:id").get(getSingleUser).patch(updateUser).delete(deleteUser);
router.route("/name/:name").get(userByName);
 export default router;