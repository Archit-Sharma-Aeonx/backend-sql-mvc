import { createCustomError } from "../errors/customError.js";
import { tryCatchWrapper } from "../middlewares/tryCatchWrapper.js"
import UsersModel from "../model/user.model.js";
import bcrypt from "bcrypt";

export const Allusers = tryCatchWrapper(async (req, resp) => {

    const result = await UsersModel.getAllUsers();

    return resp.status(200).json(result)
});

export const UserById = tryCatchWrapper(async (req, resp) => {

    const id = req.user.id;

    const result = await UsersModel.getUserbyID(id);
    if (result.length === 0) return resp.status(404).json({ message: "User with given id does not exist" });

    return resp.status(200).json(result);
});

export const AddUser = tryCatchWrapper(async (req, resp) => {

    const { name, phone_number, email, age, password } = req.body
    if (!name || !phone_number || !email || !age || !password) return resp.status(400).json({ message: "All fields are required" })

    const hashedPassword = await bcrypt.hash(password, 10);


    const result = await UsersModel.newUser(name, phone_number, email, age, hashedPassword);

    return resp.status(201).json({ message: "New user is created with given details" });
});

export const PatchUser = tryCatchWrapper(async (req, resp) => {

    const id = req.user.id;

    const allowedFields = [
        "name",
        "phone_number",
        "email",
        "age",
        "password"

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


    const values = await Promise.all(
        validFields.map(async (field) => {
            if (field === "password") {
                const hashedPassword = await bcrypt.hash(req.body[field], 10);
                return hashedPassword;
            } else {
                return req.body[field]
            }
        })
    );

    values.push(id);


    const result = await UsersModel.updateUser(values, setClause);

    if (result.affectedRows === 0) return resp.status(404).json("No user with given id is found!!!")

    return resp.status(200).json(`Update is successfully for given fields! `)
});

export const removeUser = tryCatchWrapper(async (req, resp, next) => {

    const id = req.user.id;


    const checkBorrowing = await UsersModel.checkBorrowingHistory(id);

    if (checkBorrowing.length === 0) {

        await UsersModel.deleteuser(id)

        return resp.status(200).json({ message: "User with given id is now deleted" })

    } else {
        return next(createCustomError("Can not be deleted completey as due to borrowing history . Try to make the account inactive!!", 409))
    }
});

export const AdminUserPatch = tryCatchWrapper(async (req, resp, next) => {

    const allowedFields = [
        "name",
        "email",
        "phone_number",
        "age",
        "account_status",
        "role"
    ];
    const { id } = req.params;
    const fields = Object.keys(req.body);

    if (fields.includes("role")) {
        const allowedRoles = ["user", "admin"];
        if (!allowedRoles.includes(req.body.role)) return next(createCustomError("Invalid role to be set for the role field!! ", 400));
    };

    if (fields.includes("account_status")) {

        const allowed_account_status = ["active", "inactive"];
        if (!allowed_account_status.includes(req.body.account_status)) return next(createCustomError("Invalid status to be set for the status field!!", 400));
    }

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
        return req.body[field]
    });

    values.push(id);


    const result = await UsersModel.updateUser(values, setClause);

    if (result.affectedRows === 0) return resp.status(404).json("No user with given id is found!!!")

    return resp.status(200).json(`Update is successfully for given fields! `)

});






