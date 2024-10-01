import React, { useEffect } from "react";
import "./shop.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../actions/productActions";
import Loader from "../loader/loader";
import { shopCategory } from "../../components/data/categories";
import { Link } from "react-router-dom";
import ArrowUpRight from "../../assets/svg/arrowUpRight";
import { motion } from "framer-motion";

const Shop = () => {
	const dispatch = useDispatch();

	const { loading, error } = useSelector((state) => state.productCategory);

	useEffect(() => {
		if (error) {
			dispatch(clearErrors());
		}
	}, [dispatch, error]);

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
		return <Loader />;
	}

	return (
		<motion.div
			className="navShop"
			variants={container}
			initial="hidden"
			animate="visible"
		>
			{shopCategory.map((shop, index) => (
				<div
					className="shopCategory"
					key={index}
					variants={item}
				>
					<div className="shopSpace">
						<div className="shopImageBox">
							<img
								src={shop.image}
								alt="img"
							/>
						</div>
						<div className="shopDetailsBox">
							<div className="detailsShop">
								<span>{shop.title}</span>
								<p>Mario Store</p>
							</div>
							<Link
								className="buyShop"
								to={`/product/category/${shop.category}`}
							>
								<p>Buy now</p>
								<div>
									<ArrowUpRight
										className="arrowUpRight"
										fill="black"
									/>
								</div>
							</Link>
						</div>
					</div>
				</div>
			))}
		</motion.div>
	);
};

export default Shop;
