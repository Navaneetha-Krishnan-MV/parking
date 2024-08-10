import React from "react";
import videobg from "./Resources/homebg1.mp4"
import "./Resources/styles/Home.css";
import image1 from "./Resources/What-is-a-Smart-Parking-System.png";
import videobg2 from "./Resources/Nice-Video.mp4";
import carscooty from "./Resources/CarScooty.gif";
// import parkingicons from "./Resources/parking-icon1.png";
import roadcar from "./Resources/Roadforcar.gif";
import rightimg from "./Resources/leftaligned.png";
import AOS from 'aos';
import 'aos/dist/aos.css';
 // You can also use <link> for styles
// ..



// import toggleImage from ''; // Import your images
// import cpuImage from '';
// import toolsImage from '';

function HomeBody(){

  React.useEffect(() => {
    const handleScroll = () => {
      const text = document.getElementById('text');
      const video = document.querySelector('.homebody video');
      let value = window.scrollY;
      let maxScroll = video.getBoundingClientRect().height - text.getBoundingClientRect().height;
      text.style.marginTop = Math.min(value * 2.5, maxScroll) + 'px';
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
 
  AOS.init();
  
  return (
  
    <div id="totalhome">
    <div className="homebody">
      <div className="overlay"></div>
      <video src={videobg} autoPlay loop muted  />
      <div className="content">
        <h1 id="text">Smart Parking Solution</h1>
      </div>
    </div>

    <div class="heroes">
        <h1 class="heroes__title" data-aos="zoom-in-up"  data-aos-duration="2000">Find Your Perfect Parking Spot</h1>
        <br />
         <div class="heroes__content">
             <p class="heroes__lead"  data-aos="zoom-in-up"  data-aos-duration="2000">
              <ul>
                Book parking slots easily and quickly with our user-friendly platform.
                Enjoy seamless navigation, real-time availability, and secure payments.
                Make your parking experience hassle-free with just a few clicks!
              </ul>
              </p>
         </div>
         <div class="heroes__image-container"  data-aos="zoom-in"  data-aos-duration="1000">
           <img src={image1} alt="Example img" class="heroes__responsive-image"/>
         </div>
    </div> 

    <div className="container" id="hanging-icons">
      <h2 className="section-title"  data-aos="fade-right"  data-aos-duration="2000">Welcome to ParkPuram</h2>
      <div className="icon-row">
        <div className="icon-col">
          {/* <div className="icon-box">
            <img src={toggleImage}  className="icon" />
          </div> */}
          <div className="icon-content"  data-aos="fade-up"  data-aos-duration="2000">
            <h3 className="icon-title" id="need">Track Bookings functionality</h3>
            <p className="icon-text">
              <ul>
              <li>Keep tabs on all your parking spot bookings effortlessly.</li>
              <li>Easily monitor how many spots are currently reserved</li>
              <li>Stay updated with real-time booking information.</li>
            </ul>
            </p>
          </div>
        </div>
        <div className="icon-col">
          {/* <div className="icon-box">
            <img src={cpuImage}  className="icon" />
          </div> */}
          <div className="icon-content">
            <h3 className="icon-title" data-aos="fade-down"  data-aos-duration="2000">User-Friendly Access</h3>
            <p className="icon-text">
              <ul  data-aos="fade-down"  data-aos-duration="2000">
                <li>
            Log in or sign up with just a few clicks.</li>
            <li>Our interface ensures a smooth and quick user experience.</li>
            <li>Enjoy secure and hassle-free account management.</li>
            </ul>
            </p>
          </div>
        </div>
        <div className="icon-col">
          {/* <div className="icon-box">
            <img src={toolsImage}  className="icon" />
          </div> */}
          <div className="icon-content" >
            <h3 className="icon-title"data-aos="fade-up"  data-aos-duration="2000" >Smart Parking Reservations</h3>
            <p className="icon-text">
              <ul data-aos="fade-up"  data-aos-duration="2000">
            <li>Find and book your ideal parking spot with our filtering options.</li><li>Customize your search to meet your parking needs perfectly.</li><li>Experience a convenient and efficient reservation process.</li>
            </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <div className="video-background-container" data-aos="zoom-in"  data-aos-duration="2000">
      <video src={videobg2} autoPlay loop muted id="videotwo" />
    </div>

    <div class="jumbotron">
    <div class="content-container">
      <h1 class="title" data-aos="zoom-out"  data-aos-duration="2000">Book Your Parking Spot with Ease!</h1>
      <br />
      <p class="lead-text" data-aos="zoom-out"  data-aos-duration="2000">
      Welcome to ParkPurams's Vehicle Parking Booking System. Finding the perfect parking spot has never been easier! Whether you’re planning a visit to the city, heading to an event, or just need a reliable spot for your daily commute, our user-friendly booking system ensures you get the parking space you need without any hassle.
      </p>
    </div>
    </div>
    <div id="over" data-aos=""  data-aos-duration="2000">
    <div class="carsc">
    <img src={carscooty} alt="moving car" id="moving-car" />
</div></div>


    <div class="carsc" data-aos=""  data-aos-duration="3000">
        <img src={roadcar} alt="road car" id="moving-road" />
    </div>
  

    <div class="main-container">
    <div class="hero-section">
      <div class="image-container" data-aos="fade-left"  data-aos-duration="2200">
        <img src={rightimg} class="responsive-image" alt="Bootstrap Themes"/>
      </div>
      <div data-aos="fade-right"  data-aos-duration="2200" class="text-container">
        <h1 class="hero-title">Why Choose Us?</h1>
        <p class="hero-description">Find and book parking from the comfort of your home or on the go. Our intuitive platform ensures you can secure a spot anytime, anywhere. Choose from a range of parking options to fit your needs and budget, whether you need short-term or long-term parking. Safe and well-lit parking facilities ensure your vehicle is protected 24/7. Say goodbye to the stress of finding parking with our flexible and secure solutions tailored to suit every requirement.</p>
      </div>
    </div>
    </div>
    

  </div>
  );
}

export default HomeBody;