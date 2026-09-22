import { createCustomError } from "../errors/customError";
import { tryCatchWrapper } from "./tryCatchWrapper";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export const authenticateUser= tryCatchWrapper(async(req , resp ,next) => {
      const reqHeader = req.headers.authorization

      if(!reqHeader) return next(createCustomError("No request header found" ,401));

      const splitReqHeader = reqHeader.split(" ");

      const reqToken = splitReqHeader[1];

      const decoded = jwt.verify(reqToken , process.env.JWT_SECRET)
      
})