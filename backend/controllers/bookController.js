import Book from "../models/Book.js";

export async function getAllBooks(req, res) {
  const books = await Book.find();
  res.json(books);
}

export async function getBookById(req, res) {
  const id = req.params.id;
  const book = await Book.findById(id);
  res.json(book);
}

export async function addBook(req, res) {
  let bookNew = req.body;
  bookNew = await Book.create(bookNew);
  res.json(bookNew);
}

export async function updateBook(req, res) {
  const id = req.params.id;
  let bookUpdated = req.body;
  bookUpdated = await Book.findByIdAndUpdate(id, bookUpdated, { new: true });
  res.json(bookUpdated);
}

export async function deleteBook(req, res) {
  const id = req.params.id;
  const book = await Book.findByIdAndDelete(id);
  res.json(book);
}
