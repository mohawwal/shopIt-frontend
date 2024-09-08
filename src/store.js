import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
	productCategoryReducer,
	productDetailsReducer,
	allProductsReducer,
	newProductReducer,
	newReviewReducer,
	productReducer,
} from "./components/reducer/productReducers";
import {
	authReducer,
	userReducer,
	forgotPasswordReducer,
	allUserReducer,
	getUsersDetailsReducer,
	UpdateUserReducer
} from "./components/reducer/userReducer";
import { cartReducer } from "./components/reducer/cartReducers";
import {
	createOrderReducer,
	myOrderReducer,
	getOrderDetailsReducer,
	allOrderReducer,
	orderReducer,
} from "./components/reducer/orderReducer";
import {
	paymentReducer,
	verifyPaymentReducer,
} from "./components/reducer/paymentReducer";
import { wishListReducer } from "./components/reducer/wishListReducer";

const reducer = combineReducers({
	productCategory: productCategoryReducer,
	productDetails: productDetailsReducer,
	allProducts: allProductsReducer,
	newProduct: newProductReducer,
	product: productReducer,
	newReview: newReviewReducer,
	auth: authReducer,
	user: userReducer,
	allUsers: allUserReducer,
	getUsersDetails: getUsersDetailsReducer,
	UpdateUser: UpdateUserReducer,
	forgotPassword: forgotPasswordReducer,
	cart: cartReducer,
	payment: paymentReducer,
	verifyPayment: verifyPaymentReducer,
	createOrder: createOrderReducer,
	myOrder: myOrderReducer,
	getOrderDetails: getOrderDetailsReducer,
	allOrder: allOrderReducer,
	order: orderReducer,
	wishList: wishListReducer,
});

let initialState = {
	cart: {
		cartItems: localStorage.getItem("cartItems")
			? JSON.parse(localStorage.getItem("cartItems"))
			: [],
		shippingInfo: localStorage.getItem("shippingInfo")
			? JSON.parse(localStorage.getItem("shippingInfo"))
			: {},
	},
	wishListItems: {
		wishList: localStorage.getItem("wishList")
			? JSON.parse(localStorage.getItem("wishList"))
			: [],
	},
};

const middleware = [thunk];
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;