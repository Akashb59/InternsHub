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
      <div className="container-fluid">
        <div className="row">
          <div className="col offset-md-3">
            <p className="lead foot mt-3 text-center">Copyright © InternsHub</p>
          </div>
          <div className="col-4 col-md-3">
            <p className="lead admin text-right mt-3 mr-3">
              {localStorage.usertoken === undefined ? adminLink : ""}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default withRouter(Footer);
