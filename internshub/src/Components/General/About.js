import React, { useEffect } from "react";

function About() {
  useEffect(() => {
    document.title = "InternsHub | Home";
    const ip = "http://192.168.1.9:3000";
    localStorage.setItem("ip", ip);
  }, []);
  return (
    <div>
      <header id="page-header">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto text-center">
              <h1>About Us</h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas,
                temporibus?
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
                {"{"}" "{"}"}A world where you do not have to wait till 21 to
                taste your first work experience (and get a rude shock that it
                is nothing like you had imagine it to be). A world where you
                graduate fully assured, fully confident, and fully prepared to
                stake claim on your place in the world. At Internshala, we are
                making this dream a reality.
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
      <section id="icon-boxes" className="p-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card bg-danger text-white text-center">
                <div className="card-body">
                  <i className="fas fa-building fa-3x" />
                  <h3>Sample Heading</h3>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestias, adipisci.
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-dark text-white text-center">
                <div className="card-body">
                  <i className="fas fa-bullhorn fa-3x" />
                  <h3>Sample Heading</h3>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestias, adipisci.
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-danger text-white text-center">
                <div className="card-body">
                  <i className="fas fa-comments fa-3x" />
                  <h3>Sample Heading</h3>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestias, adipisci.
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