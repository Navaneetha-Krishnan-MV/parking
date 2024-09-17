// import React from "react";
// import "./Resources/styles/About.css";
// import icon from "./Resources/parking-icon1.png";
// import service1 from "./Resources/Aboutimages/ser1.png"; // Import images for services
// import service2 from "./Resources//Aboutimages/ser2.png";
// import service3 from "./Resources/Aboutimages/service-3.png";

// function About() {
//     return (
//         <div className="about-container">
//             <div className="background">
//                 <div className="content">
//                     <img className="icon" src={icon} alt="Logo" width="60" height="60" />
//                     <p className="description">
//                         Lorem ipsum dolor sit amet consectetur adipi<br></br>
//                         sicing elit. Possimus temporibus<br></br>
//                         numquam totam quae laudantium sed? Praesentium expedita <br></br>
//                         dolorem debitis suscipit.
//                     </p>
//                     <button className="get-started-btn">Get Started</button>
//                 </div>
//             </div>
//             <div className="about-us">
//                 <h2>About Us</h2>
//                 <div className="line"></div>
//                 <p className="about-paragraph">
//                     We are dedicated to providing the best services to our customers. Our team of professionals is committed to ensuring your satisfaction with every interaction.
//                 </p>
//             </div>
//             <div className="services">
//                 <div className="service-item">
//                     <img src={service1} alt="Professional Service" className="service-icon" />
//                     <h3>Professional Service</h3>
//                     <p>Offering top-notch professional services to meet your needs.</p>
//                 </div>
//                 <div className="service-item">
//                     <img src={service2} alt="Security" className="service-icon" />
//                     <h3>Security</h3>
//                     <p>Ensuring your safety with our state-of-the-art security solutions.</p>
//                 </div>
//                 <div className="service-item">
//                     <img src={service3} alt="Another Service" className="service-icon" />
//                     <h3>Another Service</h3>
//                     <p>Providing additional services tailored to your requirements.</p>
//                 </div>
//             </div>

//             <div className="about-us">
//             <h2>Why we are Best ..?</h2> </div>
            
//         </div>
//     );
// }

// export default About;





import React from "react";
import { Link } from 'react-router-dom';

import "./Resources/styles/About.css";
import icon from "./Resources/Aboutimages/aboutstarting.png";
import service1 from "./Resources/Aboutimages/ser1.png"; 
import service2 from "./Resources//Aboutimages/ser2.png";
import service3 from "./Resources/Aboutimages/service-3.png";
import safeSecure from "./Resources/Aboutimages/ser1.png"; 
import fullyEncrypted from "./Resources/Aboutimages/ser2.png";
import instantPickup from "./Resources/Aboutimages/ser2.png";
import realTimeTracking from "./Resources/Aboutimages/ser2.png";
import r from "./Resources/Aboutimages/aboutright.webp";

import AOS from 'aos';
import 'aos/dist/aos.css';



function About() {
    
    AOS.init();

    return (
        <div className="about-container">
            <div className="flex flex-col md:flex-row items-center bg-gray-100 p-8 rounded-lg shadow-lg">
      <div className="md:w-1/2 md:pr-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          About us
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
          Learn More
        </button>
      </div>
      <div className="md:w-1/2 mt-6 md:mt-0">
        <img
          src={icon}
          alt="Descriptive Alt Text"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
    </div>
            
            <div className="services">
                <div className="service-item"  data-aos="zoom-in-right"  data-aos-duration="1700" >
                    <img src={service1} alt="Professional Service" className="service-icon" />
                    <h3>Professional Service</h3>
                    <p>Offering top-notch professional services to meet your needs.</p>
                </div>
                <div className="service-item"  data-aos="zoom-in"  data-aos-duration="1700" >
                    <img src={service2} alt="Security" className="service-icon" />
                    <h3>Security</h3>
                    <p>Ensuring your safety with our state-of-the-art security solutions.</p>
                </div>
                <div className="service-item"  data-aos="zoom-in-left"  data-aos-duration="1700" >
                    <img src={service3} alt="Another Service" className="service-icon" />
                    <h3>Another Service</h3>
                    <p>Providing additional services tailored to your requirements.</p>
                </div>
            </div>

            <div className="about-us"  data-aos="zoom-out"  data-aos-duration="500" >
                <br />
                <br />
                <h2  data-aos="fade-down"  data-aos-duration="1500" >Why We Are Best?

                    
                </h2>
                <h1 id="dedicated"  data-aos="fade-up"  data-aos-duration="500" >

                We are dedicated to providing the best services to our customers.<br /> Our team of professionals is committed to ensuring your satisfaction with every interaction.

                </h1>
            </div>
            
            <div className="services-new">
                <div className="service-item-new"  data-aos="fade-down-right"  data-aos-duration="1500" >
                    <img src={safeSecure} alt="Safe & Secure" className="service-icon-new" />
                    <h3>Safe & Secure</h3>
                    <p>Your safety is our priority with our secure solutions.</p>
                </div>
                <div className="service-item-new"  data-aos="fade-down"  data-aos-duration="1500" >
                    <img src={fullyEncrypted} alt="Fully Encrypted" className="service-icon-new" />
                    <h3>Fully Encrypted</h3>
                    <p>Your data is safe with our full encryption technology.</p>
                </div>
                <div className="service-item-new"  data-aos="fade-down-left"  data-aos-duration="1500" >
                    <img src={safeSecure} alt="Instant Cash Pickup" className="service-icon-new" />
                    <h3>Instant Cash Pickup</h3>
                    <p>Quick and easy cash pickup services at your convenience.</p>
                </div>
                <div className="service-item-new"  data-aos="fade-up-right"  data-aos-duration="1500" >
                    <img src={realTimeTracking} alt="Real-Time Tracking" className="service-icon-new" />
                    <h3>Real-Time Tracking</h3>
                    <p>Track your orders in real-time with our advanced system.</p>
                </div>
                <div className="service-item-new"  data-aos="fade-up"  data-aos-duration="1500" >
                    <img src={safeSecure} alt="Real-Time Tracking" className="service-icon-new" />
                    <h3>Real-Time Tracking</h3>
                    <p>Track your orders in real-time with our advanced system.</p>
                </div>
                <div className="service-item-new"  data-aos="fade-up-left"  data-aos-duration="1500" >
                    <img src={instantPickup} alt="Real-Time Tracking" className="service-icon-new" />
                    <h3>Real-Time Tracking</h3>
                    <p>Track your orders in real-time with our advanced system.</p>
                </div>
            </div>
            
            <div className="about-us2">
      
      <div className="about-us2-content"  data-aos="zoom-in"  data-aos-duration="1500" >
        <h2>About Us</h2>
        <p>
          We are committed to providing the best services to our customers. Join us to be part of an exciting journey.<br />
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non voluptatum odit natus soluta totam.<br />
          Saepe doloribus temporibus dolor aliquid iure.
        </p>
    
        <button className="sign-up-btn">


        <Link to="/signin">Sign up</Link>

        </button>
      </div>

      {/* Right Side Image */}
      <div className="about-us2-image"  data-aos="zoom-out"  data-aos-duration="1500" >
        <img src={r} alt="About Us" />
      </div>
    </div>
        </div>
    );
}

export default About;