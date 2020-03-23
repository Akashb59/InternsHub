import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./../../CSS/App.css";

function Navbar(props) {
  const logout = e => {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    localStorage.removeItem("userid");
    localStorage.removeItem("studentid");
    localStorage.removeItem("companyid");
    localStorage.removeItem("type");
    localStorage.removeItem("internshipid");
    localStorage.removeItem("name");
    props.history.push(`/`);
  };
  const loginRegLink = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Log in
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/signup" className="nav-link">
          Sign Up
        </Link>
      </li>
    </ul>
  );

  const stuLink = (
    <li className="nav-item dropdown">
      <Link
        className="nav-link dropdown-toggle"
        to="#"
        id="navbarDropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Profile
      </Link>
      <div
        className="dropdown-menu nav_item"
        aria-labelledby="navbarDropdownMenuLink"
      >
        <ul className="nav_ul">
          <li className="nav_li">
            <Link to="/studentAcademic" className="nav_link">
              Academic Info
            </Link>
          </li>
          <li className="nav_li">
            <Link to="/studentPersonal" className="nav_link">
              Personal Info
            </Link>
          </li>
          <li className="nav_li">
            <Link to="/studentProfile" className="nav_link">
              Skills And Resume
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );

  const compLink = (
    <li className="nav-item">
      <Link to="/companyProfile" className="nav-link">
        Profile
      </Link>
    </li>
  );
  const userLink = (
    <ul className="navbar-nav ml-auto">
      {localStorage.type === "Student" ? stuLink : compLink}
      <li className="nav-item">
        <a href="/" onClick={logout} className="nav-link">
          Log Out
        </a>
      </li>
    </ul>
  );

  const studentLink = (
    <a href="/studentHome" className="navbar-brand">
      <img className="logo" src="Logo1.png" alt="logo" />
    </a>
  );

  const companyLink = (
    <a href="/companyHome" className="navbar-brand">
      <img className="logo" src="Logo1.png" alt="logo" />
    </a>
  );
  const homeLink = (
    <a href="/" className="navbar-brand">
      <img className="logo" src="Logo1.png" alt="logo" />
    </a>
  );
  const placementLink = (
    <a href="/" className="navbar-brand">
      <img className="logo" src="Logo1.png" alt="logo" />
    </a>
  );

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container">
        {localStorage.usertoken
          ? localStorage.type === "Student"
            ? studentLink
            : localStorage.type === "Company"
            ? companyLink
            : placementLink
          : homeLink}

        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          {localStorage.usertoken ? userLink : loginRegLink}
        </div>
      </div>
    </nav>
  );
}
export default withRouter(Navbar);
