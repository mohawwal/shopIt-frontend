import React, { useEffect, useState } from "react";
import "./navbar.css";
import Hamburger from "../../assets/svg/hamburger";
import SearchIcon from "../../assets/svg/Search";
import Bag from "../../assets/svg/bag";
import Burger from "../burger/burger";
import { Link, useLocation } from "react-router-dom";
import Search from "../search/search";
import Add from "../../assets/svg/arrowUp";

import { useAlert } from "react-alert";

import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../actions/userAction";
import SignOutAlert from "../../components/user/signOutAlert/signOutAlert";

const Navbar = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const alert = useAlert();

	const { loading, user } = useSelector((state) => state.auth);
	const { cartItems } = useSelector((state) => state.cart);

	const logOutHandler = () => {
		dispatch(logOut());
		alert.success("LoggedOut successful");
	};

	const [navStyle, setNavStyle] = useState("navHome");
	const [navbar, setNavbar] = useState(false);

	const [searchNav, setSearchNav] = useState(false);

	const [toggleNav, setToggleNav] = useState(false);

	const handleNav = () => {
		setToggleNav(!toggleNav);
	};

	const toggleSearch = () => {
		setSearchNav(!searchNav);
	};

	const [logoutToggle, setLogoutToggle] = useState(false);

	const logoutFunc = () => {
		setLogoutToggle(!logoutToggle);
	};

	const changeNavStyle = () => {
		if (window.pageYOffset >= 60) {
			setNavbar(true);
		} else if (window.pageYOffset >= -100) {
			setNavbar(false);
		} else {
			setNavbar(false);
		}
	};

	useEffect(() => {
		let navClass = "navHome";

		if (location.pathname === "/") {
			navClass = "navHome";
		} else if (location.pathname.includes("/product")) {
			navClass = "navOut";
		} else if (location.pathname.includes("/cart")) {
			navClass = "navOut";
		} else if (location.pathname.includes("/shipping")) {
			navClass = "navOut";
		} else if (location.pathname.includes("/order")) {
			navClass = "navOut";
		}else if (location.pathname.includes("/password/Update")) {
			navClass = "minNonNav";
		} else if (location.pathname === "/login") {
			navClass = "navNone";
		} else if (location.pathname === "/payment") {
			navClass = "navOut";
		} else if (location.pathname === "/register") {
			navClass = "navNone";
		} else if (location.pathname === "/password/forgot") {
			navClass = "navNone";
		} else if (location.pathname === "/me") {
			navClass = "minNonNav";
		} else if (location.pathname === "/me/Update") {
			navClass = "minNonNav";
		} 

		setNavStyle(navClass);

		window.addEventListener("scroll", changeNavStyle);

		return () => window.removeEventListener("scroll", changeNavStyle);
	}, [location.pathname]);

	return (
		<div className={`${navbar ? "navBar active" : "navBar"} ${navStyle}`}>
			{user && user ? (
				<div className="contactNav">
					<Link
						to="/me"
						className="contactNavbar"
						type="button"
					>
						<div className="profileAvatar">
							<img
								src={user.avatar && user.avatar.url}
								alt="profile"
							/>
						</div>
						<p>Hi {user && user.name}</p>
					</Link>
				</div>
			) : (
				!loading && (
					<Link
						to="/login"
						className="contactNav contactNavbar"
					>
						<p>Sign In</p>
						<div>
							<Add className="icons" />
						</div>
					</Link>
				)
			)}
			<div className="preNavMenu">
				<div onClick={handleNav}>
					<span>
						<Hamburger className="navIcon" />
					</span>
					<span className="menuS">MENU</span>
				</div>
			</div>
			<div className="navText">
				<Link
					to="/"
					className="Link"
				>
					ZARMARIO
				</Link>
			</div>
			<div className="navIcons">
				<Link
					className="cartLink"
					to="/cart"
				>
					<div className="cartBag">
						<Bag className="navIcon" />
					</div>
					<div className="bagItemNo">{cartItems.length}</div>
				</Link>

				<div
					className="searchIcons"
					onClick={toggleSearch}
				>
					<Link className="Link">
						<SearchIcon className="navIcon" />
					</Link>
				</div>
				{searchNav ? <Search toggleSearch={toggleSearch} /> : ""}

				<div
					className="navMenu"
					onClick={handleNav}
				>
					<div>
						<Hamburger className="navIcon" />
					</div>
					<span className="menuS">MENU</span>
				</div>
				{toggleNav && (
					<div className="fullNav">
						<div className="blurNav"></div>
						<div className="navBurger">
							<Burger
								handleNav={handleNav}
								user={user}
								loading={loading}
								logOutHandler={logOutHandler}
								logoutToggle={logoutToggle}
								logoutFunc={logoutFunc}
							/>
						</div>
					</div>
				)}
			</div>
			<SignOutAlert
				handleNav={handleNav}
				logOutHandler={logOutHandler}
				logoutToggle={logoutToggle}
				logoutFunc={logoutFunc}
			/>
		</div>
	);
};

export default Navbar;
