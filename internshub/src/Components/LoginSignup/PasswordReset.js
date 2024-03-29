import React, { useState, useEffect } from "react";
import { newPass } from "../Utilities/LoginSignup";
import { showAlert } from "../Utilities/Alerts";

function PasswordReset(props) {
  const [pass, setPass] = useState({
    currentPassword: "",
    password: "",
    passwordConfirm: ""
  });
  const [token, setToken] = useState("");
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
    newPass(user, token).then(res => {
      if (res) {
        //console.log(res.data);
        showAlert("success", "Password reset successful");
        props.history.push("/");
        window.location.reload(false);
      }
    });
  };
  useEffect(() => {
    document.title = "InternsHub | Reset Password";
    //console.log(window.location.href);
    const token = window.location.href.split("/");
    setToken(token[token.length - 1]);
  }, []);

  return (
    <div>
      <header id="page-header">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto text-center">
              <h1 className="text-capitalize"> Reset Password</h1>
              <p className="d-none d-md-block">
                You can reset your password here and use the same password to
                login in the future
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className="row py-5">
        <div className="col-lg-8 offset-lg-2">
          <div className="card bg-body p-3 rounded card-form">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control "
                    placeholder="********"
                    value={pass.password}
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
                    value={pass.passwordConfirm}
                    onChange={handleChange}
                    required
                  />{" "}
                  {errors.passwordConfirm.length > 0 && (
                    <small style={{ color: "red" }}>
                      <span className="error">{errors.passwordConfirm}</span>
                    </small>
                  )}
                </div>
                <button className="btn btn-success" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
