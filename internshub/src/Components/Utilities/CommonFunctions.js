import axios from "axios";
import { showAlert } from "./Alerts";
const ip = localStorage.ip;

//GET and GET ALL
export const skills = () => {
  return axios({
    method: "get",
    url: `${ip}/api/v1/skillTypeMasters/`,
    //withCredentials: true,
    headers: {
      jwt: localStorage.usertoken
    }
    // headers: {
    //   Cookie: `jwt=${localStorage.usertoken}`
    // }
  })
    .then(res => {
      //console.log(res.data.data.doc);
      return res.data;
    })
    .catch(err => {
      console.log(err);
      showAlert("error", `${err.response.data.message}`);
    });
};

export const role = roleType => {
  //console.log(user);
  return axios({
    method: "get",
    url: `${ip}/api/v1/userTypeMasters/${roleType}`,
    //withCredentials: true,
    headers: {
      jwt: localStorage.usertoken
    }
    // headers: {
    //   Cookie: `jwt=${localStorage.usertoken}`
    // }
  })
    .then(res => {
      //console.log(res);
      //console.log(res.data.token);
      return res.data;
    })
    .catch(err => {
      showAlert("error", `${err.response.data.message}`);
      console.log(err);
    });
};

//POST
export const addressform = address => {
  return axios
    .post(`${ip}/api/v1/addresses/`, {
      headers: {
        jwt: localStorage.usertoken
      },
      user: address.user,
      locality: address.locality,
      city: address.city,
      district: address.district,
      state: address.state,
      country: address.country,
      pincode: address.pincode
    })
    .catch(err => {
      showAlert("error", `${err.response.data.message}`);
      console.log(err);
    });
};

//PATCH
export const editAddressForm = editAddress => {
  return axios
    .patch(`${ip}/api/v1/addresses/${editAddress.addressID}`, {
      headers: {
        jwt: localStorage.usertoken
      },
      locality: editAddress.locality,
      city: editAddress.city,
      district: editAddress.district,
      state: editAddress.state,
      country: editAddress.country,
      pincode: editAddress.pincode
    })
    .catch(err => {
      showAlert("error", `${err.response.data.message}`);
      console.log(err);
    });
};

export const editUserInfo = details => {
  //console.log(details.user);
  return axios
    .patch(`${ip}/api/v1/users/${localStorage.userid}`, {
      headers: {
        jwt: localStorage.usertoken
      },
      phoneNumber: details.phoneNumber
    })
    .catch(err => {
      showAlert("error", `${err.response.data.message}`);
      console.log(err);
    });
};
