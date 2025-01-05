import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const bookClient = new PrismaClient().book;

export interface CreateBookDto {
  title: string;
  authorId: string;
}

// Get all books
export const getAllBooks = async (_req: Request, res: Response) => {
  try {
    const allBooks = await bookClient.findMany();
    res.status(200).json({ data: allBooks });
  } catch (error) {
    console.error("💀 getAllBooks error ➡️", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

// Get book by id
export const getBookById = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  try {
    const bookId = req.params.id;

    const book = await bookClient.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ data: book });
  } catch (error) {
    console.error("💀 getBookById error ➡️", error);
    res.status(500).json({ error: "Failed to fetch book" });
  }
};

// Create book
export const createBook = async (
  req: Request<{}, {}, CreateBookDto>,
  res: Response
) => {
  try {
    const bookData = req.body;

    if (!bookData.title || !bookData.authorId) {
      res.status(400).json({ error: "Title or AuthorId is required" });
    }

    const newBook = await bookClient.create({
      data: {
        title: bookData.title,
        author: {
          connect: { id: bookData.authorId },
        },
      },
    });

    res.status(201).json({ data: newBook });
  } catch (error) {
    console.error("💀 createBook error ➡️", error);
    res.status(500).json({ error: "Failed to create book" });
  }
};

// Update book
export const updateBook = async (
  req: Request<{ id: string }, {}, CreateBookDto>,
  res: Response
) => {
  try {
    const bookId = req.params.id;
    const bookData = req.body;

    if (!bookData.title) {
      res.status(400).json({ error: "Title is required" });
    }

    const updatedBook = await bookClient.update({
      where: { id: bookId },
      data: bookData,
    });

    res.status(200).json({ data: updatedBook });
  } catch (error) {
    console.error("💀 updateBook error ➡️", error);
    res.status(500).json({ error: "Failed to update book" });
  }
};

// Delete book
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;

    const existingBook = await bookClient.findUnique({
      where: { id: bookId },
    });

    if (!existingBook) {
      res.status(404).json({ error: "Book not found" });
    }

    await bookClient.delete({
      where: { id: bookId },
    });

    res.status(204).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("💀 deleteBook error ➡️", error);
    res.status(500).json({ error: "Failed to delete book" });
  }
};
