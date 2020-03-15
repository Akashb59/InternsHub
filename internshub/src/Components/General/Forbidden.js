import React, { useEffect } from "react";

function Forbidden() {
  useEffect(() => {
    document.title = "InternsHub | FORBIDDEN";
  }, []);
  return (
    <div className="container-fluid">
      <div className="jumbotron">
        <div className="col-sm-8 mx-auto display-4 text-center">
          403 FORBIDDEN
        </div>
      </div>
    </div>
  );
}
export default Forbidden;
