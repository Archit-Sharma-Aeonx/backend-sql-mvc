import { createCustomError } from "../errors/customError.js";
import { tryCatchWrapper } from "./tryCatchWrapper.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export const authenticateUser= tryCatchWrapper(async(req , resp ,next) => {
     
      const reqHeader = req.headers.authorization

      if(!reqHeader) return next(createCustomError("No request header found" ,401));

      const splitReqHeader = reqHeader.split(" ");

      if(splitReqHeader[0] !== "Bearer") return next(createCustomError("The request schema is not correct" , 400));

      const reqToken = splitReqHeader[1];

      if( !reqToken ) return next(createCustomError("There is no token present , 400"));

      const decoded = jwt.verify(reqToken , process.env.JWT_SECRET)
      
      req.user = decoded;

      next();  
})