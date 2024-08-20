import React, { useEffect } from "react";
import "./shop.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../actions/productActions";
import Loader from "../loader/loader";
import { shopCategory } from "../../components/data/categories";
import { Link } from "react-router-dom";

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
			<div className="zs">ZARMARIO SHOP</div>
			<div className="shopCategory">
				{shopCategory.map((shop, index) => (
					<Link
						className="shopCat"
						key={index}
						to={`/product/category/${shop.category}`}
					>
						<div className="shopCatImg">
							<img
								src={shop.image}
								alt=""
							/>
						</div>
						<div className="shopCatTitle">{shop.title}</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Shop;
