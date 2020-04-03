import React, { useEffect } from "react";
import $ from "jquery";
function Check() {
  useEffect(() => {
    document.title = "InternsHub | Check";

    $(".port-item").click(function() {
      $(".show").removeClass("show");
      $(".show").addClass("hide");
    });

    // $(document).on("click", '[data-toggle="lightbox"]', function(e) {
    //   e.preventDefault();
    //   $(this).ekkoLightbox();
    // });
  }, []);

  return (
    <div className="container">
      <header id="main-header">
        <div className="row no-gutters">
          <div className="col-lg-8 col-md-7">
            <div className="d-flex flex-column">
              <div>
                <div className="d-flex flex-row text-white align-items-stretch text-center">
                  <div
                    className="port-item p-4 bg-primary"
                    data-toggle="collapse"
                    data-target="#home"
                  >
                    <i className="fas fa-home fa-2x d-block" />
                    <span className="d-none d-sm-block">Home</span>
                  </div>
                  <div
                    className="port-item p-4 bg-success"
                    data-toggle="collapse"
                    data-target="#resume"
                  >
                    <i className="fas fa-graduation-cap fa-2x d-block" />
                    <span className="d-none d-sm-block">Resume</span>
                  </div>
                  <div
                    className="port-item p-4 bg-warning"
                    data-toggle="collapse"
                    data-target="#work"
                  >
                    <i className="fas fa-folder-open fa-2x d-block" />
                    <span className="d-none d-sm-block">Work</span>
                  </div>
                  <div
                    className="port-item p-4 bg-danger"
                    data-toggle="collapse"
                    data-target="#contact"
                  >
                    <i className="fas fa-envelope fa-2x d-block" />
                    <span className="d-none d-sm-block">Contact</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div id="home" className="collapse" style={{ transition: "all .5s" }}>
        <h2>Welcome To My Page</h2>
        <p className="lead">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil, ut!
        </p>
      </div>
      <div id="resume" className="collapse" style={{ transition: "all .5s" }}>
        <div className="card card-body bg-success text-white py-5">
          <h2>My Resume</h2>
          <p className="lead">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil, ut!
          </p>
        </div>
      </div>
      <div id="work" className="collapse" style={{ transition: "all .5s" }}>
        <div className="card card-body bg-warning text-white py-5">
          <h2>My Work</h2>
          <p className="lead">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil, ut!
          </p>
        </div>
      </div>
      <div id="contact" className="collapse" style={{ transition: "all .5s" }}>
        <div className="card card-body bg-danger text-white py-5">
          <h2>Contact</h2>
          <p className="lead">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil, ut!
          </p>
        </div>
      </div>
    </div>
  );
}
export default Check;
