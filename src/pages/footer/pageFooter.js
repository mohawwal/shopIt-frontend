import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import bankCard from "../../assets/images/paystackCards.png"
import WhatsappBlack from "../../assets/svg/whatsappBlack";
import Ig from "../../assets/svg/ig";
import Portfolio from "../../assets/svg/portfolio";

const PageFooter = () => {
	const location = useLocation();

	const [footerStyle, setFooterStyle] = useState("footerHome");

	useEffect(() => {
		let footerClass = "footerHome";

		if (location.pathname === "/") {
			footerClass = "footerNone";
		} else if (location.pathname === "/register") {
			footerClass = "footerNone";
		} else if (location.pathname === "/login") {
			footerClass = "footerNone";
		} else if (location.pathname.startsWith("/me")) {
			footerClass = "footerNone";
		} else if (location.pathname.startsWith("/password")) {
			footerClass = "footerNone";
		} else if (location.pathname.startsWith("/order")) {
			footerClass = "footerNone";
		} else if (location.pathname.startsWith("/dashboard")) {
			footerClass = "footerNone";
		} else if (location.pathname.startsWith("/wishlist")) {
			footerClass = "footerNone";
		} else if (location.pathname.startsWith("/payment")) {
			footerClass = "footerNone";
		} else if (location.pathname === "/shop") {
			footerClass = "footerNone";
		} else if (location.pathname === "/shipping") {
			footerClass = "footerNone";
		} else if (location.pathname === "/cart") {
			footerClass = "footerNone";
		} else if (location.pathname.startsWith("/admin")) {
			footerClass = "footerNone";
		} else if (location.pathname === "/product/:id/reviews") {
			footerClass = "footerNone";
		}

		setFooterStyle(footerClass);
	}, [footerStyle, location.pathname]);
	return (
		<div className={`pageFooter ${footerStyle}`}>
			<div className="pages">
				<div className="signPageFooter">SIGN UP FOR DISCOUNTS & UPDATES</div>
				<div className="pageInput">
					<input
						type="text"
						placeholder="Enter your phone number or email address"
					/>
					<button>Subscribe</button>
				</div> 
				<div className="pageMiddle">
					<p>Return Policy</p>
					<span>
						<h4>CONTACT US</h4>
						<span>08159124775</span>
						<span>Lagos, Nigeria</span>
						<div className="payIcons">
							<img src={bankCard} alt="" />
						</div>
						<Link to='https://awwal-portfolio.vercel.app/CONTACT' className="socialsIcons">
							<WhatsappBlack className="appIcons" />
							<Ig className="socialIcons" />
							<Portfolio className="portIcon" />
						</Link>
					</span>
					
				</div>
                <div className="pageDown">Thank You For Shopping With Zarmario❤️</div>
			</div>
		</div>
	);
};

export default PageFooter;
