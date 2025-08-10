import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import Button from "../components/Button/Button"
import '../styles/forum.css'
import { useEffect, useState } from "react";
import { db } from '../../firebaseConfig'
import { collection, getDocs, addDoc, Timestamp, query, orderBy, limit, startAfter } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Login() {
  const [posts, setPosts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "posts"), {
        titulo,
        contenido,
        categoria,
        fecha_publicacion: Timestamp.now()
      });

      setTitulo('');
      setContenido('');
      setCategoria('');
      setShowModal(false);
      alert("Post creado con éxito");
      window.location.reload();
    } catch (error) {
      console.error("Error al crear el post:", error);
      alert("Hubo un error al crear el post");
    }
  };

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
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
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
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setPosts(prevPosts => [...prevPosts, ...postsData]);
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
            <Button type="newPostButton" text="Crear Discusión" onClick={() => setShowModal(true)} />
          </div>
          {posts.map(post => (
            <div key={post.id} className="cardPost">
              <div className="postLikes">
                <p>👍🏻</p>
                <p>#</p>
              </div>
              <div>
                <Link to={`/post/${post.id}`} className="postLink">
                  <p className="postTitulo">{post.titulo}</p>
                  <p>{post.contenido.slice(0, 100)}...</p>
                </Link>
                <p>Creado en {post.fecha_publicacion.toDate().toLocaleString()}</p>
                <p>{post.categoria}</p>
              </div>
              <div>
                <p className="postComentarios">🪧</p>
              </div>
            </div>
          ))}
          <div className="loadMoreButton">
            <button onClick={loadMorePosts} disabled={loading}>
              {loading ? "Cargando..." : "Cargar más"}
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modalBackground">
          <div className="modalContent">
            <h2>Crear nuevo post</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
              <textarea placeholder="Contenido" value={contenido} onChange={(e) => setContenido(e.target.value)} required></textarea>
              <input type="text" placeholder="Categoría" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
              <div className="modalButtons">
                <button type="submit">Publicar</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
