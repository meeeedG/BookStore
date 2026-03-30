import { Link } from "react-router-dom";

function BookDetailsPage() {
  return (
    <div>
      <h1>Book Details</h1>
      <Link to={"/books"}>Back to Books</Link>
    </div>
  );
}

export default BookDetailsPage;
