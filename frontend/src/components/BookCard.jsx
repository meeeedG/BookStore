import { Link } from "react-router-dom";

function BookCard({ id, title, author, price, category }) {
  return (
    <div className="card">
      <h3 className="card-title">{title || "Titre inconnu"}</h3>
      <p className="card-author">Par {author || "Auteur inconnu"}</p>
      <div className="card-details">
        <span className="card-price">{price ? `${price} MAD` : "Non défini"}</span>
        <span className="card-category">
          {category?.name || category || "Général"}
        </span>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Link to={`/books/details/${id}`} className="btn btn-secondary" style={{ width: '100%' }}>
          Détails
        </Link>
      </div>
    </div>
  );
}
export default BookCard;
