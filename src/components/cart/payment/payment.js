import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./payment.css";
import axios from "axios";
import { useAlert } from "react-alert";
import CheckoutSteps from "../checkoutSteps";
import ClipLoader from "react-spinners/ClipLoader";

const Payment = () => {
	const alert = useAlert();

	const { user } = useSelector((state) => state.auth);

	const [loading, setLoading] = useState(false);

	const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

	const paymentData = {
		products: orderInfo.products || [],
		amount: Math.round(orderInfo.totalPrice),
		email: user.email,
	};

	const initializePayment = async (e) => {
		e.preventDefault();
		setLoading(true);

		const payButton = document.querySelector("#pay_btn");
		payButton.disabled = true;

		try {
			const response = await axios.post("/api/v1/payment/process", paymentData);

			const { authorizationUrl } = response.data;

			const paymentWindow = window.open(authorizationUrl);

			if (paymentWindow) {
				const interval = setInterval(() => {
					if (paymentWindow.closed) {
						window.location.href = "/order";
						clearInterval(interval);
					}
				}, 1000);
			} else {
				console.log("failed to open payment window.");
				alert.error("failed to open payment window.");
			}
		} catch (error) {
			payButton.disabled = false;
			console.error("Error during payment initialization:", error);
			alert.error(
				error.response
					? error.response.data.error || error.message
					: error.message,
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="cart">
			<CheckoutSteps
				shipping
				confirmOrder
				payment
			/>
			<button
				id="pay_btn"
				onClick={initializePayment}
			>
				{loading ? (
					<div>
						<ClipLoader
							color={"#123abc"}
							loading={true}
							size={150}
						/>
					</div>
				) : (
					<p>Make Payment</p>
				)}
			</button>
		</div>
	);
};

export default Payment;
