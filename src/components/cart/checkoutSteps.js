import React from "react";
import { Link } from "react-router-dom";
import ArrowToRight from '../../assets/svg/arrowToRight'

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
	return (
		<div className="checkoutSteps">
			<div>
				{shipping ? (
					<Link className="checkLink" to="/shipping">
						<p className="step active-step">SHIPPING</p>
						<ArrowToRight className="checkIcon"/>
					</Link>
				) : (
					<Link className="checkLink" to="!#">
						<p className="step incomplete">SHIPPING</p>
						<ArrowToRight className="checkIcon"/>
					</Link>
				)}
			</div>

			<div>
				{confirmOrder ? (
					<Link className="checkLink" to="/order/confirm">
						<p className="step active-step">CONFIRM ORDER</p>
						<ArrowToRight className="checkIcon"/>
					</Link>
				) : (
					<Link className="checkLink" to="#!">
						<p className="step incomplete">CONFIRM ORDER</p>
						<ArrowToRight className="checkIcon"/>
					</Link>
				)}
			</div>

			<div>
				{payment ? (
					<Link className="checkLink" to="/payment">
						<p className="step active-step">PAYMENT</p>
					</Link>
				) : (
					<Link className="checkLink" to="#!">
						<p className="step incomplete">PAYMENT</p>
					</Link>
				)}
			</div>
		</div>
	);
};

export default CheckoutSteps;
