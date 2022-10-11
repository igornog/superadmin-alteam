import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Auth from './features/auth';

export const App: React.FunctionComponent = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Auth />} />
    </Routes>
  );
};

export default App;
