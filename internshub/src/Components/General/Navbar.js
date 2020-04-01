import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useState } from "react";
import { showAlert } from "../Utilities/Alerts";
import { updatePass } from "./../Utilities/LoginSignup";

function Navbar(props) {
  const [pass, setPass] = useState({
    currentPassword: "",
    password: "",
    passwordConfirm: ""
  });
  const [validState, setValidState] = useState({
    errors: {
      currentPassword: "",
      password: "",
      passwordConfirm: ""
    }
  });
  const handleChange = event => {
    const { name, value } = event.target;
    setPass({ ...pass, [name]: value });
    let errors = validState.errors;
    switch (name) {
      case "currentPassword":
        errors.currentPassword =
          value.length < 8
            ? "Current Password must be minimum 8 characters!"
            : "";
        break;
      case "passwordConfirm":
        errors.passwordConfirm =
          value.length < 8
            ? "Confirm Password must be minimum 8 characters!"
            : "";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be minimum 8 characters!" : "";
        break;
      default:
        break;
    }
    setValidState({ errors, [name]: value });
  };
  const { errors } = validState;
  const handleSubmit = e => {
    e.preventDefault();

    const user = {
      currentPassword: pass.currentPassword,
      password: pass.password,
      passwordConfirm: pass.passwordConfirm
    };
    updatePass(user).then(res => {
      if (res) {
        //console.log(res.data);
        showAlert("success", "Successfully Updated password");
        localStorage.removeItem("usertoken");
        props.history.push("/");
        window.location.reload(true);
      }
    });
  };
  let firstName;
  if (localStorage.name !== undefined) {
    firstName = localStorage.name.split(" ")[0];
  } else {
    firstName = "Profile";
  }

  const logout = e => {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    localStorage.removeItem("userid");
    localStorage.removeItem("studentid");
    localStorage.removeItem("companyid");
    localStorage.removeItem("acceptInternshipid");
    localStorage.removeItem("type");
    localStorage.removeItem("internshipId");
    localStorage.removeItem("internId");
    localStorage.removeItem("name");
    localStorage.removeItem("photo");
    props.history.push(`/`);
  };
  const loginRegLink = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to="/about" className="nav-link">
          About
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/contact" className="nav-link">
          Contact
        </Link>
      </li>
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
        {/* <img
          src={`${localStorage.ip}Images/${localStorage.photo}`}
          alt=""
          width="auto"
          height="30"
        /> */}

        <span>{firstName}</span>
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
            <Link
              className="nav_link"
              to="#"
              data-toggle="modal"
              data-target="#updatePassword"
            >
              Update Password
            </Link>
          </li>
          <li className="nav_li">
            <Link to="/studentProfile" className="nav_link">
              Skills And Resume
            </Link>
          </li>
          <li className="nav_li">
            <Link to="/studentEnquiry" className="nav_link">
              Enquiries
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );

  const compLink = (
    <li className="nav-item dropdown">
      <Link
        className="nav-link dropdown-toggle"
        to="#"
        id="navbarDropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span>{firstName}</span>
      </Link>
      <div
        className="dropdown-menu nav_item"
        aria-labelledby="navbarDropdownMenuLink"
      >
        <ul className="nav_ul">
          <li className="nav_li">
            <Link to="/companyProfile" className="nav_link">
              My Info
            </Link>
          </li>

          <li className="nav_li">
            <Link
              className="nav_link"
              to="#"
              data-toggle="modal"
              data-target="#updatePassword"
            >
              Update Password
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );

  const admLink = (
    <li className="nav-item dropdown">
      <Link
        className="nav-link dropdown-toggle"
        to="#"
        id="navbarDropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span>{firstName}</span>
      </Link>
      <div
        className="dropdown-menu nav_item"
        aria-labelledby="navbarDropdownMenuLink"
      >
        <ul className="nav_ul">
          <li className="nav_li">
            <Link
              className="nav_link"
              to="#"
              data-toggle="modal"
              data-target="#updatePassword"
            >
              Update Password
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );

  const placLink = (
    <li className="nav-item dropdown">
      <Link
        className="nav-link dropdown-toggle"
        to="#"
        id="navbarDropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span>{firstName}</span>
      </Link>
      <div
        className="dropdown-menu nav_item"
        aria-labelledby="navbarDropdownMenuLink"
      >
        <ul className="nav_ul">
          <li className="nav_li">
            <Link
              className="nav_link"
              to="#"
              data-toggle="modal"
              data-target="#updatePassword"
            >
              Update Password
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );

  const userLink = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <a href="/about" className="nav-link">
          About
        </a>
      </li>
      <li className="nav-item">
        <a href="/contact" className="nav-link">
          Contact
        </a>
      </li>
      {localStorage.type === "Student"
        ? stuLink
        : localStorage.type === "Company"
        ? compLink
        : localStorage.type === "Admin"
        ? admLink
        : placLink}
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

  const adminLink = (
    <a href="/adminHome" className="navbar-brand">
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
    <nav className="navbar navbar-expand-sm navbar-dark">
      <div className="container">
        {localStorage.usertoken
          ? localStorage.type === "Student"
            ? studentLink
            : localStorage.type === "Company"
            ? companyLink
            : localStorage.type === "Admin"
            ? adminLink
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
        <div className="modal fade" id="updatePassword">
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header bg-info  text-white">
                <h5 className="modal-title">Update Password</h5>
                <button className="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="password">Current Password</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-key"></i>
                        </span>
                      </div>
                      <input
                        type="password"
                        name="currentPassword"
                        className="form-control "
                        placeholder="********"
                        value={pass.currentPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.currentPassword.length > 0 && (
                      <small style={{ color: "red" }}>
                        <span className="error">{errors.currentPassword}</span>
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-key"></i>
                        </span>
                      </div>
                      <input
                        type="password"
                        name="password"
                        className="form-control "
                        placeholder="********"
                        value={pass.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.password.length > 0 && (
                      <small style={{ color: "red" }}>
                        <span className="error">{errors.password}</span>
                      </small>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="passwordConfirm">Password Confirm</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-key"></i>
                        </span>
                      </div>
                      <input
                        type="password"
                        name="passwordConfirm"
                        className="form-control "
                        placeholder="********"
                        value={pass.passwordConfirm}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.passwordConfirm.length > 0 && (
                      <small style={{ color: "red" }}>
                        <span className="error">{errors.passwordConfirm}</span>
                      </small>
                    )}
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-success"
                    data-toggle="modal"
                    data-target="#completedInternship"
                  >
                    Submit
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default withRouter(Navbar);
