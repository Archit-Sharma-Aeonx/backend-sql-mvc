import express from "express";
import { createNote,
        deleteNote,
        getALLNotes,
        getSingleNote,
        updateNote
 } from "./notes.controllers.js";

 const router = express.Router();

 router.route("/").get(getALLNotes).post(createNote);
 router.route("/:id").get(getSingleNote).patch(updateNote).delete(deleteNote);

 export default router;

