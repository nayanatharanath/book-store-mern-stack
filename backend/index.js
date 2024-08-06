import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Route for get all books from database
app.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    // return response.status(200).json(books);
    // Response with book count
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for get a book from database
app.get("/book/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    // const books = await Book.find({});
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for save a new book
app.post("/books", async (request, response) => {
  try {
    // check if all the fields are there and send error message
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to DB");
    app.listen(PORT, () => {
      console.log(`Listening ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
