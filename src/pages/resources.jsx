import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";

import Navbar from "../components/Navbar/Navbar";
import Button from "../components/Button/Button";
import ResourceCard from "../components/ResourcesCard/ResourcesCard";

import "../styles/resources.css";

function Resources() {
  const [resourcesData, setResourcesData] = useState([]);

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

  return (
    <>
      <Navbar />
      <div className="resourcesPageContent">
        <h1>Recursos</h1>
        <p>Aquí puedes encontrar varios recursos para ayudarte a aprender.</p>
        <Button
          type="primary"
          text="Explorar Recursos"
          onClick={() => alert("Explorando recursos...")}
        />

        <div className="resourcesCardsContainer">
          {resourcesData.map((resource) => (
            <Link to={`/resources/${resource.id}`} key={resource.id}>
              <ResourceCard
                title={resource.title}
                image={resource.imageUrl}
              />
            </Link>
          ))}

        </div>
      </div>
    </>
  );
}

export default Resources;
