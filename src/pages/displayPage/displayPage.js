import React from "react";
import MetaData from "../../components/layouts/MetaData";
import Home from "../home/home";
import Middle from "../middle/middle";
import AllProductsHome from "../allProductsHome/allProductsHome";
import AllHomeCategory from "../allProductsHome/allHomeCategory";
import { motion } from "framer-motion";
import "./displayPage.css";
import waIcon from '../../assets/images/waIcon.png'
import Footer from "../footer/footer";

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
				duration: 55,
				ease: "linear",
			},
		},
	};

	return (
		<div>
			<MetaData title="Zarmario Shop" />
			<div className="displayPage">
				<section className="HOMEPAGE">
					<Home />
				</section>
				<section className="PRODUCT_PAGE">
					<AllProductsHome />
				</section>
				<section>
					<div className="marioText">
						<motion.div
							variants={sliderVariants}
							initial="initial"
							animate="animate"
						>
							<p>
								Step into the world of ZARMARIO, where fashion meets
								exclusivity. Discover the ultimate collection of trendsetting
								styles that redefine elegance and elevate your wardrobe. At
								ZARMARIO, every piece tells a story of sophistication and
								flair—where the drip is real, and the light never fades. Embrace
								the essence of luxury and let your fashion speak volumes. Wear
								ZARMARIO, where every look is a masterpiece in the making.
							</p>
						</motion.div>
						<div className="mTB"></div>
					</div>
					<div className="allHomeCategoryFile">
						<AllHomeCategory />
					</div>
				</section>
				<Middle />
				<footer>
					{/* <PageFooter /> */}
					<Footer />
				</footer>
				<div
					className="whatsapp"
				>
					<a target="_blank" rel="noreferrer noopener" href="https://wa.me/+2348159124775">
						<img src={waIcon} alt="" className="waIconImg" />
					</a>
				</div>
			</div>
		</div>
	);
};

export default DisplayPage;
