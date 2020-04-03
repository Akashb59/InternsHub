import React, { useEffect, useState } from "react";
import { formatInput } from "../Utilities/Utils";
import { sendContactInfo } from "./../Utilities/CommonFunctions";
import { showAlert } from "../Utilities/Alerts";

function Contact() {
  const [sender, setSender] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });
  useEffect(() => {
    document.title = "InternsHub | Home";
  }, []);
  const handleChange = event => {
    //const {name,value}=event.target;
    const { name, value } = event.target;
    setSender({
      ...sender,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const contact = {
      firstName: sender.firstName,
      lastName: sender.lastName,
      phone: sender.phone,
      message: sender.message,
      email: sender.email
    };
    sendContactInfo(contact).then(res => {
      if (res) {
        showAlert("success", "Thank You! You will be contacted shortly");
      }
    });
  };
  return (
    <div>
      <header id="page-header">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto text-center">
              <h1>Contact Us</h1>
              <p>
                Contact us to get information regarding Internships, Trainings
                and more.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section id="contact" className="py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mt-3">
              <div className="card p-4">
                <div className="card-body">
                  <h4>Get In Touch</h4>
                  <p>Any equires?</p>
                  <p></p>
                  <h4>Address</h4>

                  <p>
                    Plot No. 113, 2nd floor, Above Cult-Fit, Banashankari,
                    Bengaluru - 560085
                  </p>
                  <h4>Email</h4>
                  <p>reachus@maiora.co</p>
                  <h4>Phone</h4>
                  <p> +91 7259655281, +91 9886137907</p>
                </div>
              </div>
            </div>
            <div className="col-md-8 mt-3">
              <div className="card p-4">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <h3 className="text-center">
                      Please fill out this form to contact us
                    </h3>
                    <hr />
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            name="firstName"
                            className="form-control"
                            value={sender.firstName}
                            onChange={handleChange}
                            required
                            maxLength="15"
                            placeholder="First Name"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            value={sender.firstName}
                            onChange={handleChange}
                            required
                            maxLength="15"
                            placeholder="Last Name"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={sender.email}
                            onChange={handleChange}
                            required
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            name="phone"
                            className="form-control"
                            onKeyDown={formatInput}
                            value={sender.phoneNumber}
                            onChange={handleChange}
                            maxLength="10"
                            required
                            placeholder="Phone Number"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <textarea
                            type="text"
                            name="message"
                            className="form-control"
                            value={sender.message}
                            onChange={handleChange}
                            required
                            maxLength="50"
                            placeholder="Message"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <button
                            className="btn btn-block btn-outline-danger"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Contact;
