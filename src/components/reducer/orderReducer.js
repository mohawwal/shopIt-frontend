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
    UPDATE_ORDER_RESET,
    UPDATE_ORDER_FAIL,

    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_RESET,
    DELETE_ORDER_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    CLEAR_ERRORS
} from '../constants/orderConstants'



export const createOrderReducer = (state = {}, action) => {
    switch(action.type) {

        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case CREATE_ORDER_FAIL:
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


export const myOrderReducer = (state = {orders: []}, action) => {
    switch(action.type) {
        case MY_ORDER_REQUEST:
            return {
                loading: true,
                orders: []
            }
        
        case MY_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case MY_ORDER_FAIL:
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


//get order details
export const getOrderDetailsReducer = (state = {order: {}}, action) => {
    switch(action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                loading: true,
            }
        
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case ORDER_DETAILS_FAIL:
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


//get order details
export const allOrderReducer = (state = {orders: []}, action) => {
    switch(action.type) {
        case ALL_ORDER_REQUEST:
            return {
                loading: true,
            }
        
        case ALL_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                totalAmount:action.payload.totalAmount
            }

        case ALL_ORDER_FAIL:
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




export const orderReducer = (state = {}, action) => {
    switch(action.type) {

        case DELETE_ORDER_REQUEST:
        case UPDATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: true
            }

        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: true
            }

        case DELETE_ORDER_FAIL:
        case UPDATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case UPDATE_ORDER_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case DELETE_ORDER_RESET:
            return {
                ...state,
                isDeleted: false
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