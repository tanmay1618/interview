import React from "react";
import logo from './logo.png';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <img src={logo} alt="Logo" style={styles.logo} />
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#333",
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    height: "60px"
  },
  logo: {
    height: "40px",
    width: "auto"
  }
};

export default Navbar;
