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
import { getAllUsers, clearErrors } from "../../../actions/userAction";
import AlertContext from "../../alert/AlertContext";
import Loader from "../../../pages/loader/loader";
import SideBar from "../sidebar/sideBar";
import MetaData from "../../layouts/MetaData";
import "./userList.css";

const UserList = () => {
	const dispatch = useDispatch();
	const [globalFilter, setGlobalFilter] = useState("");
	const [, setAlert] = useContext(AlertContext);


	const showAlert = (message, type) => {
		setAlert({
			message,
			type,
		});
	};

    const { users, loading, error } = useSelector(state => state.allUsers)
    // const { isDeleted } = useSelector(state => state.deleteUser)

	useEffect(() => {
        dispatch(getAllUsers())

        if (error) {
			showAlert(error, "error");
			dispatch(clearErrors());
		}
		
	}, [dispatch, error]);


	const headers = [
		"User ID",
		"Name",
		"Email",
		"Role",
		"Actions",
	];

	const columns = useMemo(
		() => [
			{
				header: "User ID",
				accessorKey: "_id",
			},
			{
				header: "Name",
				accessorFn: (users) =>
					users && users.name,
			},
			{
				header: "Email",
				accessorFn: (users) =>
					users && users.email,
			},
            {
				header: "Role",
				accessorFn: (users) =>
					users && users.role,
			},
			{
				header: "Actions",
				accessorKey: "actions",
				cell: ({ row }) => (
					<div className="action-row">
						<Link
							to={`/admin/user/${row.original._id}`}
							className="btn viewBtn"
						>
							View
						</Link>
					</div>
				),
			},
		],
		[],
	);

	const initialPageSize = 10;

	const dynamicSize = useMemo(() => {
		const totalUsers = users?.length || 0;
		return totalUsers - initialPageSize > 0 
		? totalUsers - initialPageSize
		: totalUsers
	},[users])

		const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: dynamicSize,  
	})

	const table = useReactTable({
		columns,
		data: users || [],
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
					<h3 className="allO">All Users</h3>

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
                            <div><span>No of Users: </span><b>{users && users.length}</b></div>
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

export default UserList;
