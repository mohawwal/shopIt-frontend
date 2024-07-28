import React, { useEffect, useState } from "react";
import "./productDetails.css";
import prodImg from "../../assets/images/image6.jpg";
import { clearErrors, getProductDetails } from "../../actions/productActions";
import { addItemToCart } from "../../actions/cartAction";

import Loading from "../loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { IoMdStar } from "react-icons/io";
import { IoMdStarHalf } from "react-icons/io";
import { IoMdStarOutline } from "react-icons/io";
// import { FaArrowRightLong } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { useAlert } from "react-alert";

import Love from "../../assets/svg/love";
import ArrowLeft from "../../assets/svg/arrowLeft";
import MetaData from "../../components/layouts/MetaData";

const ProductDetails = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();
	const alert = useAlert();

	const {
		loading: detailsLoading,
		product: productDetails,
		error: detailsError,
	} = useSelector((state) => state.productDetails);

	const [activeProductInfo, setActiveProductInfo] = useState(0);

	const handleClick = (index) => {
		setActiveProductInfo(activeProductInfo === index ? 0 : index);
	};

	useEffect(() => {
		if (detailsError) {
			alert.error(detailsError);
			dispatch(clearErrors());
		}

		dispatch(getProductDetails(id));
	}, [alert, detailsError, dispatch, id, productDetails.category]);

	const renderRatingStars = (ratingValue) => {
		return Array.from({ length: 5 }, (elem, index) => {
			let number = index + 0.1;
			return ratingValue >= index + 1 ? (
				<IoMdStar className="stars" />
			) : ratingValue >= number ? (
				<IoMdStarHalf className="stars" />
			) : (
				<IoMdStarOutline className="stars" />
			);
		});
	};

  const addToCart = () => {
    dispatch(addItemToCart(`${id}`, quantity))
    alert.success("Item Added To Cart")
  }

	const [quantity, setQuantity] = useState(1);

	const increaseQty = () => {
		const count = document.querySelector(".count");

		if (count.valueAsNumber >= productDetails.stock) return;

		const qty = count.valueAsNumber + 1;
		setQuantity(qty);
	};

	const decreaseQty = () => {
		const count = document.querySelector(".count");

		if (count.valueAsNumber <= 1) return;

		const qty = count.valueAsNumber - 1;
		setQuantity(qty);
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
								src={prodImg}
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
								<div className="addLove">
									<span>
										<Love className="icons love" />
									</span>
									<span>Add to Wishlist</span>
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
									<button className="btnLeft" onClick={decreaseQty}> - </button>
									<input
										className="count"
										type="number"
										value={quantity}
										readOnly
									/>
									<button className="btnRight" onClick={increaseQty}> + </button>
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
										Details
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
										Shipping
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
										Details about packaging
									</div>
								)}
							</div>

							<div>
								{activeProductInfo === 2 && (
									<div className="activeProductContent">
										Details about shipping info
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
					</div>
				</div>
			</div>

			{/* {productDetails.category ? <div>
          <ProductCategories categoryProducts={productDetails.category} />
        </div>: "No recommendation"} */}
		</div>
	);
};

export default ProductDetails;
