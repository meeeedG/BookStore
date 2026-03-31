import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import BookEditPage from "./pages/BookEditPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import keycloak from "./auth/keycloak";

// Interceptor to add Keycloak token
axios.interceptors.request.use(
  (config) => {
    if (keycloak.authenticated && keycloak.token) {
      config.headers.Authorization = `Bearer ${keycloak.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function App(props) {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/books/add" element={<BookEditPage />} />
      <Route path="/books/edit/:id" element={<BookEditPage />} />
      <Route path="/books/details/:id" element={<BookDetailsPage />} />
    </Routes>
  );
}
export default App;
