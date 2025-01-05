import { Router } from "express";
import { createAuthor, deleteAuthor, getAllAuthors, getAuthorById, updateAuthor } from "../controller/author.controller";


const authorRouter = Router();

// GET routes
authorRouter.get("/", getAllAuthors);
authorRouter.get("/:id", getAuthorById);

// POST routes
authorRouter.post("/", createAuthor);

// PUT routes
authorRouter.put("/:id", updateAuthor);

// DELETE routes
authorRouter.delete("/:id", deleteAuthor);

export default authorRouter;