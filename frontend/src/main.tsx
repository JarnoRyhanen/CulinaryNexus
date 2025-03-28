import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Footer from './components/Footer.tsx'
import Error from './components/Error.tsx'
import SignIn from './components/SignIn.tsx'
import { StrictMode } from 'react'
import Landing from './components/Landing.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <Landing />,
        index: true
      },
      {
        path: "/signup",
        element: <SignIn />,
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Footer />
  </StrictMode>
)
