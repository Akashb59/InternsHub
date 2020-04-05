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
          <div className="row mt-4">
            <div className="col-md-7">
              <h1>What is an Internship?</h1>
              <p className="text-justify">
                It is an opportunity offered by an employer to potential
                employees, called interns, to work at a firm for a fixed period
                of time. Interns are usually undergraduates or students, and
                most internships last in a range of one to six months.
              </p>
              <p className="text-justify">
                Internships are usually part-time if offered during a university
                semester and full-time if offered during the vacation periods.
                An internship should give you practical skills, workplace
                experience and greater knowledge of that industry, in exchange
                for the employer benefiting from your labour.
              </p>
              <p className="text-justify">
                An internship can be either paid or voluntary. The trend is
                increasingly (and rightly) towards the former, as voluntary
                internships are often cited as exploitative. As you would
                expect, internships that pay well are usually the most
                competitive.
              </p>
            </div>
            <div className="col-md-5">
              <img
                src="https://source.unsplash.com/random/700x700/?internships"
                alt=""
                className="img-fluid rounded-circle d-none d-md-block about-img"
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <h1>Why Do Companies Offer Internships?</h1>
              <p className="text-justify">
                <strong>Short-Term:</strong> Internships provide employers with
                cheap (and sometimes even free) labour, for what is usually
                low-level office-based tasks, such as photocopying, filing,
                simple spreadsheet work or drafting reports. Many businesses
                will bring on board interns for a number of weeks or months to
                assist with the completion of a major project or event. This can
                be great for students, because it can really help you to develop
                and evidence skills in project management, problem solving and
                client relationship management. Even if the internship is only
                brief, it can still equip you with a range of transferable
                skills and help you network and build valuable connections in
                the industry. Plus it looks good on your CV.
              </p>
              <p className="text-justify">
                <strong>Long-Term:</strong> Employers often use internships as
                an effective way of advertising their graduate schemes to
                students. Surveys indicate that almost half of all graduate
                employers hire at least 20% of their ex-interns for training
                schemes. It is likely that graduates will return to the
                organisation that hired them as an intern for full-time
                employment after leaving university. Hiring ex-interns after
                they graduate ias advantageous for employers as these graduates
                already understand the company and the job they will be doing.
                Ex-interns require less training than new candidates, which
                saves time and resources.
              </p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col md-7">
              <h1>What are the Benefits of Doing an Internship?</h1>
              <p className="text-justify">
                <ol>
                  <li className="p-1">
                    A chance to develop your knowledge and skills in a
                    particular field or industry.
                  </li>

                  <li className="p-1">
                    Exploring different roles to see which one you would like to
                    pursue.
                  </li>

                  <li className="p-1">
                    Getting insight into the way businesses work and what
                    challenges they face on a daily basis.
                  </li>

                  <li className="p-1">
                    The opportunity to create a network of contacts.
                  </li>
                  <li className="p-1">Acquiring university module credits.</li>

                  <li className="p-1">
                    Applying the concepts and strategies of academic study in a
                    live work environment.
                  </li>

                  <li className="p-1">
                    Getting the national minimum wage (if you do a paid
                    internship)
                  </li>

                  <li className="p-1">
                    Gaining valuable work experience to set you apart from other
                    candidates.
                  </li>
                </ol>
              </p>
            </div>
            <div className="col-md-5">
              <img
                src="https://source.unsplash.com/random/700x700/?technologies"
                alt=""
                className="img-fluid rounded-circle d-none d-md-block"
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <h1>Apply for Internships?</h1>
              <p className="text-justify">
                <strong>Finally</strong> this website is mainly built to help
                serve all of you. We have built a common platform for both the
                students and as well as the companies. It helps a student
                indetify the right internship for him/her in their domain of
                interest. We provide a lot of opportunities by the various
                interships provided by our companies. We make the job of
                providing internships and identifying the right student for an
                internship a lot easier for the companies as well.
              </p>
              <p className="text-justify">
                In short we bridge the gap which is very essential and very
                important in this market. With developers who are exemplary in
                their work and a creative team that strives to always deliver
                the best their expertise can offer, Maiora promises to cater to
                every need and accommodate every requirement of our clients.
              </p>
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
