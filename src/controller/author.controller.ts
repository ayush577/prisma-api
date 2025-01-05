import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const authorClient = new PrismaClient().author;

export interface Author {
  id: string;
  name: string;
  books?: Book[];
}

export interface Book {
  id: string;
  authorId: string;
  title: string;
}

export interface CreateAuthorDto {
  name: string;
}

export interface UpdateAuthorDto {
  name?: string;
}

// getAllAuthors
export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const allAuthors = await authorClient.findMany({
      include: {
        books: true,
      },
    });
    res.status(200).json({ data: allAuthors });
  } catch (error) {
    console.error("💀 getAllAuthors error ➡️", error);
    res.status(500).json({ error: "Failed to fetch authors" });
  }
};

// getAuthorById
export const getAuthorById = async (req: Request, res: Response) => {
  try {
    const authorId = req.params.id;
    const author = await authorClient.findUnique({
      where: { id: authorId },
      include: { books: true },
    });

    if (!author) {
      res.status(404).json({ error: "Author not found" });
    }

    res.status(200).json({ data: author });
  } catch (error) {
    console.error("💀 getAuthorById error ➡️", error);
    res.status(500).json({ error: "Failed to fetch author" });
  }
};

// Create a new author
export const createAuthor = async (
  req: Request<{}, {}, CreateAuthorDto>,
  res: Response
) => {
  try {
    const authorData = req.body;
    if (!authorData.name) {
      res.status(400).json({ error: "Name is required" });
    }

    const newAuthor = await authorClient.create({
      data: authorData,
    });
    res.status(201).json({ data: newAuthor });
  } catch (error) {
    console.error("💀 createAuthor error ➡️", error);
    res.status(500).json({ error: "Failed to create author" });
  }
};

// Update an author
export const updateAuthor = async (
  req: Request<{ id: string }, {}, UpdateAuthorDto>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const authorData = req.body;

    const existingAuthor = await authorClient.findUnique({
      where: { id },
    });

    if (!existingAuthor) {
      res.status(404).json({ error: "Author not found" });
    }

    const updatedAuthor = await authorClient.update({
      where: { id },
      data: authorData,
    });

    res.status(200).json({ data: updatedAuthor });
  } catch (error) {
    console.error("💀 updateAuthor error ➡️", error);
    res.status(500).json({ error: "Failed to update author" });
  }
};

// Delete an author
export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingAuthor = await authorClient.findUnique({
      where: { id },
    });

    if (!existingAuthor) {
      res.status(404).json({ error: "Author not found" });
    }

    await authorClient.delete({
      where: { id },
    });

    res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    console.error("💀 deleteAuthor error ➡️", error);
    res.status(500).json({ error: "Failed to delete author" });
  }
};
