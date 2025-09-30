// import React, { useEffect, useState, useContext } from 'react';
// import { AuthContext } from "../context/AuthContext";

// const PrivateRoute = ({ children }) => {
//   const [isValid, setIsValid] = useState(null); 
//   const { setShowLogin } = useContext(AuthContext);

//   useEffect(() => {
//     const checkToken = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setIsValid(false);
//         return;
//       }

//       try {
//         const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/verify-token`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) {
//           localStorage.removeItem('token');
//           setIsValid(false);
//         } else {
//           setIsValid(true);
//         }
//       } catch (err) {
//         localStorage.removeItem('token');
//         setIsValid(false);
//       }
//     };

//     checkToken();
//   }, []);

//   useEffect(() => {
//     if (isValid === false) {
//       setShowLogin(true);
//     }
//   }, [isValid, setShowLogin]);

//   if (isValid === null) {
//     return <div>Loading...</div>; 
//   }

//   if (!isValid) {
//     return null;
//   }

//   return children;
// };

// export default PrivateRoute;

import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, setShowLogin, setRedirectPath  } = useContext(AuthContext);
 // const location = window.location.pathname

  useEffect(() => {
    if (isAuthenticated === false) {
      //setRedirectPath(location)
      setShowLogin(true); 
    }
  }, [isAuthenticated, setShowLogin , setRedirectPath , location]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }

  if (!isAuthenticated) {
    return null; 
  }

  return children;
};

export default PrivateRoute;

