import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { profile } from "../Utilities/CommonFunctions";

function Profile() {
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [roleType, setRoletype] = useState("");

  useEffect(() => {
    document.title = "InternsHub | Profile";
    const token = localStorage.usertoken;
    //console.log(token);
    const decoded = jwt_decode(token);
    const id = decoded.id;
    //console.log(decoded.id);
    const user = {
      id: id
    };
    profile(user).then(res => {
      //console.log(res);
      //console.log(res.data.user.fullname);
      //console.log(res.data.user.phoneNumber);
      //console.log(res.data.user.roleType.roleName);
      setFullname(res.data.user.fullname);
      setPhoneNumber(res.data.user.phoneNumber);
      setRoletype(res.data.user.roleType.roleName);
    });
  }, []);

  return (
    <div className="container">
      <div className="jumbotron">
        <div className="col-sm-8">
          <h1 className="text-center">Profile</h1>
        </div>
        <table className="table col-md-6 mx-auto">
          <tbody>
            <tr>
              <td>Full name</td>
              <td>{fullname}</td>
            </tr>
            <tr>
              <td>Phone Number</td>
              <td>{phoneNumber}</td>
            </tr>
            <tr>
              <td>Role</td>
              <td>{roleType}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Profile;
