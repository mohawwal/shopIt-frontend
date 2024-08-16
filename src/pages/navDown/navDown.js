import React from "react";
import "./navDown.css";
import Home from "../../assets/svg/home";
import ShopIcon from "../../assets/svg/shop";
import Orders from "../../assets/svg/orders";
import FavoriteStar from "../../assets/svg/favoriteStar";
import UserIcon from "../../assets/svg/user";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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
	}, [downNav, location.pathname]);

	return (
		<div className={`navDown ${downNav}`}>
			<div className="navDownComp">
				<Link
					to="/"
					className="downAccount"
				>
					<Home className="iconsDown" />
					<p className="pText">Home</p>
				</Link>
			</div>
			<div className="navDownComp">
				<ShopIcon className="iconsDown" />
				<p className="pText">Shop</p>
			</div>
			<div className="navDownComp">
				<Link
					to="/wishlist"
					className="downAccount"
				>
					<FavoriteStar className="iconsDown" />
					<p className="pText">WishList</p>
				</Link>
			</div>
			{isAuthenticated && isAuthenticated ? (
				<div className="navDownComp">
					<Link
						to="/orders/me"
						className="downAccount"
					>
						<Orders className="iconsDown" />
						<p className="pText">Order</p>
					</Link>
				</div>
			) : null}
			<div className="navDownComp">
				<Link
					to="/me"
					className="downAccount"
				>
					{/* <UserIcon className="iconsDown" /> */}
					{isAuthenticated ? (
						<div className="navDownAvatar">
							<img
								src={user && user.avatar && user.avatar.url}
								alt=""
							/>
						</div>
					) : (
						<div className="navDownAvatar">
							<UserIcon className="iconsDown" />
						</div>
					)}
					<p className="pText">Profile</p>
				</Link>
			</div>
		</div>
	);
};

export default NavDown;
