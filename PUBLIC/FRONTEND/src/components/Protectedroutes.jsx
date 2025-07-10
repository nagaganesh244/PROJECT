import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate, useLocation } from "react-router-dom";
const Protectedroutes = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const location = useLocation();

  useEffect(function () {
    authorize().catch(() => setIsAuthorized(false));
  }, []);

  async function refreshToken() {
    const refresh = localStorage.getItem("refresh");

    try {
      const response = await api.post("token_refresh/", { refresh });
      if (response.status === 200) {
        localStorage.setItem("access", response.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      setIsAuthorized(false);
      console.log(err);
    }
  }

  async function authorize() {
    const token = localStorage.getItem("access");
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decodeToken = jwtDecode(token);
    const expiry_date = decodeToken.exp;
    const current_time = Date.now() / 1000;

    if (current_time > expiry_date) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  }

  if (isAuthorized === null) {
    return null; 
  }

  return (
    <>
      {isAuthorized ? (
        children
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default Protectedroutes;
