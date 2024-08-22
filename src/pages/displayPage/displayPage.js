import React from "react";
import MetaData from "../../components/layouts/MetaData";
import Home from "../home/home";
import Middle from "../middle/middle";
import AllProductsHome from "../allProductsHome/allProductsHome";
import AllHomeCategory from "../allProductsHome/allHomeCategory";


const DisplayPage = () => {
	return (
		<div>
			<MetaData title="Zarmario Shop" />

			<div>
				<Home />
				<AllProductsHome />
				<div className="allHomeCategoryFile">
					<AllHomeCategory/>
				</div>
				<Middle />
			</div>
		</div>
	);
};

export default DisplayPage;
