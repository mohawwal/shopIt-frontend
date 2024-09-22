import React, { useEffect, useState, useContext } from "react";
import "./navbar.css";
import Hamburger from "../../assets/svg/hamburger";
import SearchIcon from "../../assets/svg/Search";
import Bag from "../../assets/svg/bag";
import Burger from "../burger/burger";
import { Link, useLocation } from "react-router-dom";
import Search from "../search/search";
import Add from "../../assets/svg/arrowUp";
//import ArrowToggleDown from "../../assets/svg/arrowToggleDown";
// import Zarmario from "../../assets/svg/Zarmario"

import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../actions/userAction";
import SignOutAlert from "../../components/user/signOutAlert/signOutAlert";
import AlertContext from "../../components/alert/AlertContext";

const Navbar = () => {
	const location = useLocation();
	const dispatch = useDispatch();

	const [, setAlert] = useContext(AlertContext);

	const showAlert = (message, type) => {
		setAlert({
			message,
			type,
		});
	};

	const { loading, user, isAuthenticated } = useSelector((state) => state.auth);

	const { cartItems } = useSelector((state) => state.cart);

	const logOutHandler = () => {
		dispatch(logOut());
		showAlert("LoggedOut successful", "success");
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
		} else if (location.pathname.includes("/admin")) {
			navClass = "navOut";
		} else if (location.pathname.includes("/password/Update")) {
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
		} else if (location.pathname.startsWith("/order/")) {
			navClass = "minNonNav";
		} else if (location.pathname.includes("/dashboard")) {
			navClass = "navOut";
		} else if (location.pathname === "/wishlist") {
			navClass = "navOut";
		} else if (location.pathname === "/shop") {
			navClass = "navOut";
		} else if (location.pathname.includes("/password/reset")) {
			navClass = "navNone";
		}

		setNavStyle(navClass);

		window.addEventListener("scroll", changeNavStyle);

		return () => window.removeEventListener("scroll", changeNavStyle);
	}, [location.pathname]);

	return (
		<div className={`${navbar ? "navBar active" : "navBar"} ${navStyle}`}>
			<div className="contactNav">
				{isAuthenticated && user && user.avatar?.url ? (
					<div>
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
						</Link>
					</div>
				) : isAuthenticated && user ? (
					<Link to="/me">
						<div style={{ fontSize: "0.9rem", marginBottom: "5px" }}>
							👋🏽 {user && user.name && user.name.toUpperCase()}
						</div>
					</Link>
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
			</div>
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
			<div className="menuListBS">
				<ul className="menu">
					<Link
						to="/"
						className="navTextBS"
					>
						ZARMARIO
					</Link>
					{/* <li>
						<div>ZARMARIO</div>
						<ul className="submenu">
							<li>
								<Link to="/">HOME</Link>
							</li>
							<li>
								<Link to="/me">PROFILE</Link>
							</li>
							<li>
								<Link to="/orders/me">ORDERS</Link>
							</li>
							<li>
								<Link to="/dashboard">DASHBOARD</Link>
							</li>
						</ul>
					</li> */}
					<li>
						<div>
							<Link to="/products/men">MEN</Link>
							{/* <ArrowToggleDown
								className="downIcons"
								fill="white"
							/> */}
						</div>
						{/* <ul className="submenu">
							<li>
								<Link to="/product/category/Men_Shirt">SHIRT</Link>
							</li>
							<li>
								<Link to="/product/category/Men_T-Shirt">T-SHIRT</Link>
							</li>
							<li>
								<Link to="/product/category/Men_Polo">POLO</Link>
							</li>
							<li>
								<Link to="/product/category/Men_Short">SHORT</Link>
							</li>
							<li>
								<Link to="/product/category/Men_Trouser">TROUSER</Link>
							</li>
							<li>
								<Link to="/product/category/Men_Jean">JEANS</Link>
							</li>
							<li>
								<Link to="/product/category/Men_Short">SUIT</Link>
							</li>
							<li>
								<Link to="/product/category/Men_Jacket">JACKET</Link>
							</li>
							<li>
								<Link to="/product/category/Men_Cap">CAP</Link>
							</li>
						</ul> */}
					</li>
					<li>
						<div>
							<Link to="/products/women">WOMEN</Link>
							{/* <ArrowToggleDown
								className="downIcons"
								fill="white"
							/> */}
						</div>
						{/* <ul className="submenu">
							<li>
								<Link to="/product/category/Women_Dresses">DRESSES</Link>
							</li>
							<li>
								<Link to="/product/category/Women_Shirt">SHIRT</Link>
							</li>
							<li>
								<Link to="/product/category/Women_Gown">GOWN</Link>
							</li>
							<li>
								<Link to="/product/category/Women_Jacket">JACKET</Link>
							</li>
							<li>
								<Link to="/product/category/Women_Bag">BAG</Link>
							</li>
						</ul> */}
					</li>
					<li>
						<div>
							<Link to="/products/kids">KIDS</Link>
							{/* <ArrowToggleDown
								className="downIcons"
								fill="white"
							/> */}
						</div>
						{/* <ul className="submenu">
							<li>
								<Link to="/product/category/Kids_Boys">BOYS</Link>
							</li>
							<li>
								<Link to="/product/category/Kids_Girls">GIRLS</Link>
							</li>
							<li>
								<Link to="/product/category/Kids_Shoes">SHOES</Link>
							</li>
						</ul> */}
					</li>
					<li>
						<div>
							<Link to="/product/category/Fragrance">FRAGRANCE</Link>
						</div>
					</li>
					<li>
						<div>
							<Link to="/product/category/Jewelry">JEWELRY</Link>
						</div>
					</li>
				</ul>
			</div>
			<div className="navIconsBS">
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

				{isAuthenticated && user && user.avatar?.url ? (
					<div style={{ marginBottom: "5px" }}>
						<Link
							to="/me"
							className="contactNavbarBS"
							type="button"
						>
							<div className="profileAvatar">
								<img
									src={user.avatar && user.avatar.url}
									alt="profile"
								/>
							</div>
						</Link>
					</div>
				) : isAuthenticated && user ? (
					<Link to="/me">
						<div style={{ fontSize: "0.9rem", marginBottom: "5px" }}>
							👋🏽 {user && user.name && user.name.toUpperCase()}
						</div>
					</Link>
				) : (
					!isAuthenticated && (
						<Link
							to="/login"
							className="contactNavBS contactNavbar"
						>
							<p>Sign In</p>
							<div>
								<Add className="icons" />
							</div>
						</Link>
					)
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
