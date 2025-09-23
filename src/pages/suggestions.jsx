import Navbar from "../components/Navbar/Navbar";
import Button from "../components/Button/Button";

import "../styles/suggestions.css";

function suggestions() {
  return (
    <>
      <Navbar />
      <div className="suggestionsContainer">
        <img src="https://firebasestorage.googleapis.com/v0/b/learnhub-d02e6.firebasestorage.app/o/Opinion.jpg?alt=media&token=50ceba88-75a2-4f24-9f21-9a67526626b0" alt="Danos tu opinion" />
        <Button 
        text="Danos tu opinión"
        type="primary" />
      </div>
    </>
  );
}

export default suggestions;
