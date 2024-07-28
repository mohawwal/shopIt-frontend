import React from "react";
import "./burger.css";
import Cancel from "../../assets/svg/cancel";
import ArrowRight from "../../assets/svg/arrowRight";
import { Link } from "react-router-dom";
import { categories } from "../../components/data/categories";
import { accessories } from "../../components/data/categories";
//import SignOutAlert from "../../components/user/signOutAlert/signOutAlert";

const Burger = ({ handleNav, user, loading, logoutFunc }) => {
	return (
		<div className="burger">
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
				<ul className="otherNav">
					{categories.map((category) => {
						return (
							<li onClick={handleNav}>
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
							</li>
						);
					})}
				</ul>
				<ul className="otherNav">
					{accessories.map((accessory) => {
						return (
							<li onClick={handleNav}>
								<Link
									to={`/product/category/${accessory.title}`}
									className="navListLink Link"
								>
									<p>{accessory.title}</p>
									<ArrowRight className="icons arrowIcons" />
								</Link>
							</li>
						);
					})}
				</ul>

				<div className="servicesNav">
					<div>
						<p>Zarmario Services</p>
						<ArrowRight className="icons arrowIcons" />
					</div>
					<div>
						<p>World of Mario</p>
						<ArrowRight className="icons arrowIcons" />
					</div>
				</div>
				<div className="infoNav">
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
					{user && user.role !== "admin" ? (
						<div>My Orders</div>
					) : (
						<div>My Dashboard</div>
					)}
					<div>
						<a
							href="https://awwal-portfolio.vercel.app/CONTACT"
							target="_blank"
							rel="noreferrer"
						>
							Contact Us
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Burger;
