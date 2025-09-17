import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

import Navbar from "../components/Navbar/Navbar";
import Button from "../components/Button/Button";
import ResourceCard from "../components/ResourcesCard/ResourcesCard";

import "../styles/resources.css";

function Resources() {
  const [resourcesData, setResourcesData] = useState([]);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  //Obtener los recursos desde Firestore
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "resources"));
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setResourcesData(docs);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };
    fetchResources();
  }, []);

  //Postear un nuevo recurso
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "resources"), {
        title,
        imageUrl,
      });
      alert("Recurso agregado exitosamente");
      setTitle("");
      setImageUrl("");
    } catch (error) {
      console.error("Error adding resource:", error);
      alert("Hubo un error al agregar el recurso");
    }
  };

  return (
    <>
      <Navbar />
      <div className="resourcesPageContent">
        <h1>Recursos</h1>
        <p>Aquí puedes encontrar varios recursos para ayudarte a aprender.</p>

        {/* Formulario para agregar un nuevo recurso 
        <form className="resourceForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título del recurso"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="URL de la imagen"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
          <Button type="primary" text="Agregar Recurso" onClick={handleSubmit} />
        </form>
        */}
        
        <div className="resourcesCardsContainer">
          {resourcesData.map((resource) => (
            <Link to={`/resources/${resource.id}`} key={resource.id}>
              <ResourceCard title={resource.title} image={resource.imageUrl} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Resources;
