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
import ViewHide from "../../assets/svg/viewHide";
import ViewShow from "../../assets/svg/viewShow";
import AlertContext from "../../components/alert/AlertContext";
import Love from "../../assets/svg/love";
import ArrowLeft from "../../assets/svg/arrowLeft";
import MetaData from "../../components/layouts/MetaData";
import { NEW_REVIEW_RESET } from "../../components/constants/productConstants";
import {
	addToWishList,
	removeFromWishList,
} from "../../actions/wishListAction";
import Cart from "../../assets/svg/cart";
import { getProductCategory } from "../../actions/productActions";
import Loader from "../loader/loader";

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
	// console.log(productDetails)

	const { loading, products, pageNo } = useSelector(
		(state) => state.productCategory,
	);

	// const { user } = useSelector((state) => state.auth);
	const { wishList } = useSelector((state) => state.wishList);
	const { success, error } = useSelector((state) => state.newReview);

	//const [activeProductInfo, setActiveProductInfo] = useState(0);
	const [showReviewText, setShowReviewText] = useState(false);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const [quantity, setQuantity] = useState(1);

	const isProductInWishList = wishList.some((item) => item.product === id);
	const [likeProduct, setLikeProduct] = useState(isProductInWishList);

	useEffect(() => {
		if (productDetails.category) {
			dispatch(getProductCategory(productDetails.category, pageNo));
		}

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
	}, [detailsError, dispatch, error, productDetails.category, success]);



	const reviewHandler = () => {
		if (rating === 0 || comment.trim() === "") {
			showAlert("Please provide a rating and a comment.", "error");
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

	const [viewReview, setViewReview] = useState(false)

	const handleReviewFunc = () => {
		setViewReview(prevState => !prevState)
	}

	const ReviewTextHandler = () => {
		setShowReviewText(!showReviewText);
	};

	if (detailsLoading) {
		return <Loading />;
	}

	return (
		<div className="productDetails">
			<MetaData title="Zarmario store product" />
			<div>
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
							<div className="PDImageList">
								<p>img1</p>
								<p>img2</p>
								<p>img3</p>
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
											filled={likeProduct ? "red" : "white"}
										/>
									</div>
								</div>
							</div>

							<div className="PDPriceComment">
								<div className="PDPrice">
									<span className="DPrice">
										{" "}
										₦
										{productDetails.price &&
											productDetails.price.toLocaleString()}
									</span>
									{/* <span className="offPercent">10% off!</span> */}
								</div>
							</div>

							<div className="PDReview">
								<div className="PDRatingStar">
									{renderRatingStars(productDetails.ratings)}
								</div>
								<div className="DRate">
									( {productDetails.ratings} ratings )
								</div>
								{/* <div>
									<GoDotFill className="dotIcon" />
								</div> */}
							</div>

							{productDetails && productDetails.stock >= 1 ? <div className="qtyCart">
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
							</div> : <div className="OOF">OUT OF STOCK</div>}


							<div className="commentsPD">
								<div>Product Description</div>
								<p>{productDetails.description}</p>
							</div>
							
							{productDetails.numberOfReviews ?
								productDetails.numberOfReviews >= 1 && (
									<div>
										<div className="PDRnR">
											<div className="PRnR">
												<p>Reviews & Rating</p>
												<div onClick={handleReviewFunc} >
													{productDetails.numberOfReviews <= 5 ? <ViewShow className="icons" /> : null}
												</div>
											</div>
											{productDetails.numberOfReviews > 5 && (
												<Link
													to={`/product/${productDetails._id}/reviews`}
													className="PDR"
												>
													<ViewShow className="icons" />
												</Link>
											)}
										</div>

										<div className={viewReview ? "VR" : "nonVR"}>
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
																			
																		</div>
																	</div>
																	<div className="rc">{review.comment}</div>
																</div>
															);
														})}
											</div>
										</div>
									</div>
								) : null}
							
						</div>
					</div>
				</div>
				{showReviewText ? (
					<div className="postReviewBox">
						<div
							className="cancelShowReview"
							onClick={ReviewTextHandler}
						>
							<p>cancel</p>
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
			<div className="pDSP">
				<div className="spaceText">SIMILAR PRODUCTS</div>
				<div>
					{loading ? (
						<Loader />
					) : (
						<div className="productHome productHomeDT">
							{products.map((product, index) => (
								<div
									className="allHome allHomeDT"
									key={index}
								>
									<div className="allHomeImg">
										<Link
											className="Link"
											to={`/product/${product._id}`}
										>
											<img
												src={product.images[0]?.url}
												alt="img"
											/>
										</Link>
									</div>
									<div className="allTD">
										<div>
											<div className="allName">{product.name}</div>
											<div className="allStars">₦{product.price}</div>
										</div>
										<div
											onClick={() => addToCart(product._id)}
											className="basket basketSC"
										>
											<Cart className="cartIcon" />
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
