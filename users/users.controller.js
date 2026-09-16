import { tryCatchWrapper } from "../middlewares/tryCatchWrapper.js";
import { pool } from "../db/connect.js";
import { createCustomError } from "../errors/customError.js";

/**
 * @description Create user
 * @route POST /user
 */

export const createUser = tryCatchWrapper(async function (req, resp, next) {
    const { name, email } = req.body;

    if (!name || !email)
        return next(createCustomError("All fields are required", 400));

    let sql = "INSERT into users (name , email ) values (? , ?)";
    await pool.query(sql, [name, email]);

    return resp.status(201).json({ message: "USER has been created!!" });
});

/**
 * @returns get user  id 
 */

async function getUser(id) {

    let sql = "select * from users where id =?";

    const [rows] = await pool.query(sql, [id]);

    return rows[0];
}

/**
* @description Get All USERS
* @route GET /notes
*/

export const allUsers = tryCatchWrapper(async function (req, resp, next) {

    let sql = "select * from users ";

    const [rows] = await pool.query(sql);

    if (!rows.length) return resp.status(204).json({ message: "No user information!!" });

    return resp.status(200).json({ users: rows })
});

/**
 * @description Get Single user
 * @route GET /users/:id
 */

export const getSingleUser = tryCatchWrapper(async function (req, resp, next) {
    const { id } = req.params;

    const user = await getUser(id);
    if (!user) return next(createCustomError("User not found by given id ", 404));
    return resp.status(200).json({ users: user });
});

/**
 * @description Update User
 * @route PATCH /User/:id
 */

export const updateUser = tryCatchWrapper(async (req, res, next) => {
    const id = req.params.id;

    const { name, email } = req.body;
    if (!id || !name || !email)
        return next(createCustomError("all the fields should be given ", 400));

    const sql = "Update users set name = ? , email =?  where id = ?";
    await pool.query(sql, [name, email, id]);

    return res.status(201).json({ message: "The user is updated successfully!!" });
});

/**
 * @description Delete user
 * @route DELETE /user/:id
 */

export const deleteUser = tryCatchWrapper(async (req, res, next) => {
    
    const id = req.params.id;
    if (!id) return next(createCustomError("Id is  required", 400));

    const sql = "Delete from users where id = ? ";
   const [result] =  await pool.query(sql, [id]);

   if(result.affectedRows === 0){
    return next(createCustomError("User not found" , 404));
   }

    return res.status(200).json({ message: "The user with given id is deleted" });
});

/**
 * @description Get Single user by name
 * @route GET /users/:name
 */

export const userByName = tryCatchWrapper(async function (req, res, next) {

    const name = req.params.name;
    if (!name) return next(createCustomError("Name is required for searching", 400));

    const sql = "Select * from users where name = ? ";
    const [user] = await pool.query(sql, [name]);

    return res.status(200).json({ message: user });
});
