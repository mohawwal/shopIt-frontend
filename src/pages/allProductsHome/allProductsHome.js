import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAllProducts } from "../../actions/productActions";
import Loader from "../../pages/loader/loader";
import "./allProductsHome.css";
import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { addItemToCart } from "../../actions/cartAction";
import AlertContext from "../../components/alert/AlertContext";
import { motion } from "framer-motion";

const AllProductsHome = () => {
	const dispatch = useDispatch();

	const [, setAlert] = useContext(AlertContext);

	const showAlert = (message, type) => {
		setAlert({
			message,
			type,
		});
	};

	const [currentPage, setCurrentPage] = useState(1);
	const [activeIndex, setActiveIndex] = useState(0);

	const { loading, error, products, pageNo } = useSelector(
		(state) => state.allProducts,
	);

	useEffect(() => {
		if (error) {
			showAlert(error, "error");
			dispatch(clearErrors());
		}

		dispatch(getAllProducts("", currentPage));
	}, [currentPage, dispatch, error]);

	const quantity = 1;

	const addToCart = (id) => {
		dispatch(addItemToCart(id, quantity));
		showAlert("Item Added To Cart", "success");
	};

	const formatPrice = (price) => {
		return price.toLocaleString();
	};

	const handleClick = (index) => {
		setActiveIndex(activeIndex === index ? 0 : index);
	};

	const handleCurrentPage = (targetPage) => {
		if (targetPage >= 1 && targetPage <= pageNo) setCurrentPage(targetPage);
	};

	const container = {
		hidden: { opacity: 1, scale: 0 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				delayChildren: 0.5,
				staggerChildren: 0.3,
			},
		},
	};

	const item = {
		hidden: { y: 30, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
	};

	if (loading) {
		return (
			<div>
				<Loader />
			</div>
		);
	}
	return (
		<div>
			<div className="allProdHome">
				<div className="moving-sentence MDSC">NEW MARIO'S👌</div>
				<motion.div
					className="productHome"
					variants={container}
					initial="hidden"
					animate="visible"
				>
					{Array.isArray(products) && products.length > 0 ? (
						products.map((product, index) => {
							return (
								<motion.div
									className="allHome Link"
									key={index}
									variants={item}
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
											<div className="allName">
												{product.name && product.name.length > 13
													? `${product.name.toUpperCase().slice(0, 13)}...`
													: product.name.toUpperCase()}
											</div>
											<div className="allStars">
												₦{formatPrice(product.price)}
											</div>
										</div>
										{product && product.stock >= 1 ? (
											<div
												className="basket"
												onClick={() => addToCart(product._id)}
											>
												<BsCart4 className="basketIcon" />
											</div>
										) : (
											<></>
										)}
									</div>
								</motion.div>
							);
						})
					) : (
						<>NO PRODUCT FOUND</>
					)}
				</motion.div>
			</div>
			{/* smaller screen */}
			<div className="allProdHomeSC">
				<div className="moving-sentence MDSC">NEW MARIO'S👌</div>
				<motion.div
					className="productHomeSC"
					variants={container}
					initial="hidden"
					animate="visible"
				>
					{Array.isArray(products) && products.length > 0 ? (
						products.map((product, index) => {
							return (
								<motion.div
									className="allHomeSC"
									key={index}
									variants={item}
								>
									<div className="allHomeImgSC">
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
									<div className="allTD allTDSC">
										<div>
											<div className="allName">
												{product.name && product.name.length > 18
													? `${product.name.toUpperCase().slice(0, 18)}...`
													: product.name.toUpperCase()}
											</div>
											<div className="allStars">
												₦{formatPrice(product.price)}
											</div>
										</div>
									</div>
									<div className="adcTSC">
										{product && product.stock >= 1 ? (
											<div
												className="basketTSC"
												onClick={() => addToCart(product._id)}
											>
												<p>ADD TO CART 🛒</p>
											</div>
										) : (
											<p className="oOS">Out Of Stock</p>
										)}
									</div>
								</motion.div>
							);
						})
					) : (
						<>NO PRODUCT FOUND</>
					)}
				</motion.div>
				<div className="pagSC">
					<div className="pagination">
						<span className="tryPeg">
							{currentPage > 1 && (
								<div
									className={"pagDiv pagBtn prevBtn"}
									onClick={() => {
										handleCurrentPage(currentPage - 1);
									}}
									disabled={currentPage === 1}
								>
									Previous
								</div>
							)}
							{Array.from({ length: pageNo }, (_, index) => index + 1).map(
								(page) => (
									<div
										key={page}
										className={`pagDiv pagDv pagNoBtn ${currentPage === page ? "prevActive" : ""}`}
										onClick={() => {
											setCurrentPage(page);
											handleClick(page);
										}}
									>
										<div>{page}</div>
									</div>
								),
							)}
							{currentPage < pageNo && (
								<div
									className={"pagDiv pagBtn nextBtn"}
									onClick={() => {
										handleCurrentPage(currentPage + 1);
									}}
									disabled={currentPage >= pageNo}
								>
									Next
								</div>
							)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AllProductsHome;
