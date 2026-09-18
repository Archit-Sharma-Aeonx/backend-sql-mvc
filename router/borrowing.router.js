import express from "express";
import { ALLBORROWERS ,
        BORROWERBYID,
        NEWBORROWER,
        RETURNBOOK
 } from "../controller/borrowing.controller.js";

 const router = express.Router();

 router.route("/").get(ALLBORROWERS).post(NEWBORROWER);
 router.route("/:id").get(BORROWERBYID);
 router.route("/return/:id").patch(RETURNBOOK)

 export default router;