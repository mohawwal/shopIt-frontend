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
				repeatType: "mirror",
				duration: 25,
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
						<p>Step into the world of ZARMARIO, where fashion meets exclusivity. Discover the ultimate collection of trendsetting styles that redefine elegance and elevate your wardrobe. At ZARMARIO, every piece tells a story of sophistication and flair—where the drip is real, and the light never fades. Embrace the essence of luxury and let your fashion speak volumes. Wear ZARMARIO, where every look is a masterpiece in the making.</p>
						<p>Step into the world of ZARMARIO, where fashion meets exclusivity. Discover the ultimate collection of trendsetting styles that redefine elegance and elevate your wardrobe. At ZARMARIO, every piece tells a story of sophistication and flair—where the drip is real, and the light never fades. Embrace the essence of luxury and let your fashion speak volumes. Wear ZARMARIO, where every look is a masterpiece in the making.</p>
						<p>Step into the world of ZARMARIO, where fashion meets exclusivity. Discover the ultimate collection of trendsetting styles that redefine elegance and elevate your wardrobe. At ZARMARIO, every piece tells a story of sophistication and flair—where the drip is real, and the light never fades. Embrace the essence of luxury and let your fashion speak volumes. Wear ZARMARIO, where every look is a masterpiece in the making.</p>
						<p>Step into the world of ZARMARIO, where fashion meets exclusivity. Discover the ultimate collection of trendsetting styles that redefine elegance and elevate your wardrobe. At ZARMARIO, every piece tells a story of sophistication and flair—where the drip is real, and the light never fades. Embrace the essence of luxury and let your fashion speak volumes. Wear ZARMARIO, where every look is a masterpiece in the making.</p>
						<p>Step into the world of ZARMARIO, where fashion meets exclusivity. Discover the ultimate collection of trendsetting styles that redefine elegance and elevate your wardrobe. At ZARMARIO, every piece tells a story of sophistication and flair—where the drip is real, and the light never fades. Embrace the essence of luxury and let your fashion speak volumes. Wear ZARMARIO, where every look is a masterpiece in the making.</p>
						<p>Step into the world of ZARMARIO, where fashion meets exclusivity. Discover the ultimate collection of trendsetting styles that redefine elegance and elevate your wardrobe. At ZARMARIO, every piece tells a story of sophistication and flair—where the drip is real, and the light never fades. Embrace the essence of luxury and let your fashion speak volumes. Wear ZARMARIO, where every look is a masterpiece in the making.</p>
						<p>Step into the world of ZARMARIO, where fashion meets exclusivity. Discover the ultimate collection of trendsetting styles that redefine elegance and elevate your wardrobe. At ZARMARIO, every piece tells a story of sophistication and flair—where the drip is real, and the light never fades. Embrace the essence of luxury and let your fashion speak volumes. Wear ZARMARIO, where every look is a masterpiece in the making.</p>
						<p>Step into the world of ZARMARIO, where fashion meets exclusivity. Discover the ultimate collection of trendsetting styles that redefine elegance and elevate your wardrobe. At ZARMARIO, every piece tells a story of sophistication and flair—where the drip is real, and the light never fades. Embrace the essence of luxury and let your fashion speak volumes. Wear ZARMARIO, where every look is a masterpiece in the making.</p>
						<p>Step into the world of ZARMARIO, where fashion meets exclusivity. Discover the ultimate collection of trendsetting styles that redefine elegance and elevate your wardrobe. At ZARMARIO, every piece tells a story of sophistication and flair—where the drip is real, and the light never fades. Embrace the essence of luxury and let your fashion speak volumes. Wear ZARMARIO, where every look is a masterpiece in the making.</p>
						<p>Step into the world of ZARMARIO, where fashion meets exclusivity. Discover the ultimate collection of trendsetting styles that redefine elegance and elevate your wardrobe. At ZARMARIO, every piece tells a story of sophistication and flair—where the drip is real, and the light never fades. Embrace the essence of luxury and let your fashion speak volumes. Wear ZARMARIO, where every look is a masterpiece in the making.</p>
						<p>Step into the world of ZARMARIO, where fashion meets exclusivity. Discover the ultimate collection of trendsetting styles that redefine elegance and elevate your wardrobe. At ZARMARIO, every piece tells a story of sophistication and flair—where the drip is real, and the light never fades. Embrace the essence of luxury and let your fashion speak volumes. Wear ZARMARIO, where every look is a masterpiece in the making.</p>
						<p>Step into the world of ZARMARIO, where fashion meets exclusivity. Discover the ultimate collection of trendsetting styles that redefine elegance and elevate your wardrobe. At ZARMARIO, every piece tells a story of sophistication and flair—where the drip is real, and the light never fades. Embrace the essence of luxury and let your fashion speak volumes. Wear ZARMARIO, where every look is a masterpiece in the making.</p>
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
