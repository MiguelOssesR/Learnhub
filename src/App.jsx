import { BrowserRouter as Router, Routes, Route, Navigate, RouterProvider } from 'react-router-dom';
import Login from './pages/login';
import Forum from './pages/forum';
import PostDetail from './pages/postDetails'
import NotFoundPage from './pages/notFoundPage';
import { createBrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/forum" /> },
  { path: "login", element: <Login /> },
  { path: "forum", element: <Forum /> },
  { path: "post/:id", element: <PostDetail /> },
  { path: "*", element: <NotFoundPage /> },
])

function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}

export default App
