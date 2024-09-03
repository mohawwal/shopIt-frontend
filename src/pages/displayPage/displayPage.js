import React, { useRef } from "react";
import MetaData from "../../components/layouts/MetaData";
import Home from "../home/home";
import Middle from "../middle/middle";
import AllProductsHome from "../allProductsHome/allProductsHome";
import AllHomeCategory from "../allProductsHome/allHomeCategory";
import { motion } from "framer-motion";
import "./displayPage.css";
import ReactWhatsapp from "react-whatsapp";
import Footer from "../footer/footer";
import WhatsApp from "../../assets/svg/whatsApp";

const DisplayPage = () => {
	const constraintsRef = useRef(null);

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
					<Footer />
				</footer>
				<motion.div
					ref={constraintsRef}
					className="whatsapp"
				>
					<ReactWhatsapp
						className="reactWhatsapp"
						number="+2348159124775"
						message="I am available for web development jobs/freelance gigs, Whether you're looking to start a new project, enhance an existing site, or need technical consultation. Feel free to reach out to discuss your project or to simply connect! "
					>
						<motion.div
							drag
							dragConstraints={constraintsRef}
							className="whatsappIcon"
						>
							<WhatsApp />
						</motion.div>
					</ReactWhatsapp>
				</motion.div>
			</div>

		</div>
	);
};

export default DisplayPage;
