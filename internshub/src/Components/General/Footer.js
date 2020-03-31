import React from "react";
import { Link, withRouter } from "react-router-dom";

const adminLink = (
  <Link className="nav_link" to="/adminLogin">
    Admin Login
  </Link>
);
function Footer() {
  return (
    <footer id="main-footer" className="text-white">
      <div className="d-flex">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="lead text-center mt-3">
                Copyright ©
                <span id="year" />
                InternsHub
              </p>
            </div>
          </div>
        </div>
        <p className="lead text-right mt-3 mr-3">
          {localStorage.usertoken === undefined ? adminLink : ""}
        </p>
      </div>
    </footer>
  );
}
export default withRouter(Footer);
