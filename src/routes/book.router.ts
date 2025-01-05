import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from "../controller/book.controller";
import { Router } from "express";


const bookRouter = Router();

// GET routes
bookRouter.get("/", getAllBooks);
bookRouter.get("/:id", getBookById);

// POST routes
bookRouter.post("/", createBook);

// PUT routes
bookRouter.put("/:id", updateBook);

// DELETE routes
bookRouter.delete("/:id", deleteBook);

export default bookRouter;