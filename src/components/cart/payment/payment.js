import { useEffect, useState, useContext } from "react";
import "./payment.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../pages/loader/loader";
import ClipLoader from "react-spinners/ClipLoader";
import { MAKE_PAYMENT_ORDER_RESET } from "../../constants/paymentConstant";
import { verifyPayment, clearErrors } from "../../../actions/paymentAction";
import Paystack from "@paystack/inline-js";
import AlertContext from "../../alert/AlertContext";
import { useNavigate } from "react-router-dom";

const Payment = () => {
	const dispatch = useDispatch();
	const popup = new Paystack();
	const navigate = useNavigate();

	const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

	const { user, isAuthenticated } = useSelector((state) => state.auth);

	const [, setAlert] = useContext(AlertContext);

	const showAlert = (message, type) => {
		setAlert({
			message,
			type,
		});
	};

	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const { loading, order, error } = useSelector((state) => state.createOrder);

	// const { paymentOrder } = useSelector((state) => state.payment);
	// const {status} = useSelector((state => state.verifyPayment))

	const paymentData = {
		amount: order?.totalPrice,
		email: order?.email,
		reference: order?.paymentReference,
		products: orderInfo?.orderItems,
	};
	console.log("paymentData - ", paymentData);
	console.log("paymentData Reference - ", paymentData.reference);

	useEffect(() => {
		if (error) {
			showAlert(error, "error");
			dispatch(clearErrors());
		}
	}, [dispatch, error]);

	const paymentFunc = (e) => {
		e.preventDefault();

		setIsButtonDisabled(true);

		popup.newTransaction({
			email: paymentData.email,
			amount: paymentData.amount * 100,
			products: paymentData.products,
			reference: paymentData?.reference,
			key: "pk_test_d0c7316ac62fc13a305c4c3605ec0ded38ed3f3d",

			onSuccess: (transaction) => {
				console.log("transaction -", transaction);
				dispatch(verifyPayment(transaction?.reference))
					.then((response) => {
						console.log("response -", response);
						showAlert("Payment successful", "success");
						user && isAuthenticated ? navigate("/orders/me") : navigate("/");
						return dispatch({ type: MAKE_PAYMENT_ORDER_RESET });
					})
					.catch((error) => {
						showAlert(
							`Payment verification failed : ${error.message}`,
							"error",
						);
					});
			},
			onCancel: () => {
				showAlert("Payment was canceled", "error");
				navigate("/shipping");
			},
		});
		return () => {
			dispatch({ type: MAKE_PAYMENT_ORDER_RESET });
		};
	};

	if (loading) {
		return <Loader />;
	}
	return (
		<div className="payment">
			<div
				className="backChange"
				onClick={() => navigate(-1)}
			>
				<p>Change Order Detail</p>
			</div>

			<div className="mariO">Zarmario</div>
			<div className="payDet">
				<div className="paystack">
					<div className="pSText">
						<span>Pay With Paystack</span>
						<div className="payAmt">
							₦{order?.itemPrice}{" "}
							<i>
								includes ₦{order?.order?.taxPrice + order?.order?.shippingPrice}{" "}
								shipping / Tax Fee
							</i>
						</div>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
							molestias recusandae sint inventore incidunt perspiciatis ipsa
							odit animi repellendus eligendi beatae, maxime tempora quae itaque
							quod rerum consectetur dolore odio?
						</p>
					</div>
					<div>✅</div>
				</div>

				<div className="buttonPay">
					<div>₦{order?.totalPrice?.toLocaleString()}</div>

					<button
						disabled={isButtonDisabled}
						onClick={(e) => paymentFunc(e)}
					>
						Continue
						{loading && (
							<ClipLoader
								color={"black"}
								loading={true}
								size={23}
							/>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Payment;
