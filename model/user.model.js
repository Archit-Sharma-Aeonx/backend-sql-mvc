import pool from "../db/connect.js"

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

    updateUser: async (id, name, phone_number, email, age, password, role) => {
        const [result] = await pool.query("UPDATE  users set name = ? , phone_number =? , email =? , age =? , password=? , role = ? where id =? ",
            [name, phone_number, email, age, password, role, id]
        );

        return result;
    },

    deleteUser: async(id) => {
        const [result] = await pool.query("DELETE FROM users where id = ?" ,[id])
        return result;
    }

}
export default UsersModel;