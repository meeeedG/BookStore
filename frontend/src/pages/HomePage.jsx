import { Link } from "react-router-dom";
import keycloak from "../auth/keycloak";

function HomePage() {
  return (
    <div className="app-container">
      {/* Auth Status & Login/Logout at Top Right */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px', gap: '10px', alignItems: 'center' }}>
        {keycloak.authenticated ? (
          <>
            <span style={{ fontWeight: '500', color: 'var(--text-light)' }}>
              Bonjour, {keycloak.tokenParsed?.preferred_username || "Utilisateur"}!
            </span>
            <button className="btn btn-secondary" onClick={() => keycloak.logout()} style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
              Déconnexion
            </button>
          </>
        ) : (
          <button className="btn" onClick={() => keycloak.login()} style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
            Connexion
          </button>
        )}
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">Votre Bibliothèque</h1>
        <p className="hero-subtitle">
          Ajoutez, recherchez et organisez vos collections de livres avec une interface fluide.
        </p>
        <div className="hero-buttons">
          <Link to={"/books"} className="btn">
            Explorer la Collection
          </Link>
          {keycloak.authenticated ? (
            <Link to={"/books/add"} className="btn btn-secondary">
              Ajouter un Livre
            </Link>
          ) : (
            <button className="btn btn-secondary" onClick={() => keycloak.login()}>
              Connectez-vous pour Ajouter
            </button>
          )}
        </div>
      </section>

      
    </div>
  );
}

export default HomePage;
