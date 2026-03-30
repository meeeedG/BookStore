import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import BookEditPage from "./pages/BookEditPage";
import BookDetailsPage from "./pages/BookDetailsPage";

function App(props) {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/books/edit/:id" element={<BookEditPage />} />
      <Route path="/books/details/:id" element={<BookDetailsPage />} />
    </Routes>
  );
}
export default App;
