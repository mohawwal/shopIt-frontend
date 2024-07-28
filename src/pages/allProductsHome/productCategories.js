// import React, { useEffect } from 'react'
// import { getProductCategory } from '../../actions/productActions'
// import { useDispatch, useSelector } from 'react-redux'

// function ProductCategories({categoryProducts}) {
//     const dispatch = useDispatch()

//     const {products} = useSelector(state => state.productCategory)

//     console.log(categoryProducts)

//     useEffect(() => {
//         dispatch(getProductCategory(`${categoryProducts}`))
//     })
//   return (
//     <div>
//       <div>{products.map((product) => {
//         return(
//             <div>{product.name}</div>
//         )
//       })}</div>
//     </div>
//   )
// }

// export default ProductCategories
