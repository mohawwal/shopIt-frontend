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
	deliveryLoc
}) => {

	const preShippingFee = 5000
	const shippingFee = parseFloat(preShippingFee.toFixed(0))

	const prevSubTotalPrice = cartItems.reduce((acc, items) => acc + Number(items.price), 0)
	const subTotalPrice = parseFloat(prevSubTotalPrice.toFixed(0))

	const prevTaskFee = subTotalPrice*10/100
	const taskFee = parseFloat(prevTaskFee.toFixed(0))

	const prevTotalPrice = subTotalPrice + taskFee + shippingFee
	const totalPrice = parseFloat(prevTotalPrice.toFixed(0))

	const navigate = useNavigate()

	const processToPayment = () => {
		const data = {
			shippingFee,
			subTotalPrice,
			taskFee,
			totalPrice
		}

		sessionStorage.setItem('orderInfo', JSON.stringify(data))
		navigate('/')
	}

	return (
		<div className="cartShip">
			<div className="d-wrapper">
				<div className="zig-zag-bottom zig-zag-top">
					<div className="inZag">
						<div className="yourOrder">YOUR ORDER SUMMARY</div>
						<div className="yourOrderItems">
							{cartItems &&
								cartItems.map((items) => (
									<div
										key={items.id}
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
												<p>{items.name}</p> <span>x{items.quantity}</span>
											</div>
										</div>
										<div className="yourOrderPrice">
											<p>₦{items.price * items.quantity.toLocaleString()}</p>
										</div>
									</div>
								))}
						</div>

						<div className="closingBalance">
							<div className="closing">
								<p>Subtotal</p>
								<span className="closePan">₦{subTotalPrice.toLocaleString()}</span>
							</div>
							<div className="closing">
								<p>Task</p>
								<span className="closePan">₦{taskFee.toLocaleString()}</span>
							</div>
							<div className="closing">
								<p>Shipping</p>
								<span className="shipSpanDet">
									<div className="spanDetIcon">
										<DeliveryFS className="deliveryIcon" />
									</div>
									<div className="spanDetText">
										<div>
											{deliveryAddress + ' ' + deliveryLoc + ' ' + deliveryState ||
												deliveryPark + ' ' + deliveryLoc + ' ' + deliveryState}
										</div>
									</div>
									<div className="spanDetPrice">
										₦{shippingFee.toLocaleString()}
									</div>
								</span>
							</div>
							<div className="closing closeTotal">
								<p>
									Total
									<DeliveryScooter className="navIcons" />
								</p>
								<span>₦{totalPrice.toLocaleString()}</span>
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
