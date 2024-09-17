// import React from "react";
// import "./Resources/styles/Footer.css"
// import { Link } from 'react-router-dom';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

//  // You can also use <link> for styles
// // ..

// function Footer(props){
    
//   AOS.init();
//     return(
//         <div class="row animate-start" id="footerbg">
 

//   <div  class="column">
//     <h5>Company</h5>
//     <ul class="nav">
//           <li><Link to="" className="nav-link">Home</Link></li>
//           <li><Link to="" className="nav-link">Help-Center</Link></li>
//           <li><Link to="" className="nav-link">Terms of service</Link></li>
//           <li><Link to="" className="nav-link">Licenses</Link></li>
//           <li><Link to="/about" className="nav-link">About</Link></li>
//     </ul>
    
                        
                       
//   </div>

//   <div  class="newsletter">
//     <form id= "fill">
//       <h5>Register your parking</h5>
//       <p id= "like-text">If you like to contribute our website by making use of your free space.Fill the details in the provided Google Form</p>
//       <div class="input-group" id="register">
//         <a id="register-but" href="https://docs.google.com/forms/d/e/1FAIpQLScpuO0DkUJgNaqGH7pM_KmuEklpAe4c2cRNPMlX3CHouJzCbg/viewform?usp=sf_link"><button type="button"  id= "fill1">Register Now</button></a>
//       </div>
//     </form>
//   </div>
// </div>
        
      
//     );
// }
// export default Footer;
import React from "react";
import "./Resources/styles/Footer.css";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Footer() {

  AOS.init();

 

  const scrollToTopSlow = () => {
    const scrollDuration = 1500; // Duration of the scroll in milliseconds (2 seconds)
    const scrollStep = -window.scrollY / (scrollDuration / 15);
    let scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
        } else {
            clearInterval(scrollInterval);
        }
    }, 15);
};

// Call scrollToTopSlow to scroll slowly to the top


  return (
    <div className="row animate-start" id="footerbg">
      <div className="column">
        <h5>Parkpuram</h5>
        <ul className="nav">
          <li><Link to="/" className="nav-link" onClick={scrollToTopSlow}>Home</Link></li>
          <li><Link to="/Help" className="nav-link" onClick={scrollToTopSlow}> Help-Center</Link></li>
          <li><Link to="/TermsandServices" className="nav-link" onClick={scrollToTopSlow}>Terms of service</Link></li>
          {/* <li><Link to="/licenses" className="nav-link">Licenses</Link></li> */}
          <li><Link to="/About" className="nav-link" onClick={scrollToTopSlow}>About</Link></li>
        </ul>
      </div>

      <div className="newsletter">
        <form id="fill">
          <h5>Register your parking</h5>
          <p id="like-text">If you like to contribute to our website by making use of your free space. Fill the details in the provided Google Form</p>
          <div className="input-group" id="register">
            <a id="register-but" href="https://docs.google.com/forms/d/e/1FAIpQLScpuO0DkUJgNaqGH7pM_KmuEklpAe4c2cRNPMlX3CHouJzCbg/viewform?usp=sf_link">
              <button type="button" id="fill1">Register Now</button>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Footer;
