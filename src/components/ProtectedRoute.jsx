import React, { useState, useEffect, useRef } from 'react'
import { axiosInstance } from "../functions/axiosInstance";
import { Navigate } from "react-router-dom";
import Spinner from './Spinner';

function ProtectedRoute({ children }) {
  const route = '/user/'
  const [authStatus, setAuthStatus] = useState(null);

  const isMountedRef = useRef(false);

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }
    axiosInstance.get(route)
      .then(response => {
        console.log("Authenticated with:", response.data);
        setAuthStatus(true);
      })
      .catch(error => {
        console.error(error);
        setAuthStatus(false);
      })
  }, [])

  if (authStatus == null) {
    return <Spinner />;
  } else if (authStatus === true) {
    return children;
  } else {
    return <Navigate replace to="/login" />;
  }
}

export default ProtectedRoute