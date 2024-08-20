import React, { useEffect, Fragment } from "react";
import "./orderList.css";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../../layouts/MetaData";
import Loader from "../../../pages/loader/loader";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder, clearErrors } from "../../../actions/orderAction";
import SideBar from "../sidebar/sideBar";

const OrderList = () => {
	const dispatch = useDispatch();
	const alert = useAlert();

	const { loading, totalAmount, orders, error } = useSelector(
		(state) => state.allOrder,
	);

	useEffect(() => {
		dispatch(getAllOrder());

		if (error) {
			alert.error(error);
			dispatchEvent(clearErrors());
		}
	}, [alert, dispatch, error]);

	const setOrders = () => {
		const data = {
			columns: [
				{
					label: "Order ID",
					field: "id",
					sort: "asc",
				},
				{
					label: "No of Items",
					field: "numOfItems",
					sort: "asc",
				},
				{
					label: "Amount",
					field: "amount",
					sort: "asc",
				},
				{
					label: "Status",
					field: "status",
					sort: "asc",
				},
				{
					label: "Actions",
					field: "actions",
				},
			],
			rows: [],
		};

		orders.forEach((order) => {
			data.rows.push({
				id: order._id,
				numOfItems: order.orderItems.length,
				amount: `₦${order.totalPrice}`,
				status:
					order.orderStatus &&
					String(order.orderStatus).includes("Delivered") ? (
						<p style={{ color: "green" }}>{order.orderStatus}</p>
					) : (
						<p style={{ color: "red" }}>{order.orderStatus}</p>
					),
				actions: (
					<Fragment>
						<Link
							to={`/admin/order/${order._id}`}
							className=""
						>
							<p className="">View</p>
						</Link>
						<button
							className=""
							onClick
						>
							<p className="">cancel</p>
						</button>
					</Fragment>
				),
			});
		});

		return data;
	};

	return (
		<Fragment>
			<div className="adminProductList">
				<div className="dashSide">
					<SideBar />
				</div>
				<div className="adminProducts">
					<MetaData title={"My Order"} />
					<h1 className="my-5">All Orders</h1>

					{loading ? (
						<Loader />
					) : (
						<MDBDataTable
							data={setOrders()}
							className="px-3"
							bordered
							striped
							hover
						/>
					)}
				</div>
				<div>{totalAmount}</div>
			</div>
		</Fragment>
	);
};

export default OrderList;
