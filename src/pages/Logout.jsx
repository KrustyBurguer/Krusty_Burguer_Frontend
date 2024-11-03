import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { setUserType } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('cliente');
    setUserType(null);
    navigate('/');
  }, [navigate, setUserType]);

  return null;
};

export default Logout;

