import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getOrderDetails,
	clearErrors,
	updateOrder,
} from "../../../actions/orderAction";
import { useParams } from "react-router-dom";
import SideBar from "../sidebar/sideBar";
import AlertContext from "../../alert/AlertContext";
import Loader from "../../../pages/loader/loader";
import "./processOrder.css";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

const ProcessOrder = () => {
	const dispatch = useDispatch();
	const { orderId } = useParams();

	const [, setAlert] = useContext(AlertContext);

	const showAlert = (message, type) => {
		setAlert({
			message,
			type,
		});
	};

	const [status, setStatus] = useState("");

	const { order, loading } = useSelector(
		(state) => state.getOrderDetails,
	);

	const {
		isUpdated,
		error
	} = useSelector((state) => state.order);

	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(getOrderDetails(orderId));

		if (error) {
			showAlert(error, "error");
			dispatch(clearErrors());
		}
		

		if(isUpdated) {
			showAlert("Order Updated Successfully", "success")
			dispatch({ type: UPDATE_ORDER_RESET })
		}

	}, [dispatch, error, isUpdated, orderId]);

	const isShippingWithinLagos = order?.shippingInfo?.state
		?.toLowerCase()
		.includes("lagos");

	const updateOrderHandler = (id) => {

		const formData = new FormData()
		formData.set('status', status)

		dispatch(updateOrder(id, formData));
	}
	

	if (loading) {
		return <Loader />;
	}

	return (
		<div className="adminProductList">
			<div className="dashSide">
				<SideBar />
			</div>
			<div className="processOrder">
				<div>
					<div>#{order?._id}</div>
					<div>
						<h3>Shipping Info</h3>
						<div>
							<span>
								<b>Name: </b>
								{order?.user?.name}
							</span>
							<span>
								<b>Phone No: </b>
								{order?.shippingInfo?.phoneNo}
							</span>
							{order?.user?._id === user?._id ? (
								<span>
									<b>Email: </b>
									{order?.user?.email}
								</span>
							) : (
								<b>Guest</b>
							)}
							<div>
								{isShippingWithinLagos ? (
									<span>😁Shipping Within Lagos</span>
								) : (
									<span>
										<b>State: </b>
										{order?.shippingInfo?.state}
									</span>
								)}
							</div>
							<div>
								<span>
									<b>Address: </b>
									{order?.shippingInfo?.streetAddress}
								</span>
							</div>
							{!isShippingWithinLagos && (
								<div>
									<span>
										<b>Park: </b>
										{order?.shippingInfo?.park}
									</span>
								</div>
							)}
							<span>
								<b>Location: </b>
								{order?.shippingInfo?.location}
							</span>
							<span>
								<b>Order Note: </b>
								{order?.shippingInfo?.orderNote}
							</span>
						</div>
					</div>
					<div>
						<span>Payment</span>
						<div>
							<span>
								<b>Payment Status: </b>
								{order?.paymentInfo?.status}
							</span>
							<span>
								<b>Payment Reference: </b>
								{order?.paymentInfo?.reference}
							</span>
						</div>
					</div>
					<div>
						<div>
							<span><b>Order Status: </b>{order?.orderStatus}</span>
						</div>
						<b>ORDER ITEM</b>
						<div>
							{order && order.orderItems && order.orderItems.map((items, index) => (
								<div key={index}>
									<div className="processOrderImage">
										<img
											src={items.image}
											alt=""
										/>
									</div>
									<div>
										<span>
											<b>Name: </b>
											{items.name}
										</span>
										<span>
											<b>Quantity: </b>
											{items.quantity}
										</span>
										<span>
											<b>Price: </b>
											{items.price}
										</span>
									</div>
								</div>
							))}
						</div> 
					</div>
				</div>
				<div>
					<div>
						<span>
							<b>Order Status: </b>
						</span>
					</div>
					<div>
						<select
							name="status"
							value={status}
							onChange={(e) => setStatus(e.target.value)}
						>
							<option value="processing">Processing</option>
							<option value="Shipping">Shipping</option>
							<option value="Delivered">Delivered</option>
						</select>

						<button onClick={() => updateOrderHandler(order?._id)}>
							{<p>Update order status</p>}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProcessOrder;
