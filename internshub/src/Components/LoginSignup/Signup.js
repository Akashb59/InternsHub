import React, { useState, useEffect } from "react";
import { signup, roles, profile } from "../Utilities/LoginSignup";
import { role } from "../Utilities/CommonFunctions";
import { formatInput } from "../Utilities/Utils";

function Signup(props) {
  const [signupState, setSignupState] = useState({
    fullname: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
    role: "Student"
  });
  const [roleState, setRoleState] = useState([]);

  const [validState, setValidState] = useState({
    errors: {
      fullname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phoneNumber: ""
    }
  });

  useEffect(() => {
    document.title = "InternsHub | SignUp";
    const ip = "http://192.168.1.9:3000";
    localStorage.setItem("ip", ip);
    roles().then(res => {
      if (res) {
        //console.log(res.data.userTypeMaster);
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
    setSignupState({ ...signupState, [name]: value });

    let errors = validState.errors;

    switch (name) {
      case "fullname":
        errors.fullname =
          value.length < 5
            ? "Full name must have length of 5 characters or more!"
            : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be minimum 8 characters!" : "";
        break;
      case "passwordConfirm":
        errors.passwordConfirm =
          value.length < 8
            ? "Confirm Password must be minimum 8 characters!"
            : "";
        break;
      case "phoneNumber":
        errors.phoneNumber =
          value.length < 10 ? "Phone Number must be 10 characters long!" : "";
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
    const newUser = {
      fullname: signupState.fullname,
      email: signupState.email,
      password: signupState.password,
      passwordConfirm: signupState.passwordConfirm,
      phoneNumber: signupState.phoneNumber,
      role: signupState.role
    };
    signup(newUser).then(res => {
      if (res) {
        //console.log(res.data);
        const roleType = res.data.user.roleType;
        let id = res.data.user.id;
        const user = {
          id: id
        };
        profile(user).then(res => {
          localStorage.setItem("name", res.data.fullname);
          //localStorage.setItem("photo", res.data.user.photo);
        });
        role(roleType).then(res => {
          if (res) {
            //console.log(res.data);
            localStorage.setItem("type", res.data.roleName);
            check = res.data.roleName;
            //console.log(res.data.roleName);
            if (check === "Student") {
              props.history.push(`/studentDetails`);
            } else if (check === "Company") {
              props.history.push(`/companyForm`);
            } else if (check === "PlacementCell") {
              props.history.push(`/`);
            }
          }
        });
      }
    });
  };

  return (
    <div className="container">
      <div className="row py-5">
        <div className="col-lg-6 d-none d-lg-block">
          <h1 className="login-quote pt-5">
            The only person you are <strong>destined to become </strong>is the
            person you<strong> decide to be</strong>.
          </h1>
          <div className="d-flex">
            <div className="p-5 align-self-start">
              <i className="fas fa-check fa-2x"></i>
            </div>
            <div className="p-4 align-self-end"></div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card bg-body p-3 rounded card-form">
            <div className="card-body">
              <div className="text-center">
                <h2 className="heading-secondary ma-bt-md">
                  Create A New Account
                </h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="fullname">Full Name:</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-user"></i>
                      </span>
                    </div>
                    <input
                      type="ematextil"
                      name="fullname"
                      className="form-control "
                      placeholder="John Doe"
                      value={signupState.fullname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errors.fullname.length > 0 && (
                    <small style={{ color: "red" }}>
                      <span className="error">{errors.fullname}</span>
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                    <input
                      type="email"
                      name="email"
                      className="form-control "
                      placeholder="you@example.com"
                      value={signupState.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errors.email.length > 0 && (
                    <small style={{ color: "red" }}>
                      <span className="error">{errors.email}</span>
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
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
                      value={signupState.password}
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
                  <label htmlFor="passwordConfirm">Confirm Password:</label>
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
                      value={signupState.passwordConfirm}
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
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number:</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-mobile"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      name="phoneNumber"
                      className="form-control"
                      placeholder="0123456789"
                      onKeyDown={formatInput}
                      value={signupState.phoneNumber}
                      onChange={handleChange}
                      maxLength="10"
                      required
                    />
                  </div>
                  {errors.phoneNumber.length > 0 && (
                    <small style={{ color: "red" }}>
                      <span className="error">{errors.phoneNumber}</span>
                    </small>
                  )}
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="role">Role:</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-user-tag"></i>
                      </span>
                    </div>
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
                </div>

                <div className="form-group">
                  <button className="btn btn-success btn-block" type="submit">
                    Sign Up
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

export default Signup;
