import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import womanImg from "../../assets/images/image12.jpg";
import manImg from "../../assets/images/image4.jpg";

const home = () => {
	return (
		<div className="home">
			<div className="homeImgFile">
				<div className="homeImg her">
					<img
						src={manImg}
						alt="man-img"
					/>
					<div className="blur blur-woman">
						<Link
							className="Link"
							to="/products/men"
						>
							<div>MEN</div>
						</Link>
					</div>
				</div>
				<div className="homeImg him">
					<img
						src={womanImg}
						alt="woman-img"
					/>
					<div className="blur blur-man">
						<Link
							className="Link"
							to="/products/women"
						>
							<div>WOMEN</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default home;
