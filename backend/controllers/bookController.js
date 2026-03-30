import Book from "../models/Book.js";

export async function getAllBooks(req, res) {
  try {
    const books = await Book.find().populate("category");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error: error.message });
  }
}

export async function getBookById(req, res) {
  try {
    const id = req.params.id;
    const book = await Book.findById(id).populate("category");
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error: error.message });
  }
}

export async function addBook(req, res) {
  try {
    let bookNew = req.body;
    bookNew = await Book.create(bookNew);
    res.status(201).json(bookNew);
  } catch (error) {
    res.status(500).json({ message: "Error created book", error: error.message });
  }
}

export async function updateBook(req, res) {
  try {
    const id = req.params.id;
    let bookUpdated = req.body;
    bookUpdated = await Book.findByIdAndUpdate(id, bookUpdated, { new: true });
    if (!bookUpdated) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(bookUpdated);
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error: error.message });
  }
}

export async function deleteBook(req, res) {
  try {
    const id = req.params.id;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error: error.message });
  }
}
