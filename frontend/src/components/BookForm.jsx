import { useState } from "react";
function BookLike({ titre, auteur }) {
  let [likes, setLikes] = useState(0);
  return (
    <div className="card">
      <h3>{titre}</h3>
      <p>Auteur : {auteur}</p>
      <p>Likes : {likes}</p>
      <button onClick={() => setLikes(likes + 1)}>Aimer</button>
      <button onClick={() => setLikes((likes = 0))}>Réinitialiser</button>
    </div>
  );
}
export default BookLike;
