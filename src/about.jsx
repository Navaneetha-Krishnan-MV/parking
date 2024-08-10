import React from "react";
import "./Resources/styles/About.css";
import icon from "./Resources/parking-icon1.png";
import google from "./Resources/Aboutimages/Google.png";
import facebook from "./Resources/Aboutimages/Facebook.png";
import insta from "./Resources/Aboutimages/Instagram.png";
import playstore from "./Resources/Aboutimages/playstore.png";


function About(){

    return(
        <div className="background">
            <div className="px-4 py-1 my-5 text-center">
                <img className="d-block mx-auto mb-4" src={icon} alt="Logo" width="60" height="60" />
                <h1 className="display-5 fw-bold text-body-emphasis abt-us">About Us</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">
                    Welcome to ParkPuram, where innovation meets convenience in the world of parking. Our mission is simple: to make parking stress-free and efficient for everyone.Our company emerged from a need for a more organized and accessible parking solution.
                        <hr/>
                        Our team of passionate innovators and technology experts recognized the daily challenges drivers face when searching for parking spaces, and we set out to create a solution that transforms this experience.We provide a state-of-the-art parking booking system designed to streamline the way you find and reserve parking spots. Our platform connects drivers with available parking spaces in real-time, offering a seamless and hassle-free experience.At ParkPuram, we are committed to providing a solution that not only meets but exceeds your expectations. Our platform is designed to save you time, reduce stress, and enhance your overall parking experience.
                    </p>
                    <div className="container text-center">
                        <div className="row align-items-start" id="icons">
                            <p className="col">
                                <img src={google} height="50px" alt="Google" />
                            </p>
                            <p className="col">
                                <img src={facebook} height="50px" alt="Facebook" />
                            </p>
                            <p className="col">
                                <img src={insta} height="50px" alt="Instagram" />
                            </p>
                            <p className="col">
                                <img src={playstore} height="50px" alt="Play Store" />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;