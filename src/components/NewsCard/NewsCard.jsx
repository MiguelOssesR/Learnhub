import "./NewsCard.css";

function NewsCard({ titulo, contenido, imagen, fecha }) {
  return (
    <>
      <div className="cardNewsPost">
        <div className="newsPost">
          <div className="containerNewsPost">
            <div className="containerNewsPostInformation">
              <h1>{titulo}</h1>
              <p>{fecha}</p>
            </div>
            <div className="containerNewsPostImage">
              <img src={imagen} alt={titulo} />
            </div>
            <div className="containerDescription">
              <p>{contenido}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewsCard;
