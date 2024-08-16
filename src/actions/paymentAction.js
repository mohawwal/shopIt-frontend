import axios from "axios";
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
export const payment = (paymentData) => async (dispatch) => {
	try {
		dispatch({ type: MAKE_PAYMENT_ORDER_REQUEST });

		const { data } = await axios.post("/api/v1/startPayment", paymentData);
		

		dispatch({
			type: MAKE_PAYMENT_ORDER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: MAKE_PAYMENT_ORDER_FAIL,
			payload: error.response
				? error.response.data.error || error.message
				: error.message,
		});
	}
};


//verifyPayment status
export const verifyPayment = (reference) => async(dispatch) => {
    try {
        dispatch({ type: VERIFY_PAYMENT_ORDER_REQUEST });

        const { data } = await axios.get(`/api/v1/createPayment?reference=${reference}`);

        if(data.success) {
			dispatch({
				type: VERIFY_PAYMENT_ORDER_SUCCESS,
				payload: data
			});
			return { payload: data };
		} else {
			dispatch({
                type: VERIFY_PAYMENT_ORDER_FAIL,
                payload: "Payment verification failed."
            });
		}
		
    } catch (error) {
        dispatch({
            type: VERIFY_PAYMENT_ORDER_FAIL,
            payload: error.response?.data.message || error.message
        });
		throw error;
    }
};


//Clear Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};

