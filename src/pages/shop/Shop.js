import React, { useEffect } from "react";
import "./shop.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../actions/productActions";
import Loader from "../loader/loader";
import { shopCategory } from "../../components/data/categories";
import { Link } from "react-router-dom";
import ArrowUpRight from "../../assets/svg/arrowUpRight";

const Shop = () => {
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

	return (
		<div className="navShop">
			{shopCategory.map((shop, index) => (
			<div className="shopCategory" key={index}>
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
		</div>
	);
};

export default Shop;
