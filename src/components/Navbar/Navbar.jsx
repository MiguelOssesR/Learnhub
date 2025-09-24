import "./Navbar.css";
import { Link } from "react-router-dom";
import React from "react";

function Navbar() {
  const isNews = location.pathname === `/news`;
  const isForum = location.pathname === `/forum`;
  const isResources = location.pathname === `/resources`;
  const isTools = location.pathname === `/tools`;
  const isSuggestions = location.pathname === `/suggestions`;

  return (
    <div className="Navbar">
      <div className="ContainerLogoCat">
        <div className="Logo">
          <p className="Learn">Learn</p>
          <p className="Hub">Hub</p>
        </div>

        <div className="Categorias">
          <p>|</p>
          <div className={`itemCategory ${isNews ? "active" : ""}`}>
            <Link to={`/news`}>
              <div className="item">
                <i class="bx  bx-community boxIcons"></i>
                <div className="tabTag">Noticias</div>
              </div>
            </Link>
          </div>

          <p>|</p>
          <div className={`itemCategory ${isForum ? "active" : ""}`}>
            <Link to={`/forum`}>
              <div className="item">
                <i class="bx  bx-discussion boxIcons"></i>
                <div className="tabTag">Discuciones</div>
              </div>
            </Link>
          </div>

          <p>|</p>
          <div className={`itemCategory ${isResources ? "active" : ""}`}>
            <Link to={"/resources"}>
              <div className="item">
                <i class="bx  bx-folder-cog boxIcons"></i>
                <div className="tabTag">Recursos</div>
              </div>
            </Link>
          </div>

          <p>|</p>
          <div className={`itemCategory ${isTools ? "active" : ""}`}>
            <Link to={"/tools"}>
              <div className="item">
                <i class="bx  bx-spanner boxIcons"></i>
                <div className="tabTag">Herramientas</div>
              </div>
            </Link>
          </div>

          <p>|</p>
          <div className={`itemCategory ${isSuggestions ? "active" : ""}`}>
            <Link to={"/suggestions"}>
              <div className="item">
                <i class="bx  bx-message-bubble-edit boxIcons"></i>
                <div className="tabTag">Sugerencias</div>
              </div>
            </Link>
          </div>
          <p>|</p>
        </div>
      </div>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/learnhub-d02e6.firebasestorage.app/o/uts_logo.svg?alt=media&token=80c460ec-25d2-464c-a8c0-5dbf34b3e427"
        className="UTSlogo"
      />
    </div>
  );
}

function Test() {
  return (
    <div>
      <h2>Componente Test</h2>
      <p>Este es un componente de prueba.</p>
    </div>
  );
}

export default Navbar;
