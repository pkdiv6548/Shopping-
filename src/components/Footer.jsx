import {Link} from "react-router-dom";
export default function Footer(){return <footer className="site-footer">
 <div className="footer-news"><div><small>THE ATELIER EDIT</small><h2>New arrivals, stories and member access.</h2></div><Link className="outline-btn" to="/newsletter">Join newsletter</Link></div>
 <div className="footer-grid">
  <div><b>Shop</b><Link to="/category/Women">Women</Link><Link to="/category/Men">Men</Link><Link to="/category/Kids">Kids</Link><Link to="/category/Beauty">Beauty</Link><Link to="/category/Home">Home</Link><Link to="/category/Sale">Sale</Link></div>
    <div><b>Help</b><Link to="/support">Help centre</Link><Link to="/faq">FAQ</Link><Link to="/track-order">Track order</Link><Link to="/returns-policy">Returns</Link><Link to="/shipping-policy">Shipping</Link><Link to="/contact">Contact us</Link></div>
  <div><b>About</b><Link to="/about">About Atelier</Link><Link to="/sustainability">Sustainability</Link><Link to="/editorial">Editorial</Link><Link to="/careers">Careers</Link><Link to="/press">Press</Link><Link to="/stores">Stores</Link></div>
  <div><b>Legal</b><Link to="/privacy-policy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/cookie-policy">Cookies</Link><Link to="/disclaimer">Disclaimer</Link><Link to="/accessibility">Accessibility</Link><Link to="/pricing-policy">Pricing</Link></div>
 </div>
 <div className="footer-bottom"><span>© 2026 Atelier Commerce Demo</span><span>India · INR · English</span><Link to="/admin">Admin demo</Link></div>
</footer>}
