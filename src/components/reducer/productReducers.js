import {

    PRODUCT_CATEGORY_REQUEST,
    PRODUCT_CATEGORY_SUCCESS,
    PRODUCT_CATEGORY_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_FOR_CATEGORY_REQUEST,
    PRODUCT_FOR_CATEGORY_SUCCESS,
    PRODUCT_FOR_CATEGORY_FAIL,

    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_FAIL,

    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,

    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS, 
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,

    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_FAIL,

    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_FAIL,

    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,

    CLEAR_ERRORS

} from '../constants/productConstants'


export const productCategoryReducer = ( state = { products: [], category: '' }, action ) => {
    switch(action.type) {

        case PRODUCT_FOR_CATEGORY_REQUEST:
        case PRODUCT_CATEGORY_REQUEST:
            return {
                loading: true,
                products: [],
                category: ''
            }

        case PRODUCT_FOR_CATEGORY_SUCCESS:
        case PRODUCT_CATEGORY_SUCCESS:
            return {
                loading: false,
                productsCount: action.payload.productsCount,
                resPerPage: action.payload.resPerPage,
                pageNo: action.payload.pageNo,
                category: action.payload.category,
                products: action.payload.products,
            }
        
        case PRODUCT_FOR_CATEGORY_FAIL:
        case PRODUCT_CATEGORY_FAIL:
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
            return state
    }
}


export const productPeopleReducer = ( state = { products: [] }, action ) => {
    switch(action.type) {

        case PRODUCT_FOR_CATEGORY_REQUEST:
            return {
                loading: true,
                products: [],
            }

        case PRODUCT_FOR_CATEGORY_SUCCESS:
            return {
                loading: false,
                productsCount: action.payload.productsCount,
                resPerPage: action.payload.resPerPage,
                pageNo: action.payload.pageNo,
                products: action.payload.products,
            }
        
        case PRODUCT_FOR_CATEGORY_FAIL:
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
            return state
    }
}

export const productDetailsReducer = (state = {product: {}}, action) => {
    switch (action.type) {

        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        
        case PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }    
        
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }   

        default:
            return state
    }
}


export const allProductsReducer = (state = {products: []}, action) => {
    switch(action.type) {

        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }

        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                pageNo: action.payload.pageNo
            }

        case ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }

        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
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
            return state
    }
}


export const productReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: true
            }

        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: true
            }

        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                loading: false,
                isDeleted: false
            }

        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                loading: false,
                isUpdated: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}


export const newProductReducer = (state = { product: {} }, action) => {
    switch(action.type) {

        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product
            }

        case NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false
            }

        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}


export const newReviewReducer = (state = {}, action) => {
    switch(action.type) {

        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}