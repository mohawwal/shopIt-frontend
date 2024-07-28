import axios from 'axios'
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
} from '../components/constants/productConstants'



export const getProductCategory = ( category, currentPage = 1 ) => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_CATEGORY_REQUEST })

        const { data } = await axios.get(`/api/v1/category?category=${category}&page=${currentPage}`)

        dispatch({
            type: PRODUCT_CATEGORY_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: PRODUCT_CATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getProductDetails = (_id) => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/product/${_id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data?.product
        })

    } catch(error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getAllProducts = (keyword='') => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST })

        const { data } = await axios.get(`/api/v1/products?keyword=${keyword}`)

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

//Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}