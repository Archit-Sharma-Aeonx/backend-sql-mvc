import express from 'express';
import {
    getProduct,
    createProduct,
    allProducts,
    updateProducts,
    deleteProduct
} from './products.controller.js';

const router = express.Router();

router.route("/").get(allProducts).post(createProduct);
router.route("/:id").get(getProduct).patch(updateProducts).delete(deleteProduct);

export default router;