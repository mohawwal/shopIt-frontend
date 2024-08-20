// import React, { useEffect, useState } from "react";
// import "./processOrder.css";
// import { Link, useParams } from "react-router-dom";

// import Loader from "../../../pages/loader/loader";
// import MetaData from "../../layouts/MetaData";
// import SideBar from "../sidebar/sideBar";
// import { useAlert } from "react-alert";
// import { useDispatch, useSelector } from "react-redux";
// import {
// 	getOrderDetails,
// 	clearErrors,
// 	updateOrder,
// } from "../../../actions/orderAction";
// import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

// const ProcessOrder = () => {
// 	const alert = useAlert();
// 	const dispatch = useDispatch();
// 	const { orderId } = useParams();

// 	const [status, setStatus] = useState("");

// 	const { loading, order } = useSelector((state) => state.orderDetails);
// 	const {
// 		shippingInfo,
// 		orderItems,
// 		paymentInfo,
// 		user,
// 		totalPrice,
// 		orderStatus,
// 	} = useSelector((state) => state.product);
// 	const { error, isUpdated } = useSelector((state) => state.order);


// 	useEffect(() => {
// 		dispatch(getOrderDetails(orderId));
  

// 		if (error) {
// 			alert.error(error);
// 			dispatch(clearErrors());
// 		}

// 		if (isUpdated) {
//       console.log('isUpdated: ', isUpdated)
// 			alert.success("Order Updated Successfully");
// 			dispatch({ type: UPDATE_ORDER_RESET });
// 		}
// 	}, [alert, dispatch, error, isUpdated, orderId]);

// 	const updateOrderHandler = (id) => {
// 		const formData = new FormData();
// 		formData.set("state", status);

// 		dispatch(updateOrder(id, formData));
// 	};

// 	const shippingDetails =
// 		shippingInfo &&
// 		`${shippingInfo.streetAddress}, ${shippingInfo.location}, ${shippingInfo.postalCode}, ${shippingInfo.park}, ${shippingInfo.state}`;
// 	const isPaid = paymentInfo && paymentInfo.status === `success ? true : false`;

// 	return (
// 		<div className="adminProductList">
// 			<MetaData title={`process order # ${order._id}`} />
// 			<div className="dashSide">
// 				<SideBar />
// 			</div>
// 			<div className="adminProducts">
// 				{loading ? (
// 					<Loader />
// 				) : (
// 					<div>
// 						<h3>shipping Info</h3>
// 						<div>
// 							<span>
// 								<p>
// 									<b>Name:</b>
// 									{user && user.name}
// 								</p>
// 								<p>
// 									<b>phone Number:</b>
// 									{shippingInfo.phoneNo}
// 								</p>
// 								<p>
// 									<b>Address:</b>
// 									{shippingDetails}
// 								</p>
// 								<p>
// 									<b>Amount:</b>₦{totalPrice}
// 								</p>
// 							</span>

// 							<hr />

// 							<h6>Payment</h6>
// 							<p>{isPaid ? "PAID" : "NOT PAID"}</p>
// 							<p>{orderStatus}</p>
// 							{/* <p>
// 								{paymentStatus &&
// 									paymentStatus.data &&
// 									paymentStatus.data.status}
// 							</p> */}

// 							<div>
// 								{orderItems &&
// 									orderItems.map((item) => {
// 										return (
// 											<div
// 												key={item._id}
// 												className="allYourOrders"
// 											>
// 												<div className="yourOrderImage">
// 													<img
// 														src={item.image}
// 														alt="img"
// 													/>
// 												</div>
// 												<div className="yourOrderName">
// 													<div>
// 														<p>{item.name}</p> <span>x{item.quantity}</span>
// 													</div>
// 												</div>
//                         <div>
//                           <h4>status</h4>
//                           <div>
//                             <select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
//                               <option value="processing">Processing</option>
//                               <option value="shipping">Shipping</option>
//                               <option value="Delivered">Delivered</option>
//                             </select>
//                           </div>
//                         </div>
//                         <div onClick={() => updateOrderHandler()}>
//                           <button>Update Status</button>
//                         </div>
// 											</div>
// 										);
// 									})}
// 							</div>
// 						</div>
// 					</div>
// 				)}
        
// 			</div>
// 		</div>
// 	);
// };

// export default ProcessOrder;

import React from 'react'

const ProcessOrder = () => {
  return (
    <div>
      chill
    </div>
  )
}

export default ProcessOrder
