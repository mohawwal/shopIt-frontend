import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../actions/productActions";
import Loader from "../loader/loader";
import { shopCategory } from "../../components/data/categories";
import { Link } from "react-router-dom";
import ArrowUpRight from "../../assets/svg/arrowUpRight";

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

	return (
		<div className="catProdHome" style={{marginTop: "20px"}}>
			<div className="moving-sentence">MARIO'S SHOP 👌</div>
			<div className="productHome">
				{shopCategory.map((shop, index) => (
					<div
						className="aHC"
						key={index}
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
					</div>
				))}
			</div>
		</div>
	);
};

export default AllHomeCategory;
