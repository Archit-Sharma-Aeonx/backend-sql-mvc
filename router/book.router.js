import express from 'express';
import { Allbooks ,
         AddBook ,
         BookById ,
         UPDATEBOOK,
         DELETEBOOK
 } from '../controller/book.controller.js';

const router = express.Router();

router.route("/").get(Allbooks).post(AddBook);
router.route("/:id").get(BookById).patch(UPDATEBOOK).delete(DELETEBOOK);
export default router;