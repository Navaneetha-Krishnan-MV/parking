

// import React from "react";
// import videobg from "./Resources/homebg1.mp4"
// import "./Resources/styles/Home.css";
// import image1 from "./Resources/What-is-a-Smart-Parking-System.png";
// import videobg2 from "./Resources/Nice-Video.mp4";
// import carscooty from "./Resources/CarScooty.gif";
// // import parkingicons from "./Resources/parking-icon1.png";
// import roadcar from "./Resources/Roadforcar.gif";
// import rightimg from "./Resources/leftaligned.png";
// import o from "./Resources//Aboutimages/book.png";

// import AOS from 'aos';
// import 'aos/dist/aos.css';
//  // You can also use <link> for styles
// // ..



// // import toggleImage from ''; // Import your images
// // import cpuImage from '';
// // import toolsImage from '';

// function HomeBody(){

//   React.useEffect(() => {
//     const handleScroll = () => {
//       const text = document.getElementById('text');
//       const video = document.querySelector('.homebody video');
//       let value = window.scrollY;
//       let maxScroll = video.getBoundingClientRect().height - text.getBoundingClientRect().height;
//       text.style.marginTop = Math.min(value * 2.5, maxScroll) + 'px';
//     };

//     window.addEventListener('scroll', handleScroll);

//     // Cleanup the event listener on component unmount
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);
 
//   AOS.init();
  
//   return (
  
//     <div id="totalhome">
//     <div className="homebody">
//       <div className="overlay"></div>
//       <video src={videobg} autoPlay loop muted  />
//       <div className="content">
//         <h1 id="text">Smart Parking Solution</h1>
//       </div>
//     </div>







//     <div class="heroes">
//         <h1 class="heroes__title " data-aos="zoom-in-up"  data-aos-duration="2000">Find Your Perfect Parking Spot</h1>
//         <br />
//          <div class="heroes__content">
//              <p class="heroes__lead font-sans"  data-aos="zoom-in-up"  data-aos-duration="2000">
//               <ul className="font-sans">
//                 Book parking slots easily and quickly with our user-friendly platform.
//                 Enjoy seamless navigation, real-time availability, and secure payments.
//                 Make your parking experience hassle-free with just a few clicks!
//               </ul>
//               </p>
//          </div>
//          <div class="heroes__image-container"  data-aos="zoom-in"  data-aos-duration="1000">
//            <img src={image1} alt="Example img" class="heroes__responsive-image"/>
//          </div>
//     </div> 


  



//     <div className="center-container">
//             <div className="text-section">
//                 <h1>Find, book <br></br>a parking spot <span className="highlight">Easily</span></h1>
//                 <p>Get a car wherever and whenever you need it with your iOS and Android device.</p>
//                 <div className="app-buttons">
//                     <button className="app-button" id="googleplay">Get it on Google Play</button>
//                     <button className="app-button" id="appstore">Download on the App Store</button>
//                 </div>
//             </div>
            
//                 <img src={o} alt="Car" id="blue" />
//                 </div>



//     <div className="video-background-container" data-aos="zoom-in"  data-aos-duration="2000">
//       <video src={videobg2} autoPlay loop muted id="videotwo" />
//     </div>

//     <div class="jumbotron">
//     <div class="content-container">
//       <br />
//       <br />
//       <h1 class="title" data-aos="zoom-out"  data-aos-duration="2000">Book Your Parking Spot with Ease!</h1>
//       <br />
//       <p class="lead-text" data-aos="zoom-out"  data-aos-duration="2000">
//       Welcome to ParkPurams's Vehicle Parking Booking System. Finding the perfect parking spot has never been easier! Whether you’re planning a visit to the city, heading to an event, or just need a reliable spot for your daily commute, our user-friendly booking system ensures you get the parking space you need without any hassle.
//       </p>
//     </div>
//     </div>
//     <div id="over" data-aos=""  data-aos-duration="2000">
//     <div class="carsc">
//     <img src={carscooty} alt="moving car" id="moving-car" />
// </div></div>


//     <div class="carsc" data-aos=""  data-aos-duration="3000">
//         <img src={roadcar} alt="road car" id="moving-road" />
//     </div>
    
//     <br />
//     <br />
//     <br />

//     <div className="container" id="hanging-icons">
//         <div className="icon-row">
//         <div className="icon-col">
//           {/* <div className="icon-box">
//              <img src={toggleImage}  className="icon" />
//            </div> */}
//            <div className="icon-content"  data-aos="fade-up"  data-aos-duration="2000">
//              <h3 className="icon-title " id="need">Track Bookings functionality</h3>
//              <p className="icon-text">
//                <ul>
//                <li>Keep tabs on all your parking spot bookings effortlessly.</li>
//                <li>Easily monitor how many spots are currently reserved</li>
//                <li>Stay updated with real-time booking information.</li>
//              </ul>
//              </p>
//            </div>
//         </div>
//          <div className="icon-col">           {/* <div className="icon-box">
//              <img src={cpuImage}  className="icon" />
//            </div> */}
//            <div className="icon-content">
//              <h3 className="icon-title" data-aos="fade-down"  data-aos-duration="2000">User-Friendly Access</h3>
//              <p className="icon-text">               <ul  data-aos="fade-down"  data-aos-duration="2000">
//                  <li>
//             Log in or sign up with just a few clicks.</li>
//             <li>Our interface ensures a smooth and quick user experience.</li>
//              <li>Enjoy secure and hassle-free account management.</li>
//              </ul>
//              </p>
//            </div>
//        </div>
//         <div className="icon-col">
//            {/* <div className="icon-box">
//              <img src={toolsImage}  className="icon" />
//            </div> */}
//            <div className="icon-content" >
//              <h3 className="icon-title" data-aos="fade-up"  data-aos-duration="2000" >Smart Parking Reservations</h3>             <p className="icon-text">
//                <ul data-aos="fade-up"  data-aos-duration="2000">
//              <li>Find and book your ideal parking spot with our filtering options.</li><li>Customize your search to meet your parking needs perfectly.</li><li>Experience a convenient and efficient reservation process.</li>
//              </ul>             </p>
//            </div>
//          </div>
//        </div>
//      </div>

