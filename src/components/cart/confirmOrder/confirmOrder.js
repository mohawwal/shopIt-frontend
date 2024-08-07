import "./confirmOrder.css";
import img from "../../../assets/images/image5.jpg";
import DeliveryScooter from "../../../assets/svg/deliveryScooter";
import DeliveryFS from "../../../assets/svg/deliveryFastShipping";
import { useNavigate } from "react-router-dom";


const ConfirmOrder = ({
	cartItems,
	isVerify,
	deliveryAddress,
	deliveryPark,
	deliveryState,
	deliveryLoc,
}) => {
	const preShippingFee = 5000;
	const shippingFee = parseFloat(preShippingFee.toFixed(0));

	const prevSubTotalPrice = cartItems.reduce(
		(acc, items) => acc + (Number(items.price) * Number(items.quantity)),
		0
	);
	
	const subTotalPrice = parseFloat(prevSubTotalPrice.toFixed(0));

	const prevTaskFee = (subTotalPrice * 10) / 100;
	const taskFee = parseFloat(prevTaskFee.toFixed(0));

	const prevTotalPrice = subTotalPrice + taskFee + shippingFee;
	const totalPrice = parseFloat(prevTotalPrice.toFixed(0));

	const navigate = useNavigate();

	const processToPayment = () => {
		const data = {
			shippingFee,
			subTotalPrice,
			taskFee,
			totalPrice,
			products: cartItems.map(item => ({
				name: item.name,
				quantity: item.quantity,
				price: item.price
			})),
		};

		sessionStorage.setItem("orderInfo", JSON.stringify(data));
		navigate("/payment");
	};

	return (
		<div className="cartShip">
			<div className="d-wrapper">
				<div className="zig-zag-bottom zig-zag-top">
					<div className="inZag">
						<div className="yourOrder">YOUR ORDER SUMMARY</div>
						<div className="yourOrderItems">
							{cartItems &&
								cartItems.map((item) => {
									const totalPrice = item.price * item.quantity;
									const formattedPrice = new Intl.NumberFormat("en-NG", {
										style: "currency",
										currency: "NGN",
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									}).format(totalPrice);

									return (
										<div
											key={item.id}
											className="allYourOrders"
										>
											<div className="yourOrderImage">
												<img
													src={img}
													alt="img"
												/>
											</div>
											<div className="yourOrderName">
												<div>
													<p>{item.name}</p> <span>x{item.quantity}</span>
												</div>
											</div>
											<div className="yourOrderPrice">
												<p>{formattedPrice}</p>
											</div>
										</div>
									);
								})}
						</div>

						<div className="closingBalance">

							<div className="closing closeTotal sl">
								<p>
									Subtotal
								</p>
								<span className="pl tPl">₦{subTotalPrice.toLocaleString()}</span>
							</div>

							<div className="closing closeTotal sl">
								<p>
									Tax
								</p>
								<span className="pl tPl">₦{taskFee.toLocaleString()}</span>
							</div>
							
							<div className="closing">
								<p>Shipping</p>
								<span className="shipSpanDet bl">
									<div className="spanDetIcon">
										<DeliveryFS className="deliveryIcon" />
									</div>
									<div className="spanDetText">
										<div>
											{deliveryAddress +
												" " +
												deliveryLoc +
												" " +
												deliveryState ||
												deliveryPark + " " + deliveryLoc + " " + deliveryState}
										</div>
									</div>
									<div className="spanDetPrice pl">
										₦{shippingFee.toLocaleString()}
									</div>
								</span>
							</div>

							<div className="closing closeTotal">
								<p>
									Total
									<DeliveryScooter className="navIcons" />
								</p>
								<span className="pl tPl">₦{totalPrice.toLocaleString()}</span>
							</div>

						</div>

						<div className="shipFoldBtn">
							<button
								type="submit"
								disabled={!isVerify}
								className={
									isVerify ? `shipBtn shipBtnYes` : `shipBtn shipBtnNo`
								}
								onClick={processToPayment}
							>
								Confirm Order Details
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmOrder;
