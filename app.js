import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import {handleError} from "./middlewares/handleError.js"
import {notFound} from "./middlewares/notFound.js"
import userrouter from "./router/user.router.js"
import bookrouter from "./router/book.router.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5454;

//Connect to front end by cors origin 
// check with preflight check we send a 200 that says ok !!

const corsOptions = {
    origin: "http://127.0.0.1:5500",
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());



app.get("/check" , (Req , resp) => {
    resp.json ({
        message : "This is the working with respect to MVC structure 🎉 !!"
    })
});

app.use("/user" , userrouter);
app.use("/book" , bookrouter)

app.use(notFound);
app.use(handleError);

app.listen(PORT , () => {
    console.log(`The server is listening at http://localhost:${PORT}`);
});