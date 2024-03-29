import React, { useEffect } from "react";
import { showAlert } from "./../Utilities/Alerts";

function NotFound() {
  useEffect(() => {
    document.title = "InternsHub | NOT FOUND";
  }, []);
  return (
    <div className="container-fluid">
      {showAlert("error", "Not Found")}
      <div className="jumbotron">
        <div className="col-sm-8 mx-auto display-4 text-center">
          404 Not Found
        </div>
      </div>
    </div>
  );
}
export default NotFound;
