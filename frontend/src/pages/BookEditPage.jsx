import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import keycloak from "../auth/keycloak";

function BookEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(isEditing);

  useEffect(() => {
    // Force login if not authenticated
    if (!keycloak.authenticated) {
      keycloak.login();
      return;
    }

    const fetchData = async () => {
      try {
        const catRes = await axios.get("http://localhost:5000/api/categories");
        setCategories(catRes.data);

        if (isEditing) {
          const bookRes = await axios.get(`http://localhost:5000/api/books/${id}`);
          // Set to existing values
          const existingBook = bookRes.data;
          setBook({
            title: existingBook.title || "",
            author: existingBook.author || "",
            price: existingBook.price || "",
            category: existingBook.category?._id || existingBook.category || "",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...book };
      // Remove empty category string to prevent MongoDB CastError
      if (!payload.category || payload.category === "") {
        delete payload.category;
      }

      if (isEditing) {
        await axios.put(`http://localhost:5000/api/books/${id}`, payload);
      } else {
        await axios.post("http://localhost:5000/api/books", payload);
      }
      navigate("/books");
    } catch (error) {
      console.error("Error saving book:", error);
      alert("Erreur lors de l'enregistrement du livre.");
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="header-actions">
        <Link to="/books" className="btn btn-secondary">
          &larr; Retour aux livres
        </Link>
      </div>

      <h1 className="page-title">{isEditing ? "Modifier le Livre" : "Ajouter un Livre"}</h1>

      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="title">Titre</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={book.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="author">Auteur</label>
            <input
              type="text"
              id="author"
              name="author"
              className="form-control"
              value={book.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="price">Prix (MAD)</label>
            <input
              type="number"
              id="price"
              name="price"
              className="form-control"
              value={book.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="category">Catégorie</label>
            <select
              id="category"
              name="category"
              className="form-control"
              value={book.category}
              onChange={handleChange}
            >
              <option value="">Sélectionner une catégorie (Optionnel)</option>
              {Array.from(new Map(categories.map(cat => [cat.name, cat])).values()).map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-row" style={{ marginTop: '24px' }}>
            <button type="submit" className="btn">
              {isEditing ? "Enregistrer les modifications" : "Ajouter le livre"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookEditPage;
