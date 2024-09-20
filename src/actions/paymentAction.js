import axiosInstance from "../axios/axios";
import {
	MAKE_PAYMENT_ORDER_REQUEST,
	MAKE_PAYMENT_ORDER_SUCCESS,
	MAKE_PAYMENT_ORDER_FAIL,
	VERIFY_PAYMENT_ORDER_REQUEST,
	VERIFY_PAYMENT_ORDER_SUCCESS,
	VERIFY_PAYMENT_ORDER_FAIL,
	CLEAR_ERRORS,
} from "../components/constants/paymentConstant";

//pay for an order
export const initializePayment = (paymentData) => async (dispatch) => {
	try {
		dispatch({ type: MAKE_PAYMENT_ORDER_REQUEST });

		const { data } = await axiosInstance.post(
			"/api/v1/initializePayment",
			paymentData,
		);
		console.log(data)

		dispatch({
			type: MAKE_PAYMENT_ORDER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: MAKE_PAYMENT_ORDER_FAIL,
			payload: error.response?.data.message || error.message,
		});
		console.log(error)
	}
};

//verifyPayment status
export const verifyPayment = (reference) => async (dispatch) => {
	try {
		dispatch({ type: VERIFY_PAYMENT_ORDER_REQUEST });

		const { data } = await axiosInstance.get(`/api/v1/createPayment?reference=${reference}`);
		console.log(data)

		if (data.success) {
			dispatch({
				type: VERIFY_PAYMENT_ORDER_SUCCESS,
				payload: data,
			});
			console.log("verify data- ", data)
			return { payload: data };
		} else {
			dispatch({
				type: VERIFY_PAYMENT_ORDER_FAIL,
				payload: "Payment verification failed.",
			});
		}
	} catch (error) {
		dispatch({
			type: VERIFY_PAYMENT_ORDER_FAIL,
			payload: error.response?.data.message || error.message,
		});
	}
};

//Clear Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
