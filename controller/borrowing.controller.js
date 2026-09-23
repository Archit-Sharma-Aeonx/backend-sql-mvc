import { createCustomError } from "../errors/customError.js";
import { tryCatchWrapper } from "../middlewares/tryCatchWrapper.js"
import { borrowingDbQueries } from "../model/borrowing.model.js"

export const ALLBORROWERS = tryCatchWrapper(async (req, resp) => {

    const result = await borrowingDbQueries.getAllBorowers();
    return resp.status(200).json({ result });

});

export const BORROWERBYID = tryCatchWrapper(async (req, resp) => {

    const { id } = req.params

    const result = await borrowingDbQueries.getBorowerById(id);
    if (result.length === 0) return resp.status(404).json({ message: `No borowwer for id: ${id}` });

    return resp.status(200).json(result);

});

export const NEWBORROWER = tryCatchWrapper(async (req, resp) => {

    const {  book_id, expected_return_date } = req.body;

    if ( !book_id || !expected_return_date) return resp.status(400).json({ message: "All fields are required" });

    const user_id = req.user.id;

    const result = await borrowingDbQueries.NewBorrower(user_id, book_id, expected_return_date);

    return resp.status(201).json({ message: `New borrower added with id: ${result.insertId} !` });

});

export const RETURNBOOK = tryCatchWrapper(async (req, resp , next) => {

    const { id } = req.params;
    const user_id = req.user.id;

    const row = await borrowingDbQueries.findBorrowingById(id);

    if(row.length===0) return next(createCustomError("Invalid borrowing id" , 404));

    const database_user_id = row[0].user_id;
    if(database_user_id !== user_id) return next(createCustomError("You can return book linked to your user id only" , 403));

     await borrowingDbQueries.returnBook(id);

    return resp.status(200).json({ message: "The book is returned successfully !! Thank You 🎉🙏" })
})

export const myborrowings = tryCatchWrapper(async(req , resp , next) => {

    const userid = req.user.id;

    const result = await borrowingDbQueries.getMyBorrowings(userid);
    if(result.length === 0) return next(createCustomError("No data for your login id" , 404));

    return resp.status(200).json(result)
});