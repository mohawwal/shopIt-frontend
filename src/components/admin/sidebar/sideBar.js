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
				<div className="board">
					<DashboardIcon className="dashIcon" />
				</div>
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
									<Link to="/admin/products">All</Link>
								</li>
								<li>
									<Link to="/admin/product">Create</Link>
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
