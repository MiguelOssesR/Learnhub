import './Sidebar.css';
import { categories } from "../../utils/categories"


function Sidebar() {
  return (
    <div className="sidebar">
      <div className='sidebarContent'> 
        <h1>Categorías</h1>
        <ul id='tagList'>
          {categories.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
