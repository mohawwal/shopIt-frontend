import React from "react";
import "./wishList.css";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishList } from "../../actions/wishListAction";
import { useAlert } from "react-alert";

const WishList = () => {
	const dispatch = useDispatch();
	const alert = useAlert();

	const unLikeItem = (id) => {
		dispatch(removeFromWishList(id));
		alert.success("Product removed to Favorite");
	};

	const { wishList } = useSelector((state) => state.wishList);

	return (
		<div className="wishList">
			{wishList &&
				wishList.map((listItem) => (
					<div className="listItem" key={listItem.id}>
            <div className="itemImg">
              <img src={listItem.image} alt="wishImage" />
            </div>
						<div className="itemProfile">
              <span>{listItem.name}</span>
              <span>{listItem.price}</span>
            </div>
						<div className="itemUnlikeBtn">
              <button onClick={() => unLikeItem(listItem.product)}>unlike</button>
            </div>
					</div>
				))}
		</div>
	);
};

export default WishList;
