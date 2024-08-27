import {
    MAKE_PAYMENT_ORDER_REQUEST,
    MAKE_PAYMENT_ORDER_SUCCESS,
    MAKE_PAYMENT_ORDER_RESET,
    MAKE_PAYMENT_ORDER_FAIL,

    VERIFY_PAYMENT_ORDER_REQUEST,
	VERIFY_PAYMENT_ORDER_SUCCESS,
	VERIFY_PAYMENT_ORDER_FAIL,

    CLEAR_ERRORS
} from '../constants/paymentConstant'


export const paymentReducer = (state = {}, action) => {
    switch(action.type) {

        case MAKE_PAYMENT_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case MAKE_PAYMENT_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case MAKE_PAYMENT_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case MAKE_PAYMENT_ORDER_RESET:
            return {
                ...state,
                order: {}
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
