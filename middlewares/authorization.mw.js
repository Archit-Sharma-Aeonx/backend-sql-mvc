import { createCustomError } from "../errors/customError.js";
import { tryCatchWrapper } from "./tryCatchWrapper.js";

export const authorizeUser = tryCatchWrapper(async(req , resp , next) => {
    const role = req.user.role 
    
    if(role !== "admin") return next(createCustomError("Not authorized  , 403 ")); 
    
    next();
})