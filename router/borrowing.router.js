import express from "express";
import { ALLBORROWERS ,
        BORROWERBYID,
        NEWBORROWER,
        RETURNBOOK
 } from "../controller/borrowing.controller.js";
 import {authenticateUser} from "../middlewares/authenticate.middleware.js"
 import { authorizeUser } from "../middlewares/authorization.mw.js";


 const router = express.Router();

 router.route("/").get(authenticateUser , authorizeUser , ALLBORROWERS).post(authenticateUser , NEWBORROWER);
 router.route("/:id").get(authenticateUser , authorizeUser ,BORROWERBYID);
 router.route("/return/:id").patch(authenticateUser , RETURNBOOK)

 export default router;