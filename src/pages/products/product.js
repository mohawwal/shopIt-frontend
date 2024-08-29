import React, { useContext } from "react";
import "./product.css";
import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../actions/cartAction";
import AlertContext from "../../components/alert/AlertContext";

const Product = ({ product }) => {
	const dispatch = useDispatch();
	const [, setAlert] = useContext(AlertContext)

	const showAlert = (message, type) => {
		setAlert({
			message,
			type
		})
	}

	const quantity = 1;

	const addToCart = (id) => {
		dispatch(addItemToCart(id, quantity));
		showAlert('Item Added To Cart', 'success')
	};
	return (
		<div className="folderList">
			<div className="foldersList">
				<Link
					Link
					to={`/product/${product._id}`}
					className="folderImg"
				>
					<img
						src={product.images && product.images[0].url}
						alt="goods"
					/>
				</Link>
				<div className="allTDs">
					<div className="allT">
						<div className="allName">
							<div className="allName">
								{product.name ? product.name.toUpperCase() : ""}
							</div>
						</div>
						<div className="allStars">₦{product.price}</div>
					</div>
					<div
						className="basket"
						onClick={() => addToCart(product._id)}
					>
						<BsCart4 className="prodCartIcon" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Product;
