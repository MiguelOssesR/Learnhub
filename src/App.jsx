import { BrowserRouter as Router, Routes, Route, Navigate, RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';

import News from '../src/pages/newsPage'
import Forum from './pages/forum';
import Resources from '../src/pages/resources'
import Tools from '../src/pages/tools'
import Suggestiones from '../src/pages/suggestions'

import CategoryPage from '../src/pages/categoryPage'
import PostDetail from './pages/postDetails'
import NotFoundPage from './pages/notFoundPage';

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/news" /> },
  { path: "news", element: <News /> },
  { path: "forum", element: <Forum /> },
  { path: "resources", element: <Resources /> },
  { path: "tools", element: <Tools /> },
  { path: "suggestions", element: <Suggestiones /> },
  
  { path: "category/:categoryName", element: <CategoryPage /> },
  { path: "post/:id", element: <PostDetail /> },
  { path: "*", element: <NotFoundPage /> }
])

function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}

export default App
