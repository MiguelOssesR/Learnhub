import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig'
import './Sidebar.css';

function Sidebar() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      const querySnapshot = await getDocs(collection(db, "tags"));
      const tagList = querySnapshot.docs.map((doc) => doc.id);
      setTags(tagList);
    };

    fetchTags();
  }, []);

  return (
    <div className="sidebar">
      <div className='sidebarContent'> 
        <h1>Categorías</h1>
        <ul id='tagList'>
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
