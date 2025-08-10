import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import Button from "../components/Button/Button"
import '../styles/postDetails.css'


function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, 'posts', id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setPost(docSnap.data())
      } else {
        console.log('Post no encontrado')
      }
    }

    fetchPost()
  }, [id])

  if (!post) return <p>Cargando...</p>

  return (
    <div className="post-detail">
      <Navbar />
      <div className='postDetailsContent'>
        <Sidebar />
        <div>
          <h2>{post.titulo}</h2>
          <p>{post.contenido}</p>
          <p>Categoría: {post.categoria}</p>
          <p>Publicado: {post.fecha_publicacion.toDate().toLocaleString()}</p>
        </div>
      </div> 
      
    </div>
  )
}

export default PostDetail
