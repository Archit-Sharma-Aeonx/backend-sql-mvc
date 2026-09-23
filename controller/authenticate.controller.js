import { authorization } from "../model/authenticate.model.js";
import { tryCatchWrapper } from "../middlewares/tryCatchWrapper.js";
import { createCustomError } from "../errors/customError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = tryCatchWrapper(async (req, resp, next) => {

    const { name, phone_number, email, age, password } = req.body;
    if (!name || !phone_number || !email || !age || !password) return next(createCustomError("All the fields are required for registration", 400));

    const checkUser = await authorization.findUserByEmail(email);

    if (checkUser.length !== 0) return next(createCustomError("User with this email already exists", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    await authorization.registerNewUser(name, phone_number, email, age, hashedPassword);
    return resp.status(201).json({ message: "New user is created successfully!!" })


});

export const loginUser = tryCatchWrapper(async (req, resp, next) => {

    const { email, password } = req.body;

    if (!email || !password) return next(createCustomError("All fields are required", 400));

    const checkUserEmail = await authorization.findUserByEmail(email);

    if (checkUserEmail.length === 0) return next(createCustomError("User with this email does not exist", 400));
    if (checkUserEmail[0].account_status === 'inactive') return next(createCustomError("User with inactive status can not login", 403));

    const passwordCheck = await bcrypt.compare(password, checkUserEmail[0].password);

    if (!passwordCheck) return next(createCustomError("Incorrect password", 400));

    const payload = {
        id: checkUserEmail[0].id,
        role: checkUserEmail[0].role
    };

    const Secret = process.env.JWT_SECRET;

    const token = jwt.sign(payload, Secret, {
        expiresIn: "1h"
    });

    return resp.status(200).json({ message: "Login successful", token });

});




