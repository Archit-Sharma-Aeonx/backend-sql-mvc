import { tryCatchWrapper } from "../middlewares/tryCatchWrapper.js"
import UsersModel from "../model/user.model.js"

export const Allusers = tryCatchWrapper(async (req, resp) => {

    const result = await UsersModel.getAllUsers();

    return resp.status(200).json(result)
});

export const UserById = tryCatchWrapper(async (req, resp) => {

    const { id } = req.params

    const result = await UsersModel.getUserbyID(id);
    if (result.length === 0) return resp.status(404).json({ message: "User with given id does not exist" });

    return resp.status(200).json(result);
});

export const AddUser = tryCatchWrapper(async (req, resp) => {

    const { name, phone_number, email, age, password, role } = req.body
    if (!name || !phone_number || !email || !age || !password || !role) return resp.status(400).json({ message: "All fields are required" })


    const result = await UsersModel.newUser(name, phone_number, email, age, password, role);

    return resp.status(201).json({ message: "New user is created with given details" });
});

export const PatchUser = tryCatchWrapper(async (req, resp) => {

    const { id } = req.params

    const allowedFields = [
        "name",
        "phone_number",
        "email",
        "age",
        "password",
        "role"
    ];

    const fields = Object.keys(req.body);

    const validFields = fields.filter((field) => {
        return allowedFields.includes(field);
    });

    if (validFields.length === 0) {
        return resp.status(400).json({
            message: "No valid fields provided for update "
        });
    }

    const updateFields = validFields.map((field) => {
        return `${field} = ?`
    })

    const setClause = updateFields.join(", ");

    const values = validFields.map((field) => {
        return req.body[field];
    });

    values.push(id);

    const result = await UsersModel.updateUser(values, setClause);

    if(result.affectedRows === 0 ) return resp.status(404).json("No user with given id is found!!!")

    return resp.status(200).json(`Update is successfully for given fields! `)
});

export const removeUser = tryCatchWrapper(async (req, resp) => {

    const { id } = req.params

    const result = await UsersModel.deleteUser(id);

    if (result.affectedRows === 0) return resp.status(404).json({ message: "User with given id does not exist" });

    return resp.status(200).json({ message: "User with given id is deleted successfully" })
})

