import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BookCard from "../components/BookCard";

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [booksRes, catRes] = await Promise.all([
        axios.get("http://localhost:5000/api/books"),
        axios.get("http://localhost:5000/api/categories")
      ]);
      setBooks(booksRes.data);
      setCategories(catRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSeedDatabase = async () => {
    setLoading(true);
    try {
      const cat1 = await axios.post("http://localhost:5000/api/categories", { name: "Science-Fiction" });
      const cat2 = await axios.post("http://localhost:5000/api/categories", { name: "Développement Personnel" });
      const cat3 = await axios.post("http://localhost:5000/api/categories", { name: "Histoire" });

      await Promise.all([
        axios.post("http://localhost:5000/api/books", { title: "Dune", author: "Frank Herbert", price: 150, category: cat1.data._id }),
        axios.post("http://localhost:5000/api/books", { title: "Le Seigneur des Anneaux", author: "J.R.R. Tolkien", price: 200, category: cat1.data._id }),
        axios.post("http://localhost:5000/api/books", { title: "Atomic Habits", author: "James Clear", price: 120, category: cat2.data._id }),
        axios.post("http://localhost:5000/api/books", { title: "Sapiens", author: "Yuval Noah Harari", price: 180, category: cat3.data._id })
      ]);
      await fetchData();
    } catch (error) {
      console.error("Erreur lors de l'initialisation :", error);
      alert("Erreur lors de l'initialisation");
      setLoading(false);
    }
  };

  // Derived state for filtering
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchedCategory = selectedCategory
      ? (book.category?._id || book.category) === selectedCategory
      : true;
    return matchesSearch && matchedCategory;
  });

  return (
    <div className="app-container">
      <div className="header-actions">
        <Link to={"/"} className="btn btn-secondary">
          &larr; Retour
        </Link>
        <Link to={"/books/add"} className="btn">
          + Ajouter un Livre
        </Link>
      </div>
      
      <h1 className="page-title">Notre Collection</h1>
      <p className="page-subtitle">Parcourez tous les livres disponibles.</p>

      {/* Filters Bar */}
      <div className="filters-bar">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher par titre ou auteur..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="form-control"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="loader"></div>
      ) : books.length > 0 ? (
        filteredBooks.length > 0 ? (
          <div className="books-grid">
            {filteredBooks.map((book) => (
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
        ) : (
          <div className="empty-state">
            Aucun livre ne correspond à votre recherche.
          </div>
        )
      ) : (
        <div className="empty-state">
          <div>Aucun livre disponible pour le moment.</div>
          <button onClick={handleSeedDatabase} className="btn" style={{ marginTop: '20px' }}>
            Initialiser des données de test
          </button>
        </div>
      )}
    </div>
  );
}

export default BooksPage;
