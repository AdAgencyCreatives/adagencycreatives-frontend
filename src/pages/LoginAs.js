import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LoginAs = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  const validateToken = async (token) => {
    // Replace this with your actual token validation logic
    console.log('Validating token:', token);

    // For example, calling an API to validate the token
    // const response = await fetch('/api/validate-token?token=' + token);
    // const data = await response.json();

    // if (data.valid) {
    //   console.log('Token is valid');
    // } else {
    //   console.log('Token is invalid');
    // }
  };

  useEffect(() => {
    if (token) {
      validateToken(token);
    }
  }, [token]);

  return <div>Logging in...</div>
};

export default LoginAs;
