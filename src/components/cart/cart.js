import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./cart.css";
import { Link } from "react-router-dom";
import Cancel from "../../assets/svg/cancel";
import { addItemToCart, removeItemFromCart } from "../../actions/cartAction";

const Cart = () => {
	const dispatch = useDispatch();

	const { cartItems } = useSelector((state) => state.cart);

	const increaseQty = (id, quantity, stock) => {
		const newQty = quantity + 1;

		if (newQty > stock) return;
		dispatch(addItemToCart(id, newQty));
	};

	const decreaseQty = (id, quantity) => {
		const newQty = quantity - 1;

		if (newQty <= 0) return;
		dispatch(addItemToCart(id, newQty));
	};

	const removeCartItemHandler = (id) => {
		dispatch(removeItemFromCart(id));
	};
	

	const totalGoods = cartItems.reduce(
		(acc, item) => acc + Number(item.quantity),
		0,
	);
	const totalPrice = cartItems
		.reduce((acc, item) => acc + item.quantity * item.price, 0)
		.toFixed(0);

	const formattedTotalPrice = Number(totalPrice).toLocaleString();

	return (
		<div className="cart">
			<div className="shoppingCart">SHOPPING CART</div>
			<div className="wholeRow">
				{cartItems.length === 0 ? (
					<div className="EmptyCart">Your Cart is Empty</div>
				) : (
					<div className="allCartProp">
						<div className="cartSections">
							<div className="headingII">
								<div className="cancelII"></div>
								<div className="cartImgII"></div>
								<div className="cartProdII">PRODUCT</div>
								<div className="cartPriceII">PRICE</div>
								<div className="cartQtyII">QUANTITY</div>
								<div className="cartSubII">SUBTOTAL</div>
							</div>
							<div className="cartSmallList">
								{cartItems.map((item) => {
									return (
										<div>
											<div className="cartList">
												<div className="cartItems">
													<div className="cartItemImg">
														<img
															className="itemImg"
															src={item.image}
															alt="item_Image"
														/>
													</div>
													<div className="cartItemProp">
														<div className="itemProp itemStart spaceA">
															<div className="itemUp plainProp">
																<Link
																	className="itemUpName"
																	to={`/product/${item.product}`}
																>
																	{item.name.toUpperCase()}
																</Link>
															</div>

															<div
																className="itemDown"
																onClick={() =>
																	removeCartItemHandler(item.product)
																}
															>
																<Cancel className="cancelIcons" />
															</div>
														</div>
														<div className="itemProp spaceB">
															<div className="itemUp">PRICE</div>
															<div className="itemDown propsPrice">
																₦{item.price && item.price.toLocaleString()}
															</div>
														</div>
														<div className="itemProp spaceC">
															<div className="itemUp">QUANTITY</div>
															<div className="prodDetailsQty itemDown">
																<button
																	className="btnLeft"
																	onClick={() =>
																		decreaseQty(item.product, item.quantity)
																	}
																>
																	{" "}
																	-{" "}
																</button>
																<input
																	className="count"
																	type="number"
																	value={item.quantity}
																	readOnly
																/>
																<button
																	className="btnRight"
																	onClick={() =>
																		increaseQty(
																			item.product,
																			item.quantity,
																			item.stock,
																		)
																	}
																>
																	{" "}
																	+{" "}
																</button>
															</div>
														</div>
														<div className="itemProp spaceD">
															<div className="itemUp">SUBTOTAL</div>
															<div className="itemDown subTotalPrice">
															{`₦ ${(item.price * item.quantity).toFixed(2)}`}
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="onCartScreen">
												<div className="cartScreenII">
													<div
														className="cancelII"
														onClick={() => removeCartItemHandler(item.product)}
													>
														<Cancel className="cancelIcons" />
													</div>
													<div className="cartItemImgII">
														<img
															className="itemImg"
															src={item.image}
															alt="item_Image"
														/>
													</div>
													<div className=" plainProp cartProdII">
														<Link to={`product/${item.product}`}>
															{item.name.toUpperCase()}
														</Link>
													</div>
													<div className=" propsPrice cartPriceII">
														₦{item.price && item.price.toLocaleString()}
													</div>
													<div className="prodDetailsQty cartQtyII">
														<button
															className="btnLeft"
															onClick={() =>
																decreaseQty(item.product, item.quantity)
															}
														>
															{" "}
															-{" "}
														</button>
														<input
															className="count"
															type="number"
															value={item.quantity}
															readOnly
														/>
														<button
															className="btnRight"
															onClick={() =>
																increaseQty(
																	item.product,
																	item.quantity,
																	item.stock,
																)
															}
														>
															{" "}
															+{" "}
														</button>
													</div>
													<div className="itemDown subTotalPrice cartSubII">
														{`₦ ${(item.price * item.quantity).toFixed(0)}`}
													</div>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>

						<div className="OrderDetails">
							<div className="orderHead">CART TOTALS ({totalGoods})</div>
							<div className="listOrderSpaces">
								<div className="orderFlex">
									<p className="orWay">Total </p>
									<div className="inputOrderList">
										<p className="oDLarge">₦{formattedTotalPrice}</p>
									</div>
								</div>
							</div>
							<Link to='/shipping' className="checkOut">
								<button>PROCEED TO CHECKOUT</button>
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
