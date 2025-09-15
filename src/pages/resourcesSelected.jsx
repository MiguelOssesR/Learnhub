import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

import Navbar from "../components/Navbar/Navbar";
import Button from "../components/Button/Button";

import "../styles/resourcesSelected.css";

function ResourcesSelected() {
  const { id } = useParams();
  const [resourcesFrom, setResourcesFrom] = useState([]);

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

  return (
    <>
      <Navbar />
      <div className="resourcesSelectedContent">
        <div className="resourceSelectedCard">
            {resourcesFrom.map((resource) => (
              <div className="resourceSelectedCardData" key={resource.id}>
                
                <img src={resource.imageUrl} alt={resource.title} />
                
                <div className="resourceSelectedCardDataInformation">
                  <h1>{resource.title}</h1>
                  <p>{resource.description}</p>
                  <div className="resourceSelectedCardDataButton">
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
