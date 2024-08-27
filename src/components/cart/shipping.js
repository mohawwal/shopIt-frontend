import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import { Field, ErrorMessage, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import CheckoutSteps from "./checkoutSteps";
import { useNavigate } from "react-router-dom";
import DeliveryScooter from "../../assets/svg/deliveryScooter";
import DeliveryFS from "../../assets/svg/deliveryFastShipping";

const Shipping = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const No1 = Math.floor(Math.random() * 5) + 1;
	const No2 = Math.floor(Math.random() * 5) + 1;
	const totalNo = No1 + No2;

	const { shippingInfo } = useSelector((state) => state.cart);
	const { user, isAuthenticated } = useSelector((state) => state.auth);
	const { cartItems } = useSelector((state) => state.cart);

	const prevShippingPrice = 5000;
	const shippingPrice = parseFloat(prevShippingPrice.toFixed(0));

	const prevItemsPrice = cartItems.reduce(
		(acc, item) => acc + Number(item.price) * Number(item.quantity),
		0,
	);
	const itemsPrice = parseFloat(prevItemsPrice.toFixed(0));

	const prevTaxPrice = (itemsPrice * 10) / 100;
	const taxPrice = parseFloat(prevTaxPrice.toFixed(0));

	const prevTotalPrice = itemsPrice + taxPrice + shippingPrice;
	const totalPrice = parseFloat(prevTotalPrice.toFixed(0));

	const [isVerify, setIsVerify] = useState(false);

	const verifyFunc = (e) => {
		const inputVerifyNo = parseInt(e.target.value);

		if (totalNo === inputVerifyNo) {
			setIsVerify(true);
		} else {
			setIsVerify(false);
		}
	};

	const phoneRegExp = /^[0-9+-]{6,}$/;

	const validationSchema = Yup.object().shape({
		firstName: Yup.string()
			.min(3, "First Name must be at least 3 characters long")
			.max(20, "First Name cannot exceed 20 characters")
			.required("First Name is required"),

		lastName: Yup.string()
			.min(3, "Last Name must be at least 3 characters long")
			.max(20, "Last Name cannot exceed 20 characters")
			.required("Last Name is required"),

		email: Yup.string()
			.email("Invalid email format")
			.required("Email is required"),

		streetAddress: Yup.string().required("Street Address is required"),

		location: Yup.string().required("Location is required"),

		park: Yup.string().when("isLagos", {
			is: false,
			then: (schema) => schema.required("Park location is required"),
			otherwise: (schema) => schema.notRequired(),
		}),

		state: Yup.string().when("isLagos", {
			is: false,
			then: (schema) => schema.required("State is required"),
			otherwise: (schema) => schema.notRequired(),
		}),

		phoneNo: Yup.string()
			.matches(phoneRegExp, "Invalid phone number format")
			.required("Phone Number is required"),

		orderNote: Yup.string()
			.min(3, "Note message must be at least 3 characters long")
			.max(50, "Note message cannot exceed 50 characters"),
	});

	const formik = useFormik({
		initialValues: {
			isLagos: true,

			firstName: shippingInfo.firstName || "",
			lastName: (user && user.name) || shippingInfo.lastName || "",
			email: (user && user.email) || shippingInfo.email || "",
			streetAddress: shippingInfo.streetAddress || "",
			location: shippingInfo.location || "",
			state: shippingInfo.state || "",
			park: shippingInfo.park || "",
			phoneNo: shippingInfo.phoneNo || "",
			orderNote: shippingInfo.orderNote || "Null",
		},

		validationSchema: validationSchema,
		validateOnChange: true,
		validateOnBlur: true,

		onSubmit: (values) => {
			let shippingData = {};

			if (values.isLagos) {
				shippingData = {
					firstName: values.firstName,
					lastName: values.lastName,
					email: values.email,
					streetAddress: values.streetAddress,
					location: values.location,
					state: "Lagos State",
					phoneNo: values.phoneNo,
					orderNote: values.orderNote,
				};
			} else {
				shippingData = {
					firstName: values.firstName,
					lastName: values.lastName,
					email: values.email,
					location: values.location,
					state: values.state,
					park: values.park,
					phoneNo: values.phoneNo,
					orderNote: values.orderNote,
				};
			}

			const data = {
				itemsPrice,
				taxPrice,
				shippingPrice,
				totalPrice,
				orderItems: cartItems.map((item) => ({
					product: item.product,
					name: item.name,
					price: item.price,
					image: item.image,
					quantity: item.quantity,
				})),
				shippingInfo: {
					name: formik.values.firstName + " " + formik.values.lastName,
					email: formik.values.email,
					streetAddress: formik.values.streetAddress,
					location: formik.values.location,
					state: formik.values.state,
					park: formik.values.park,
					phoneNo: formik.values.phoneNo,
					orderNote: formik.values.orderNote,
				},
			};

			sessionStorage.setItem("orderInfo", JSON.stringify(data));
			navigate("/payment");

			dispatch(saveShippingInfo(shippingData));
		},
	});

	return (
		<div className="cart shipping">
			<div className="checkShip">
				<CheckoutSteps
					shipping
					confirmOrder
				/>
			</div>
			<FormikProvider value={formik}>
				<form
					onSubmit={formik.handleSubmit}
					className="shipForm"
				>
					<div className="shippingCart">
						<div className="shippingShip">
							<div>
								{isAuthenticated ? null : (
									<div className="shipLog">
										<p>
											Returning customer?{" "}
											<Link
												to="/login"
												className="LogLink"
											>
												Click here to login
											</Link>
										</p>
									</div>
								)}
							</div>
							<div className="billingDetails">BILLING DETAILS</div>
							<div className="shipDetails">
								<p>
									Order delivery{" "}
									<span>
										within Lagos State will be sent directly to your delivery
										address,
									</span>{" "}
									while orders{" "}
									<span>
										outside Lagos State will be sent to the park Submitted.
									</span>{" "}
									Ensure to input the right delivery details and contact the
									customer care if you need any help
								</p>
							</div>

							{/* use checkbox to check if you are in lagos or another state. */}
							<div className="shipFormCat checkShips">
								<Field
									type="checkbox"
									name="isLagos"
									placeholder="For delivery outside Lagos"
									className="custom-checkbox"
								/>
								<div>
									<div className="deliveryText"><p style={{color: "white"}}>Delivery within Lagos</p></div>
								</div>
							</div>

							{/* if user select lagos, bring this form */}
							{formik.values.isLagos ? (
								<div>
									<div className="shipNameForm">
										<div className="shipFormCat">
											<label
												className="shippingName"
												htmlFor="name_field"
											>
												First name<span>*</span>
											</label>
											<Field
												type="text"
												name="firstName"
												placeholder="First Name"
												className="field"
												value={formik.values.firstName}
												onChange={formik.handleChange}
											/>
											<ErrorMessage
												name="firstName"
												component="div"
												className="errorMsg"
											/>
										</div>

										<div className="shipFormCat shipFormCatLast">
											<label
												className="shippingName"
												htmlFor="name_field"
											>
												Last name<span>*</span>
											</label>
											<Field
												type="text"
												name="lastName"
												placeholder="Last Name"
												className="field"
												value={formik.values.lastName}
												onChange={formik.handleChange}
											/>
											<ErrorMessage
												name="lastName"
												component="div"
												className="errorMsg"
											/>
										</div>
									</div>

									<div className="shipFormCat">
										<label
											className="shippingName"
											htmlFor="email_field"
										>
											Email Address<span>*</span>
										</label>
										<Field
											type="email"
											name="email"
											placeholder="name@email.com"
											className="field"
											value={formik.values.email}
											onChange={formik.handleChange}
										/>
										<ErrorMessage
											name="email"
											component="div"
											className="errorMsg"
										/>
									</div>

									<div className="shipFormCat">
										<label
											className="shippingName"
											htmlFor="email_field"
										>
											Street Address<span>*</span>
										</label>
										<Field
											type="text"
											name="streetAddress"
											placeholder="Example: 4, zarmario street, off mario street"
											className="field"
											value={formik.values.streetAddress}
											onChange={formik.handleChange}
										/>
										<ErrorMessage
											name="streetAddress"
											component="div"
											className="errorMsg"
										/>
									</div>
									<div className="shipFormCat">
										<label
											className="shippingName"
											htmlFor="email_field"
										>
											Enter location<span>*</span>
										</label>
										<Field
											type="text"
											name="location"
											placeholder="Example: Ikoyi"
											className="field"
											value={formik.values.location}
											onChange={formik.handleChange}
										/>
										<ErrorMessage
											name="location"
											component="div"
											className="errorMsg"
										/>
									</div>

									<div className="shipFormCat">
										<label
											className="shippingName"
											htmlFor="email_field"
										>
											Enter PhoneNo<span>*</span>
										</label>
										<Field
											type="tel"
											name="phoneNo"
											placeholder="Example: 0801234567"
											className="field"
											value={formik.values.phoneNo}
											onChange={formik.handleChange}
										/>
										<ErrorMessage
											name="phoneNo"
											component="div"
											className="errorMsg"
										/>
									</div>
								</div>
							) : (
								//if it is not in lagos
								<div>
									<div className="shipNameForm">
										<div className="shipFormCat">
											<label
												className="shippingName"
												htmlFor="name_field"
											>
												First name<span>*</span>
											</label>
											<Field
												type="text"
												name="firstName"
												placeholder="First Name"
												className="field"
												value={formik.values.firstName}
												onChange={formik.handleChange}
											/>
											<ErrorMessage
												name="firstName"
												component="div"
												className="errorMsg"
											/>
										</div>

										<div className="shipFormCat shipFormCatLast">
											<label
												className="shippingName"
												htmlFor="name_field"
											>
												Last name<span>*</span>
											</label>
											<Field
												type="text"
												name="lastName"
												placeholder="Last Name"
												className="field"
												value={formik.values.lastName}
												onChange={formik.handleChange}
											/>
											<ErrorMessage
												name="lastName"
												component="div"
												className="errorMsg"
											/>
										</div>
									</div>

									<div className="shipFormCat">
										<label
											className="shippingName"
											htmlFor="email_field"
										>
											Email Address<span>*</span>
										</label>
										<Field
											type="email"
											name="email"
											placeholder="name@email.com"
											className="field"
											value={formik.values.email}
											onChange={formik.handleChange}
										/>
										<ErrorMessage
											name="email"
											component="div"
											className="errorMsg"
										/>
									</div>
									<div className="shipFormCat">
										<label
											className="shippingName"
											htmlFor="email_field"
										>
											Enter PhoneNo<span>*</span>
										</label>
										<Field
											type="tel"
											name="phoneNo"
											placeholder="Example: 0801234567"
											className="field"
											value={formik.values.phoneNo}
											onChange={formik.handleChange}
										/>
										<ErrorMessage
											name="phoneNo"
											component="div"
											className="errorMsg"
										/>
									</div>
									<div className="shipFormCat">
										<label
											className="shippingName"
											htmlFor="email_field"
										>
											State<span>*</span>
										</label>
										<Field
											type="text"
											name="state"
											placeholder="Example: Abuja"
											className="field"
											value={formik.values.state}
											onChange={formik.handleChange}
										/>
										<ErrorMessage
											name="state"
											component="div"
											className="errorMsg"
										/>
									</div>

									<div className="shipFormCat">
										<label
											className="shippingName"
											htmlFor="park_field"
										>
											park destination<span>*</span>
										</label>
										<Field
											type="text"
											name="park"
											placeholder="Example: wuse motor park, Gwagalaga road"
											className="field"
											value={formik.values.park}
											onChange={formik.handleChange}
										/>
										<ErrorMessage
											name="park"
											component="div"
											className="errorMsg"
										/>
									</div>

									<div className="shipFormCat">
										<label
											className="shippingName"
											htmlFor="email_field"
										>
											Enter location<span>*</span>
										</label>
										<Field
											type="text"
											name="location"
											placeholder="Example: Ikoyi"
											className="field"
											value={formik.values.location}
											onChange={formik.handleChange}
										/>
										<ErrorMessage
											name="location"
											component="div"
											className="errorMsg"
										/>
									</div>

								</div>
							)}

							<div className="shipVerifyEnd shipFormCat">
								<label
									htmlFor="verify_field"
									className="shippingName"
								>
									Verify that you're human<span>*</span>
								</label>
								<div className="verifySpace">
									<div>
										{!isVerify ? (
											<p className="verifyQst">
												{No1} + {No2} =
											</p>
										) : null}
									</div>
									<input
										type="text"
										placeholder="Answer?"
										name="verifyNo"
										onChange={verifyFunc}
									/>
								</div>
								{isVerify ? (
									<p className="verifyText">Verified</p>
								) : (
									<p className="errorMsg">Not Verified</p>
								)}
							</div>

							<div className="shipNoteCat">
								<label
									htmlFor="orderNote"
									className="shippingName"
								>
									Order note (optional)<span>*</span>
								</label>
								<Field
									as="textarea"
									name="orderNote"
									placeholder="Note about your order e.g. special delivery note or delivery instruction"
									className="orderNote"
									value={formik.values.orderNote}
									onChange={formik.handleChange}
								/>
								<ErrorMessage
									name="orderNote"
									component="div"
									className="errorMsg"
								/>
							</div>
						</div>

						<div className="cartShip">
							<div className="d-wrapper">
								<div className="zig-zag-bottom zig-zag-top">
									<div className="inZag">
										<div className="yourOrder">YOUR ORDER SUMMARY</div>
										<div className="yourOrderItems">
											{cartItems && cartItems.length > 0 ? (
												cartItems.map((item) => {
													const totalPrice = item.price * item.quantity;
													const formattedPrice = new Intl.NumberFormat(
														"en-NG",
														{
															style: "currency",
															currency: "NGN",
															minimumFractionDigits: 2,
															maximumFractionDigits: 2,
														},
													).format(totalPrice);

													return (
														<div
															key={item._id}
															className="allYourOrders"
														>
															<div className="yourOrderImage">
																<img
																	src={item.image}
																	alt="img"
																/>
															</div>
															<div className="yourOrderName">
																<div>
																	<p>{item.name}</p>{" "}
																	<span>x{item.quantity}</span>
																</div>
															</div>
															<div className="yourOrderPrice">
																<p>{formattedPrice}</p>
															</div>
														</div>
													);
												})
											) : (
												<p>No items in the cart</p>
											)}
										</div>

										<div className="closingBalance">
											<div className="closing closeTotal sl">
												<p>Subtotal</p>
												<span className="pl tPl">
													₦{itemsPrice.toLocaleString()}
												</span>
											</div>

											<div className="closing closeTotal sl">
												<p>Tax</p>
												<span className="pl tPl">
													₦{taxPrice.toLocaleString()}
												</span>
											</div>

											<div className="closing">
												<p>Shipping</p>
												<span className="shipSpanDet bl">
													<div className="spanDetIcon">
														<DeliveryFS className="deliveryIcon" />
													</div>
													<div className="spanDetText">
														<div>
															{formik.values.streetAddress +
																" " +
																formik.values.location +
																" " +
																formik.values.state ||
																formik.values.park +
																	" " +
																	formik.values.location +
																	" " +
																	formik.values.state}
														</div>
													</div>
													<div className="spanDetPrice pl">
														₦{shippingPrice.toLocaleString()}
													</div>
												</span>
											</div>

											<div className="closing closeTotal">
												<p>
													Total
													<DeliveryScooter className="navIcons" />
												</p>
												<span className="pl tPl">
													₦{totalPrice.toLocaleString()}
												</span>
											</div>
										</div>

										<div className="shipFoldBtn">
											<button
												type="submit"
												disabled={!isVerify}
												className={
													isVerify ? `shipBtn shipBtnYes` : `shipBtn shipBtnNo`
												}
											>
												Confirm Order Details
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</FormikProvider>
		</div>
	);
};

export default Shipping;
