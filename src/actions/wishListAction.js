import axiosInstance  from '../axios/axios'
import {
    ADD_TO_WISHLIST,
    REMOVE_FROM_WISHLIST
} from '../components/constants/wishListConstants'

export const addToWishList = (id) => async (dispatch, getState) => {
   
    const {data} = await axiosInstance.get(`/api/v1/product/${id}`)
    dispatch({
        type: ADD_TO_WISHLIST,
        payload: {
            product: data.product._id,
			name: data.product.name,
			price: data.product.price,
			image: data.product.images[0].url
        }
    })

    localStorage.setItem('wishList', JSON.stringify(getState().wishList.wishList))

}

export const removeFromWishList = (id) => async(dispatch, getState) => {

    dispatch({
        type: REMOVE_FROM_WISHLIST,
        payload: id
    })

    localStorage.setItem('wishList', JSON.stringify(getState().wishList.wishList))
}