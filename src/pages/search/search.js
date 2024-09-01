import React, { useEffect, useState } from "react";
import "./search.css";
import Cancel from "../../assets/svg/cancel";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../actions/productActions";

const Search = ({ toggleSearch }) => {
	const dispatch = useDispatch();

	const [keyWords, setKeyWords] = useState("");

	const { products } = useSelector((state) => state.allProducts);

	useEffect(() => {
		dispatch(getAllProducts(keyWords));
	}, [dispatch, keyWords]);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className="search">
			<div className="searchTable">
				<div className="searchCancel">
					<span onClick={toggleSearch}>
						<Cancel className="icons searchCancelIcon" />
					</span>
				</div>

				<form
					className="searchText"
					onSubmit={handleSubmit}
				>
					<input
						type="search"
						placeholder="Search Product"
						onChange={(e) => setKeyWords(e.target.value)}
					/>
				</form>

				<div className="searchProducts">
					<ul>
						{products.map((product, index) => (
							<li
								key={index}
								onClick={toggleSearch}
							>
								<Link
									className="searchList Link"
									style={{ textDecoration: "none" }}
									to={`/product/${product._id}`}
								>
									<div className="searchName">{product.name}</div>
									<div className="searchImg">
										<img
											src={product.images[0].url}
											alt=""
										/>
									</div>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Search;
