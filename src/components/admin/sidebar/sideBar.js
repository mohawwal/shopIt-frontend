import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import Product from "../../../assets/svg/product";
import Order from "../../../assets/svg/order";
import User from "../../../assets/svg/user";
import Star from "../../../assets/svg/star";
import DashboardIcon from "../../../assets/svg/dashboard";
import ArrowToggleDown from "../../../assets/svg/arrowToggleDown";

const SideBar = () => {
	const [dashDown, setDashDown] = useState(false);

	const dashDownHandler = () => {
		setDashDown(!dashDown);
	};

	return (
		<div className="sideBar">
			<div className="sideComponent">
				<Link to='/dashboard' className="componentBar">
					<DashboardIcon className="dashIcon" />
					<span>Dashboard</span>
				</Link>
				<div className="componentBar">
					<div className="componentBarList" onClick={dashDownHandler}>
						<Product className="dashIcon" />
						<span>Products</span>
						<ArrowToggleDown className={`navIcon ${dashDown ? 'rotated' : ''}`} />
					</div>
					{dashDown && (
						<div className="dashProdList">
							<ul className="downList">
								<li>
									<Link className="liLink" to="/admin/products"><p>All</p></Link>
								</li>
								<li>
									<Link className="liLink" to="/admin/product"><p>Create</p></Link>
								</li>
							</ul>
						</div>
					)}
				</div>
				<Link
					to="/admin/orders"
					className="componentBar"
				>
					<Order className="dashIcon" />
					<span>Orders</span>
				</Link>
				<Link
					to="/admin/users"
					className="componentBar"
				>
					<User className="dashIcon" />
					<span>User</span>
				</Link>
				<Link
					to="/admin/reviews"
					className="componentBar"
				>
					<Star className="dashIcon" />
					<span>Reviews</span>
				</Link>
			</div>
		</div>
	);
};

export default SideBar;
