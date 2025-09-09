import { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";

import Navbar from "../components/Navbar/Navbar";
import NewsCard from "../components/NewsCard/NewsCard";

import "../styles/newsPage.css";

function newsPage() {
  const [news, setNews] = useState([]);

  // Funcion para obtener Noticias
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const q = query(collection(db, "news"));
        const querySnapshot = await getDocs(q);
        const newsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNews(newsData);
        //console.log(newsData);
      } catch (error) {
        console.error("Error al obtener los news:", error);
      }
    };
    fetchNews();
  }, []);

  return (
    <>
      <Navbar />
      <div className="newsPageContent">
        {news.map((newItem) => (
          <NewsCard
            key={newItem.id}
            titulo={newItem.title}
            contenido={newItem.content}
            imagen={newItem.imageUrl}
            fecha={newItem.fecha.toDate().toLocaleString()}
          />
        ))}
      </div>
    </>
  );
}

export default newsPage;
