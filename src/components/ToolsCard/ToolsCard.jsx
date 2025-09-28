import "./ToolsCard.css";

import Button from "../Button/Button";

function ToolsCard({
  titulo,
  descripcion,
  imagen,
  fecha_publicacion,
  onButtonClick,
  buttonText,
}) {
  return (
    <div className="cardToolsPost">
      <div className="wrap">
        <div className="containerToolsPost">
          <div className="containerToolsPostTitle">
            <h1>{titulo}</h1>
            <p>{fecha_publicacion}</p>
          </div>
          <div className="containerToolsPostImage">
            <img src={imagen} alt={titulo} />
          </div>
          <div className="descriptionButton">
            <div className="containerToolsDescription">
              <p>{descripcion}</p>
            </div>
            <div className="containerToolsButton">
              <Button
                type="primaryButton"
                text={buttonText}
                onClick={onButtonClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToolsCard;
