import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

import Navbar from "../components/Navbar/Navbar";
import Button from "../components/Button/Button";

import "../styles/resourcesSelected.css";

function ResourcesSelected() {
  const { id } = useParams();
  const [resourcesFrom, setResourcesFrom] = useState([]);

    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");

  // Fetch resources from Firestore
  useEffect(() => {
    const fetchResourcesFrom = async () => {
      const subColRef = collection(db, "resources", id, "resourcesFrom");
      const querySnapshot = await getDocs(subColRef);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setResourcesFrom(data);
    };

    fetchResourcesFrom();
  }, []);

    //Postear un nuevo recurso
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        await addDoc(collection(db, "resources", id, "resourcesFrom"), {
          title,
          description,
          imageUrl,
          link
        });
        alert("Recurso agregado exitosamente");
        setTitle("");
        setImageUrl("");
        setDescription("");
        setLink("");
        window.location.reload();
      } catch (error) {
        console.error("Error adding resource:", error);
        alert("Hubo un error al agregar el recurso");
      }
    };

    //Eliminar recurso
    const handleDelete = async (resourceId) => {
      try {
        await deleteDoc(doc(db, "resources", id, "resourcesFrom", resourceId));
        alert("Recurso eliminado exitosamente");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting resource:", error);
        alert("Hubo un error al eliminar el recurso: " + error);
      }
    };

  return (
    <>
      <Navbar />
      <div className="resourcesSelectedContent">
        <div className="resourceSelectedCard">
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
          <input
            type="text"
            placeholder="Descripción del recurso"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="URL del recurso"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
          <Button type="primary" text="Agregar Recurso" onClick={handleSubmit} />
        </form>
        


            {resourcesFrom.map((resource) => (
              <div className="resourceSelectedCardData" key={resource.id}>
                
                <img src={resource.imageUrl} alt={resource.title} />
                
                <div className="resourceSelectedCardDataInformation">
                  <h1>{resource.title}</h1>
                  <p>{resource.description}</p>
                  <div className="resourceSelectedCardDataButton">
                    <Button
                      type="primary"
                      text="Eliminar"
                      onClick={() => handleDelete(resource.id)}
                    />
                    <Button
                    
                      type="primaryButtonResource"
                      text="Acceder al recurso"
                      onClick={() => window.open(resource.link, "_blank")}
                    />
                  </div>
                </div>
              </div>
            ))}

        </div>
      </div>
    </>
  );
}

export default ResourcesSelected;
