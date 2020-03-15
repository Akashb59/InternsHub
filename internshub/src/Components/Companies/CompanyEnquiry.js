import React, { useEffect } from "react";
import "./../../CSS/company.css";
function CompanyEnquiry() {
  useEffect(() => {
    document.title = "InternsHub | Company Enquiries";
  }, []);
  return (
    <div className="container-fluid">
      <div className="jumbotron mt-5">
        <div className="col-sm-8 mx-auto display-4 text-center">
          Company Enquiry
        </div>
      </div>
    </div>
  );
}
export default CompanyEnquiry;
