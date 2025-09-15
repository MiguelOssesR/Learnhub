import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";

import Navbar from "../components/Navbar/Navbar";
import ToolsCard from "../components/ToolsCard/ToolsCard";
import Button from "../components/Button/Button";

import "../styles/tools.css";

function Tools() {
  const [toolsData, setToolsData] = useState([]);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tools"));
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setToolsData(docs);
      } catch (error) {
        console.error("Error fetching tools:", error);
      }
    };
    fetchTools();
  }, []);

  return (
    <>
      <div className="toolsPageContent">
        <Navbar />
        <div className="toolsCardsContainer">
          {toolsData.map((tool) => (
            <ToolsCard
              key={tool.id}
              titulo={tool.titulo}
              fecha_publicacion={tool.fecha_publicacion.toDate().toLocaleString()}
              descripcion={tool.contenido}
              imagen={tool.imageUrl}
              buttonText="Ir al sitio de la herramienta"
              onButtonClick={() => window.open(tool.link || "#", "_blank")}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Tools;
