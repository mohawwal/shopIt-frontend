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

    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,

    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,

    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,

    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,

    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS, 
    NEW_REVIEW_FAIL,


    CLEAR_ERRORS
} from '../components/constants/productConstants'


export const getProductCategory = (category, currentPage = 1, price) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_CATEGORY_REQUEST });

        let link = `https://shopit-api-1.onrender.com/api/v1/category?category=${category}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`;
        const { data } = await axios.get(link);

        dispatch({
            type: PRODUCT_CATEGORY_SUCCESS,
            payload: data
        });

    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({
            type: PRODUCT_CATEGORY_FAIL,
            payload: errorMessage
        });
    }
};

export const getProductDetails = (_id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`https://shopit-api-1.onrender.com/api/v1/product/${_id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data?.product
        });

    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: errorMessage
        });
    }
};

export const newProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.post(`https://shopit-api-1.onrender.com/api/v1/admin/product/new`, productData, config);

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        });

    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: errorMessage
        });
    }
};

export const getAllProducts = (keyword = '', currentPage = 1) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });

        const { data } = await axios.get(`https://shopit-api-1.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}`);

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        });

    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: errorMessage
        });
    }
};

export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.put(`https://shopit-api-1.onrender.com/api/v1/review`, reviewData, config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: errorMessage
        });
    }
};

export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCT_REQUEST });

        const { data } = await axios.get(`https://shopit-api-1.onrender.com/api/v1/admin/products`);

        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data.products
        });

    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: errorMessage
        });
    }
};

export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.put(`https://shopit-api-1.onrender.com/api/v1/admin/product/${id}`, productData, config);
        console.log("update product", data);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: errorMessage
        });
        console.log("update product error", error);
    }
};

export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });

        const { data } = await axios.delete(`https://shopit-api-1.onrender.com/api/v1/admin/product/${id}`);

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: errorMessage
        });
    }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};
