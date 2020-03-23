import React, { useState, useEffect } from "react";
import { login, roles, forgotPassword } from "../Utilities/LoginSignup";
import { company } from "../Utilities/CompanyFunctions";
import { student } from "../Utilities/StudentFunctions";
import "../../CSS/App.css";

function Login(props) {
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
    role: "Student",
    emailForgot: ""
  });
  const [roleState, setRoleState] = useState([]);

  useEffect(() => {
    document.title = "InternsHub | Login";
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

  const handleChange = event => {
    setLoginState({ ...loginState, [event.target.name]: event.target.value });
  };
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
        alert("Email Sent Successfully");
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
          <div className="form-group mr1">
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#myModal"
            >
              Forgot Password
            </button>
          </div>
          <div className="form-group ml-auto">
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
            <form className="white" onSubmit={handleForgot}>
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
                <button
                  type="button"
                  className="btn btn-secondary "
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
  );
}

export default Login;
