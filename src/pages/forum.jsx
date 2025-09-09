import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  Timestamp,
  query,
  orderBy,
  limit,
  startAfter,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { categories } from "../utils/categories";

import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import Button from "../components/Button/Button";

import "../styles/forum.css";

function Forum() {
  // Estados
  const [posts, setPosts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [categoria, setCategoria] = useState("");

  const deletePost = async (id) => {
    try {
      // Eliminamos el post de Firestore
      const postRef = doc(db, "posts", id); // Referencia al documento con el id del post
      await deleteDoc(postRef);

      // Eliminamos el post del estado local para reflejar la eliminación en la UI
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error al eliminar el post:", error);
      alert("Hubo un error al eliminar el post");
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Evitar que se pueda enviar el formulario mientras se está procesando
    if (loading) return;

    //Evitar que se seleccione una categoría que no está en la lista
    if (!categories.includes(categoria)) {
      alert("Por favor, seleccione una categoría valida");
      return;
    }

    setLoading(true); // Bloquea el botón de enviar
    try {
      await addDoc(collection(db, "posts"), {
        titulo,
        contenido,
        categoria,
        fecha_publicacion: Timestamp.now(),
      });

      setTitulo("");
      setContenido("");
      setCategoria("");
      setShowModal(false);
      // alert("Post creado con éxito");
      window.location.reload();
    } catch (error) {
      console.error("Error al crear el post:", error);
      alert("Hubo un error al crear el post");
    }
  };

  // Función para obtener los posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "posts"),
          orderBy("fecha_publicacion", "desc"),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setPosts(postsData);
      } catch (error) {
        console.error("Error al obtener los posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Función para cargar más posts
  const loadMorePosts = async () => {
    if (!lastVisible) return;

    setLoading(true);
    try {
      const q = query(
        collection(db, "posts"),
        orderBy("fecha_publicacion", "desc"),
        startAfter(lastVisible),
        limit(10)
      );

      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setPosts((prevPosts) => [...prevPosts, ...postsData]);
    } catch (error) {
      console.error("Error al cargar más posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Forum">
      <Navbar />
      <div className="ForumContent">
        <Sidebar />
        <div className="Posts">
          <div className="headerPost">
            <h1>Temas de discusión</h1>
            <Button
              type="primaryButton"
              text="Crear Discusión"
              onClick={() => setShowModal(true)}
            />
          </div>

          {/* Muestra los posts */}
          {posts.map((post) => (
            <div key={post.id} className="cardPost">
              <div className="postData">
                {/* Likes */}
                <div className="postLikes">
                  <i class="bx  bx-like"></i>
                  <p>0</p>
                </div>

                <div>
                  {/* Título del post con enlace */}
                  <Link to={`/post/${post.id}`} className="postLink">
                    <p className="postTitulo">{post.titulo}</p>
                  </Link>
                  <p className="postContenido">
                    {post.contenido.slice(0, 100)}...
                  </p>
                  <p>
                    Creado en {post.fecha_publicacion.toDate().toLocaleString()}
                  </p>
                  <p>{post.categoria}</p>
                </div>
              </div>

              {/* Cantidad de comentarios y botón eliminar*/}
              <div className="deleteComment">
                <Button
                  type="primaryButton"
                  text={<i class='bx  bx-trash-x'  ></i>}
                  onClick={() => deletePost(post.id)}
                />
                <p className="postComentarios">
                  <i class="bx  bx-message-detail"></i>{" "}
                </p>
              </div>
            </div>
          ))}

          {/* Botón para cargar más posts */}
          <div>
            <button className="primaryButton" onClick={loadMorePosts} disabled={loading}>
              {loading ? "Cargando..." : "Cargar más"}
            </button>
          </div>
        </div>
      </div>

      {/* Modal para crear un nuevo post */}
      {showModal && (
        <div className="modalBackground">
          <div className="modalContent">
            <h2>Crear nueva discución</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
              <textarea
                placeholder="Contenido"
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                required
              ></textarea>
              <input
                list="categoria"
                placeholder="Categoría"
                onChange={(e) => setCategoria(e.target.value)}
                required
              />
              <datalist id="categoria">
                {categories.map((cat, index) => (
                  <option key={index} value={cat} />
                ))}
              </datalist>
              <div className="modalButtons">
                <button
                  className="primaryButton"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "..." : "Publicar"}
                </button>
                <button
                  className="primaryButton"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Forum;
