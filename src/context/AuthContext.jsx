import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(() => {
    const savedUserType = localStorage.getItem('userType');
    return savedUserType ? JSON.parse(savedUserType) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedUserType = localStorage.getItem('userType');
    return savedUserType !== null;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    const savedIsAdmin = localStorage.getItem('isAdmin');
    return savedIsAdmin ? JSON.parse(savedIsAdmin) : false;
  });

  useEffect(() => {
    setIsLoggedIn(userType !== null);
  }, [userType]);

  useEffect(() => {
    localStorage.setItem('userType', JSON.stringify(userType));
    localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
  }, [userType, isAdmin]);

  return (
    <AuthContext.Provider value={{ userType, setUserType, isLoggedIn, isAdmin, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

