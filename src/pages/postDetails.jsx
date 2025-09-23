import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, getDocs, collection, addDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import CommentCard from "../components/CommentCard/CommentCard";
import Button from "../components/Button/Button";
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebaseConfig';  // Asegúrate de exportar storage en firebaseConfig.js

import "../styles/postDetails.css";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [comments, setComments] = useState([]);
  const [avatars, setAvatars] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Nuevo estado

  // Obtener los detalles del post desde Firestore
  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPost(docSnap.data());
      } else {
        console.log("Post no encontrado");
      }
    };

    fetchPost();
  }, [id]);

  // Obtener los comentarios del post
  useEffect(() => {
    const fetchComments = async () => {
      const subColRef = collection(db, "posts", id, "comments");
      const querySnapshot = await getDocs(subColRef);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Ordenar los comentarios por fecha descendente
      const sortedData = data.sort((a, b) => b.fecha.toMillis() - a.fecha.toMillis());
      setComments(sortedData);
    };

    fetchComments();
  }, []);

  // Nuevo useEffect para cargar los avatares
  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const avatarsRef = ref(storage, 'avatar');
        const avatarsList = await listAll(avatarsRef);
        
        const urls = await Promise.all(
          avatarsList.items.map(async (item) => {
            return await getDownloadURL(item);
          })
        );
        
        setAvatars(urls);
      } catch (error) {
        console.error("Error fetching avatars:", error);
      }
    };

    fetchAvatars();
  }, []);

  // Función para obtener un avatar aleatorio
  const getRandomAvatar = () => {
    if (avatars.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * avatars.length);
    return avatars[randomIndex];
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newCommentContent.trim() || isSubmitting) return;

    setIsSubmitting(true); // Iniciamos el estado de carga

    try {
      // Crear el comentario
      await addDoc(collection(db, "posts", id, "comments"), {
        comment: newCommentContent,
        fecha: new Date(),
        imageUrl: getRandomAvatar()
      });

      // Incrementar el contador de comentarios
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, {
        commentCount: increment(1)
      });

      setNewCommentContent("");

      const subColRef = collection(db, "posts", id, "comments");
      const querySnapshot = await getDocs(subColRef);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const sortedData = data.sort((a, b) => b.fecha.toMillis() - a.fecha.toMillis());
      setComments(sortedData);
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Hubo un error al agregar el comentario");
    } finally {
      setIsSubmitting(false); // Finalizamos el estado de carga
    }
  };

  if (!post) return <p>Cargando...</p>;

  return (
    <div className="post-detail">
      <Navbar />
      <div className="postDetailsContent">
        <Sidebar />
        <Link to={`/forum`} className="returnButton">
          <i class="bx  bx-arrow-left-circle"></i>
        </Link>

        <div className="cardPostDetails">
          <h1>{post.titulo}</h1>
          <p className="detailsPost">{post.contenido}</p>
          <p>Categoría: {post.categoria}</p>
          <p>Publicado: {post.fecha_publicacion.toDate().toLocaleString()}</p>
        </div>

        <div className="commentsSection">
          <h2>Comentarios</h2>
          <div className="inputSesion">
            <div className="formComment">
              <textarea
                name="comment"
                placeholder="Escribe tu comentario..."
                value={newCommentContent}
                onChange={(e) => setNewCommentContent(e.target.value)}
                disabled={isSubmitting}
              ></textarea>
              <Button 
                type="primary" 
                text={isSubmitting ? "Publicando..." : "Publicar"}
                onClick={handleCommentSubmit}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="commentsList">
            {comments.length === 0 ? (
              <p>No hay comentarios aún.</p>
            ) : (
              comments.map((commentData) => (
                <CommentCard
                  key={commentData.id}
                  comment={commentData.comment}
                  imageUrl={commentData.imageUrl}
                  fecha={commentData.fecha.toDate().toLocaleString()}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
