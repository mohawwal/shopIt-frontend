import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
	productCategoryReducer,
	productDetailsReducer,
	allProductsReducer,
} from "./components/reducer/productReducers";
import {
	authReducer,
	userReducer,
	forgotPasswordReducer,
} from "./components/reducer/userReducer";
import { cartReducer } from "./components/reducer/cartReducers";


const reducer = combineReducers({
	productCategory: productCategoryReducer,
	productDetails: productDetailsReducer,
	allProducts: allProductsReducer,
	auth: authReducer,
	user: userReducer,
	forgotPassword: forgotPasswordReducer,
	cart: cartReducer,
});


let initialState = {
	cart: {
		cartItems: localStorage.getItem("cartItems")
			? JSON.parse(localStorage.getItem("cartItems"))
			: [], 
		shippingInfo: localStorage.getItem("shippingInfo")
			? JSON.parse(localStorage.getItem("shippingInfo"))
			: {},
	}
};


const middleware = [thunk];
const store = createStore(
	reducer,
    initialState,
	composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
