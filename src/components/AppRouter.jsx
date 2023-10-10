import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../router/routes';
import { AuthContext } from '../context';
import Loader from './UI/loader/Loader';

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isRedirected, setIsRedirected] = useState(false);

  useEffect(() => {
    if (isLoading) {
      return; // Подождите, пока isLoading не станет false
    }

    if (isAuth && !isRedirected) {
      navigate('/posts');
      setIsRedirected(true);
    }
  }, [isLoading, isAuth, navigate, isRedirected]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      {isAuth ? (
        <>
          {privateRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
              caseSensitive
            />
          ))}
          {/* Маршруты доступные только авторизованным пользователям */}
        </>
      ) : (
        <>
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
              caseSensitive
            />
          ))}
          {/* Маршруты доступные всем пользователям, включая неавторизованных */}
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
