import pool from "../db/connect.js"

export const borrowingDbQueries = {

    getAllBorowers: async () => {

        const [result] = await pool.query("SELECT * FROM borrowings");
        return result;

    },

    getBorowerById: async (id) => {

        const [result] = await pool.query("SELECT * FROM borrowings where id = ?", [id]);
        return result;

    },

    NewBorrower: async (user_id, book_id, expected_return_date) => {

        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const [result] = await connection.query("update books set stock = stock-1 where id = ? AND stock > 0 ", [book_id])
            if (result.affectedRows === 0) throw new Error("Book not found or is out of stock");

            const [result2] = await connection.query("INSERT INTO borrowings set user_id =? , book_id =? , borrow_date = CURDATE() , expected_return_date = ? ",
                [user_id, book_id, expected_return_date]
            )

            await connection.commit();

            return result2;

        } catch (error) {
            await connection.rollback();
            throw error;
        }
        finally {
            connection.release()

        }

    },

    returnBook: async (id) => {

        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            const [row] = await connection.query("SELECT book_id from borrowings where id = ? and actual_return_date IS NULL", [id]);

            if (row.length === 0) throw new Error("The given id does not exist or book is already returned!")

            const book_id = row[0].book_id;

            const [result] = await connection.query("UPDATE books set stock = stock+1 where id =? ", [book_id])

            if (result.affectedRows === 0) throw new Error("The given book_id related to given id does not exist ")

            const [result2] = await connection.query("UPDATE borrowings set actual_return_date = CURDATE() where id = ?", [id])

            await connection.commit();

            return result2;

        } catch (error) {

            await connection.rollback();
            throw error;

        } finally {

            connection.release();

        }

    }
}