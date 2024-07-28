import {

    PRODUCT_CATEGORY_REQUEST,
    PRODUCT_CATEGORY_SUCCESS,
    PRODUCT_CATEGORY_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,

    CLEAR_ERRORS

} from '../constants/productConstants'


export const productCategoryReducer = ( state = { products: [], category: '' }, action ) => {
    switch(action.type) {

        case PRODUCT_CATEGORY_REQUEST:
            return {
                loading: true,
                products: [],
                category: ''
            }

        case PRODUCT_CATEGORY_SUCCESS:
            return {
                loading: false,
                productsCount: action.payload.productsCount,
                resPerPage: action.payload.resPerPage,
                pageNo: action.payload.pageNo,
                category: action.payload.category,
                products: action.payload.products,
            }

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
            return {
                loading: true,
                products: []
            }

        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount
            }

        case ALL_PRODUCT_FAIL:
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