//     <div class="main-container">
//     <div class="hero-section">
//       <div class="image-container" data-aos="fade-left"  data-aos-duration="2200">
//         <img src={rightimg} class="responsive-image" alt="Bootstrap Themes"/>
//       </div>
//       <div data-aos="fade-right"  data-aos-duration="2200" class="text-container">
//         <h1 class="hero-title">Why Choose Us?</h1>
//         <p class="hero-description">Find and book parking from the comfort of your home or on the go. Our intuitive platform ensures you can secure a spot anytime, anywhere. Choose from a range of parking options to fit your needs and budget, whether you need short-term or long-term parking. Safe and well-lit parking facilities ensure your vehicle is protected 24/7. Say goodbye to the stress of finding parking with our flexible and secure solutions tailored to suit every requirement.</p>
//       </div>
//     </div>
//     </div>
    

//   </div>
//   );
// }

// export default HomeBody;

import React from "react";
import videobg from "./Resources/homebg1.mp4"
import "./Resources/styles/Home.css";
import image1 from "./Resources/What-is-a-Smart-Parking-System.png";
import videobg2 from "./Resources/Nice-Video.mp4";
import carscooty from "./Resources/CarScooty.gif";
// import parkingicons from "./Resources/parking-icon1.png";
import roadcar from "./Resources/Roadforcar.gif";
import rightimg from "./Resources/leftaligned.png";
import o from "./Resources//Aboutimages/book.png";
import op from "./Resources//Aboutimages/hservice.png";
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
           <img src={image1} alt="Example img" class="heroes__responsive-image"/>
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

    <div class="jumbotron">
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
    <div class="carsc">
    <img src={carscooty} alt="moving car" id="moving-car" />
</div></div>


    <div class="carsc" data-aos=""  data-aos-duration="3000">
        <img src={roadcar} alt="road car" id="moving-road" />
    </div>








    

    <div className="container mx-auto p-6 flex flex-wrap" id="full">
      <div className="left-section w-full md:w-7/12 pr-4">
        <h1 className="text-5xl font-bold mb-6"  data-aos="zoom-out"  data-aos-duration="1500" >Your Opinion</h1>
       
        <div className="black-box bg-gray-800 text-white p-6 rounded-lg mt-6 relative">
          <img src={CarIcon} alt="Car Icon" className="mb-4 mx-auto" />
          <h2 className="text-2xl font-semibold mb-4">Parking space seekers</h2>
          <p className="text-lg">
            A parking space seeker can find parking immediately or schedule it for later. When registering, users provide vehicle type information. They can register multiple vehicles. To start a session, seekers simply enter the desired duration and select a vehicle if they have more than one.
          </p>

        
          <div className="max-w-lg mx-auto p-6 bg-gray-900 rounded-lg mt-10">
            <h2 className="text-2xl font-bold text-center text-gray-300 mb-4">We Value Your Feedback</h2>
            <p className="text-center text-gray-400 mb-6">Please let us know how we can improve our service.</p>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 w-full border border-gray-600 rounded-md bg-gray-800 text-gray-300"
                  placeholder="your-email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-300">Your Feedback</label>
                <textarea
                  id="feedback"
                  name="feedback"
                  rows="4"
                  className="mt-1 p-2 w-full border border-gray-600 rounded-md bg-gray-800 text-gray-300"
                  placeholder="Your feedback message"
                  required
                />
              </div>
              
              <div>
                <button
                  type="button"
                  className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                  disabled
                >
                  Send Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
        

      </div>
      

      <div className="grey-box bg-gray-100 text-center p-6 rounded-lg w-full md:w-5/12 mt-6 md:mt-0" >
        <img src={ParkingIcon} alt="Parking Icon" className="mb-4 mx-auto" />
        <h2 className="text-2xl font-semibold mb-4">Parking space providers</h2>
        <p className="text-lg text-gray-700 mb-6">A person can be both a space provider and a parking seeker. To offer a space, he simply enters details like the address, allowed vehicle types, availability of a charging station, and other amenities within the app.</p>
        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300">Get Started</button>
      </div>
    </div>



    <div className="bg-blue-500 text-white p-6 rounded-lg border border-blue-700" id="bluediv">
  <p className="text-lg text-gray-200 mb-6" id="bluepara">
    The goal of the app is to connect individuals who would like to rent out their unused parking space (parking space providers) with drivers who are looking for a parking space (parking space seekers).
  </p>
  <button id="more" class="text-2xl font -bold" > More info </button>
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