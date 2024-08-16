import axios from "axios";
import {

	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAIL,

	MY_ORDER_REQUEST,
	MY_ORDER_SUCCESS,
	MY_ORDER_FAIL,

	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,

	CLEAR_ERRORS,
} from "../components/constants/orderConstants";


//Add a new order
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
        console.error("Error adding order:", error.response ? error.response.data : error.message); // Log detailed error
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response ? error.response.data.message : error.message
        });
    }
}


//Get currently logged in user orders
export const myOrder = () => async (dispatch) => {
	try {
		dispatch({ type: MY_ORDER_REQUEST })

		const { data } = await axios.get("/api/v1/orders/me"); 

		dispatch({
			type: MY_ORDER_SUCCESS,
			payload: data.order,
		});

	} catch (error) {
		console.log('Error:', error.response.data.message);
		dispatch({
			type: MY_ORDER_FAIL,
			payload: error.response.data.message,
		});
	}
	
};


export const getOrderDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: ORDER_DETAILS_REQUEST })

		const { data } = await axios.get(`/api/v1/order/${id}`); 

		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data.order,
		});


	} catch (error) {
		console.log('Error:', error.response.data.message);
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload: error.response.data.message,
		});
	}
	
};

//Clear Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
