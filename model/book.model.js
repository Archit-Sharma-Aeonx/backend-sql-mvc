import pool from "../db/connect.js";
import { UPDATEBOOK } from "../controller/book.controller.js";

export const booksModel = {

    getAllBook: async () => {

        const [result] = await pool.query("SELECT * FROM books")
        return result;
    },

    getBookById: async (id) => {

        const [result] = await pool.query("SELECT * FROM books where id = ?", [id])
        return result;
    },

    NewBook: async (book_name, author_name, shelf_number, stock) => {

        const [result] = await pool.query("INSERT INTO books (book_name , author_name , shelf_number , stock) values(? ,? ,? ,?)",
            [book_name, author_name, shelf_number, stock]
        );
        return result;
    },

    updateBook: async (values , setClause) => {

        const [result] = await pool.query(`UPDATE books set ${setClause} where id = ? `,
            values
        );
        return result;
    },

    deleteBook: async(id) => {

        const [result] = await pool.query("DELETE FROM books where id = ?" , [id])
        return result;
    }

}
