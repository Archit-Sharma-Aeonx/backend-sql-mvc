import pool from "../db/connect.js";

export const authorization = {

registerNewUser:  async (name , phone_number , email , age , password ) => {

    const [row] = await pool.query("INSERT INTO users set name = ? , phone_number = ? , email = ? , age = ? , password = ?",
        [name , phone_number , email , age , password ]
    );
    
    return row;

},
    findUserByEmail: async (email) => {
         
        const [rows] = await pool.query("SELECT * from users where email = ?" , [email]);

        return rows;

    }
}