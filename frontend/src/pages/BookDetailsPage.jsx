import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import keycloak from "../auth/keycloak";

function BookDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce livre ?")) {
      try {
        await axios.delete(`http://localhost:5000/api/books/${id}`);
        navigate("/books");
      } catch (error) {
        console.error("Error deleting book:", error);
        alert("Erreur lors de la suppression du livre.");
      }
    }
  };

  return (
    <div className="app-container">
      <div className="header-actions">
        <Link to={"/books"} className="btn btn-secondary">
          &larr; Retour aux livres
        </Link>
      </div>

      <h1 className="page-title">Détails du Livre</h1>

      {loading ? (
        <div className="loader"></div>
      ) : book ? (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 className="card-title" style={{ fontSize: '2rem', marginBottom: '16px' }}>{book.title}</h2>
          <p className="card-author" style={{ fontSize: '1.2rem' }}>Par {book.author}</p>
          <div className="card-details" style={{ marginTop: '24px', paddingTop: '24px' }}>
            <span className="card-price" style={{ fontSize: '1.5rem' }}>{book.price ? `${book.price} MAD` : "Non défini"}</span>
            <span className="card-category" style={{ fontSize: '1rem' }}>{book.category?.name || book.category || "Général"}</span>
          </div>
          {book.publishedAt && (
            <p style={{ marginTop: '24px', color: 'var(--text-light)', fontSize: '0.9rem' }}>
              Publié le: {new Date(book.publishedAt).toLocaleDateString()}
            </p>
          )}
          {keycloak.authenticated && (
            <div className="flex-row" style={{ marginTop: '32px' }}>
              <Link to={`/books/edit/${id}`} className="btn">Modifier ce livre</Link>
              <button onClick={handleDelete} className="btn btn-danger">Supprimer</button>
            </div>
          )}
        </div>
      ) : (
        <div className="empty-state">
          Livre introuvable.
        </div>
      )}
    </div>
  );
}

export default BookDetailsPage;
