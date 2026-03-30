import { Link } from "react-router-dom";

function BooksPage() {
  return (
    <div>
      <h1>Books</h1>
      <Link to={"/"}>Back to Home</Link>
    </div>
  );
}

export default BooksPage;
