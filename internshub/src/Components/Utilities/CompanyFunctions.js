import axios from "axios";

//const ip = "http://192.168.1.25:3000";
const ip = localStorage.ip;
export const company = () => {
  return axios({
    method: "get",
    url: `${ip}/api/v1/companies/user/${localStorage.userid}`,
    //withCredentials: true,
    headers: {
      jwt: localStorage.usertoken
    }
    // headers: {
    //   Cookie: `jwt=${localStorage.usertoken}`
    // }
  })
    .then(res => {
      console.log(res.data.data.company[0].id);
      //console.log(res.data.token);
      localStorage.setItem("companyid", res.data.data.company[0].id);
      return res.data;
    })
    .catch(err => {
      alert(err.response.data.message);
      console.log(err);
    });
};

export const companyform = details => {
  //console.log(details.user);
  return axios
    .post(`${ip}/api/v1/companies/`, {
      headers: {
        jwt: localStorage.usertoken
      },
      gst_no: details.gst_no,
      website: details.website,
      establishedYear: details.establishedYear,
      address: details.address,
      user: details.user
    })
    .catch(err => {
      alert(err.response.data.message);
      console.log(err);
    });
};

export const hostInternship = internship => {
  return axios
    .post(`${ip}/api/v1/internships/`, {
      headers: {
        jwt: localStorage.usertoken
      },
      title: internship.title,
      description: internship.description,
      duration: internship.duration,
      posted_on: internship.posted_on,
      starts_on: internship.starts_on,
      intended_participants: internship.intended_participants,
      requiredSkills: internship.requiredSkills,
      categories: internship.categories,
      type_of_internship: internship.type_of_internship,
      company: internship.company,
      stipend: internship.stipend
    })
    .catch(err => {
      alert(err.response.data.message);
      console.log(err);
    });
};

export const companyInternships = () => {
  //console.log(details.user);
  return axios({
    method: "get",
    url: `${ip}/api/v1/internships/company/${localStorage.companyid}`,
    //withCredentials: true,
    headers: {
      jwt: localStorage.usertoken
    }
    // headers: {
    //   Cookie: `jwt=${localStorage.usertoken}`
    // }
  }).catch(err => {
    alert(err.response.data.message);
    console.log(err);
  });
};

export const internship = id => {
  //  console.log(id);
  return axios({
    method: "get",
    url: `${ip}/api/v1/internships/${id}`,
    //withCredentials: true,
    headers: {
      jwt: localStorage.usertoken
    }
    // headers: {
    //   Cookie: `jwt=${localStorage.usertoken}`
    // }
  }).catch(err => {
    //alert(err.response.data.message);
    //console.log(err);
  });
};
//Changes to br made
export const editInternship = internship => {
  return axios
    .patch(`${ip}/api/v1/internships/${localStorage.internshipid}`, {
      headers: {
        jwt: localStorage.usertoken
      },
      title: internship.title,
      description: internship.description,
      duration: internship.duration,
      posted_on: internship.posted_on,
      starts_on: internship.starts_on,
      intended_participants: internship.intended_participants,
      requiredSkills: internship.requiredSkills,
      categories: internship.categories,
      type_of_internship: internship.type_of_internship,
      company: internship.company,
      stipend: internship.stipend
    })
    .catch(err => {
      alert(err.response.data.message);
      console.log(err);
    });
};
