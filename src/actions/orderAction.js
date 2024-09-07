import axios from 'axios';
import {

	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAIL,

	MY_ORDER_REQUEST,
	MY_ORDER_SUCCESS,
	MY_ORDER_FAIL,

	ALL_ORDER_REQUEST,
	ALL_ORDER_SUCCESS,
	ALL_ORDER_FAIL,

	UPDATE_ORDER_REQUEST,
	UPDATE_ORDER_SUCCESS,
	UPDATE_ORDER_FAIL,

	DELETE_ORDER_REQUEST,
	DELETE_ORDER_SUCCESS,
	DELETE_ORDER_FAIL,

	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,

	CLEAR_ERRORS,
} from "../components/constants/orderConstants";

// Add a new order
export const addOrder = (orderData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });

        const { data } = await axios.post("/api/v1/order/new", orderData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        });

    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: errorMessage
        });
    }
}

// Get currently logged in user orders
export const myOrder = () => async (dispatch) => {
	try {
		dispatch({ type: MY_ORDER_REQUEST });

		const { data } = await axios.get("/api/v1/orders/me");

		dispatch({
			type: MY_ORDER_SUCCESS,
			payload: data.order,
		});

	} catch (error) {
		const errorMessage = error.response ? error.response.data.message : error.message;
		dispatch({
			type: MY_ORDER_FAIL,
			payload: errorMessage,
		});
	}
};

export const getOrderDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: ORDER_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/v1/order/${id}`);

		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data.order,
		});

	} catch (error) {
		const errorMessage = error.response ? error.response.data.message : error.message;
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload: errorMessage,
		});
	}
};

export const getAllOrder = () => async (dispatch) => {
	try {
		dispatch({ type: ALL_ORDER_REQUEST });

		const { data } = await axios.get(`/api/v1/admin/orders`);

		dispatch({
			type: ALL_ORDER_SUCCESS,
			payload: data,
		});

	} catch (error) {
		const errorMessage = error.response ? error.response.data.message : error.message;
		dispatch({
			type: ALL_ORDER_FAIL,
			payload: errorMessage,
		});
	}
};

export const updateOrder = (id, orderData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_ORDER_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderData, config);

		dispatch({
			type: UPDATE_ORDER_SUCCESS,
			payload: data.success,
		});

	} catch (error) {
		const errorMessage = error.response ? error.response.data.message : error.message;
		dispatch({
			type: UPDATE_ORDER_FAIL,
			payload: errorMessage,
		});
	}
};

// Delete order
export const deleteOrder = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_ORDER_REQUEST });

		const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

		dispatch({
			type: DELETE_ORDER_SUCCESS,
			payload: data.success,
		});

	} catch (error) {
		const errorMessage = error.response ? error.response.data.message : error.message;
		dispatch({
			type: DELETE_ORDER_FAIL,
			payload: errorMessage,
		});
	}
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
