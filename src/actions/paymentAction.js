import axios from "axios";
import {
	PAY_ORDER_REQUEST,
	PAY_ORDER_SUCCESS,
	PAY_ORDER_FAIL,

	VERIFY_PAY_ORDER_REQUEST,
	VERIFY_PAY_ORDER_SUCCESS,
	VERIFY_PAY_ORDER_FAIL,

	CLEAR_ERRORS,
} from "../components/constants/paymentConstant";


//pay for an order
export const payment = (paymentData) => async (dispatch) => {
	try {
		dispatch({ type: PAY_ORDER_REQUEST });

		const { data } = await axios.post("/api/v1/payment/process", paymentData);
		

		dispatch({
			type: PAY_ORDER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PAY_ORDER_FAIL,
			payload: error.response
				? error.response.data.error || error.message
				: error.message,
		});
	}
};


//verifyPayment status
export const verifyPayment = (reference) => async(dispatch) => {
    try {
        dispatch({ type: VERIFY_PAY_ORDER_REQUEST });

        const { data } = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`);

        dispatch({
            type: VERIFY_PAY_ORDER_SUCCESS,
            payload: data
        });
		
    } catch (error) {
        dispatch({
            type: VERIFY_PAY_ORDER_FAIL,
            payload: error.response
        });
    }
};


//Clear Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};

