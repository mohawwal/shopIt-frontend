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
import { getAllOrder, clearErrors } from "../../../actions/orderAction";
import AlertContext from "../../alert/AlertContext";
import Loader from "../../../pages/loader/loader";
import SideBar from "../sidebar/sideBar";
import MetaData from "../../layouts/MetaData";
import "./orderList.css";

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

	useEffect(() => {
		dispatch(getAllOrder());

		if (error) {
			showAlert(error, "error");
			dispatch(clearErrors());
		}
	}, [dispatch, error]);

	const handleCancelOrder = useCallback((id) => {
		console.log("clicked");
	}, []);

	const headers = [
		"Order ID",
		"Quantity",
		"Date",
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
							onClick={() => handleCancelOrder(row.original._id)}
						>
							Cancel
						</button>
					</div>
				),
			},
		],
		[handleCancelOrder],
	);

	const data = useMemo(() => orders, [orders]);

	const tableInstance = useReactTable({
		data,
		columns,
		state: {
			globalFilter,
			pagination: { pageIndex: 0, pageSize: 10 },
		},
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});

	const {
		getRowModel,
		getState,
		getPageCount,
		nextPage,
		previousPage,
		setPageSize,
		canNextPage,
		canPreviousPage,
	} = tableInstance;

	return (
		<div className="adminProductList">
			<div className="dashSide">
				<SideBar />
			</div>
			<div className="adminOrders">
				<div>
					<MetaData title={"Order List"} />
					<h3 className="allO">All Orders</h3>

					{loading ? (
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
								<b>TOTAL AMOUNT - </b>₦{totalAmount}
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
									{getRowModel().rows.map((row) => (
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
									onClick={() => previousPage()}
									disabled={!canPreviousPage}
								>
									Previous
								</button>
								<span>
									Page{" "}
									<strong>
										{getState().pagination.pageIndex + 1} of {getPageCount()}
									</strong>
								</span>
								<button
									onClick={() => nextPage()}
									disabled={!canNextPage}
								>
									Next
								</button>
								<select
									value={getState().pagination.pageSize}
									onChange={(e) => setPageSize(Number(e.target.value))}
								>
									{[10, 20, 30].map((size) => (
										<option
											key={size}
											value={size}
										>
											Show {size}
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
