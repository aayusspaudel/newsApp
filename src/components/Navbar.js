import React, { } from 'react';
import { NavLink } from "react-router-dom";

const NavBar = () => {

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <div className="container-fluid">

        <NavLink className="navbar-brand" to="/">News Monkey</NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul
            className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
            style={{ bsScrollHeight: "100px" }}
          >
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                end
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/business"
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              >
                Business
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/entertainment"
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              >
                Entertainment
              </NavLink>
            </li>

           
           

            <li className="nav-item">
              <NavLink
                to="/health"
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              >
                Health
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/science"
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              >
                Science
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/sports"
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              >
                Sports
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/technology"
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              >
                Technology
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

}

export default NavBar;
