import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import CommentCard from "../components/CommentCard/CommentCard";

import "../styles/postDetails.css";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const [comments, setComments] = useState([]);

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
      setComments(data);
    };

    fetchComments();
  }, []);

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
  );
}

export default PostDetail;
