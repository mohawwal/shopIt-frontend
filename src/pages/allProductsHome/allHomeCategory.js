import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../actions/productActions";
import Loader from "../loader/loader";
import { shopCategory } from "../../components/data/categories";
import { Link } from "react-router-dom";
import ArrowUpRight from "../../assets/svg/arrowUpRight";
import { motion } from "framer-motion";

const AllHomeCategory = () => {
	const dispatch = useDispatch();

	const { loading, error } = useSelector((state) => state.productCategory);

	useEffect(() => {
		if (error) {
			dispatch(clearErrors());
		}
	}, [dispatch, error]);

	if (loading) {
		return <Loader />;
	}

	const container = {
		hidden: { opacity: 1, scale: 0 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2,
			},
		},
	};

	const item = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
	};

	return (
		<div
			className="catProdHome"
			style={{ marginTop: "20px" }}
		>
			<div className="moving-sentence">MARIO'S SHOP 👌</div>
			<motion.div
				className="productHome"
				variants={container}
				initial="hidden"
				animate="visible"
			>
				{shopCategory.map((shop, index) => (
					<motion.div
						className="aHC"
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
									<p>View</p>
									<div>
										<ArrowUpRight
											className="arrowUpRight"
											fill="black"
										/>
									</div>
								</Link>
							</div>
						</div>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
};

export default AllHomeCategory;
