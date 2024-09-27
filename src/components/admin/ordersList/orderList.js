import React, {
	useEffect,
	useMemo,
	useState,
	useContext,
	useCallback,
} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	getFilteredRowModel,
} from "@tanstack/react-table";
import { getAllOrder, clearErrors, deleteOrder } from "../../../actions/orderAction";
import AlertContext from "../../alert/AlertContext";
import Loader from "../../../pages/loader/loader";
import SideBar from "../sidebar/sideBar";
import MetaData from "../../layouts/MetaData";
import "./orderList.css";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = () => {
	const dispatch = useDispatch();
	const [globalFilter, setGlobalFilter] = useState("");
	const [, setAlert] = useContext(AlertContext);

	const { loading, totalAmount, orders, error } = useSelector(
		(state) => state.allOrder,
	);

	const showAlert = (message, type) => {
		setAlert({
			message,
			type,
		});
	};

	const { isDeleted, loading: deleteLoading } = useSelector((state) => state.order)


	useEffect(() => {
		dispatch(getAllOrder());

		if (error) {
			showAlert(error, "error");
			dispatch(clearErrors());
		}

		if(isDeleted) {
			showAlert("Order Deleted Successfully", "success")
			dispatch({ type: DELETE_ORDER_RESET })
		}

	}, [dispatch, error, isDeleted]);


	const handleDeleteOrder = useCallback((id) => {
		dispatch(deleteOrder(id))
	}, [dispatch]);

	const headers = [
		"Order ID",
		"Quantity",
		"Date",
		"payment status",
		"Price",
		"Status",
		"Actions",
	];

	const columns = useMemo(
		() => [
			{
				header: "Order ID",
				accessorKey: "_id",
			},
			{
				header: "No of Items",
				accessorFn: (order) =>
					order && order.orderItems && order.orderItems.length,
			},
			{
				header: "Paid At",
				accessorFn: (order) => {
					const date = new Date(order.paidAt);
					return date.toLocaleString("en-US", {
						year: "numeric",
						month: "2-digit",
						day: "2-digit",
						hour: "2-digit",
						minute: "2-digit",
						second: "2-digit",
						hour12: true,
					});
				},
			},
			{
				header: "Paid Status",
				accessorFn: (order) => (order.paidAt ? "Paid" : "Not Paid"),
				cell: ({ getValue }) => (
					<span style={{ color: getValue() === "Paid" ? "green" : "red" }}>
						{getValue()}
					</span>
				),
			},

			{
				header: "Amount",
				accessorFn: (row) => row.totalPrice,
				cell: ({ getValue }) => `₦${getValue()}`,
			},
			{
				header: "Status",
				accessorFn: (row) => row.orderStatus,
				cell: ({ getValue }) => (
					<p
						style={{
							color: getValue().toLowerCase().includes("delivered")
								? "green"
								: getValue().toLowerCase().includes("processing")
									? "red"
									: "blue",
						}}
						>
						{getValue()}
						</p>
				),
			},
			{
				header: "Actions",
				accessorKey: "actions",
				cell: ({ row }) => (
					<div className="action-row">
						<Link
							to={`/admin/order/${row.original._id}`}
							className="btn viewBtn"
						>
							View
						</Link>
						<button
							className="btn"
							onClick={() => handleDeleteOrder(row.original._id)}
						>
							Delete
						</button>
					</div>
				),
			},
		],
		[handleDeleteOrder],
	);

	const initialPageSize = 10;

	const dynamicSize = useMemo(() => {
		const totalOrders = orders?.length || 0;
		return totalOrders - initialPageSize > 0 
		? totalOrders - initialPageSize
		: totalOrders
	},[orders])

		const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: dynamicSize,  
	})

	const table = useReactTable({
		columns,
		data: orders || [],
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onPaginationChange: setPagination,
		state: { pagination },
	  })


	return (
		<div className="adminProductList">
			<div className="dashSide">
				<SideBar />
			</div>
			<div className="adminOrders">
				<div>
					<MetaData title={"Order List"} />
					<h3 className="allO">All Orders</h3>

					{loading || deleteLoading ? (
						<Loader />
					) : (
						<>
							<input
								value={globalFilter || ""}
								onChange={(e) => setGlobalFilter(e.target.value)}
								placeholder="Search orders"
								className="search-input"
							/>
							<div>
								<span>TOTAL AMOUNT - </span><b>₦{totalAmount}</b>
							</div>
							<table className="orderTable">
								<thead>
									<tr>
										{headers.map((header, index) => (
											<th key={index}>{header}</th>
										))}
									</tr>
								</thead>
								<tbody>
									{table.getRowModel().rows.map((row) => (
										<tr key={row.id}>
											{row.getVisibleCells().map((cell) => (
												<td key={cell.id}>
													{cell.column.columnDef.cell?.(cell) ??
														cell.getValue()}
												</td>
											))}
										</tr>
									))}
								</tbody>
							</table>
							<div className="pagination-controls">
								<button
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}
								>
								Previous
								</button>
								<span>
								Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
								</span>
								<button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
								Next
								</button>
								<select
								value={table.getState().pagination.pageSize}
								onChange={e => table.setPageSize(Number(e.target.value))}
								>
								{[10, 20, 30, 40, 50].map(pageSize => (
									<option key={pageSize} value={pageSize}>
									Show {pageSize}
									</option>
								))}
								</select>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default OrderList;
