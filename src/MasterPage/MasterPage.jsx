import React from "react";
import { Outlet } from "react-router-dom";
import "./MasterPage.css";

const MasterPage = () => {
  const toggleMenu = () => {
    const menu = document.getElementById("myLinks");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  };

  return (
    <div className="master-page-container">
      <header>
        <div className="mobile-container">
          <div className="topnav">
            <a href="#home" className="active">
              Logo
            </a>
            <div id="myLinks">
              <a href="#news">News</a>
              <a href="#contact">Contact</a>
              <a href="#about">About</a>
            </div>
            <a className="icon" onClick={toggleMenu} role="button" >
              <i className="fa fa-bars"></i>
            </a>
          </div>
        </div>
      </header>
      <main className="master-page-content">
        <Outlet /> {/* Nested routes will render here */}
      </main>
      <footer className="master-page-footer">
        <p>&copy; 2024 Project Momento. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MasterPage;
