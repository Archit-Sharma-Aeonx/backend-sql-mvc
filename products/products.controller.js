import { tryCatchWrapper } from "../middlewares/tryCatchWrapper.js";
import { pool } from "../db/connect.js";
import { createCustomError } from "../errors/customError.js";

/**
 * @description Create product
 * @route POST /product
 */

export const createProduct = tryCatchWrapper(async function (req, res, next) {
    const { name, price, category, stock } = req.body

    if (!name || !price || !category || !stock)
        return next(createCustomError("All the fields are required ", 400));

    let sql = "INSERT INTO products(name , price , category , stock) value [? ,? ,? ,?]";
    await pool.query(sql, [name, price, category, stock]);

    return res.status(201).json({ message: "User created successfully" });
});

/**
 * @description Get product by id 
 * @route get /product
 */

export const getProduct = tryCatchWrapper(async function (req, res, next) {
    const { id } = req.params

    if (!id)
        return next(createCustomError("Id is required to get desired product", 404));

    const sql = "Select * from products where id = ?"
    const [result] = await pool.query(sql, [id]);

    return res.status(200).json({ products: result })
});

/**
 * @description Get allproducts
 * @route get /products
 */

export const allProducts = tryCatchWrapper(async function (req, resp, next) {

    const sql = "SELECT * FROM products"
    const [rows] = await pool.query(sql);

    if (!rows.length)
        return next(createCustomError("There is no product in here", 404));

    return resp.status(201).json({ products: rows });
})


/**
 * @description Update product
 * @route patch /product
 */

export const updateProducts = tryCatchWrapper(async function (req, resp, next) {
    const { name, price, category, stock } = req.body
    const { id } = req.params

    if (!name || !price || !category || !stock || !id)
        return next(createCustomError("All fields are required", 400));

    let sql = "UPDATE products set name = ? , price = ? , category = ? , stock= ? where id =?"
    await pool.query(sql, [name, price, category, stock, id]);

    return resp.status(200).json("The product is updated")
})


/**
 * @description delete product
 * @route delete /product
 */

export const deleteProduct = tryCatchWrapper(async function (req, resp, next) {
    const { id } = req.params
    if (!id) return next(createCustomError("Id is required to delete a user"), 400);


    let sql = "DELETE FROM products where id = ?"
    const [result] = await pool.query(sql, [id]);

    if (result.affectedRows === 0)
        return next(createCustomError("Given id user does not exist", 404))

    return resp.status(200).json("The user with given id is deleted!")
});