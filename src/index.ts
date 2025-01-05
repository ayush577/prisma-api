import express from "express";
import authorRouter from "./routes/author.router";
import bookRouter from "./routes/book.router";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/authors", authorRouter);
app.use("/books", bookRouter);

app.get("/ping", (_req, res) => {
  res.send({ message: "Pong" }).status(200);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
