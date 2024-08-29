import React, { useEffect, useState, useContext } from "react";
import "./productDetails.css";
import {
	clearErrors,
	getProductDetails,
	newReview,
} from "../../actions/productActions";
import { addItemToCart } from "../../actions/cartAction";
import Loading from "../loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import AlertContext from "../../components/alert/AlertContext";
import Love from "../../assets/svg/love";
import ArrowLeft from "../../assets/svg/arrowLeft";
import MetaData from "../../components/layouts/MetaData";
import { NEW_REVIEW_RESET } from "../../components/constants/productConstants";
import {
	addToWishList,
	removeFromWishList,
} from "../../actions/wishListAction";

const ProductDetails = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();

	const [, setAlert] = useContext(AlertContext);

	const showAlert = (message, type) => {
		setAlert({
			message,
			type,
		});
	};

	const {
		loading: detailsLoading,
		product: productDetails,
		error: detailsError,
	} = useSelector((state) => state.productDetails);
	const { user } = useSelector((state) => state.auth);
	const { wishList } = useSelector((state) => state.wishList);
	const { success, error } = useSelector((state) => state.newReview);

	const [activeProductInfo, setActiveProductInfo] = useState(0);
	const [showReviewText, setShowReviewText] = useState(false);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const [quantity, setQuantity] = useState(1);

	const isProductInWishList = wishList.some((item) => item.product === id);
	const [likeProduct, setLikeProduct] = useState(isProductInWishList);

	useEffect(() => {
		if (detailsError) {
			showAlert(detailsError, "error");
			dispatch(clearErrors());
		}

		if (error) {
			showAlert(error, "error");
			dispatch(clearErrors());
		}

		if (success) {
			showAlert('"Review Posted"', "success");
			dispatch({ type: NEW_REVIEW_RESET });
		}

		dispatch(getProductDetails(id));
	}, [detailsError, dispatch, error, id, success]);

	const handleClick = (index) => {
		setActiveProductInfo(activeProductInfo === index ? 0 : index);
	};

	const reviewHandler = () => {
		if (rating === 0 || comment.trim() === "") {
			//alert.error("Please provide a rating and a comment.");
			return;
		}

		const formData = new FormData();
		formData.set("rating", rating);
		formData.set("comment", comment);
		formData.set("productId", id);

		dispatch(newReview(formData));
	};

	const renderRatingStars = (ratingValue) => {
		return Array.from({ length: 5 }, (elem, index) => {
			const number = index + 0.1;
			return ratingValue >= index + 1 ? (
				<IoMdStar
					className="stars"
					key={index}
				/>
			) : ratingValue >= number ? (
				<IoMdStarHalf
					className="stars"
					key={index}
				/>
			) : (
				<IoMdStarOutline
					className="stars"
					key={index}
				/>
			);
		});
	};

	const addToCart = () => {
		dispatch(addItemToCart(`${id}`, quantity));
		showAlert("Item Added To Cart", "success");
	};

	const increaseQty = () => {
		if (quantity < productDetails.stock) {
			setQuantity(quantity + 1);
		}
	};

	const decreaseQty = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	const likeProductHandler = () => {
		const updatedLikeProduct = !likeProduct;
		setLikeProduct(updatedLikeProduct);

		if (updatedLikeProduct) {
			dispatch(addToWishList(id));
			showAlert("Product added to Favorite", "success");
		} else {
			dispatch(removeFromWishList(id));
			showAlert("Product removed from Favorite", "success");
		}
	};

	const ReviewTextHandler = () => {
		setShowReviewText(!showReviewText);
	};

	if (detailsLoading) {
		return <Loading />;
	}

	return (
		<div className="productDetails">
			<MetaData title="Zarmario store product" />
			<div className="headTop"></div>
			<div className="PD">
				<div
					className="backArrowPD"
					onClick={() => navigate(-1)}
				>
					<ArrowLeft className="icons ArrowLeft" />
					<span>Back</span>
				</div>

				<div className="PDSelectionBag">
					<div className="PDFolderImage">
						<div className="PDImage">
							<img
								src={productDetails.images && productDetails.images[0].url}
								alt="detailsIMG"
							/>
						</div>
					</div>

					<div className="PDDetailsFolder">
						<div className="PDCat">
							<span className="prodsCat">
								{productDetails.category &&
									productDetails.category.replace(/_/g, " ")}
							</span>
							<div className="detailsName">
								<div className="PDName">
									{productDetails.name && productDetails.name.toUpperCase()}
								</div>
								<div
									className="addLove"
									onClick={likeProductHandler}
								>
									<Love
										className="loveIcon"
										filled={likeProduct ? "red" : "rgb(24, 24, 24)"}
									/>
									<div>WishList</div>
								</div>
							</div>
						</div>

						<div className="PDReview">
							<div className="PDRatingStar">
								{renderRatingStars(productDetails.ratings)}
							</div>
							<div className="DRate">({productDetails.ratings})</div>
							<div>
								<GoDotFill className="dotIcon" />
							</div>
							<div>
								{productDetails.numberOfReviews}{" "}
								{productDetails.numberOfReviews > 1 ? "Reviews" : "Review"}
							</div>
						</div>

						<div className="commentsPD">{productDetails.description}</div>

						<div className="PDPriceComment">
							<div className="PDPrice">
								<span className="DPrice">₦{productDetails.price}</span>
								<span className="offPercent">10% off!</span>
							</div>
						</div>

						<div className="qtyCart">
							<div className="prodDetailsQty">
								<button
									className="btnLeft"
									onClick={decreaseQty}
								>
									{" "}
									-{" "}
								</button>
								<input
									className="count"
									type="number"
									value={quantity}
									readOnly
								/>
								<button
									className="btnRight"
									onClick={increaseQty}
								>
									{" "}
									+{" "}
								</button>
							</div>
							<button
								className="PDCart"
								onClick={addToCart}
								disabled={productDetails.stock === 0}
							>
								<span>Add to Cart</span>
							</button>
						</div>

						<div className="underline"></div>

						<div className="accordion">
							<div className="spanAcc">
								<div className="accordions-item">
									<button
										className={
											activeProductInfo === 0
												? "accordions-item-button active CProduct"
												: "accordions-item-button CProduct"
										}
										onClick={() => handleClick(0)}
									>
										-Details
									</button>
								</div>
								<div className="accordions-item">
									<button
										className={
											activeProductInfo === 1
												? "accordions-item-button active CPackage"
												: "accordions-item-button CPackage"
										}
										onClick={() => handleClick(1)}
									>
										Packaging
									</button>
								</div>
								<div className="accordions-item">
									<button
										className={
											activeProductInfo === 2
												? "accordions-item-button active CShipping"
												: "accordions-item-button CShipping"
										}
										onClick={() => handleClick(2)}
									>
										Shipping-
									</button>
								</div>
							</div>
						</div>

						<div className="PDContent">
							<div>
								{activeProductInfo === 0 && (
									<div className="activeProductContent">
										{productDetails.description}
									</div>
								)}
							</div>
							<div>
								{activeProductInfo === 1 && (
									<div className="activeProductContent">
										Lorem, ipsum dolor sit amet consectetur adipisicing elit.
										Sit cupiditate, natus eveniet esse unde dolore.
									</div>
								)}
							</div>
							<div>
								{activeProductInfo === 2 && (
									<div className="activeProductContent">
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Corporis magnam cum pariatur ea ad non natus nostrum quae?
									</div>
								)}
							</div>
						</div>

						<div className="underline"></div>

						{productDetails.numberOfReviews &&
						productDetails.numberOfReviews >= 1 ? (
							<div>
								<div className="PDRnR">
									<div className="PRnR">Reviews & Rating</div>
									{productDetails.numberOfReviews > 5 && (
										<Link
											to={`/product/${productDetails._id}/reviews`}
											className="PDR"
										>
											{/* <div>
												<FaArrowRightLong />
											</div> */}
										</Link>
									)}
								</div>

								<div>
									<div>
										{productDetails.reviews &&
											productDetails.reviews
												.slice(0, 5)
												.map((review, index) => {
													return (
														<div
															className="DRatings"
															key={index}
														>
															<div className="reviewD">
																<div className="DName">
																	{review.name && review.name.toUpperCase()}
																</div>
																<div className="starNo">
																	<div className="reviewRatingStar">
																		{renderRatingStars(review.rating)}
																	</div>
																	<div>
																		{" "}
																		<GoDotFill className="dotIcon" />{" "}
																	</div>
																	<div> ({review.rating})</div>
																</div>
															</div>
															<div>{review.comment}</div>
														</div>
													);
												})}
									</div>
								</div>
							</div>
						) : (
							<div></div>
						)}
						<div>
							{user ? (
								<div
									onClick={ReviewTextHandler}
									className="PostReview"
								>
									Post your review
								</div>
							) : (
								<button
									className="loginPostReview"
									onClick={() => navigate("/login")}
								>
									Login to post your review
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
			{showReviewText ? (
				<div className="postReviewBox">
					<div
						className="cancelShowReview"
						onClick={ReviewTextHandler}
					>
						cancel
					</div>
					<input
						value={rating}
						type="number"
						placeholder="rating this product from 0-5"
						min={0}
						max={5}
						onChange={(e) => {
							const value = Math.min(5, e.target.value);
							setRating(value);
						}}
					/>
					<textarea
						value={comment}
						placeholder="Write your review"
						onChange={(e) => setComment(e.target.value)}
					></textarea>{" "}
					<button
						onClick={() => {
							reviewHandler();
							ReviewTextHandler();
						}}
					>
						Post
					</button>
				</div>
			) : null}
		</div>
	);
};

export default ProductDetails;
