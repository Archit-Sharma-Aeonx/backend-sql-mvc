import express from "express";
import { Allusers ,
      removeUser ,
      UserById ,
      PatchUser,
      AddUser,
      AdminUserPatch
 } from "../controller/user.controller.js"
 import { authenticateUser } from "../middlewares/authenticate.middleware.js";
 import { authorizeUser } from "../middlewares/authorization.mw.js";


 const router = express.Router();

router.route("/").post(AddUser).
      delete(authenticateUser,removeUser).
      get(authenticateUser , UserById).
      patch(authenticateUser, PatchUser);

 router.route("/admin").get( authenticateUser , authorizeUser , Allusers);
 router.route("/admin/:id").patch(authenticateUser , authorizeUser , AdminUserPatch );

 export  default router ;

