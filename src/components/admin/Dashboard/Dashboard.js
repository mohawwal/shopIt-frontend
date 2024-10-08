import React, { useEffect, useContext } from "react";
import SideBar from "../sidebar/sideBar";
import "./dashboard.css";
import {Link} from 'react-router-dom'
import AlertContext from "../../alert/AlertContext";
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers } from "../../../actions/userAction";
import { getAdminProducts, clearErrors } from "../../../actions/productActions";
import { getAllOrder } from "../../../actions/orderAction";
import Loader from "../../../pages/loader/loader";

const Dashboard = () => {
	const dispatch = useDispatch();
	
	const [, setAlert] = useContext(AlertContext)

	const showAlert = (message, type) => {
		setAlert({
			message,
			type
		})
	}

    const { error, products } = useSelector((state) => state.allProducts);
	const { totalAmount, orders, loading } = useSelector((state) => state.allOrder)
    const { users } = useSelector(state => state.allUsers)
    
	let outOfStock = 0

	products.forEach((product) =>{
		if(product.stock === 0) {
			outOfStock += 1;
		}
	})

	useEffect(() => {
		dispatch(getAdminProducts())
		dispatch(getAllOrder())
		dispatch(getAllUsers())

		if (error) {
			showAlert(error, 'error')
            dispatch(clearErrors());
        }

	},[dispatch, error])

	return (
		<div className="dashBoard">
			<div className="dashSide">
				<SideBar />
			</div>
			{loading ? <Loader /> :(
				<div className="dashMain">
				<div className="dashCategory">
					<div className="dashFolder">
						<div className="dashFolderAmount">
							<p>Total Amount</p>
							<span>₦{parseFloat(totalAmount).toFixed(2)}</span>
						</div>
						<div className="dashFolderBottom">
							<div className="dashFolderBottomFiles">
								<div className="contentDash" style={{backgroundColor: "rgb(285, 191, 221)"}}>
									<p>Products</p>
									<span>{products && products.length}</span>
								</div>
								<Link to='/admin/products' className="viewDash">
									<p>View Details</p>
									<div>+</div>
								</Link>
							</div>
							<div className="dashFolderBottomFiles">
								<div className="contentDash" style={{backgroundColor: "rgb(166, 175, 245)"}}>
									<p>Orders</p>
									<span>{orders && orders.length}</span>
								</div>
								<Link to='/admin/orders' className="viewDash">
									<p>View Details</p>
									<div>+</div>
								</Link>
							</div>
							<div className="dashFolderBottomFiles">
								<div className="contentDash" style={{backgroundColor: "rgb(223, 166, 245)"}}>
									<p>Users</p>
									<span>{users && users.length}</span>
								</div>
								<Link to='/admin/users' className="viewDash">
									<p>View Details</p>
									<div>+</div>
								</Link>
							</div>
							<div className="dashFolderBottomFiles">
								<div className="contentDash" style={{backgroundColor: "rgb(245, 187, 166)"}}>
									<p>Out of Stock</p>
									<span>{outOfStock}</span>
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
			)}
		</div>
	);
};

export default Dashboard;
