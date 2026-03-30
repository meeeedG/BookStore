import { Link } from "react-router-dom";

function BookEditPage() {
  return (
    <div>
      <h1>Edit Book</h1>
      <Link to={"/books"}>Back to Books</Link>
    </div>
  );
}

export default BookEditPage;
