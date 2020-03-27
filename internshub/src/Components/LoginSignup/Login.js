import React, { useState, useEffect } from "react";
import { login, roles, forgotPassword } from "../Utilities/LoginSignup";
import { company } from "../Utilities/CompanyFunctions";
import { student } from "../Utilities/StudentFunctions";
import "../../CSS/App.css";
import { showAlert } from "../Utilities/Alerts";

function Login(props) {
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
    role: "Student",
    emailForgot: ""
  });
  const [roleState, setRoleState] = useState([]);
  const [validState, setValidState] = useState({
    errors: {
      email: "",
      password: ""
    }
  });
  useEffect(() => {
    document.title = "InternsHub | Login";
    const ip = "http://192.168.1.16:3000";
    localStorage.setItem("ip", ip);
    roles().then(res => {
      if (res) {
        //console.log(res.data.doc);
        const roleTypes = res.data.doc.map(role => role.roleName);
        //console.log(roleTypes);
        const newroleTypes = roleTypes.filter(role => role !== "Admin");
        setRoleState(newroleTypes);
      }
    });
  }, []);

  const validEmailRegex = RegExp(
    // eslint-disable-next-line
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  const handleChange = event => {
    const { name, value } = event.target;
    setLoginState({ ...loginState, [name]: value });
    let errors = validState.errors;
    switch (name) {
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
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
    let check;
    const user = {
      email: loginState.email,
      password: loginState.password,
      role: loginState.role
    };
    login(user).then(res => {
      if (res) {
        //console.log(res.data);
        check = res.data.user.roleType.roleName;
        localStorage.setItem("type", res.data.user.roleType.roleName);
        localStorage.setItem("name", res.data.user.fullname);
        localStorage.setItem("photo", res.data.user.photo);
        if (check === "Student") {
          student().then(res => {
            if (res) {
              props.history.push(`/studentHome`);
            }
          });
        } else if (check === "Company") {
          company().then(res => {
            if (res) {
              props.history.push(`/companyHome`);
            }
          });
        } else if (check === "PlacementCell") {
          props.history.push(`/placementHome`);
        }
      }
    });
  };
  const handleForgot = e => {
    e.preventDefault();
    const forgot = {
      email: loginState.emailForgot
    };
    forgotPassword(forgot).then(res => {
      if (res) {
        //console.log(res.data.user.roleType.roleName);
        showAlert("success", "Email Sent Successfully");
        props.history.push("/");
        window.location.reload(false);
      }
    });
  };

  return (
    <div className="container">
      <div className="text-center ">
        <h2 className="heading-secondary ma-bt-md">Log into your account</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="you@example.com"
            value={loginState.email}
            onChange={handleChange}
            required
          />
          {errors.email.length > 0 && (
            <small style={{ color: "red" }}>
              <span className="error">{errors.email}</span>
            </small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control "
            placeholder="********"
            value={loginState.password}
            onChange={handleChange}
            required
          />
          {errors.password.length > 0 && (
            <small style={{ color: "red" }}>
              <span className="error">{errors.password}</span>
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            required
            name="role"
            className="form-control "
            onChange={handleChange}
          >
            {roleState.map(function(role) {
              return (
                <option key={role} value={role}>
                  {role}
                </option>
              );
            })}
          </select>
        </div>
        <br></br>
        <div className="row">
          <div className="form-group ml-auto">
            <button
              type="button"
              className="btn btn-secondary"
              data-toggle="modal"
              data-target="#myModal"
            >
              Forgot Password
            </button>
          </div>
          <div className="form-group ml-2 mr-5">
            <button className="btn btn-success" type="submit">
              Log In
            </button>
          </div>
        </div>
      </form>
      <div className="modal fade" id="myModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Forgot Password</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <form onSubmit={handleForgot}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="emailForgot">Email</label>
                  <br></br>
                  <input
                    type="email"
                    name="emailForgot"
                    className="form-control "
                    placeholder="you@example.com"
                    value={loginState.emailForgot}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <div className="form-group">
                  <button className="btn btn-success" type="submit">
                    Send
                  </button>
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    className="btn btn-secondary "
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
