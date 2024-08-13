import React from "react";
import "./Resources/styles/About.css";
import icon from "./Resources/parking-icon1.png";
import service1 from "./Resources/Aboutimages/ser1.png"; // Import images for first set of services
import service2 from "./Resources//Aboutimages/ser2.png";
import service3 from "./Resources/Aboutimages/service-3.png";
import safeSecure from "./Resources/Aboutimages/ser1.png"; // Import images for second set of services
import fullyEncrypted from "./Resources/Aboutimages/ser2.png";
import instantPickup from "./Resources/Aboutimages/ser2.png";
import realTimeTracking from "./Resources/Aboutimages/ser2.png";

function About() {
    return (
        <div className="about-container">
            <div className="background">
                <div className="content">
                    <img className="icon" src={icon} alt="Logo" width="60" height="60" />
                    <p className="description">
                        Lorem ipsum dolor sit amet consectetur adipi<br></br>
                        sicing elit. Possimus temporibus<br></br>
                        numquam totam quae laudantium sed? Praesentium expedita <br></br>
                        dolorem debitis suscipit.
                    </p>
                    <button className="get-started-btn">Get Started</button>
                </div>
            </div>
            <div className="about-us">
                <h2>About Us</h2>
                <div className="line"></div>
                <p className="about-paragraph">
                    We are dedicated to providing the best services to our customers. Our team of professionals is committed to ensuring your satisfaction with every interaction.
                </p>
            </div>
            <div className="services">
                <div className="service-item">
                    <img src={service1} alt="Professional Service" className="service-icon" />
                    <h3>Professional Service</h3>
                    <p>Offering top-notch professional services to meet your needs.</p>
                </div>
                <div className="service-item">
                    <img src={service2} alt="Security" className="service-icon" />
                    <h3>Security</h3>
                    <p>Ensuring your safety with our state-of-the-art security solutions.</p>
                </div>
                <div className="service-item">
                    <img src={service3} alt="Another Service" className="service-icon" />
                    <h3>Another Service</h3>
                    <p>Providing additional services tailored to your requirements.</p>
                </div>
            </div>

            <div className="about-us">
                <h2>Why We Are Best?</h2>
            </div>
            
            <div className="services-new">
                <div className="service-item-new">
                    <img src={safeSecure} alt="Safe & Secure" className="service-icon-new" />
                    <h3>Safe & Secure</h3>
                    <p>Your safety is our priority with our secure solutions.</p>
                </div>
                <div className="service-item-new">
                    <img src={fullyEncrypted} alt="Fully Encrypted" className="service-icon-new" />
                    <h3>Fully Encrypted</h3>
                    <p>Your data is safe with our full encryption technology.</p>
                </div>
                <div className="service-item-new">
                    <img src={safeSecure} alt="Instant Cash Pickup" className="service-icon-new" />
                    <h3>Instant Cash Pickup</h3>
                    <p>Quick and easy cash pickup services at your convenience.</p>
                </div>
                <div className="service-item-new">
                    <img src={realTimeTracking} alt="Real-Time Tracking" className="service-icon-new" />
                    <h3>Real-Time Tracking</h3>
                    <p>Track your orders in real-time with our advanced system.</p>
                </div>
                <div className="service-item-new">
                    <img src={safeSecure} alt="Real-Time Tracking" className="service-icon-new" />
                    <h3>Real-Time Tracking</h3>
                    <p>Track your orders in real-time with our advanced system.</p>
                </div>
                <div className="service-item-new">
                    <img src={instantPickup} alt="Real-Time Tracking" className="service-icon-new" />
                    <h3>Real-Time Tracking</h3>
                    <p>Track your orders in real-time with our advanced system.</p>
                </div>
            </div>
            
            <div className="about-us">
                <h2>Remaining</h2>
            </div>
        </div>
    );
}

export default About;
