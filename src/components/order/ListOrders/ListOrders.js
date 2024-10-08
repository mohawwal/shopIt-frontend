import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ListOrders.css";
import Loading from "../../../pages/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { myOrder, clearErrors } from "../../../actions/orderAction";
import { formatDate } from "../dateTime";
import AlertContext from "../../alert/AlertContext";

const ListOrders = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [, setAlert] = useContext(AlertContext);

	const showAlert = (message, type) => {
		setAlert({
			message,
			type,
		});
	};

	const { user, isAuthenticated } = useSelector((state) => state.auth);
	const { orders, loading, error } = useSelector((state) => state.myOrder);

	useEffect(() => {
		if (!isAuthenticated && !user) {
			navigate("/");
		}

		dispatch(myOrder());

		if (error) {
			showAlert(error, "error");
			dispatch(clearErrors());
		}
	}, [dispatch, error, isAuthenticated, navigate]);

	if (loading) {
		return <Loading />;
	}

	return (
		<div className="ListOrders">
			<div>
				{orders?.length > 0 ? (
					<div>
						<div>
							{orders.map((order) => (
								<Link
									to={`/order/${order._id}`}
									key={order._id}
								>
									{order.paymentInfo?.success && (
										<div className="list">
											<div className="listA">
												<div>{order._id}</div>
												{order.orderStatus &&
												String(order.orderStatus).includes("Delivered") ? (
													<span style={{ color: "green" }}>
														{order.orderStatus}
													</span>
												) : String(order.orderStatus).includes("Processing") ? (
													<span style={{ color: "red" }}>
														{order.orderStatus}
													</span>
												) : (
													<span style={{ color: "blue" }}>
														{order.orderStatus}
													</span>
												)}
											</div>
											<div className="listB">
												<span>{formatDate(order.createdAt)}</span>
												<span className="timeLine">View timeline</span>
											</div>
										</div>
									)}
								</Link>
							))}
						</div>
					</div>
				) : (
					<div className="orderEmpty">Order is Empty 😔</div>
				)}
			</div>
		</div>
	);
};

export default ListOrders;
