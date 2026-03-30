import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Gestion des Livres</h1>
      <p>Bienvenue dans l'application de gestion des livres</p>
      <Link to={"/books"}>Voir tous les livres</Link>
    </div>
  );
}

export default HomePage;
