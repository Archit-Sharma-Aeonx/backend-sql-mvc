import { tryCatchWrapper } from "../middlewares/tryCatchWrapper.js";
import { booksModel } from "../model/book.model.js";

export const Allbooks = tryCatchWrapper(async (req, resp) => {

    const result = await booksModel.getAllBook();

    return resp.status(200).json(result)
});


export const BookById = tryCatchWrapper(async (req, resp) => {

    const { id } = req.params

    const result = await booksModel.getBookById(id);

    if (result.length === 0) return resp.status(404).json({ messgae: "User with given does not exist" })

    return resp.status(200).json(result)
});


export const AddBook = tryCatchWrapper(async (req, resp) => {

    const { book_name, author_name, shelf_number, stock } = req.body;

    if (!book_name || !author_name || !shelf_number) return resp.status(400).json({ message: "All fields are required to be filled" })

    const result = await booksModel.NewBook(book_name, author_name, shelf_number, stock);
    return resp.status(200).json({ message: "You have successfully added a book" }, result);

});


export const UPDATEBOOK = tryCatchWrapper(async (req, resp) => {

    const { id } = req.params
    const { book_name, author_name, shelf_number, stock } = req.body;

    if (!book_name || !author_name || !shelf_number || !stock) return resp.status(400).json({ message: "All fields are required to be filled" })

    const result = await booksModel.updateBook(book_name, author_name, shelf_number, stock);
    return resp.status(200).json({ message: "The book is updated as per given information" });

});


export const DELETEBOOK = tryCatchWrapper(async (req, resp) => {

    const { id } = req.params;

    const result = await booksModel.deleteBook(id);

    if (result.affectedRows === 0) return resp.staus(400).json({ message: `User with id: ${id} does not exist` });
    return resp.status(200).json({ message: `User with id: ${id} is now deleted` })

})