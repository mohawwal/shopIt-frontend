import React, { useEffect, useState } from "react";
import "./newProduct.css";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, newProduct } from "../../../actions/productActions";
import * as Yup from "yup";
import { Field, ErrorMessage, useFormik, FormikProvider } from "formik";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const NewProduct = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const navigate = useNavigate();

	const { loading, success, error } = useSelector((state) => state.newProduct);

	useEffect(() => {
		if (error) {
			alert.error(error);
			console.log(error)
			dispatch(clearErrors());
		}

		if (success) {
			navigate("/");
			alert.success("Product created successfully");
			dispatch({
				type: NEW_PRODUCT_RESET,
			});
		}
	}, [alert, dispatch, error, navigate, success]);

	const initialValue = {
		name: "",
		price: "",
		description: "",
		stock: "",
		seller: "",
		category: "",
	};

	const [images, setImages] = useState([]);
	const [imagePreview, setImagePreview] = useState([]);

	const categories = [
		"Men_Shirt",
		"Men_T-Shirt",
		"Men_Polo",
		"Men_Short",
		"Men_Trouser",
		"Men_Jean",
		"Men_Suit",
		"Men_Jacket",
		"Men_Cap",

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
	];

	const validationSchema = Yup.object().shape({
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
			.max(50, "Seller name cannot exceed 50 characters")
			.required("Seller name is required"),
	});
	

	const formik = useFormik({
		initialValues: initialValue,
		validationSchema: validationSchema,
		validateOnBlur: true,
		onSubmit: (values) => {
			let formData = new FormData();

			formData.append("name", values.name);
			formData.append("price", values.price);
			formData.append("description", values.description);
			formData.append("category", values.category);
			formData.append("stock", values.stock);
			formData.append("seller", values.seller);

			images.forEach((image, index) => {
				formData.append(`images[${index}]`, image);
			});

			dispatch(newProduct(formData));
		},
	});

	const handleFileChange = (e) => {
		const files = Array.from(e.target.files);

		setImagePreview([]);
		setImages([]);

		files.forEach((file) => {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setImagePreview((oldArray) => [...oldArray, reader.result]);
					setImages((oldArray) => [...oldArray, reader.result]);
				}
			}
			reader.onerror = (error) => {
				console.error(`Error reading file ${file.name}:`, error);
			};
			
			reader.readAsDataURL(file);
		});
	};

	return (
		<div className="newProduct">
			<FormikProvider
				value={formik}
				className="formLog"
			>
				<form
					onSubmit={formik.handleSubmit}
					encType="multipart/form-data"
				>
					<div className="">
						<div className="nameAs">
							<label htmlFor="name_field">Name</label>
							<div className="as">*</div>
						</div>
						<div className="">
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

					<div className="space emailSpace">
						<div className="nameAs">
							<label htmlFor="price">Price</label>
							<div className="as">*</div>
						</div>
						<div className="">
							<div style={{ display: "flex", alignItems: "center" }}>
								<span>₦</span>
								<Field
									type="number"
									name="price"
									placeholder="Price of the Product"
									className="field"
									value={formik.values.price}
									onChange={formik.handleChange}
								/>
							</div>
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
						<div className="">
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

					<div className="space emailSpace">
						<div className="nameAs">
							<label htmlFor="name_field">Category</label>
							<div className="as">*</div>
						</div>
						<div className="">
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
								<ErrorMessage
									name="description"
									component="div"
									className="errorMsg"
								/>
							</Field>
						</div>
					</div>

					<div className="">
						<div className="nameAs">
							<label htmlFor="name_field">stock</label>
							<div className="as">*</div>
						</div>
						<div className="">
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

					<div className="space emailSpace">
						<div className="nameAs">
							<label htmlFor="name_field">Brand Name</label>
							<div className="as">*</div>
						</div>
						<div className="inputField">
							<Field
								type="text"
								name="seller"
								placeholder="You Name or Product Brand Name"
								className="field"
								value={formik.values.seller}
								onChange={formik.handleChange}
							/>
							<ErrorMessage
								name="description"
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
							onChange={(e) => handleFileChange(e)}
							multiple
						/>
					</div>
					<div className="preImgProduct">
						{imagePreview.map((img) => (
							<img
								src={img}
								key={img}
								alt="img previews"
							/>
						))}
					</div>

					<div className="btnPss">
						<button
							disabled={loading ? true : false}
							type="submit"
						>
							Upload New Product
						</button>
					</div>
				</form>
			</FormikProvider>
		</div>
	);
};

export default NewProduct;
