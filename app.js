import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { notFound } from "./middlewares/notFound.js";
import { handleError } from "./middlewares/handleError.js";
import notesRoute from "./notes/notes.routes.js";
import usersRoute from "./users/users.router.js";
import productsRoute from "./products/products.router.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


// connected frontend at "http://localhost:5173" 
// also the preflight check we send 200 that says ok !!
const corsOptions = {
    origin: "http://127.0.0.1:5501",
    optionSuccessStatus: 200,
};

//middleware
app.use(cors(corsOptions));
app.use(express.json());


//api routes 
app.use('/notes' , notesRoute);
app.use('/user' , usersRoute);
app.use('/products' , productsRoute);

app.use(notFound);
app.use(handleError);

app.listen(port , () => {
    console.log(`Server is running on http://localhost:${port}`)
});
