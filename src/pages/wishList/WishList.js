import React from "react";
import "./wishList.css";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishList } from "../../actions/wishListAction";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";

const WishList = () => {
	const dispatch = useDispatch();
	const alert = useAlert();

	const unLikeItem = (id) => {
		dispatch(removeFromWishList(id));
		alert.success("Product removed to Favorite");
	};

	const { wishList } = useSelector((state) => state.wishList);

	if(wishList && wishList.length <1){
		return (
			<div className="npl">NO PRODUCT LIKED</div>
		)
	}

	return (
		<div className="wishList">
			{wishList &&
				wishList.map((listItem) => (
					<div
						className="listItem"
						key={listItem.id}
					>
						<div className="itemImg">
							<img
								src={listItem.image}
								alt="wishImage"
							/>
						</div>
						<Link to={`/product/${listItem.product}`} className="itemProfile">
							<span>{listItem.name}</span>
							<span>₦{listItem.price}</span>
						</Link>
						<div className="itemUnlikeBtn">
							<button onClick={() => unLikeItem(listItem.product)}>X</button>
						</div>
					</div>
				))}
		</div>
	);
};

export default WishList;
