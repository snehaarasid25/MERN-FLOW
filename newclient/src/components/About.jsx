import React, { useEffect,useState } from "react";
import sneha from "../images/sneha22.jpg";
import { useNavigate } from "react-router-dom";
import aboutpic from "../images/aboutpic.jpg";

const About = () => {
  const navigate = useNavigate();
  const[userDetail,setUserDetail]=useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      setUserDetail(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <div className="container emp-profile">
        <form method="GET">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <img src={userDetail.name==="Priti Sharma"? sneha:aboutpic} alt="sneha" />
              </div>
            </div>

            <div className="col-md-6">
              <div className="profile-head">
                <h5>{userDetail.name}</h5>
                <h6>{userDetail.work}</h6>
                <p className="profile-rating mt-3 mb-5 ">
                  RANKINGS: <span>1/10</span>
                </p>
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      class="nav-link"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      class="nav-link "
                      id="profile-tab"
                      data-toggle="tab"
                      href="#profile"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="true"
                    >
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-2">
              <input
                type="submit"
                className="profile-edit-btn"
                name="btnAddMore"
                value="Edit Profile"
              />
            </div>
          </div>

          <div className="row">
            {/* ḷeft side url */}
            <div className="col-md-4">
              <div className="profile-work">
                <p>Work links</p>
                <a href="https://github.com/snehaarasid25" target="sneha">
                  Github
                </a>{" "}
                <br />
                <a href="https://leetcode.com/Sneha_Araseed/" target="sneha">
                  Leetcode
                </a>{" "}
                <br />
                <a href="https://auth.geeksforgeeks.org/user/sneha_araseed/?utm_source=geeksforgeeks&utm_medium=my_profile&utm_campaign=auth_user" target="sneha">
                  Gfg
                </a>{" "}
                <br />
                <a href="https://www.linkedin.com/in/sneha-araseed-34abb1241/" target="sneha">
                  Linkedin
                </a>{" "}
      
              </div>
            </div>
            {/* right side url   */}
            <div className="col-md-8 pl-5 about-info">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <h6>User ID</h6>
                    </div>
                    <div className="col-md-6">
                      <p>2509070520022002</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <h6>Name</h6>
                    </div>
                    <div className="col-md-6">
                      <p>{userDetail.name}</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <h6>Email</h6>
                    </div>
                    <div className="col-md-6">
                      <p>{userDetail.email}</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <h6>Phone</h6>
                    </div>
                    <div className="col-md-6">
                      <p>{userDetail.phone}</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <h6>Profession</h6>
                    </div>
                    <div className="col-md-6">
                      <p>{userDetail.work}</p>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <h6>Experience</h6>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <h6>Hourly Value</h6>
                    </div>
                    <div className="col-md-6">
                      <p>15$/hr</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <h6>Projects</h6>
                    </div>
                    <div className="col-md-6">
                      <p>250</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <h6>Communication</h6>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <h6>Availability</h6>
                    </div>
                    <div className="col-md-6">
                      <p>12 months</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
