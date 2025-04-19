import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Footer from './components/Footer.tsx';
import Error from './components/Error.tsx';
import SignIn from './components/SignIn.tsx';
import Landing from './components/Landing.tsx';
import Home from './components/Home.tsx';
import Login from './components/Login.tsx';
import { AuthProvider } from './components/AuthContext.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import Profile from './components/Profile.tsx';
import CreateRecipes from './components/CreateRecipes.tsx';
import MyRecipes from './components/MyRecipes.tsx';

console.log('VITE_BASENAME:', import.meta.env.VITE_BASENAME);

const router = createHashRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <Error />,
      children: [
        {
          element: <Landing />,
          index: true,
        },
        {
          path: "signup",
          element: <SignIn />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "create-recipes",
          element: (
            <ProtectedRoute>
              <CreateRecipes />
            </ProtectedRoute>
          ),
        },
        {
          path: "myrecipes",
          element: (
            <ProtectedRoute>
              <MyRecipes />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ],
  {
    basename: "/",
  },
);

createRoot(document.getElementById('root')!).render(
  <>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <Footer />
  </>
);
