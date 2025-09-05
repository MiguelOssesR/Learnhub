import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  limit,
} from "firebase/firestore";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import Button from "../components/Button/Button";

import "../styles/categoryPage.css";

function CategoryPage() {
  const { categoryName } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "posts"),
          where("categoria", "==", categoryName),
          orderBy("fecha_publicacion", "desc"),
          limit(10)
        );

        const querySnapshot = await getDocs(q);
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(postsData);
      } catch (error) {
        console.error("Error al obtener posts por categoría:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [categoryName]);

  return (
    <div className="categoryPage">
      <Navbar />
      <div className="categoryPageContent">
        <Sidebar />
        <div className="Posts">
          <div className="headerPost">
            <h1>Posts en {categoryName}</h1>
          </div>
          {loading ? (
            <p>Cargando...</p>
          ) : posts.length === 0 ? (
            <p>No hay posts en esta categoría.</p>
          ) : (
            <>
              {posts.map((post) => (
                <div key={post.id} className="cardPost">
                  <div className="postLikes">
                    <p>👍🏻</p>
                    <p>#</p>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {/* Título del post con enlace */}
                      <Link to={`/post/${post.id}`} className="postLink">
                        <p className="postTitulo">{post.titulo}</p>
                      </Link>
                      {/* Botón de eliminar */}
                      <Button
                        type="primaryButton"
                        text="Eliminar"
                        onClick={() => deletePost(post.id)}
                      />
                    </div>
                    <p>{post.contenido.slice(0, 100)}...</p>
                    <p>
                      Creado en{" "}
                      {post.fecha_publicacion.toDate().toLocaleString()}
                    </p>
                    <p>{post.categoria}</p>
                  </div>
                  <div>
                    <p className="postComentarios">🪧</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
