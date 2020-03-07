import axios from "axios";

//const ip = "http://192.168.1.25:3000";
const ip = localStorage.ip;

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
      alert(err.response.data.message);
      console.log(err);
    });
};

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
      alert(err.response.data.message);
      console.log(err);
    });
};

export const internshipFilter = filter => {
  console.log(filter);
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
      alert(err.response.data.message);
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
      alert(err.response.data.message);
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
      alert(err.response.data.message);
      console.log(err);
    });
};
