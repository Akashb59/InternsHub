import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./../../CSS/App.css";

function Navbar(props) {
  const logout = e => {
    e.preventDefault();
    localStorage.removeItem("usertoken");
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

  const userLink = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <a href="/" onClick={logout} className="nav-link">
          Log Out
        </a>
      </li>
      <li className="nav-item">
        <Link to="/profile" className="nav-link">
          Profile
        </Link>
      </li>
    </ul>
  );

  const studentLink = (
    <a href="/studentHome" className="navbar-brand">
      Home
    </a>
  );

  const companyLink = (
    <a href="/companyHome" className="navbar-brand">
      Home
    </a>
  );
  const homeLink = (
    <a href="/" className="navbar-brand">
      Home
    </a>
  );
  const placementLink = (
    <a href="/" className="navbar-brand">
      Home
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
        <img className="logo" src="Logo1.png" alt="logo" />

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
