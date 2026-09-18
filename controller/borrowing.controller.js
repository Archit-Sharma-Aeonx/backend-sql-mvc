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

    const { user_id, book_id, expected_return_date } = req.body;

    if (!user_id || !book_id || !expected_return_date) return resp.status(400).json({ message: "All fields are required" });

    const result = await borrowingDbQueries.NewBorrower(user_id, book_id, expected_return_date);

    return resp.status(201).json({ message: `New borrower added with id: ${result.insertId} !` });

});

export const RETURNBOOK = tryCatchWrapper(async (req, resp) => {

    const { id } = req.params;

    const result = await borrowingDbQueries.returnBook(id);

    return resp.status(200).json({ message: "The book is returned successfully !! Thank You 🎉🙏" })
})