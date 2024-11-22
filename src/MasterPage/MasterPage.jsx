import React from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import "./MasterPage.css"

const MasterPage = ({ user, handleLogout }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const hideHeaderFooter =
    location.pathname === "/signin" || location.pathname === "/signup"

  return (
    <>
      {!hideHeaderFooter && (
        <header>
          <div className="logo">
            <img
              src="/assets/capsule_bkg_orange.png"
              alt="Momento In Time Logo"
            />
            <span>
              Momento
              <br /> In Time
            </span>
          </div>
          <div className="links-right">
            <button onClick={() => navigate("/notifications")}>
              <i className="fa fa-bell"></i> Notifications
            </button>
            <button
              onClick={() => {
                navigate(`/signin`)
                handleLogout()
              }}
            >
              Logout
            </button>
          </div>
        </header>
      )}
      <div className="master-page-content">
        <main>
          <Outlet />
        </main>
      </div>
      {!hideHeaderFooter && (
        <div className="bottom-menu">
          <button className="menu-item" onClick={() => navigate(`/dashboard`)}>
            <i className="fa fa-home"></i>
            <span>Dashboard</span>
          </button>
          <button
            className="menu-item"
            onClick={() => navigate(`/profile/${user.id}`)}
          >
            <i className="fa fa-user"></i>
            <span>Profile</span>
          </button>
          <button
            className="menu-item"
            onClick={() => navigate(`/capsule-form/new/${user.id}`)}
          >
            <i className="fa fa-plus-circle"></i>
            <span>Create Capsule</span>
          </button>
          <button
            className="menu-item"
            onClick={() => navigate(`/capsules-list/${user.id}`)}
          >
            <i className="fa fa-list"></i>
            <span>View Capsules</span>
          </button>
        </div>
      )}
    </>
  )
}

export default MasterPage