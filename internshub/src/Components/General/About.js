import React, { useEffect } from "react";

function About() {
  useEffect(() => {
    document.title = "InternsHub | Home";
  }, []);
  return (
    <div>
      <header id="page-header">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto text-center">
              <h1>About Us</h1>
              <p>
                We strive to provide you with a very good experience throughout
                our website
              </p>
            </div>
          </div>
        </div>
      </header>

      <section id="about" className="py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>What We Do</h1>
              <p>
                We are a technology company on a mission to equip students with
                relevant skills &amp; practical exposure through internships and
                online trainings. Imagine a world full of freedom and
                possibilities. A world where you can discover your passion and
                turn it into your career. A world where your practical skills
                matter more than your university degree.
              </p>
              <p>
                A world where you do not have to wait till 21 to taste your
                first work experience (and get a rude shock that it is nothing
                like you had imagine it to be). A world where you graduate fully
                assured, fully confident, and fully prepared to stake claim on
                your place in the world. At Internshala, we are making this
                dream a reality.
              </p>
              <p>
                Internships allow you to test out specific techniques learned in
                the classroom before entering the working world.
              </p>
            </div>
            <div className="col-md-6">
              <img
                src="https://source.unsplash.com/random/700x700/?internships"
                alt=""
                className="img-fluid rounded-circle d-none d-md-block about-img"
              />
            </div>
          </div>
        </div>
      </section>
      <section id="icon-boxes" className="p-2">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-4 mt-3">
              <div className="card bg-danger text-white text-center">
                <div className="card-body">
                  <i className="fas fa-shopping-bag fa-3x"></i>
                  <h3>Many Opportunities</h3>
                  We have a huge collection of Internships across all domains
                  and fields for your needs
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-3">
              <div className="card bg-dark text-white text-center">
                <div className="card-body">
                  <i className="fas fa-bullhorn fa-3x" />
                  <h3>Internships</h3>
                  This is what all graduates do to get into dream companies and
                  we in InternsHub help you with the same
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-3">
              <div className="card bg-danger text-white text-center">
                <div className="card-body">
                  <i className="fas fa-comments fa-3x" />
                  <h3>Chat Support</h3>
                  We at InternsHub are striving to provide you with 24/7 help
                  through email support for all your queries
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default About;
