import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAllProducts } from "../../actions/productActions";
import Loader from "../../pages/loader/loader";
import "./allProductsHome.css";
import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { addItemToCart } from "../../actions/cartAction";
import AlertContext from "../../components/alert/AlertContext";

const AllProductsHome = () => {
	const dispatch = useDispatch();
	
	const [, setAlert] = useContext(AlertContext)

	const showAlert = (message, type) => {
		setAlert({
			message,
			type
		})
	}

	const { loading, error, products } = useSelector(
		(state) => state.allProducts,
	);

	useEffect(() => {
		if (error) {
			showAlert(error, 'error')
			dispatch(clearErrors());
		}

		dispatch(getAllProducts());
	}, [dispatch, error]);

	const quantity = 1;

	const addToCart = (id) => {
		dispatch(addItemToCart(id, quantity));
		showAlert("Item Added To Cart", "success")
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
			<div class="moving-sentence">NEW MARIO'S</div>
			<div className="productHome">
				{products &&
					products.map((product, index) => {
						return (
							<div
								className="allHome Link"
								key={index}
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
										<div className="allStars">₦{product.price}</div>
									</div>
									<div
										onClick={() => addToCart(product._id)}
										className="basket"
									>
										<BsCart4 className="basketIcon" />
									</div>
								</div>
							</div>
						);
					})}
			</div>
		</div>
		
		</div>
	);
};

export default AllProductsHome;
