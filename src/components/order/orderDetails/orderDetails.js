import React, { useEffect, useContext } from "react";
import "./orderDetails.css";
import Loading from "../../../pages/loader/loader";
//import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, clearErrors } from "../../../actions/orderAction";
import { useParams } from "react-router-dom";
import { formatDate } from "../dateTime";
import { useNavigate } from "react-router-dom";
import UTurn from "../../../assets/svg/UTurn";
import Repeat from "../../../assets/svg/repeat";
import AlertContext from "../../alert/AlertContext";

const OrderDetails = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const navigate = useNavigate();

	const [, setAlert] = useContext(AlertContext);

	const showAlert = (message, type) => {
		setAlert({
			message,
			type,
		});
	};

	const { order, error, loading } = useSelector(
		(state) => state.getOrderDetails,
	);

	useEffect(() => {
		dispatch(getOrderDetails(id));

		if (error) {
			showAlert(error, "error");
			dispatch(clearErrors());
		}
	}, [dispatch, error, id]);

	if (loading) {
		return <Loading />;
	}

	return (
		<div className="orderDetails">
			<div className="detailsOrder">
				<div
					className="arrowBackOrder"
					onClick={() => navigate(-1)}
				>
					<UTurn
						className="icons aLI"
						fill="rgba(116, 106, 224, 0.948)"
					/>
					<p>ORDER</p>
				</div>
				{order &&
				order.orderStatus &&
				order.orderStatus.includes(String("Delivered")) ? (
					<div className="dob">
						<Repeat className="navIcon" />
						<p>Order Delivered</p>
					</div>
				) : (
					<span className="orderStatus">
						{/* <div>
							<Process className="prsIcons" />
						</div> */}
						{order && order.orderStatus}...
					</span>
				)}
			</div>
			<div className="orderLTD">
				<div className="LTD">
					<div className="orderText">
						📍
						{order?.shippingInfo?.streetAddress
							? `${order.shippingInfo.streetAddress || order.shippingInfo.park}, ${order.shippingInfo.state}`
							: "Shipping information is not available"}
					</div>
					<div className="orderDate">
						📅{formatDate(order?.createdAt || new Date())}
					</div>
				</div>
			</div>
			<div className="orderColumns">
				<div className="viewOrders">
					<div>
						{order && order.orderItems && order.orderItems.length} Items
					</div>
				</div>
				<div>
					{order &&
						order.orderItems &&
						order.orderItems.map((item) => (
							<div
								className="orderClass"
								key={item.id}
							>
								<div className="orderImgText">
									<img
										src={item.image}
										alt={item.name}
										style={{
											width: "60px",
											height: "60px",
											objectFit: "contain",
										}}
									/>
									<div className="classDetails">
										<span>
											{item.name &&
												item.name.charAt(0).toUpperCase() + item.name.slice(1)}
										</span>
										<p>
											<i>Qty</i> - <b>x{item.quantity}</b>
										</p>
									</div>
								</div>
								<div>
									<span>₦{item.price}</span>
								</div>
							</div>
						))}
				</div>
			</div>
			<div className="orderDetailsFooter">
				<div>
					<span>Sub-total</span>
					<span className="oDBlur">₦{order && order.itemsPrice && order.itemsPrice.toLocaleString()}</span>
				</div>
				<div>
					<span>Delivery</span>
					<span className="oDBlur">₦{order && order.shippingPrice && order.shippingPrice.toLocaleString()}</span>
				</div>
				<div>
					<span>Service fee</span>
					<span className="oDBlur">₦{order && order.taxPrice && order.taxPrice.toLocaleString()}</span>
				</div>
				<div>
					<span style={{ fontWeight: "bold" }}>Total</span>
					<span
						className="oTN"
					>
						₦{order && order.totalPrice && order.totalPrice.toLocaleString()}
					</span>
				</div>
			</div>
		</div>
	);
};

export default OrderDetails;
