import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DisplayPage from "./pages/displayPage/displayPage";
import ProductFolder from "./pages/productFolder/productFolder";
import Footer from "./pages/footer/footer";
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

import store from "./store";
import { loadUser } from "./actions/userAction";
import Profile from "./components/user/profile/profile";
import ProtectedRoute from "./components/route/protectedRoute";

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

					</Route>
				</Routes>
				<Footer />
				<nav className="bottomNav">
					<NavDown />
				</nav>
			</Router>
		</div>
	);
}

export default App;
