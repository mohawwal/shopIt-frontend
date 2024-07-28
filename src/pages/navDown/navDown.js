import React from "react";
import "./navDown.css";
import Home from "../../assets/svg/home";
import ShopIcon from "../../assets/svg/shop";
import UserIcon from "../../assets/svg/user";
import Orders from "../../assets/svg/orders";
import FavoriteStar from "../../assets/svg/favoriteStar";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const NavDown = () => {
	const location = useLocation();

	const [downNav, setDownNav] = useState("downNavHome");

	useEffect(() => {
		let downNavClass = "downNavHome";

		if (location.pathname === "/") {
			downNavClass = "downNavHome";
		} else if (location.pathname === "/login") {
			downNavClass = "downNavNone";
		} else if (location.pathname === "/password/forgot") {
			downNavClass = "downNavNone";
		} else if (location.pathname === "/register") {
			downNavClass = "downNavNone";
		} 

		setDownNav(downNavClass);
	}, [downNav, location.pathname]);

	return (
		<div className={`navDown ${downNav}`}>
			<div className="navDownComp">
				<Link
					to="/"
					className="downAccount"
				>
					<Home className="icons" />
					<div>Home</div>
				</Link>
			</div>
			<div className="navDownComp">
				<ShopIcon className="icons" />
				<div>Shop</div>
			</div>
			<div className="navDownComp">
				<FavoriteStar className="icons" />
				<div>WishList</div>
			</div>
			<div className="navDownComp">
				<Orders className="icons" />
				<div>Order</div>
			</div>
			<div className="navDownComp">
				<Link
					to="/me"
					className="downAccount"
				>
					<UserIcon className="icons" />
					<div>Profile</div>
				</Link>
			</div>
		</div>
	);
};

export default NavDown;
