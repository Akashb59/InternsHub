import React, { useState, useEffect } from "react";
import { login } from "../Utilities/LoginSignup";
import { showAlert } from "../Utilities/Alerts";

function AdminLogin(props) {
  const [adminLoginState, setAdminLoginState] = useState({
    email: "",
    password: "",
    role: "Admin",
  });

  const [validState, setValidState] = useState({
    errors: {
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    document.title = "InternsHub | Admin Login";
    const ip = "http://192.168.1.17:3000/";
    localStorage.setItem("ip", ip);
  }, []);

  const validEmailRegex = RegExp(
    // eslint-disable-next-line
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAdminLoginState({ ...adminLoginState, [name]: value });
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: adminLoginState.email,
      password: adminLoginState.password,
      role: adminLoginState.role,
    };
    login(user).then((res) => {
      if (res) {
        //console.log(res.data);
        localStorage.setItem("type", res.data.user.roleType.roleName);
        localStorage.setItem("name", res.data.user.fullname);
        showAlert("success", "Logged in as Administrator");
        props.history.push(`/adminHome`);
      }
    });
  };

  return (
    <div>
      <header id="page-header">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto text-center">
              <h1 className="text-capitalize"> Log In As Admin</h1>
              <p className="d-none d-md-block">
                Get access to all Admin content by just logging in into admin
                account
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className="row py-5">
        <div className="col-lg-6 offset-lg-3">
          <div className="card bg-body p-3 rounded card-form">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="you@example.com"
                    value={adminLoginState.email}
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
                    value={adminLoginState.password}
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
                  <input
                    type="text"
                    name="role"
                    className="form-control "
                    disabled
                    value={adminLoginState.role}
                    required
                  />
                </div>
                <div className="form-group ml-auto">
                  <button className="btn btn-block btn-success" type="submit">
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
