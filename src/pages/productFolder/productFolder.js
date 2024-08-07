import React, { useEffect, useState } from "react";
import Loading from "../loader/loader";
import "./productFolder.css";

//import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductCategory } from "../../actions/productActions";
import Product from "../products/product";
import { useParams } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import MetaData from "../../components/layouts/MetaData";
import { useAlert } from "react-alert";

const ProductFolder = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const { id } = useParams();

	const [currentPage, setCurrentPage] = useState(1);
	const [activeIndex, setActiveIndex] = useState(0);

	const handleClick = (index) => {
		setActiveIndex(activeIndex === index ? 0 : index);
	};

	const { loading, products, error, pageNo } = useSelector(
		(state) => state.productCategory,
	);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		dispatch(getProductCategory(`${id}`, currentPage));
	}, [alert, currentPage, dispatch, error, id]);

	const handleCurrentPage = (targetPage) => {
		if (targetPage >= 1 && targetPage <= pageNo) setCurrentPage(targetPage);
	};

	if (loading) {
		return (
			<div>
				<Loading />
			</div>
		);
	}
	return (
		<div className="productFolder">
			<MetaData title="Zarmario product folder" />
			<div className="headTop"></div>
			<div className="itemPhase">
				<div className="itemOption">
					<div className="sliderContainer">
						<div>Filter</div>
						<div className="filterSlide">
							<FaFilter className="filterIcon" />
						</div>
					</div>

					<div className="prodFold">
						{products &&
							products.map((product) => {
								return (
									<div
										className="folder"
										key={product.id}
									>
										<Product product={product} />
									</div>
								);
							})}
					</div>
				</div>
			</div>

			<div class="paginationContainer">
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
	);
};

export default ProductFolder;
