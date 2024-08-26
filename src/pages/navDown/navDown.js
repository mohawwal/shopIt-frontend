import React, { useEffect, useState } from "react";
import "./navDown.css";
import Home from "../../assets/svg/home";
import ShopIcon from "../../assets/svg/shop";
import Orders from "../../assets/svg/orders";
import FavoriteStar from "../../assets/svg/favoriteStar";
import UserIcon from "../../assets/svg/user";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const NavDown = () => {
	const location = useLocation();
	const { user, isAuthenticated } = useSelector((state) => state.auth);

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
	}, [location.pathname]);

	const isActive = (path) => location.pathname === path;

	return (
		<div className={`navDown ${downNav}`}>
			<div className="navDownComp">
				<Link to="/" className="downAccount">
					<Home className={`iconsDown ${isActive("/") ? "active" : ""}`} />
					<p className="pText">Home</p>
				</Link>
			</div>
			<div className="navDownComp">
				<Link to="/shop" className="downAccount">
					<ShopIcon className={`iconsDown ${isActive("/shop") ? "active" : ""}`} />
					<p className="pText">Shop</p>
				</Link>
			</div>
			<div className="navDownComp">
				<Link to="/wishlist" className="downAccount">
					<FavoriteStar className={`iconsDown ${isActive("/wishlist") ? "active" : ""}`} />
					<p className="pText">WishList</p>
				</Link>
			</div>
			{isAuthenticated && user && (
				<div className="navDownComp">
					<Link to="/orders/me" className="downAccount">
						<Orders className={`iconsDown ${isActive("/orders/me") ? "active" : ""}`} />
						<p className="pText">Order</p>
					</Link>
				</div>
			)}
			<div className="navDownComp">
				<div className="downAccount">
					{isAuthenticated && user && user.avatar && user.avatar.url ? (
						<Link to="/me" className="navDownAvatar">
							<img src={user.avatar.url} alt="" />
						</Link>
					) : (
						<Link to="/login" className="navDownAvatar">
							<UserIcon className="iconsDown" fill="white" />
						</Link>
					)}
					<p className="pText">Profile</p>
				</div>
			</div>
		</div>
	);
};

export default NavDown;
