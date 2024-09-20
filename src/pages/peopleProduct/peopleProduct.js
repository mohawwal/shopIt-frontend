import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../products/product";
import { getPeopleProduct, clearErrors } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/loader";
import "./productPeople.css";
import { Link } from "react-router-dom";
import { categories } from "../../components/data/categories";

const PeopleProduct = () => {
	const dispatch = useDispatch();
	const { people } = useParams();

	const { loading, products, pageNo, error } = useSelector(
		(state) => state.productPeople,
	);

	const [price, setPrice] = useState([0, 100000]);

	const [currentPage, setCurrentPage] = useState(1);
	const [activeIndex, setActiveIndex] = useState(0);

	const handleCurrentPage = (targetPage) => {
		if (targetPage >= 1 && targetPage <= pageNo) setCurrentPage(targetPage);
	};

	const handleClick = (index) => {
		setActiveIndex(activeIndex === index ? 0 : index);
	};

	const handlePriceChange = (e) => {
		const { value, name } = e.target;
		setPrice((prevPrice) => {
			const newPrice = [...prevPrice];
			if (name === "min") newPrice[0] = value;
			if (name === "max") newPrice[1] = value;
			return newPrice;
		});
	};

	useEffect(() => {
		if (error) {
			dispatch(clearErrors());
		}

		dispatch(getPeopleProduct(people, currentPage, price));
	}, [currentPage, dispatch, error, people]);

	if (loading) {
		return <Loader />;
	}

	return (
		<div className="productPeople">
			<div className="peopleNav">
				<div style={{height: "50%"}}>
					<div className="pSliderContainer">
						<div className="pPriceFilter">
							<span className="pFT">FILTER</span>
							<div className="pPFInput">
								<label>
									Min: ₦
									<input
										type="number"
										name="min"
										value={price[0]}
										onChange={handlePriceChange}
									/>
								</label>
							</div>
							<div className="pPFInput">
								<label>
									Max: ₦
									<input
										type="number"
										name="max"
										value={price[1]}
										onChange={handlePriceChange}
									/>
								</label>
							</div>
							<button
								onClick={() => {
									dispatch(getPeopleProduct(people, currentPage, price));
								}}
							>
								Apply Filter
							</button>
						</div>
					</div>
				</div>
				<div className="peopleCat" style={{height: "50%"}}>
					<span>{people.toUpperCase()}-CATEGORY</span>
					<ul>
						{categories.map((category) => (
							<li key={category.id}>
								{category.id === people && (
									<>
										{category.items.map((item, index) => {
											return (
												<li key={index}>
													<Link
														to={`/product/category/${category.title}_${item}`}
														className="linkList"
													>
														<div>
															<p className="pCL" >{item}</p>
														</div>
													</Link>
												</li>
											);
										})}
									</>
								)}
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="peopleFold">
				<div className="prodFold">
					{products && products.length > 0 ? (
						products.map((product) => {
							return (
								<div
									className="folder"
									key={product.id}
								>
									<Product product={product} />
								</div>
							);
						})
					) : (
						<div className="noProducts">
							No products found in this category.
						</div>
					)}
				</div>
				<div className="paginationContainer">
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

export default PeopleProduct;
