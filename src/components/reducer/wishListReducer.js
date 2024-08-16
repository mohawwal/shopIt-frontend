import {
	ADD_TO_WISHLIST,
	REMOVE_FROM_WISHLIST
} from "../constants/wishListConstants";

export const wishListReducer = (state = { wishList: [] }, action) => {
	switch (action.type) {
		case ADD_TO_WISHLIST:
			const likeItem = action.payload;

			const isItemLiked = state.wishList.find(
				(i) => i.product === likeItem.product,
			);

			if (isItemLiked) {
				return state;
			} else {
				return {
					...state,
					wishList: [...state.wishList, likeItem]
				}
			}

		case REMOVE_FROM_WISHLIST:
			return {
				...state,
				wishList: state.wishList.filter((i) => i.product !== action.payload)
			}


		default:
			return state;
	}
};
