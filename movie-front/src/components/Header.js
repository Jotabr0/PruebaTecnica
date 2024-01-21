// Header.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
    navigate("/");
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <h1 style={{ margin: "0" }}>Bienvenido, {user.name}</h1>
      <button
        style={{
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
        onClick={handleLogout}
      >
        Cerrar sesión
      </button>
    </header>
  );
};

export default Header;
