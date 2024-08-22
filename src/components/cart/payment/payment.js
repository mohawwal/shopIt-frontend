import React, { useEffect, useState, useContext } from "react";
import "./payment.css";
import CheckoutSteps from "../checkoutSteps";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";
import {
	clearErrors,
	payment,
	verifyPayment,
} from "../../../actions/paymentAction";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../../../actions/orderAction"
import AlertContext from "../../alert/AlertContext";

const Payment = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [, setAlert] = useContext(AlertContext)

	const showAlert = (message, type) => {
		setAlert({
			message,
			type
		})
	}

	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
			showAlert(error, 'error')
			dispatch(clearErrors());
		}
	}, [error, dispatch]);

	const initializePayment = (e) => {
		e.preventDefault();
		console.log("Button clicked, disabling...");
		setIsButtonDisabled(true);
	
		dispatch(payment(paymentData)).then(() => {
			if (
				order &&
				order.data &&
				order.data.data &&
				order.data.data.authorization_url
			) {
				const authorizationUrl = order.data.data.authorization_url;
	
				const paymentWindow = window.open(authorizationUrl);
	
				const interval = setInterval(() => {
					if (paymentWindow.closed) {
						clearInterval(interval);
	
						// Verify the payment after the payment window is closed
						const reference = order.data.data.reference;
	
						dispatch(verifyPayment(reference))
							.then((response) => {
								const paymentStatus = response.payload.data.status; 
	
								if (paymentStatus === "success") {
									showAlert(`Payment ${paymentStatus}`, 'success')
									dispatch(addOrder(orderInfo))
									navigate("/orders/me");
								} else {
									showAlert(`Payment ${paymentStatus}`, 'error')
									navigate("/shipping");
									setIsButtonDisabled(false);
								}
							})
							.catch((error) => {
								// Handle the error if needed
								showAlert(`Payment verification failed: ${error.message}`, 'error')
							})
					}
				}, 1000);
			} else {
				showAlert('Failed to open payment window.', 'error')
			}
		})
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
					disabled={isButtonDisabled}
					className={isButtonDisabled ? "disBtn" : "notDisBtn"}
					onClick={(e) => initializePayment(e)}
				>
					{loading ? (
						<div>
							<ClipLoader
								color={"#799bff"}
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

export default Payment;
