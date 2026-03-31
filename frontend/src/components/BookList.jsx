import BookCard from "./BookCard";

function BookList({ books }) {
  return (
    <div className="books-grid">
      {books.map((book) => (
        <BookCard
          key={book._id}
          id={book._id}
          title={book.title}
          author={book.author}
          price={book.price}
          category={book.category}
        />
      ))}
    </div>
  );
}
export default BookList;
