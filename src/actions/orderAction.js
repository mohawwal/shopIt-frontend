import axios from "axios";
import {

	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAIL,

	MY_ORDER_REQUEST,
	MY_ORDER_SUCCESS,
	MY_ORDER_FAIL,

	CLEAR_ERRORS,
} from "../components/constants/orderConstants";



//Add a new order
export const addOrder = (orderData) => async (dispatch) => {
	try {
		dispatch({type: CREATE_ORDER_REQUEST})

		const { data } = await axios.post("/api/v1/order/new", orderData)
		dispatch({
			type: CREATE_ORDER_SUCCESS,
			payload: data
		})

	} catch(error) {
		dispatch({
			type: CREATE_ORDER_FAIL,
			payload: error.payload
		})
	}

}

//Get currently logged in user orders
export const myOrder = (id) => async (dispatch) => {
	try {
		dispatch({ type: MY_ORDER_REQUEST })

		const { data } = await axios.post("/api/v1/orders/me", id); 

		dispatch({
			type: MY_ORDER_SUCCESS,
			payload: data,
		});

	} catch (error) {
		dispatch({
			type: MY_ORDER_FAIL,
			payload:  error.response.data.message,
		});
	}
};

//Clear Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
