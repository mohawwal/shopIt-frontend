import {
    PAY_ORDER_REQUEST,
    PAY_ORDER_SUCCESS,
    PAY_ORDER_FAIL,

    VERIFY_PAY_ORDER_REQUEST,
	VERIFY_PAY_ORDER_SUCCESS,
	VERIFY_PAY_ORDER_FAIL,

    CLEAR_ERRORS
} from '../constants/paymentConstant'


export const paymentReducer = (state = {}, action) => {
    switch(action.type) {

        case PAY_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PAY_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case PAY_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
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

        case VERIFY_PAY_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case VERIFY_PAY_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case VERIFY_PAY_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
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
