import express from 'express';
import { Allbooks ,
         AddBook ,
         BookById ,
         UPDATEBOOK,
         DELETEBOOK
 } from '../controller/book.controller.js';
 import { authenticateUser } from '../middlewares/authenticate.middleware.js';
 import { authorizeUser } from '../middlewares/authorization.mw.js';

const router = express.Router();

router.route("/").get(Allbooks).post(authenticateUser, authorizeUser , AddBook);
router.route("/:id").get(BookById).patch(authenticateUser, authorizeUser ,UPDATEBOOK).delete(authenticateUser, authorizeUser ,DELETEBOOK);
export default router;