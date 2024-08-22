// import React, { useEffect, useContext } from "react";
// import { MDBDataTable } from 'mdbreact';
// import SideBar from "../sidebar/sideBar";
// import AlertContext from '../../alert/AlertContext'
// import { Link } from "react-router-dom";
// import Loading from "../../../pages/loader/loader";
// import './productList.css'
// import { useDispatch, useSelector } from "react-redux";
// import { getAdminProducts, clearErrors, deleteProduct } from "../../../actions/productActions";
// import { useNavigate } from "react-router-dom";
// import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

// const ProductList = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate()

        // const [, setAlert] = useContext(AlertContext)

        // const showAlert = (message, type) => {
        //   setAlert({
        //     message,
        //     type
        //   })
        // }

//     const { loading, error, products } = useSelector((state) => state.allProducts);
//     const { error: deleteError, isDeleted } = useSelector((state) => state.product)

//     useEffect(() => {
//         dispatch(getAdminProducts());

//         if (error) {
//             setAlert(error, 'error')
//             dispatch(clearErrors());
//         }

//         if (deleteError) {
//              setAlert(deleteError, 'error')
//             dispatch(clearErrors());
//         }

//         if(isDeleted) {
//              setAlert('Product Deleted Successfully', 'info')
//             navigate('/admin/products')
//             dispatch({ type: DELETE_PRODUCT_RESET })
//         }
        
//     }, [alert, deleteError, dispatch, error, isDeleted, navigate]);


//     const handleDeleteProduct = (id) => {
//         dispatch(deleteProduct(id))
//     }

//     const setProducts = () => {
//         const data = {
//             columns: [  
//                 {
//                     label: 'ID',
//                     field: 'id',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Name',
//                     field: 'name',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Price',
//                     field: 'price',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Stock',
//                     field: 'stock',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Actions',
//                     field: 'actions'
//                 }
//             ],
//             rows: []
//         };

//         products.forEach(product => {
//             data.rows.push({
//                 id: product._id,
//                 name: product.name,
//                 price: `₦${product.price.toFixed(2)}`, 
//                 stock: product.stock,
//                 actions: (
//                     <div className="adminProductAction">
//                         <Link to={`/admin/product/${product._id}`} className="btn btn-primary btn-sm">
//                             Edit
//                         </Link>
//                         <button onClick={() => handleDeleteProduct(product._id)} className="btn btn-danger btn-sm">
//                             Delete
//                         </button>
//                     </div>
//                 )
//             });
//         });

//         return data; 
//     };

//     return (
//         <div className="adminProductList">
//             <div className="dashSide">
// 				<SideBar />
// 			</div>
//             <div className="adminProducts">
//                 <div>
//                     <p>All Products</p>
//                     {loading ? (
//                         <Loading />
//                     ) : (
//                         <div className="adminProductTable">
//                             <MDBDataTable
//                                 data={setProducts()} 
//                                 bordered
//                                 striped
//                                 hover
//                                 style={{
//                                     borderCollapse: 'separate',
//                                     borderSpacing: '0 10px', // Vertical gap between rows
//                                     width: '100%',
//                                     backgroundColor: '#f9f9f9',
//                                     textAlign: 'right'
//                                 }}
//                                 tbodyCustomColors={{
//                                     default: '#ffffff',
//                                     hover: '#f1f1f1',
//                                 }}
//                                 tdStyle={{
//                                     border: '1px solid #ccc',
//                                     padding: '10px 15px',
//                                     verticalAlign: 'middle',
//                                     paddingRight: '20px' // Horizontal gap between columns
//                                 }}
//                                 thStyle={{
//                                     border: '1px solid #ccc',
//                                     backgroundColor: '#e9ecef',
//                                     fontWeight: 'bold',
//                                     padding: '10px 15px',
//                                     paddingRight: '20px' // Horizontal gap between columns
//                                 }}
//                                 paginationLabelStyle={{
//                                     padding: '8px 12px',
//                                     margin: '0 5px',
//                                     border: '1px solid #ccc',
//                                     borderRadius: '5px',
//                                     backgroundColor: '#f9f9f9',
//                                     color: '#333',
//                                     textDecoration: 'none',
//                                     transition: 'background-color 0.3s ease'
//                                 }}
//                                 paginationActiveStyle={{
//                                     backgroundColor: '#007bff',
//                                     color: '#fff',
//                                     border: '1px solid #007bff'
//                                 }}
//                                 searchBarStyle={{
//                                     border: '1px solid #ccc',
//                                     borderRadius: '5px',
//                                     padding: '5px 10px',
//                                     marginBottom: '10px',
//                                     backgroundColor: '#f9f9f9',
//                                     textAlign: 'right'
//                                 }}
//                                 infoStyle={{
//                                     fontSize: '14px',
//                                     marginTop: '10px',
//                                     textAlign: 'right'
//                                 }}
//                             />
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductList;

import React from 'react'

const ProductList = () => {
  return (
    <div>
      products - List
    </div>
  )
}

export default ProductList

