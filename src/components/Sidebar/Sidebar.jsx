import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { categories } from "../../utils/categories";

function Sidebar() {
  const location = useLocation();
  return (
    <div className="sidebar">
      <div className="sidebarContent">
        <h1>Categorías</h1>
        <div className="tagList">
          {categories.map((cat) => {
            const isActive = location.pathname === `/category/${cat}`;
            return (
              <Link
                key={cat}
                to={`/category/${cat}`}
                className={`link ${isActive ? "active" : ""}`}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Sidebar;
