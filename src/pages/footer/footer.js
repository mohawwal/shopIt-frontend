import React from 'react'
import './footer.css'

const Footer = () => {
    
    
  return (
    <div className={`footer`}>
        <div className='knowText'>BE THE FIRST TO KNOW!</div>
        <div className='footer-input'>
            <div className='side-line'></div>
            <div className='inputBtn'>
                <input type="text" placeholder='Enter your email now' />
                <button>SIGN UP</button>
            </div>
            <div className='side-line'></div>
        </div>
        <div className='footerBox'>
            <div className='topicTitle'>
                <div>MY ACCOUNT</div>
                <ul>
                    <li>My Account</li>
                    <li>Order History</li>
                    <li>Wishlist</li>
                    <li>Register</li>
                </ul>
            </div>
            <div className='topicTitle'>
                <div>CUSTOMER SERVICE</div>
                <ul>
                    <li>About US</li>
                    <li>Help Center</li>
                    <li>How to shop on Zarmario</li>
                    <li>Size Guide</li>
                    <li>Return & Privacy</li>
                    <li>Policy</li>
                    <li>Terms and Conditions</li>
                </ul>
            </div>
            <div className='topicTitle'>
                <div>OUR SERVICES</div>
                <ul>
                    <li>Sell on Zarmario</li>
                    <li>Branding & Production</li>
                    <li>Become an Affiliate</li>
                    <li>Request Personal</li>
                    <li>Stylish</li>
                    <li>Earn with us</li>
                    <li>Bulk Purchase & Order</li>
                </ul>
            </div>
            <div className='topicTitle'>
                <div>CONTACT US</div>
                <ul>
                    <li>
                        Lorem ipsum dolor sit amet consecteturipsam
                         dolor illo incidunt. Impedit aut cumque 
                         sed sequi alias.
                    </li>
                    <li>
                        <span>+2345678901</span> (Call & WhatsApp)
                    </li>
                    <li>zarmario@gmail.com</li>
                    <li>frontend@gmail.com</li>
                </ul>
            </div>
        </div>

        <div>
            <ul>
                <li>

                </li>
            </ul>
        </div>
    </div>
  )
}

export default Footer;
