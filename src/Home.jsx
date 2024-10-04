
import React from "react";

import "./Resources/styles/Home.css";
import image1 from "./Resources/What-is-a-Smart-Parking-System.png";
import startimg from "./Resources/Aboutimages/threegraphics.png";
import videobg2 from "./Resources/Nice-Video.mp4";
// import parkingicons from "./Resources/parking-icon1.png";
// import roadcar from "./Resources/Roadforcar.gif";
import rightimg from "./Resources/leftaligned.png";
import o from "./Resources//Aboutimages/book.png";
import op from "./Resources//Aboutimages/hservice.png";
// import up from "./Resources//Aboutimages/book.png";

import CarIcon from './Resources/Aboutimages/aboutright.webp'; // Assuming you have a car icon SVG file
import ParkingIcon from './Resources/Aboutimages/aboutright.webp'; // Assuming you have a car icon SVG file



import AOS from 'aos';
import 'aos/dist/aos.css';
 // You can also use <link> for styles
// ..



// import toggleImage from ''; // Import your images
// import cpuImage from '';
// import toolsImage from '';

function HomeBody(){

  
  AOS.init();
  
  return (
  
    <div id="totalhome">
     <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gray-200 text-gray-800 min-h-screen" id="firsthome">
      <div className="text-center md:text-left max-w-md md:w-1/2 ml-9">
        <h1 className="text-6xl font-extrabold mb-4 text-gray-900">
          ParkPuram
        </h1>
        <p className="text-xl mb-6 text-gray-700">
          Your smart parking solution, making parking easier and more efficient.
        </p>
        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
          Go HERE
        </button>
      </div>
      <div className="w-full md:w-1/2 mt-6 md:mt-0">
        <img
          src={image1}
          alt="Parking Illustration"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
    </div>







    <div class="heroes">
        <h1 class="heroes__title " data-aos="zoom-in-up"  data-aos-duration="2000">Find Your Perfect Parking Spot</h1>
        <br />
         <div class="heroes__content">
             <p class="heroes__lead font-sans"  data-aos="zoom-in-up"  data-aos-duration="2000">
              <ul className="font-sans">
                Book parking slots easily and quickly with our user-friendly platform.
                Enjoy seamless navigation, real-time availability, and secure payments.
                Make your parking experience hassle-free with just a few clicks!
              </ul>
              </p>
         </div>
         <div class="heroes__image-container"  data-aos="zoom-in"  data-aos-duration="1000">
           <img src={startimg} alt="Example img" class="heroes__responsive-image"/>
         </div>
    </div> 



    <div className="heroes1">
            <h2 className="title" data-aos="fade-down-right"  data-aos-duration="1000">Why Andrew’s Airport Parking</h2>
            <p className="description" data-aos="fade-up-left"  data-aos-duration="1000">
                You may not have tried Andrew’s Airport Parking before, or haven’t traveled in a while. But when you do, you save our taxi fare at the airport on an advertisement and through gates with our fast and convenient service.
            </p>
            <div className="cards-container">
                <div className="card"  data-aos="flip-right"  data-aos-duration="2000">
                    <img src={op} alt="Service Icon" className="card-image" />
                    <h3 className="card-title">Top Service</h3>
                    <p className="card-description">
                        Experience seamless parking with Andrew’s and a courtesy shuttle that’ll make you arrive at the airport refreshed.
                    </p>
                </div>
                <div className="card " id="fsdiv"  data-aos="flip-right"  data-aos-duration="2000">
                    <img src={op} alt="Security Icon" className="card-image" />
                    <h3 className="card-title" id="iphead">Proven Security</h3>
                    <p className="card-description" id="ip">
                        Security is paramount at Andrew’s, with CCTV, secure perimeter & patrols, and a proven track record of safety.
                    </p>
                </div>
                <div className="card" data-aos="flip-right"  data-aos-duration="2000">
                    <img src={op} alt="Extra Mile Icon" className="card-image" />
                    <h3 className="card-title">That Extra Mile</h3>
                    <p className="card-description">
                        We go the extra mile with Andrew’s – offering extra services such as car washing, vacuuming, and more.
                    </p>
                </div>
            </div>
        </div>








    <div className="center-container">
            <div className="text-section">
                <h1  data-aos="zoom-out-left"  data-aos-duration="1500" >Find, book <br></br>and rent a car <span className="highlight">Easily</span></h1>
                <p   data-aos="zoom-out"  data-aos-duration="1500" >Get a car wherever and whenever you need it with your iOS and Android device.</p>
                <div className="app-buttons">
                    <button className="app-button" id="googleplay" data-aos="fade-right"  data-aos-duration="1000">Get it on Google Play</button>
                    <button className="app-button" id="appstore" data-aos="fade-left"  data-aos-duration="1000">Download on the App Store</button>
                </div>
            </div>
            
                <img src={o} alt="Car" id="blue"  data-aos="zoom-in"  data-aos-duration="1500"  />
    </div>






                <div class="features-section">
  <h1 class="features-heading"  data-aos="fade-down"  data-aos-duration="1500" >Features</h1>
  <p class="features-paragraph" data-aos="zoom-in"  data-aos-duration="1500">
    The goal of the app is to connect individuals who would like to rent out their unused parking space (parking space providers) with drivers who are looking for a parking space (parking space seekers).
  </p>
  <div class="features-container">
    <div class="feature-box seekers-box" id="card1" data-aos="flip-up"  data-aos-duration="1500">
      <div class="icon-container green-background">
        <img src={CarIcon} alt="Car Icon" class="icon" id="one" />
      </div>
      <h2 class="feature-heading">Parking space seekers</h2>
      <p class="feature-description">
        A parking space seeker can find parking immediately or schedule it for later. When registering, users provide vehicle type information. They can register multiple vehicles. To start a session, seekers simply enter the desired duration and select a vehicle if they have more than one.
      </p>
    </div>
    <div class="feature-box providers-box"  data-aos="flip-down"  data-aos-duration="1500">
      <div class="icon-container gray-background">
        <img src={ParkingIcon} alt="Parking Icon" class="icon"  id="two"/>
      </div>
      <h2 class="feature-heading">Parking space providers</h2>
      <p class="feature-description">
        A person can be both a space provider and a parking seeker. To offer a space, they simply enter details like the address, allowed vehicle types, availability of a charging station, and other amenities within the app.
      </p>
    </div>
   <br></br>

   <div class="feature-box seekers-box"  data-aos="flip-up"  data-aos-duration="1500">
      <div class="icon-container green-background">
        <img src={CarIcon} alt="Car Icon" class="icon" id="three"/>
      </div>
      <h2 class="feature-heading">Parking space seekers</h2>
      <p class="feature-description">
        A parking space seeker can find parking immediately or schedule it for later. When registering, users provide vehicle type information. They can register multiple vehicles. To start a session, seekers simply enter the desired duration and select a vehicle if they have more than one.
      </p>
    </div>

    
  </div>
</div>


















    <div className="video-background-container" data-aos="zoom-in"  data-aos-duration="2000">
      <video src={videobg2} autoPlay loop muted id="videotwo" />
    </div>

    <div class="jumbotron" >
    <div class="content-container">
      <br />
      <br />
      <h1 class="title" data-aos="zoom-out"  data-aos-duration="2000">Book Your Parking Spot with Ease!</h1>
      <br />
      <p class="lead-text" data-aos="zoom-out"  data-aos-duration="2000">
      Welcome to ParkPurams's Vehicle Parking Booking System. Finding the perfect parking spot has never been easier! Whether you’re planning a visit to the city, heading to an event, or just need a reliable spot for your daily commute, our user-friendly booking system ensures you get the parking space you need without any hassle.
      </p>
    </div>
    </div>
    <div id="over" data-aos=""  data-aos-duration="2000">
    </div>


    {/* <div class="carsc" data-aos=""  data-aos-duration="3000">
        <img src={roadcar} alt="road car" id="moving-road" />
    </div> */}









    <div className="bg-gray-900 mt-40 text-white py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8">
          We Take Pride in Our Numbers
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          <div>
            <p className="text-5xl font-bold text-red-400">15</p>
            <p className="mt-2">Years of Experience</p>
          </div>
          
          <div>
            <p className="text-5xl font-bold text-red-400">10K</p>
            <p className="mt-2">Business Partners</p>
          </div>
          
          {/* <div>
            <p className="text-5xl font-bold text-red-400">25M</p>
            <p className="mt-2">Products Installed</p>
          </div> */}
          
          <div>
            <p className="text-5xl font-bold text-red-400">22</p>
            <p className="mt-2">Countries Worldwide</p>
          </div>
          
          <div>
            <p className="text-5xl font-bold text-red-400">5</p
          >
            <p className="mt-2">Industry Awards</p>
          </div>
        </div>
      </div>
    </div>








    <div className="bg-gray-800 text-white min-h-screen flex flex-col justify-center items-center" id="move">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 animate-shine bg-gradient-to-l from-gray-700 via-white to-gray-700 bg-[length:300%] bg-clip-text text-transparent">
          Manage Your Parking Spaces Efficiently
        </h1>
        <p className="text-lg mb-12">
          Optimize and modernize your parking facility with our cutting-edge solutions. Simplify vehicle management and provide a seamless experience for your customers.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-700 p-6 rounded-lg">
            <div className="text-blue-500 text-3xl mb-4 animate-bounce">
              🚗
            </div>
            <h2 className="text-xl font-semibold mb-2">Smart Parking Systems</h2>
            <p>
              Implement intelligent parking systems that reduce congestion and improve the overall flow of vehicles.
            </p>
          </div>
          
          <div className="bg-gray-700 p-6 rounded-lg">
            <div className="text-red-500 text-3xl mb-4 animate-bounce">
              📊
            </div>
            <h2 className="text-xl font-semibold mb-2">Analytics & Optimization</h2>
            <p>
              Gain insights into parking patterns and optimize space utilization for better efficiency.
            </p>
          </div>
          
          <div className="bg-gray-700 p-6 rounded-lg">
            <div className="text-green-500 text-3xl mb-4 animate-bounce">
              📱
            </div>
            <h2 className="text-xl font-semibold mb-2">Mobile App Integration</h2>
            <p>
              Allow users to find, reserve, and pay for parking spaces with ease using our mobile app integration.
            </p>
          </div>
          
          <div className="bg-gray-700 p-6 rounded-lg">
            <div className="text-yellow-500 text-3xl mb-4 animate-bounce">
              🚀
            </div>
            <h2 className="text-xl font-semibold mb-2">Fast Entry & Exit</h2>
            <p>
              Use automated systems for quick entry and exit, reducing wait times and improving customer satisfaction.
            </p>
          </div>
        </div>
      </div>
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