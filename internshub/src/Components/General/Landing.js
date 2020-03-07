import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Landing() {
  useEffect(() => {
    const ip = "http://192.168.1.25:3000";
    localStorage.setItem("ip", ip);
  }, []);
  return (
    <div className="container-fluid">
      <div className="jumbotron mt-5">
        <div className="col-sm-8 mx-auto display-4 text-center">WELCOME</div>
        <Link to="/check" className="nav-link">
          Check
        </Link>
        <Link to="/basics" className="nav-link">
          Basics
        </Link>
      </div>
    </div>
  );
}
export default Landing;
