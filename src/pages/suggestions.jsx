import Navbar from "../components/Navbar/Navbar";
import Button from "../components/Button/Button";

import "../styles/suggestions.css";

function suggestions() {
  return (
    <>
      <Navbar />
      <div className="suggestionsContainer">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/learnhub-d02e6.firebasestorage.app/o/Opinion.jpg?alt=media&token=76fc4fae-6d4d-47ab-a7ae-efaa06fd8448"
          alt="Danos tu opinion"
        />
        <textarea className="textAreaSuggestions" name="suggestion" placeholder="Escribe aquí tus sugerencias."></textarea>
        <Button text="Danos tu opinión" type="primary" />
      </div>
    </>
  );
}

export default suggestions;
