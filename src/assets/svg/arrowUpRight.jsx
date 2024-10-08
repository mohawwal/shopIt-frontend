import React from "react";

const ArrowUpRight = ({ className, fill }) => {
	return (
		<svg
			fill={fill}
            className={className}
			viewBox="0 0 256 256"
		>
			<path d="M196,64V168a4,4,0,0,1-8,0V73.65625L66.82812,194.82812a3.99957,3.99957,0,0,1-5.65625-5.65625L182.34375,68H88a4,4,0,0,1,0-8H192A4.0002,4.0002,0,0,1,196,64Z" />
		</svg>
	);
};

export default ArrowUpRight;
