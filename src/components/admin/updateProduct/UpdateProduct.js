import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
	clearErrors,
	getProductDetails,
} from "../../../actions/productActions";
import AlertContext from "../../alert/AlertContext";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { updateProduct } from "../../../actions/productActions";
import ClipLoader from "react-spinners/ClipLoader";
import * as Yup from "yup";
import { Field, ErrorMessage, useFormik, FormikProvider } from "formik";
import UTurn from "../../../assets/svg/UTurn";
import './updateProduct.css'

const UpdateProduct = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { productId } = useParams();

	const [, setAlert] = useContext(AlertContext);

	const showAlert = (message, type) => {
		setAlert({
			message,
			type,
		});
	};

	const {
		loading,
		isUpdated,
		error: updateError,
	} = useSelector((state) => state.product);
	const { product, error } = useSelector((state) => state.productDetails);

	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [stock, setStock] = useState("");
	const [seller, setSeller] = useState("");

	const [images, setImages] = useState([]);
	const [oldImages, setOldImages] = useState([]);
	const [imagePreview, setImagePreview] = useState([]);

	const categories = [
		"Women_Dresses",
		"WomanShirt",
		"Women_Gown",
		"Women_Jacket",
		"Women_Bag",
		"Kids_Boys",
		"kids_Girls",
		"kids_Shoes",
		"Fragrance",
		"Jewelry",
		"Gifts",
		"Men_Shirt",
		"Men_T-Shirt",
		"Men_Polo",
		"Men_Short",
		"Men_Trouser",
		"Men_Jean",
		"Men_Suit",
		"Men_Jacket",
		"Men_Cap",
	];

	useEffect(() => {
		if (product && product._id !== productId) {
			dispatch(getProductDetails(productId));
		} else {
			setName(product.name);
			setPrice(product.price);
			setDescription(product.description);
			setCategory(product.category);
			setStock(product.stock);
			setSeller(product.seller);
			setOldImages(product.images);
		}

		if (error) {
			dispatch(clearErrors());
			showAlert(error, "error");
		}

		if (updateError) {
			dispatch(clearErrors());
			showAlert(updateError, "error");
		}

		if (isUpdated) {
			dispatch(getProductDetails(productId)); //force refresh the data
			navigate("/admin/products");
			showAlert("Product Updated successfully", "success");
			dispatch({
				type: UPDATE_PRODUCT_RESET,
			});
		}
	}, [dispatch, error, isUpdated, navigate, product, productId, updateError]);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: name,
			price: price,
			description: description,
			category: category,
			stock: stock,
			seller: seller,
		},
		validationSchema: Yup.object().shape({
			name: Yup.string()
				.min(3, "Name must be at least 3 characters long")
				.max(20, "Name cannot exceed 20 characters")
				.required("Name is required"),

			price: Yup.number()
				.typeError("Price must be a number")
				.positive("Price must be a positive number")
				.required("Price is required"),

			description: Yup.string()
				.min(10, "Description must be at least 10 characters long")
				.max(1000, "Description cannot exceed 1000 characters")
				.required("Description is required"),

			category: Yup.string()
				.oneOf(categories, "Please select a valid category")
				.required("Category is required"),

			stock: Yup.number()
				.typeError("Stock must be a number")
				.integer("Stock must be a whole number")
				.positive("Stock must be a positive number")
				.required("Stock is required"),

			seller: Yup.string()
				.min(3, "Seller name must be at least 3 characters long")
				.max(40, "Seller name cannot exceed 50 characters")
				.required("Seller name is required"),
		}),
		validateOnBlur: true,
		onSubmit: (values) => {
			const formData = new FormData();

			formData.set("name", values.name);
			formData.set("price", values.price);
			formData.set("description", values.description);
			formData.set("category", values.category);
			formData.set("stock", values.stock);
			formData.set("seller", values.seller);

			images.forEach((image, index) => {
				formData.append(`images[${index}]`, image);
			});

			// for (let [key, value] of formData.entries()) {
			// 	console.log(`${key}`, value);
			// }

			dispatch(updateProduct(product._id, formData));
		},
	});

	const onChange = (e) => {
		const files = Array.from(e.target.files);

		setImagePreview([]);
		setImages([]);
		setOldImages([]);

		files.forEach((file) => {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setImagePreview((oldArray) => [...oldArray, reader.result]);
					setImages((oldArray) => [...oldArray, reader.result]);
				}
			};
			reader.onerror = (error) => {
				console.error(`Error reading file ${file.name}:`, error);
			};

			reader.readAsDataURL(file);
		});
	};

	return (
		<div className="newProduct">
			<div
						className="backArrowPD"
						onClick={() => navigate(-1)}
					>
						<UTurn className="icons aLI" fill="rgba(116, 106, 224, 0.948)" />
						<span>Back</span>
					</div>
			<FormikProvider
				value={formik}
				className="formLog"
			>
				<form
					onSubmit={formik.handleSubmit}
					encType="multipart/form-data"
					className="formClass"
				>
					<div className="">
						<div className="nameAs">
							<label htmlFor="name_field">Name</label>
							<div className="as">*</div>
						</div>
						<div className="updateProduct">
							<Field
								type="name"
								name="name"
								placeholder="Name of the Product"
								className="field"
								value={formik.values.name}
								onChange={formik.handleChange}
							/>
							<ErrorMessage
								name="name"
								component="div"
								className="errorMsg"
							/>
						</div>
					</div>

					<div className="upSpace emailSpace">
						<div className="nameAs">
							<label htmlFor="price">Price</label>
							<div className="as">*</div>
						</div>
						<div className="updateProduct">
							<Field
								type="number"
								name="price"
								placeholder="Price of the Product (₦)"
								className="field"
								value={formik.values.price}
								onChange={formik.handleChange}
							/>
							<ErrorMessage
								name="price"
								component="div"
								className="errorMsg"
							/>
						</div>
					</div>

					<div className="">
						<div className="nameAs">
							<label htmlFor="name_field">Description</label>
							<div className="as">*</div>
						</div>
						<div className="desUpdate">
							<Field
								as="textarea"
								name="description"
								placeholder="Product Description"
								className="field"
								value={formik.values.description}
								onChange={formik.handleChange}
							/>
							<ErrorMessage
								name="description"
								component="div"
								className="errorMsg"
							/>
						</div>
					</div>

					<div className="emailSpace">
						<div className="nameAs">
							<label htmlFor="name_field">Category</label>
							<div className="as">*</div>
						</div>
						<div className="updateProduct">
							<Field
								as="select"
								name="category"
								placeholder="name"
								className="field"
								value={formik.values.category}
								onChange={formik.handleChange}
							>
								<option
									value=""
									label="select category"
								/>
								{categories.map((category) => (
									<option
										value={category}
										key={category}
									>
										{category.replace(/_/g, " ")}
									</option>
								))}
							</Field>
							<ErrorMessage
								name="category"
								component="div"
								className="errorMsg"
							/>
						</div>
					</div>

					<div className="upSpace">
						<div className="nameAs">
							<label htmlFor="name_field">stock</label>
							<div className="as">*</div>
						</div>
						<div className="updateProduct">
							<Field
								type="number"
								name="stock"
								placeholder="Quantity Available for sell"
								className="field"
								value={formik.values.stock}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							<ErrorMessage
								name="stock"
								component="div"
								className="errorMsg"
							/>
						</div>
					</div>

					<div className="emailSpace">
						<div className="nameAs">
							<label htmlFor="name_field">Brand Name</label>
							<div className="as">*</div>
						</div>
						<div className="updateProduct">
							<Field
								type="text"
								name="seller"
								placeholder="You Name or Product Brand Name"
								className="field"
								value={formik.values.seller}
								onChange={formik.handleChange}
							/>
							<ErrorMessage
								name="seller"
								component="div"
								className="errorMsg"
							/>
						</div>
					</div>

					<div className="productImg">
						<label htmlFor="avatar_upload">Upload Product Image</label>
						<input
							type="file"
							name="images"
							accept="image/*"
							onChange={onChange}
							multiple
						/>
					</div>
					<div className="preImgProduct">
						{oldImages &&
							oldImages.map((img, index) => (
								<img
									src={img.url}
									alt="img"
									key={index}
								/>
							))}

						{imagePreview.map((img, index) => (
							<img
								src={img}
								key={index}
								alt="img previews"
							/>
						))}
					</div>

					<div className="udi">
						<button
							disabled={loading}
							type="submit"
						>
							{loading ? (
								<div>
									<ClipLoader
										color={"black"}
										loading={true}
										size={23}
									/>
								</div>
							) : (
								<p>Update Product</p>
							)}
						</button>
					</div>
				</form>
			</FormikProvider>
		</div>
	);
};

export default UpdateProduct;
