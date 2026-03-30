import http from "./axiosClient";

export async function fetchBooks() {
  const { data } = await http.get("/api/books");
  return data;
}

export async function deleteBook(id) {
  const { data } = await http.delete(`/api/books/${id}`);
  return data;
}
