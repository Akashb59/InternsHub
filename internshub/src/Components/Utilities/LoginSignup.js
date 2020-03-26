import axios from "axios";
import jwt_decode from "jwt-decode";
//import Cookies from 'universal-cookie';
import { showAlert } from "./Alerts";
const ip = localStorage.ip;

//GET and GET ALL
export const profile = user => {
  //console.log(user.id);
  return axios({
    method: "get",
    url: `${ip}/api/v1/users/${user.id}`,
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

export const roles = () => {
  //console.log(ip);
  return axios({
    method: "get",
    url: `${ip}/api/v1/userTypeMasters`,
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
      console.log(err);
      showAlert("error", `${err.response.data.message}`);
    });
};

//POST
export const signup = newUser => {
  return axios
    .post(`${ip}/api/v1/users/signUp`, {
      fullname: newUser.fullname,
      email: newUser.email,
      password: newUser.password,
      passwordConfirm: newUser.passwordConfirm,
      phoneNumber: newUser.phoneNumber,
      role: newUser.role
    })
    .then(res => {
      //console.log("Registered");
      localStorage.setItem("usertoken", res.data.token);
      const token = localStorage.usertoken;
      //console.log(token);
      const decoded = jwt_decode(token);
      const id = decoded.id;
      //console.log(decoded.id);
      localStorage.setItem("userid", id);
      //console.log(res.data);
      //console.log("Sending");
      showAlert("success", "Sign Up Successful");
      return res.data;
    })
    .catch(err => {
      showAlert("error", `${err.response.data.message}`);
      console.log(err);
    });
};

export const login = user => {
  return axios
    .post(`${ip}/api/v1/users/logIn`, {
      email: user.email,
      password: user.password,
      role: user.role
    })
    .then(res => {
      localStorage.setItem("usertoken", res.data.token);
      const token = localStorage.usertoken;
      // const cookies = new Cookies();
      // cookies.set('jwt', token);

      //console.log(token);
      const decoded = jwt_decode(token);
      const id = decoded.id;
      //console.log(decoded.id);
      localStorage.setItem("userid", id);
      //console.log("Logged in");
      //console.log(res.data.token);
      showAlert("success", "Logged In");
      return res.data;
    })
    .catch(err => {
      showAlert("error", `${err.response.data.message}`);
      console.log(err);
    });
};

export const forgotPassword = user => {
  return axios
    .post(`${ip}/api/v1/users/forgotPassword`, {
      headers: {
        jwt: localStorage.usertoken
      },
      email: user.email
    })
    .catch(err => {
      showAlert("error", `${err.response.data.message}`);
      console.log(err);
    });
};

//PATCH
export const updatePass = pass => {
  return axios
    .patch(`${ip}/api/v1/users/updateMyPassword`, {
      headers: {
        jwt: localStorage.usertoken
      },
      passwordCurrent: pass.currentPassword,
      password: pass.password,
      passwordConfirm: pass.passwordConfirm
    })
    .catch(err => {
      showAlert("error", `${err.response.data.message}`);
      console.log(err);
    });
};

export const newPass = (pass, token) => {
  return axios
    .patch(`${ip}/api/v1/users/resetPassword/${token}`, {
      headers: {
        jwt: localStorage.usertoken
      },
      password: pass.password,
      passwordConfirm: pass.passwordConfirm
    })
    .catch(err => {
      showAlert("error", `${err.response.data.message}`);
      console.log(err);
    });
};
