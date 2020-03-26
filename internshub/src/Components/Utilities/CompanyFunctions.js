import axios from "axios";
import { showAlert } from "./Alerts";
const ip = localStorage.ip;

//GET and GET ALL
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
      //console.log(res.data.data.company[0].id);
      //console.log(res.data.token);
      localStorage.setItem("companyid", res.data.data.company[0].id);
      return res.data;
    })
    .catch(err => {
      showAlert("error", `${err.response.data.message}`);
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
    showAlert("error", `${err.response.data.message}`);
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
    showAlert("error", `${err.response.data.message}`);
    //console.log(err);
  });
};

export const companyEnquiries = () => {
  //console.log(details.user);
  return axios({
    method: "get",
    url: `${ip}/api/v1/enquiries/company/${localStorage.companyid}`,
    //withCredentials: true,
    headers: {
      jwt: localStorage.usertoken
    }
    // headers: {
    //   Cookie: `jwt=${localStorage.usertoken}`
    // }
  }).catch(err => {
    showAlert("error", `${err.response.data.message}`);
    console.log(err);
  });
};

export const internshipEnquiries = id => {
  //console.log(details.user);
  return axios({
    method: "get",
    url: `${ip}/api/v1/enquiries/${id}`,
    //withCredentials: true,
    headers: {
      jwt: localStorage.usertoken
    }
    // headers: {
    //   Cookie: `jwt=${localStorage.usertoken}`
    // }
  }).catch(err => {
    showAlert("error", `${err.response.data.message}`);
    console.log(err);
  });
};

//POST
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
      showAlert("error", `${err.response.data.message}`);
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
      location: internship.location,
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
      showAlert("error", `${err.response.data.message}`);
      console.log(err);
    });
};

//PATCH
export const editInternship = internship => {
  return axios
    .patch(`${ip}/api/v1/internships/${localStorage.internshipId}`, {
      headers: {
        jwt: localStorage.usertoken
      },
      title: internship.title,
      location: internship.location,
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
      showAlert("error", `${err.response.data.message}`);
      console.log(err);
    });
};

export const companyDescription = desc => {
  return axios
    .patch(`${ip}/api/v1/companies/${localStorage.companyid}`, {
      headers: {
        jwt: localStorage.usertoken
      },
      aboutCompany: desc.aboutCompany
    })
    .catch(err => {
      showAlert("error", `${err.response.data.message}`);
      console.log(err);
    });
};

export const companyTechnology = tech => {
  //console.log(tech.technology);
  return axios
    .patch(`${ip}/api/v1/companies/${localStorage.companyid}`, {
      headers: {
        jwt: localStorage.usertoken
      },
      technology: tech.technology
    })
    .catch(err => {
      showAlert("error", `${err.response.data.message}`);
      console.log(err);
    });
};

export const internshipAccept = (id, accepted, completed) => {
  return axios
    .patch(`${ip}/api/v1/enquiries/${id}`, {
      headers: {
        jwt: localStorage.usertoken
      },
      accepted,
      completed
    })
    .catch(err => {
      showAlert("error", `${err.response.data.message}`);
      console.log(err);
    });
};

export const editDetailsForm = editDetails => {
  return axios
    .patch(`${ip}/api/v1/companies/${localStorage.companyid}`, {
      headers: {
        jwt: localStorage.usertoken
      },
      gst_no: editDetails.gst_no,
      website: editDetails.website,
      establishedYear: editDetails.establishedYear
    })
    .catch(err => {
      showAlert("error", `${err.response.data.message}`);
      console.log(err);
    });
};
