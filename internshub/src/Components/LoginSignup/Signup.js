import React, { useState, useEffect } from "react";
import { signup, roles, profile } from "../Utilities/LoginSignup";
import { role } from "../Utilities/CommonFunctions";
import "../../CSS/App.css";
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
      <div className="text-center ">
        <h2 className="heading-secondary ma-bt-md">Create a new account</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="ematextil"
            name="fullname"
            className="form-control "
            placeholder="John Doe"
            value={signupState.fullname}
            onChange={handleChange}
            required
          />
          {errors.fullname.length > 0 && (
            <small style={{ color: "red" }}>
              <span className="error">{errors.fullname}</span>
            </small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="form-control "
            placeholder="you@example.com"
            value={signupState.email}
            onChange={handleChange}
            required
          />{" "}
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
            value={signupState.password}
            onChange={handleChange}
            required
          />{" "}
          {errors.password.length > 0 && (
            <small style={{ color: "red" }}>
              <span className="error">{errors.password}</span>
            </small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="passwordConfirm">Password Confirm</label>
          <input
            type="password"
            name="passwordConfirm"
            className="form-control "
            placeholder="********"
            value={signupState.passwordConfirm}
            onChange={handleChange}
            required
          />{" "}
          {errors.passwordConfirm.length > 0 && (
            <small style={{ color: "red" }}>
              <span className="error">{errors.passwordConfirm}</span>
            </small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
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
          />{" "}
          {errors.phoneNumber.length > 0 && (
            <small style={{ color: "red" }}>
              <span className="error">{errors.phoneNumber}</span>
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
        <div className="form-group">
          <button className="btn btn-success" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
