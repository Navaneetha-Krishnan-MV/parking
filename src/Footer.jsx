import React from "react";
import "./Resources/styles/Footer.css"
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

 // You can also use <link> for styles
// ..

function Footer(props){
    
  AOS.init();
    return(
        <div class="row animate-start" id="footerbg">
 

  <div  class="column">
    <h5>Company</h5>
    <ul class="nav">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="" className="nav-link">Help-Center</Link></li>
          <li><Link to="" className="nav-link">Terms of service</Link></li>
          <li><Link to="" className="nav-link">Licenses</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
    </ul>
    
                        
                       
  </div>

  <div  class="newsletter">
    <form id= "fill">
      <h5>Register your parking</h5>
      <p id= "like-text">If you like to contribute our website by making use of your free space.Fill the details in the provided Google Form</p>
      <div class="input-group" id="register">
        <a id="register-but" href="https://docs.google.com/forms/d/e/1FAIpQLScpuO0DkUJgNaqGH7pM_KmuEklpAe4c2cRNPMlX3CHouJzCbg/viewform?usp=sf_link"><button type="button"  id= "fill1">Register Now</button></a>
      </div>
    </form>
  </div>
</div>
        
      
    );
}
export default Footer;