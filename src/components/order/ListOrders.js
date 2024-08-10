// import React, { useEffect, Fragment } from "react";
// import { Link } from 'react-router-dom'

// import { MDBDataTable } from "mdbreact";
// import { useAlert } from "react-alert";
// import { useDispatch, useSelector } from "react-redux";
// import ClipLoader from "react-spinners/ClipLoader";
// import { myOrder, clearErrors } from "../../actions/orderAction";

// const ListOrders = () => {
// 	const alert = useAlert();
// 	const dispatch = useDispatch();

// 	const { orders, loading, error } = useSelector((state) => state.myOrder);

//     console.log('ORDERS:',orders)

// 	useEffect(() => {
// 		if (error) {
// 			alert.error(error);
// 			dispatch(clearErrors());
// 		}

// 		dispatch(myOrder());
// 	}, [alert, dispatch, error]);

// 	const setOrders = () => {
// 		const data = {
// 			columns: [
// 				{
// 					label: "Order ID",
// 					field: "id",
// 					sort: "asc",
// 				},
// 				{
// 					label: "No of Items",
// 					field: "noOfItems",
// 					sort: "asc",
// 				},
// 				{
// 					label: "Amount",
// 					field: "amount",
// 					sort: "asc",
// 				},
// 				{
// 					label: "Actions",
// 					field: "actions",
// 					sort: "asc",
// 				},
// 			],
// 			rows: [],
// 		};
// 		orders.forEach((order) => {
// 			data.rows.push({
// 				id: order._id,
// 				noOfItems: order.orderItems.length,
// 				amount: `#${order.totalPrice}`,
// 				status:
// 					order.orderStatus &&
// 					String(order.orderStatus).includes("Delivered") ? (
// 						<p style={{ color: "green" }}>{order.orderStatus}</p>
// 					) : (
// 						<p style={{ color: "red" }}>{order.orderStatus}</p>
// 					),
//                 actions: <Link to={`/order/${order._id}`}><i></i></Link>
// 			});
// 		});
//         return data
// 	};

// 	return (
// 		<Fragment>
// 			<div>
// 				<div>My Orders</div>

// 				{loading ? (
// 					<ClipLoader
// 						color={"#123abc"}
// 						loading={true}
// 						size={25}
// 					/>
// 				) : (
// 					<MDBDataTable
// 						data={setOrders()}
// 						className="mdbDataTable"
// 						bordered
// 						striped
// 						hover
// 					/>
// 				)}
// 			</div>
// 		</Fragment>
// 	);
// };

// export default ListOrders;

import React from 'react'

const ListOrders = () => {
  return (
	<div>
	  ORDERS LIST
	</div>
  )
}

export default ListOrders
