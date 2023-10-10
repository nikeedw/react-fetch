import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../router/routes';
import { AuthContext } from '../context';

const AppRouter = () => {
  const { isAuth } = useContext(AuthContext);
	console.log(isAuth);

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
          <Route path="/posts" element={<Navigate to="/posts" />} />
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
          <Route path="/login" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
