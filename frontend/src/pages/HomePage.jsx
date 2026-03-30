import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="app-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">Votre Bibliothèque</h1>
        <p className="hero-subtitle">
          Découvrez une plateforme ultra-rapide et moderne conçue pour simplifier la gestion de vos livres. Ajoutez, recherchez et organisez vos collections avec une interface fluide et un design élégant.
        </p>
        <div className="hero-buttons">
          <Link to={"/books"} className="btn">
            Explorer la Collection
          </Link>
          <Link to={"/books/add"} className="btn btn-secondary">
            Ajouter un Livre
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
