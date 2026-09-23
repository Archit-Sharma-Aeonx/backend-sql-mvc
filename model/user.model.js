import pool from "../db/connect.js"
import { PatchUser } from "../controller/user.controller.js";

const UsersModel = {

    getAllUsers: async () => {

        const [result] = await pool.query("SELECT * FROM users")
        return result;
    },

    getUserbyID: async (id) => {

        const [result] = await pool.query("SELECT * FROM users where id = ?",
            [id]
        );
        return result;
    },

    newUser: async (name, phone_number, email, age, password, role) => {
        const [result] = await pool.query("INSERT INTO users (name ,phone_number ,email , age ,password , role) values(? , ? ,? ,? ,? ,?)",
            [name, phone_number, email, age, password, role]
        );
        return result;
    },

    updateUser: async (values , setClause) => {
        const [result] = await pool.query(`UPDATE  users set ${setClause} where id =? `,
            values
        );

        return result;
    },

    checkActiveBorrowing: async(id) => {
        const [check] = await pool.query("SELECT * FROM borrowings where user_id = ? and actual_return_date IS NULL" , 
            [id]
        )
        return check;
    },

    deleteuser : async(id) => {
        const [remove] = await pool.query("DELETE  FROM users where id = ?" , [id]);
        return remove;
    },

    checkBorrowingHistory : async(id) => {
        const [check] = await pool.query("SELECT * FROM borrowings WHERE user_id = ?" , [id])
        return check;
    }

}
export default UsersModel;