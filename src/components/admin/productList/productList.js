import React, { useEffect, useContext, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getAdminProducts,
	clearErrors,
	deleteProduct,
} from "../../../actions/productActions";
import AlertContext from "../../alert/AlertContext";
import { Link, useNavigate } from "react-router-dom";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import SideBar from "../sidebar/sideBar";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper
} from '@tanstack/react-table'
import './productList.css'
import Loader from "../../../pages/loader/loader";

const ProductList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [, setAlert] = useContext(AlertContext);

  const showAlert = (message, type) => {
    setAlert({
      message,
      type
    })
  }

	const { loading, error, products } = useSelector(
		(state) => state.allProducts,
	);
	const { loading: deleteLoading, error: deleteError, isDeleted } = useSelector(
		(state) => state.product,
	);

	useEffect(() => {
		dispatch(getAdminProducts());

		if (error) {
			showAlert(error, "error");
			dispatch(clearErrors());
		}

		if (deleteError) {
			showAlert(deleteError, "error");
			dispatch(clearErrors());
		}

		if (isDeleted) {
			dispatch({ type: DELETE_PRODUCT_RESET });
			showAlert("Product Deleted Successfully", "success");
      navigate("/admin/products");
		}
	}, [dispatch, error, deleteError, isDeleted, navigate]);

	const handleDeleteProduct = (id) => {
		dispatch(deleteProduct(id));
	};

	const columnHelper = createColumnHelper();

	const columns = [
		columnHelper.accessor("_id", {
			header: "ID",
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor("name", {
			header: "Name",
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor("price", {
			header: "Price",
			cell: (info) => `₦${info.getValue().toFixed(2)}`,
		}),
		columnHelper.accessor("stock", {
			header: "Stock",
			cell: (info) => info.getValue(),
		}),
		columnHelper.display({
			id: "actions",
			header: "Actions",
			cell: (info) => (
				<div className="adminProductAction">
					{info.row.original._id && (
            <Link
              to={`/admin/product/${info.row.original._id}`}
              className="pLEdit"
            >
              Edit
            </Link>
          )}
					<button
						onClick={() => handleDeleteProduct(info.row.original._id)}
						className="pLDel"
					>
						Delete
					</button>
				</div>
			),
		}),
	];

  const initialPageSize = 10;

  const dynamicSize = useMemo(() => {
    const totalProducts = products?.length || 0;
    return totalProducts - initialPageSize > 0 
      ? totalProducts - initialPageSize
      : totalProducts
  },[products])

	const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: dynamicSize,  
  })

  const table = useReactTable({
    columns,
    data: products || [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: { pagination },
  })

  if(deleteLoading) {
    return (
      <Loader />
    )
  }

	return (
		<div className="adminProductList">
			<div className="dashSide">
				<SideBar />
        </div>
      <div className="adminProducts">
        <div>
          <p>All Products</p>
          {loading ? (
            <Loader />
          ) : (
            <div className="adminProductTable">
              <input
                type="text"
                placeholder="Search products..."
                onChange={e => table.getColumn('name').setFilterValue(e.target.value)}
                className="search-input"
              />
              <table>
                <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th key={header.id}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList