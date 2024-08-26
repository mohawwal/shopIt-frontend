// import React, { useEffect, useState, useContext } from "react";
// import "./processOrder.css";
// import { Link, useParams } from "react-router-dom";

// import Loader from "../../../pages/loader/loader";
// import MetaData from "../../layouts/MetaData";
// import SideBar from "../sidebar/sideBar";
// import AlertContext from '../../alert/AlertContext'
// import { useDispatch, useSelector } from "react-redux";
// import {
// 	getOrderDetails,
// 	clearErrors,
// 	updateOrder,
// } from "../../../actions/orderAction";
// import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

// const ProcessOrder = () => {
// 	const dispatch = useDispatch();
// 	const { orderId } = useParams();

// const [, setAlert] = useContext(AlertContext)

// 	const showAlert = (message, type) => {
// 		setAlert({
// 			message,
// 			type
// 		})
// 	}

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
//      setAlert(error, 'error')
// 			dispatch(clearErrors());
// 		}

// 		if (isUpdated) {
//       console.log('isUpdated: ', isUpdated)
//       setAlert("Order Updated Successfully", 'success')
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




import React, { useEffect, useContext } from "react";
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

const ProcessOrder = () => {
	const dispatch = useDispatch();
	const { orderId } = useParams();

  const [, setAlert] = useContext(AlertContext)

	const showAlert = (message, type) => {
		setAlert({
			message,
			type
		})
	}

	const { order, loading, error } = useSelector(
		(state) => state.getOrderDetails,
	);

	useEffect(() => {
		dispatch(getOrderDetails(orderId));

    if(error) {
      showAlert(error, "error")
      dispatch(clearErrors())
    }
	}, [dispatch, error, orderId]);

	const isShippingWithinLagos = order?.shippingInfo?.state?.toLowerCase().includes("lagos");

  if(loading) {
    return (
      <Loader />
    )
  }
	return (
		<div className="adminProductList">
			<div className="dashSide">
				<SideBar />
			</div>
			<div className="">
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
          <div>Payment</div>

				</div>
			</div>
		</div>
	);
};

export default ProcessOrder;
