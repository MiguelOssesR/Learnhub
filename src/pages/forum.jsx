import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import Button from "../components/Button/Button"
import '../styles/forum.css'
import { useEffect, useState } from "react";
import { db } from '../../firebaseConfig'
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';

function Login() {
  const [posts, setPosts] = useState([]); //Llama la cantidad de post almacenados en Firestore
  const [showModal, setShowModal] = useState(false); //Visualizar el modal para crear un nuevo post
  const [titulo, setTitulo] = useState(''); //Titulo para un nuevo post
  const [contenido, setContenido] = useState(''); //Contenido para un nuevo post
  const [categoria, setCategoria] = useState(''); //Categoría para un nuevo post

  //Crear y subir un nuevo post
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "posts"), {
        titulo,
        contenido,
        categoria,
        fecha_publicacion: Timestamp.now()
      });

      //Limpiar el formulario despues de submido
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
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(postsData)
        /*console.log("Post: ", postsData); Me sirve para ver los post en la consola del navegador*/
      } catch (error) {
        console.error("Error al obtener los posts:", error);
      }
    }
    fetchPosts();
  }, [])



  return (
    <div className="Forum">
      <Navbar />
      <div className="ForumContent">
        <Sidebar />
        <div className="Posts">
          <div className="headerPost">
            <h1>Temas de discución</h1>
            <Button type="newPostButton" text="Crear Discución" onClick={() => setShowModal(true)} />
          </div>
          {posts.map(post => (
            <div key={post.id} className="cardPost">
              <div className="postLikes">
                <p>👍🏻</p>
                <p>#</p>
              </div>
              <div>
                <p className="postTitulo">{post.titulo}</p>
                <p>Creado en {post.fecha_publicacion.toDate().toLocaleString()}</p>
                <p className="postContenido">{post.contenido}</p>
                <p>{post.categoria}</p>
              </div>
              <div>
                <p className="postComentarios">🪧</p>
              </div>
            </div>
          ))}
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
