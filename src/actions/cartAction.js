import axios from 'axios'
import { ADD_TO_CART, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO } from '../components/constants/cartConstants'

export const addItemToCart =  (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`)
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
    const { data } = await axios.get(`/api/v1/product/${id}`)

    dispatch({
        type: REMOVE_ITEM_CART,
        payload: id
    })

    console.log(data)

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const saveShippingInfo = (data) => async (dispatch) => {
    console.log('Dispatching saveShippingInfo with data:', data);
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    });

    try {
        await localStorage.setItem('shippingInfo', JSON.stringify(data));
        console.log('Shipping info saved to localStorage');
    } catch (error) {
        console.error('Failed to save shipping info to localStorage:', error);
    }
};
