import axios from "axios";
import { showAlert } from "./Alerts";
const ip = localStorage.ip;

//GET and GET ALL
export const student = () => {
  return axios({
    method: "get",
    url: `${ip}/api/v1/students/user/${localStorage.userid}`,
    //withCredentials: true,
    headers: {
      jwt: localStorage.usertoken
    }
    // headers: {
    //   Cookie: `jwt=${localStorage.usertoken}`
    // }
  })
    .then(res => {
      //console.log(res.data.data);
      //console.log(res.data.token);
      localStorage.setItem("studentid", res.data.data.student[0].id);
      return res.data;
    })
    .catch(err => {
      showAlert("error", `${err.response.data.message}`);
      console.log(err);
    });
};
export const internshipAll = () => {
  //console.log(filter);
  return axios({
    method: "get",
    url: `${ip}/api/v1/internships/`,
    //withCredentials: true,
    headers: {
      jwt: localStorage.usertoken
    }
    // headers: {
    //   Cookie: `jwt=${localStorage.usertoken}`
    // }
  })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      showAlert("error", `${err.response.data.message}`);
      console.log(err);
    });
};

export const selectedIntern = id => {
  //console.log(filter);
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
  })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      showAlert("error", `${err.response.data.message}`);
      console.log(err);
    });
};

//POST
export const studentform = det => {
  return axios
    .post(`${ip}/api/v1/students/`, {
      headers: {
        jwt: localStorage.usertoken
      },
      academic_details: {
        school_name: det.school_name,
        grade_10_per: det.grade_10_per,
        pu_college_name: det.pu_college_name,
        grade_12_per: det.grade_12_per,
        university_name: det.university_name,
        usn: det.usn,
        degree_cgpa: det.degree_cgpa,
        project1_undertaken: det.project1_undertaken,
        project2_undertaken: det.project2_undertaken,
        college_name: det.college_name
      },

      personal_details: {
        father_name: det.father_name,
        mother_name: det.mother_name,
        dob: det.dob,
        gender: det.gender,
        hobbies: det.hobbies
      },
      college: {
        college_name: det.college_name,
        phone_number: det.phone_number,
        website: det.website,
        email: det.email
      },
      user: det.user
    })
    .catch(err => {
      showAlert("error", `${err.response.data.message}`);
      console.log(err);
    });
};

export const internshipFilter = filter => {
  //console.log(filter);
  return axios
    .post(`${ip}/api/v1/internships/internshipFilter`, {
      headers: {
        jwt: localStorage.usertoken
      },
      stipend: filter.stipend,
      categories: filter.categories,
      duration: filter.duration,
      type_of_internship: filter.type_of_internship,
      starts_on: filter.starts_on
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      showAlert("error", `${err.response.data.message}`);
      console.log(err);
    });
};

export const sendEnquiry = info => {
  //console.log(info);
  return axios
    .post(`${ip}/api/v1/enquiries/`, {
      headers: {
        jwt: localStorage.usertoken
      },
      user: info.user,
      company: info.company,
      student: info.student,
      internship: info.internship,
      reqMessage: info.info
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      showAlert("error", `${err.response.data.message}`);
      console.log(err);
    });
};

//PATCH
export const SkillsUpdate = skill => {
  return axios
    .patch(`${ip}/api/v1/students/${localStorage.studentid}`, {
      headers: {
        jwt: localStorage.usertoken
      },
      skills: skill
    })
    .catch(err => {
      showAlert("error", `${err.response.data.message}`);
      console.log(err);
    });
};

export const uploadResume = (ab, size) => {
  return axios({
    method: "patch",
    url: `${ip}/api/v1/students/uploadResume/${localStorage.studentid}`,
    data: ab,
    headers: {
      "Content-Type": "multipart/form-data",
      size: size,
      jwt: localStorage.usertoken
    }
  }).catch(err => {
    showAlert("error", `${err.response.data.message}`);
    console.log(err);
  });
};

export const editStudProfilePersonal = editStudProfile => {
  return axios
    .patch(`${ip}/api/v1/students/${localStorage.studentid}`, {
      headers: {
        jwt: localStorage.usertoken
      },
      personal_details: {
        gender: editStudProfile.gender,
        hobbies: editStudProfile.hobbies
      }
    })
    .catch(err => {
      showAlert("error", `${err.response.data.message}`);
      console.log(err);
    });
};

export const editStudProfileAcademic = editStudProfile => {
  return axios
    .patch(`${ip}/api/v1/students/${localStorage.studentid}`, {
      headers: {
        jwt: localStorage.usertoken
      },
      academic_details: {
        school_name: editStudProfile.schoolName,
        grade_10_per: editStudProfile.gradeTen,
        pu_college_name: editStudProfile.puCollegeName,
        grade_12_per: editStudProfile.gradeTwelve,
        college_name: editStudProfile.degreeCollege,
        university_name: editStudProfile.universityName,
        usn: editStudProfile.usn,
        degree_cgpa: editStudProfile.degreeCgpa,
        project1_undertaken: editStudProfile.project1,
        project2_undertaken: editStudProfile.project2
      },
      college: {
        college_name: editStudProfile.degreeCollege,
        phone_number: editStudProfile.phoneNumber,
        website: editStudProfile.colWebsite,
        email: editStudProfile.colEmail
      }
    })
    .catch(err => {
      showAlert("error", `${err.response.data.message}`);
      console.log(err);
    });
};
