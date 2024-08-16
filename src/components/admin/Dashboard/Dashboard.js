import React from "react";
import SideBar from "../sidebar/sideBar";
import "./dashboard.css";
import {Link} from 'react-router-dom'

const Dashboard = () => {
	return (
		<div className="dashBoard">
			<div className="dashSide">
				<SideBar />
			</div>
			<div className="dashMain">
				<div className="dashCategory">
					<div className="dashFolder">
						<div className="dashFolderAmount">
							<p>Total Amount</p>
							<span>₦123</span>
						</div>
						<div className="dashFolderBottom">
							<div className="dashFolderBottomFiles">
								<div className="contentDash" style={{backgroundColor: "rgb(285, 191, 221)"}}>
									<p>Products</p>
									<span>56</span>
								</div>
								<Link to='/admin/products' className="viewDash">
									<p>View Details</p>
									<div>+</div>
								</Link>
							</div>
							<div className="dashFolderBottomFiles">
								<div className="contentDash" style={{backgroundColor: "rgb(166, 175, 245)"}}>
									<p>Orders</p>
									<span>56</span>
								</div>
								<Link to='/admin/orders' className="viewDash">
									<p>View Details</p>
									<div>+</div>
								</Link>
							</div>
							<div className="dashFolderBottomFiles">
								<div className="contentDash" style={{backgroundColor: "rgb(223, 166, 245)"}}>
									<p>Users</p>
									<span>56</span>
								</div>
								<Link to='/admin/users' className="viewDash">
									<p>View Details</p>
									<div>+</div>
								</Link>
							</div>
							<div className="dashFolderBottomFiles">
								<div className="contentDash" style={{backgroundColor: "rgb(245, 187, 166)"}}>
									<p>Out of Stock</p>
									<span>56</span>
								</div>
								<div className="viewDash">
									<p></p>
									<div>+</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
