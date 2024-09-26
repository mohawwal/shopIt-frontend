import {
    VERIFY_PAYMENT_ORDER_REQUEST,
	VERIFY_PAYMENT_ORDER_SUCCESS,
	VERIFY_PAYMENT_ORDER_FAIL,

    CLEAR_ERRORS
} from '../constants/paymentConstant'


export const verifyPaymentReducer = (state = {}, action) => {
    switch(action.type) {

        case VERIFY_PAYMENT_ORDER_REQUEST:
            return {
                ...state,
            }

        case VERIFY_PAYMENT_ORDER_SUCCESS:
            return {
                loading: false,
                status: action.payload
            }

        case VERIFY_PAYMENT_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload,
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}
