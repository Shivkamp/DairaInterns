import React, { useEffect, useRef } from "react";
import Wrapper from "../assets/css/wrappers/LandingPage";
import { Link } from "react-router-dom";
import photo from "../assets/media/LandingPage/hero.png";
import Navbar from "../components/shared/Navbar";
// import PopularCategory from "../components/Home Page/PopularCategory";
// import HowWorks from "../components/Home Page/HowWorks";
// import Team from "../components/Home Page/Team";
// import Brands from "../components/Home Page/Brands";
// import Testimonial from "../components/Home Page/Testimonial";

const Landing = () => {
    const navbarRef = useRef(null);
    const heroRef = useRef(null);

    useEffect(() => {
        const navbarHeight = navbarRef.current.getBoundingClientRect().height;
        heroRef.current.style.minHeight = `calc(100vh - ${navbarHeight}px)`;
    }, []);
    return (
        <>
            <Navbar navbarRef={navbarRef} />
            <Wrapper ref={heroRef}>
                <div className="hero-content">
                    <div className="text-content">
                        <h1>
                            Welcome to our <span className="fancy">Faculty Project </span> 
                            Portal!
                        </h1>
                        <p>
                        The Faculty Project Portal enables faculty to post project proposals for collaborative work with students. It streamlines communication, feedback, and progress tracking, empowering faculty to mentor students effectively.
                        </p>
                        <div className="btn-grp">
                            <Link className="btn" to="/all-jobs">
                                Apply Now
                            </Link>
                        </div>
                    </div>
                    <div className="placeholder">
                        <img src={photo} alt="job viva photo" />
                    </div>
                </div>
            </Wrapper>
            <div>
            {/* <PopularCategory/>
            <HowWorks/>
            <Team/>
            <Testimonial/> */}
            {/* <Brands/> */}
            </div>
        </>
    );
};
const HomePage = () => {
    return (
      <div>
        <AllJobs fromHomePage={true} />
      </div>
    );
  };

export default Landing;
