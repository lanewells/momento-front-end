import React from "react";
import { Outlet } from "react-router-dom";
import "./MasterPage.css";

const MasterPage = () => {
  return (
    <>
      <header>
        <div className="logo">
          <img src="../src/assets/capsule_bkg_orange.png" alt="Logo" />
          <span>Momento In Time</span>
        </div>
        <div className="links-right">
        <a href="/logout">Logout</a>
          <a href="/notifications">Notifications</a>
          
        </div>
      </header>
      <div className="master-page-content">
        <main>
          <Outlet />
        </main>
      </div>
      <div className="bottom-menu">
        <a href="/profile" className="menu-item">
          <i className="fa fa-user"></i>
          <span>Profile</span>
        </a>
        <a href="/capsule/create" className="menu-item">
          <i className="fa fa-plus-circle"></i>
          <span>Create Capsule</span>
        </a>
        <a href="/capsule/list" className="menu-item">
          <i className="fa fa-list"></i>
          <span>View Capsules</span>
        </a>
      </div>
    </>
  );
};

export default MasterPage;
