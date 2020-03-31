import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
function Landing() {
  useEffect(() => {
    document.title = "InternsHub | Home";
    $(function() {
      // Auto play modal video
      $(".video").click(function() {
        var theModal = $(this).data("target"),
          videoSRC = $(this).attr("data-video"),
          videoSRCauto =
            videoSRC +
            "?modestbranding=1&rel=0&controls=0&showinfo=0&html5=1&autoplay=1";
        $(theModal + " iframe").attr("src", videoSRCauto);
        $(theModal + " button.close").click(function() {
          $(theModal + " iframe").attr("src", videoSRC);
        });
      });
    });
    const ip = "http://192.168.1.11:3000";
    localStorage.setItem("ip", ip);
  }, []);

  return (
    <div>
      <section id="showcase">
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li
              data-target="#myCarousel"
              data-slide-to={0}
              className="active"
            />
            <li data-target="#myCarousel" data-slide-to={1} />
            <li data-target="#myCarousel" data-slide-to={2} />
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item carousel-image-1 active">
              <div className="container">
                <div className="carousel-caption d-none d-sm-block text-right mb-5">
                  <h1 className="display-3">WELCOME!</h1>
                  <p className="lead text-capitalize">
                    Give youself an edge in the job market. Gain valuable work
                    experience and explore your career path!!
                  </p>
                  <Link to="/signUp" className="btn btn-danger btn-lg">
                    Sign Up Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="carousel-item carousel-image-2">
              <div className="container">
                <div className="carousel-caption d-none d-sm-block text-right mb-5">
                  <h1 className="display-3">InternsHub For Students</h1>
                  <p className="lead text-capitalize">
                    Network with professionals in the field to gain confidence,
                    which Transists into a job!
                  </p>
                  <Link to="/login" className="btn btn-primary btn-lg">
                    Login Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="carousel-item carousel-image-3">
              <div className="container">
                <div className="carousel-caption d-none d-sm-block text-right mb-5">
                  <h1 className="display-3">InternsHub For Companies</h1>
                  <p className="lead text-capitalize">
                    Increase Productivity of your company by hosting many
                    internships to onboard skilled students.
                  </p>
                  <Link to="/login" className="btn btn-primary btn-lg">
                    Login Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <a
            href="#myCarousel"
            data-slide="prev"
            className="carousel-control-prev"
          >
            <span className="carousel-control-prev-icon" />
          </a>
          <a
            href="#myCarousel"
            data-slide="next"
            className="carousel-control-next"
          >
            <span className="carousel-control-next-icon" />
          </a>
        </div>
      </section>
      <section id="home-icons" className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4 text-center">
              <i className="fas fa-cog fa-3x mb-2" />
              <h3>Responsive</h3>
              <p>
                Responsive website can adapt itself and render well on a variety
                of devices and screen sizes. This site is able to ensure design
                and performance that are necessary for usability and
                satisfaction.
              </p>
            </div>
            <div className="col-md-4 mb-4 text-center">
              <i className="fas fa-cloud fa-3x mb-2" />
              <h3>Terms of use</h3>
              <p>
                This site and its content are intended for users of InternsHub.
                The site maintains the updates of each and every transaction.
                You may not use this site or content for any other purpose.
              </p>
            </div>
            <div className="col-md-4 mb-4 text-center">
              <i className="fas fa-cart-plus fa-3x mb-2" />
              <h3>Privacy</h3>
              <p>
                We respect your privacy and strive to provide a safe, secure
                user experience. This privacy statement sets forth our online
                data collection and usage policies and practices.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="home-heading" className="p-5">
        <div className="dark-overlay">
          <div className="row">
            <div className="col">
              <div className="container pt-5">
                <h1>What are you waiting for?</h1>
                <p className="d-none d-md-block">
                  Get going with our exciting internship oppurtunities as we
                  provide internships for all your choices!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="info" className="py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-6 align-self-center">
              <h3 className="text-capitalize">
                Want to get into your dream job?
              </h3>
              <p>
                <strong>'But how will you get it?' </strong> Risk is not around
                to help you. Nothing says you're the most deserving candidate
                for a job than an internship on your resume
              </p>
              <Link to="/about" className="btn btn-outline-danger btn-lg">
                Learn More
              </Link>
            </div>
            <div className="col-md-6">
              <img src="/laptop.png" alt="" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
      <section id="video-play">
        <div className="dark-overlay">
          <div className="row">
            <div className="col">
              <div className="container p-5">
                <Link
                  to="#"
                  className="video"
                  data-video="https://www.youtube.com/embed/HQEEfeg0LKc"
                  data-toggle="modal"
                  data-target="#videoModal"
                >
                  <i className="fas fa-play fa-3x" />
                </Link>
                <h1 className="pt-2">More About Us</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="modal fade" id="videoModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <button className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
              <iframe
                src=""
                title="title"
                frameborder="0"
                height="350"
                width="100%"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Landing;
