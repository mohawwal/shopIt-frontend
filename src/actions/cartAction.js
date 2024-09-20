import axiosInstance from '../axios/axios'
import { ADD_TO_CART, REMOVE_ITEM_CART, CLEAR_CART, SAVE_SHIPPING_INFO } from '../components/constants/cartConstants'

export const addItemToCart =  (id, quantity) => async (dispatch, getState) => {
    const { data } = await axiosInstance.get(`/api/v1/product/${id}`)
    // //console.log("data from cart", data)
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const removeItemFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_ITEM_CART,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const clearCart = () => (dispatch) => {
    dispatch({
        type: CLEAR_CART
    });

    localStorage.setItem('cartItems', JSON.stringify([])); 
};


export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    });

    try {
        await localStorage.setItem('shippingInfo', JSON.stringify(data));
    } catch (error) {
        alert.error('Failed to save shipping info to localStorage:', error);
    }
};
