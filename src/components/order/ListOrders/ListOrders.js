import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ListOrders.css";
import Loading from "../../../pages/loader/loader";
//import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { myOrder, clearErrors } from "../../../actions/orderAction";
import { formatDate } from '../dateTime'

const ListOrders = () => {
	//const alert = useAlert();
	const dispatch = useDispatch();

	const { orders, loading, error } = useSelector((state) => state.myOrder);

	useEffect(() => {
		if (error) {
			//alert.error(error);
			dispatch(clearErrors());
		}

		dispatch(myOrder());
	}, [dispatch, error]);

	if(loading) {
		return (
			<Loading/>
		)
	}

	return (
		<div className="ListOrders">
			<div>
				{orders.length > 0 ? (
					<div>
						<div>
							{orders.map((order) => (
								<Link to={`/order/${order._id}`}>
									<div
										className="list"
										key={order._id}
									>
										<div className="listA">
											<div>{order && order._id}</div>
											{order &&
											order.orderStatus &&
											String(order.orderStatus).includes("Delivered") ? (
												<span style={{ color: "green" }}>
													{order.orderStatus}
												</span>
											) : (
												<span style={{ color: "red" }}>
													{order.orderStatus}
												</span>
											)}
										</div>
										<div className="listB">
											<span>{formatDate(order && order.createdAt)}</span>
											<span className="timeLine">View timeline</span>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				) : (<div>Order is Empty</div>)}
			</div>
		</div>
	);
};

export default ListOrders;
