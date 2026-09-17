import express from "express";
import { Allusers ,
      removeUser ,
      UserById ,
      PatchUser,
      AddUser
 } from "../controller/user.controller.js"

 const router = express.Router();

 router.route("/").get(Allusers).post(AddUser);
 router.route("/:id").get(UserById).patch(PatchUser).delete(removeUser);

 export  default router ;
