import React, { useEffect } from "react";
import "./order.css";
import { useAlert } from "react-alert";
import CheckoutSteps from "../checkoutSteps";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";
import {
	clearErrors,
	payment,
	//verifyPayment,
} from "../../../actions/paymentAction";
//import { addOrder } from "../../../actions/orderAction";

const Order = () => {
	const alert = useAlert();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	const { loading, order, error } = useSelector((state) => state.payment);

	const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

	const paymentData = {
		amount: Math.round(orderInfo.totalPrice),
		email: user.email,
		products: orderInfo.orderItems || [],
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [error, alert, dispatch]);

	const initializePayment = (e) => {
		e.preventDefault(); 
		dispatch(payment(paymentData)).then(() => {
			if (order && order.data && order.data.data && order.data.data.authorization_url) {
				const authorizationUrl = order.data.data.authorization_url;
			
				const paymentWindow = window.open(authorizationUrl);

				const interval = setInterval(() => {
					if (paymentWindow.closed) {
						clearInterval(interval);
						// Handle what happens after the payment window closes, e.g., verifying payment
					}
				}, 1000);
			} else {
				alert.error("Failed to open payment window.");
			}
		});
	};

	return (
		<div className="cart">
			<div className="checkShip">
				<CheckoutSteps
					shipping
					confirmOrder
					payment
				/>
			</div>
			<div className="payment">
				<div>
					<span>THANK YOU FOR PATRONIZING ZARMARIO</span>
				</div>
				<button
					id="pay_btn"
					onClick={(e) => initializePayment(e)}
				>
					{loading ? (
						<div>
							<ClipLoader
								color={"#123abc"}
								loading={true}
								size={23}
							/>
						</div>
					) : (
						<p>Make Payment</p>
					)}
				</button>
			</div>
		</div>
	);
};

export default Order;

// if (order && order.authorizationUrl) {
//     const paymentWindow = window.open(order.authorizationUrl);

//     if (paymentWindow) {
//         const interval = setInterval(() => {
//             if (paymentWindow.closed) {
//                 clearInterval(interval);

//                 try {
//                     const result = dispatch(verifyPayment(order.reference));
// 					console.log(result)

//                     if (result && result.payload && result.payload.success) {
//                         console.log('Payment successful, dispatching order...');
//                         dispatch(addOrder(orderInfo));
//                         window.location.href = "/orders/me";
//                     } else {
//                         console.log('Payment was not successful.');
//                         alert.error('Payment failed. Please try again.');
//                     }
//                 } catch (verificationError) {
//                     console.error('Error verifying payment:', verificationError);
//                     alert.error('An error occurred while verifying payment.');
//                 }
//             }
//         }, 1000);
//     } else {
//         console.log("Failed to open payment window.");
//         alert.error("Failed to open payment window.");
//     }
// }
