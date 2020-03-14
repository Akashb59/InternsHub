import React from "react";
import { withRouter } from "react-router-dom";

function Footer() {
  return (
    <footer id="main-footer" className="bg-dark text-white">
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="lead text-center">
              Copyright ©
              <span id="year" />
              InternsHub
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default withRouter(Footer);
