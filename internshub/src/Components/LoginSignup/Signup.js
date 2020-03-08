import React, { useState, useEffect } from "react";
import { signup, roles, role } from "../Utilities/CommonFunctions";
import "../../CSS/App.css";

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

  useEffect(() => {
    roles().then(res => {
      if (res) {
        //console.log(res.data.userTypeMaster);
        const roleTypes = res.data.userTypeMaster.map(role => role.roleName);
        //console.log(roleTypes);
        const newroleTypes = roleTypes.filter(role => role !== "Admin");
        setRoleState(newroleTypes);
      }
    });
  }, []);

  const handleChange = event => {
    setSignupState({ ...signupState, [event.target.name]: event.target.value });
  };

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
        console.log(res.data.user.roleType);
        const roleType = res.data.user.roleType;
        role(roleType).then(res => {
          if (res) {
            localStorage.setItem("type", res.data.userTypeMaster.roleName);
            check = res.data.userTypeMaster.roleName;
            console.log(res.data.userTypeMaster.roleName);
            if (check === "Student") {
              props.history.push(`/studentForm`);
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
    <div className="container-fluid">
      <div className="main">
        <div className="login-form">
          <div className="text-center ">
            <h2 className="heading-secondary ma-bt-md">Create a new account</h2>
          </div>
          <form className="white" onSubmit={handleSubmit}>
            <div className="input-field">
              <label className="form__label" htmlFor="fullname">
                Full Name
              </label>
              <input
                type="ematextil"
                name="fullname"
                className="form-control form__input"
                placeholder="John Doe"
                value={signupState.fullname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label className="form__label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control form__input"
                placeholder="you@example.com"
                value={signupState.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label className="form__label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control form__input"
                placeholder="********"
                value={signupState.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label className="form__label" htmlFor="passwordConfirm">
                Password Confirm
              </label>
              <input
                type="password"
                name="passwordConfirm"
                className="form-control form__input"
                placeholder="********"
                value={signupState.passwordConfirm}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label className="form__label" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                className="form-control form__input"
                placeholder="********"
                value={signupState.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-field">
              <label className="form__label" htmlFor="role">
                Role
              </label>
              <select
                required
                name="role"
                className="form-control form__input"
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
            <div className="input-field">
              <button className="btn btn-success" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
