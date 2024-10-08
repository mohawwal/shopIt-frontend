import React from "react";
import "./burger.css";
import Cancel from "../../assets/svg/cancel";
import ArrowRight from "../../assets/svg/arrowRight";
import { Link } from "react-router-dom";
import { categories } from "../../components/data/categories";
import { accessories } from "../../components/data/categories";
import { motion } from "framer-motion";
//import SignOutAlert from "../../components/user/signOutAlert/signOutAlert";

const Burger = ({ handleNav, user, loading, logoutFunc }) => {
	const container = {
		hidden: { opacity: 1, scale: 0 },
		visible: {
		  opacity: 1,
		  scale: 1,
		  transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2
		  }
		}
	};
	  
	const item = {
		hidden: { y: 20, opacity: 0 },
		visible: {
		  y: 0,
		  opacity: 1
		}
	};
	return (
		<motion.div className="burger">
			<div className="cancelBurger">
				<span onClick={handleNav}>
					<Cancel className="icons cancelIcon" />
				</span>
			</div>
			<div className="burgerList">
				<ul className="otherNav">
					<li>
						<p>New In</p>
						<ArrowRight className="icons arrowIcons" />
					</li>
				</ul>
				<motion.ul className="otherNav" variants={container}
									initial="hidden"
									animate="visible">
					{categories.map((category) => {
						return (
							<motion.li onClick={handleNav} variants={item}>
								<Link
									to={`/category/${category.id}`}
									className="navListLink Link"
								>
									<div>
										<p>{category.title}</p>
									</div>
									<div>
										<ArrowRight className="icons arrowIcons" />
									</div>
								</Link>
							</motion.li>
						);
					})}
				</motion.ul>
				<motion.ul className="otherNav" variants={container}
									initial="hidden"
									animate="visible">
					{accessories.map((accessory) => {
						return (
							<motion.li onClick={handleNav} 
							variants={item}>
								<Link
									to={`/product/category/${accessory.title}`}
									className="navListLink Link"
								>
									<p>{accessory.title}</p>
									<ArrowRight className="icons arrowIcons" />
								</Link>
							</motion.li>
						);
					})}
				</motion.ul>

				<div className="servicesNav">
					<div>
						<p>
							<a
								href="https://awwal-portfolio.vercel.app/CONTACT"
								target="_blank"
								rel="noreferrer"
							>
								Zarmario Services{" "}
							</a>
						</p>
						<ArrowRight className="icons arrowIcons" />
					</div>
					{/* <div>
						<p>
							<a
								href="https://awwal-portfolio.vercel.app/CONTACT"
								target="_blank"
								rel="noreferrer"
							>
								World of Mario{" "}
							</a>
						</p>
						<ArrowRight className="icons arrowIcons" />
					</div> */}
				</div>
				<div className="infoNav">
					{user && <div onClick={handleNav}>
						<Link to="/me">Profile</Link>
					</div>}
					{/* <div>
						<a
							href="https://awwal-portfolio.vercel.app/CONTACT"
							target="_blank"
							rel="noreferrer"
						>
							Contact Us
						</a>
					</div> */}
					{user && (
						<div onClick={handleNav}>
							<Link to="/orders/me">My Orders</Link>
						</div>
					)}
					{user && user.role === "admin" ? (
						<div onClick={handleNav}>
							<Link to="/dashboard">My Dashboard</Link>
						</div>
					) : null}
					<div>
						{user && user.name !== null ? (
							<div onClick={logoutFunc}>
								<Link
									to="/"
									className="Link signLink"
								>
									Sign Out
								</Link>
							</div>
						) : (
							!loading && (
								<div>
									<Link to="/login">Sign In</Link>
								</div>
							)
						)}
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default Burger;
