import React from "react";
import MetaData from "../../components/layouts/MetaData";
import Home from "../home/home";
import Middle from "../middle/middle";
import AllProductsHome from "../allProductsHome/allProductsHome";
import AllHomeCategory from "../allProductsHome/allHomeCategory";
import { motion } from "framer-motion";

const DisplayPage = () => {
	const sliderVariants = {
		initial: {
			x: "100%",
		},
		animate: {
			x: "-100%",
			transition: {
				repeat: Infinity,
				repeatType: "loop",
				duration: 1,
				ease: "linear", 
			},
		},
	};

	return (
		<div>
			<MetaData title="Zarmario Shop" />
			<div className="displayPage">
				<Home />
				<AllProductsHome />
				<div className="marioText">
					<motion.div
						variants={sliderVariants}
						initial="initial"
						animate="animate"
					>
						<p>ZARMARIO!!! HOME OF EXCLUSIVE FASHIONABLE WEARS - WHERE MARIO THERE'S DRIP - WEAR MARIO THERE'S LIGHT.</p>
					</motion.div>
					<div className="mTB"></div>
				</div>
				<div className="allHomeCategoryFile">
					<AllHomeCategory />
				</div>
				<Middle />
			</div>
		</div>
	);
};

export default DisplayPage;
