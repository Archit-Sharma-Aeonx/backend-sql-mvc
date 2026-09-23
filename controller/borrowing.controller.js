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

export const NEWBORROWER = tryCatchWrapper(async (req, resp , next) => {

    const {  book_id, expected_return_date } = req.body;

    if ( !book_id || !expected_return_date) return resp.status(400).json({ message: "All fields are required" });
    const expectedDate = new Date(expected_return_date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    new Date().toISOString()

    if(currentDate >= expectedDate) return next(createCustomError("Invalid expected return date !!" , 400))
    

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

    if(row[0].actual_return_date !== null)return next(createCustomError("The book is already returned and can not be returned twice!!" , 409));

     await borrowingDbQueries.returnBook(id);

    return resp.status(200).json({ message: "The book is returned successfully !! Thank You 🎉🙏" })
})

export const myborrowings = tryCatchWrapper(async(req , resp , next) => {

    const userid = req.user.id;

    const result = await borrowingDbQueries.getMyBorrowings(userid);
    if(result.length === 0) return next(createCustomError("No data for your login id" , 404));

    return resp.status(200).json(result)
});