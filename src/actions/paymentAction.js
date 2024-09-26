import axiosInstance from "../axios/axios";
import {
	VERIFY_PAYMENT_ORDER_REQUEST,
	VERIFY_PAYMENT_ORDER_SUCCESS,
	VERIFY_PAYMENT_ORDER_FAIL,
	CLEAR_ERRORS,
} from "../components/constants/paymentConstant";



//verifyPayment status
export const verifyPayment = (reference) => async (dispatch) => {
	try {
		dispatch({ type: VERIFY_PAYMENT_ORDER_REQUEST });

		const { data } = await axiosInstance.get(`/api/v1/verifyPayment?reference=${reference}`);
		console.log("pre verification data - ", data)

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
