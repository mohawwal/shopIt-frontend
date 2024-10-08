import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DisplayPage from "./pages/displayPage/displayPage";
import ProductFolder from "./pages/productFolder/productFolder";
import ProductDetails from "./pages/productDetails/productDetails";
import Login from "./components/user/Login";
import Cart from "./components/cart/cart";
import NavCategory from "./pages/navCategory/navCategory";
import Register from "./components/user/register";
import Reviews from "./pages/reviews/reviews";
import UpdateProfile from "./components/user/updateProfile";
import UpdatePassword from "./components/user/updatePassword";
import ForgotPassword from "./components/user/forgotPassword";
import ResetPassword from "./components/user/resetPassword";
import Navbar from "./pages/navbar/navbar";
import NavDown from "./pages/navDown/navDown";
import Shipping from "./components/cart/shipping";
import Payment from "./components/cart/payment/payment";
import ListOrders from "./components/order/ListOrders/ListOrders";
import Profile from "./components/user/profile/profile";
import ProtectedRoute from "./components/route/protectedRoute";
import OrderDetails from "./components/order/orderDetails/orderDetails";
import DashBoard from "./components/admin/Dashboard/Dashboard";
import ProductList from "./components/admin/productList/productList";
import WishList from "./pages/wishList/WishList";
import NewProduct from "./components/admin/newProduct/newProduct";
import Shop from "./pages/shop/Shop";
import UpdateProduct from "./components/admin/updateProduct/UpdateProduct";
import OrderList from "./components/admin/ordersList/orderList";
import ProcessOrder from "./components/admin/processOrder/processOrder";
import Alert from "./components/alert/alert";
import PageFooter from "./pages/footer/pageFooter";
import UserList from "./components/admin/userList/UserList";
import UpdateUser from "./components/admin/updateUser/UpdateUser";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

import store from "./store";
import { loadUser } from "./actions/userAction";
import PeopleProduct from "./pages/peopleProduct/peopleProduct";
import Add from "./pages/Add";

function App() {

	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<div className="App">
			<Router>
				<nav className="upNav">
					<Navbar />
				</nav>

				<div>
					<Alert />
				</div>

				<Routes>
					<Route
						path="/"
						element={<DisplayPage />}
						exact
					/>
					<Route
						path="/category/:catId"
						element={<NavCategory />}
						exact
					/>
					<Route
						path="/product/category/:id"
						element={<ProductFolder />}
						exact
					/>
					<Route
						path="/product/:id"
						element={<ProductDetails />}
						exact
					/>
					<Route
						path="/products/:people"
						element={<PeopleProduct />}
						exact
					/>
					<Route
						path="/product/:id/reviews"
						element={<Reviews />}
						exact
					/>

					<Route
						path="/login"
						element={<Login />}
						exact
					/>
					<Route
						path="/register"
						element={<Register />}
						exact
					/>
					<Route
						path="/password/forgot"
						element={<ForgotPassword />}
						exact
					/>
					<Route
						path="/password/reset/:token"
						element={<ResetPassword />}
						exact
					/>
					<Route
						path="/cart"
						element={<Cart />}
						exact
					/>

					<Route
						path="/shipping"
						element={<Shipping />}
						exact
					/>

					<Route
						path="/orders/me"
						element={<ListOrders />}
						exact
					/>

					<Route
						path="/wishlist"
						element={<WishList />}
						exact
					/>

					<Route
						path="/shop"
						element={<Shop />}
						exact
					/>

					<Route
						path="/payment"
						element={<Payment />}
						exact
					/>

					<Route
						path="/add"
						element={<Add/>}
					/>

					{/* Protected Route if not authenticated user */}
					<Route element={<ProtectedRoute />}>
						<Route
							path="/me"
							element={<Profile />}
							exact
						/>

						<Route
							path="/me/Update"
							element={<UpdateProfile />}
							exact
						/>

						<Route
							path="/password/Update"
							element={<UpdatePassword />}
							exact
						/>

						<Route
							path="/order/:id"
							element={<OrderDetails />}
							exact
						/>

						<Route
							path="/dashboard"
							isAdmin={true}
							element={<DashBoard />}
							exact
						/>

						<Route
							path="/admin/products"
							isAdmin={true}
							element={<ProductList />}
							exact
						/>

						<Route
							path="/admin/product"
							isAdmin={true}
							element={<NewProduct />}
							exact
						/>

						<Route
							path="/admin/product/:productId"
							isAdmin={true}
							element={<UpdateProduct />}
							exact
						/>

						<Route
							path="/admin/orders"
							isAdmin={true}
							element={<OrderList />}
							exact
						/>

						<Route
							path="/admin/order/:orderId"
							isAdmin={true}
							element={<ProcessOrder />}
							exact
						/>

						<Route
							path="/admin/users"
							isAdmin={true}
							element={<UserList />}
							exact
						/>

						<Route
							path="/admin/user/:userId"
							isAdmin={true}
							element={<UpdateUser />}
							exact
						/>
						
					</Route>
					<Route path="*" element={<NotFoundPage />} />

				</Routes>
				<PageFooter />
				<nav className="bottomNav">
					<NavDown />
				</nav>
				
			</Router>
		</div>
	);
}

export default App;
