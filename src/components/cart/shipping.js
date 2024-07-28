import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { saveShippingInfo } from "../../actions/cartAction";
import { Field, useFormik, FormikProvider } from "formik";
import { useNavigate } from 'react-router-dom'

import { countries } from 'countries-list'

const Shipping = () => {
	const dispatch = useDispatch();
  const Navigate = useNavigate()

  const countriesList = Object.values(countries)

	const { shippingInfo } = useSelector((state) => state.cart);

  // const [fullName, setFullName] = useState(shippingInfo.fullName);
	// const [address, setAddress] = useState(shippingInfo.address);
	// const [city, setCity] = useState(shippingInfo.city);
	// const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
	// const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
	// const [country, setCountry] = useState(shippingInfo.country);


  const formik = useFormik({
    initialValues: {
      fullName: shippingInfo.fullName,
      address: shippingInfo.address,
      city: shippingInfo.city,
      postalCode: shippingInfo.postalCode,
      phoneNo: shippingInfo.phoneNo,
      country: shippingInfo.country
    },

    onSubmit: (value) => {
      let formData = new FormData()

      formData.append("fullName", value.fullName)
      formData.append("address", value.address)
      formData.append("city", value.city)
      formData.append("postalCode", value.postalCode)
      formData.append("phoneNo", value.phoneNo)
      formData.append("country", value.country)

      dispatch(saveShippingInfo(formData));
      Navigate('/confirm')
    }
  })

	return (
		<div className="cart">
			<h3>Billing Address</h3>
			<FormikProvider value={formik}>
				<form
					onSubmit={formik.handleSubmit}
				>
          <div>
						<label htmlFor="name_field">Name</label>
						<Field
									type="text"
									name="fullName"
									placeholder="Full Name"
									className="field"
									value={formik.values.fullName}
									onChange={formik.handleChange}
								/>
					</div>

					<div>
						<label htmlFor="email_field">Delivery Address</label>
						<Field
									type="text"
									name="address"
									placeholder="Enter address"
									className="field"
									value={formik.values.address}
									onChange={formik.handleChange}
								/>
					</div>

          <div>
						<label htmlFor="email_field">Enter City</label>
						<Field
									type="text"
									name="city"
									placeholder="Enter city"
									className="field"
									value={formik.values.city}
									onChange={formik.handleChange}
								/>
					</div>

          <div>
						<label htmlFor="email_field">Enter PostalCode</label>
						<Field
									type="text"
									name="postalCode"
									placeholder="Enter postalCode"
									className="field"
									value={formik.values.postalCode}
									onChange={formik.handleChange}
								/>
					</div>

          <div>
						<label htmlFor="email_field">Enter PhoneNo</label>
						<Field
									type="tel"
									name="phoneNo"
									placeholder="Enter phoneNo"
									className="field"
									value={formik.values.phoneNo}
									onChange={formik.handleChange}
								/>
					</div>

          <div>
            <label htmlFor="country_field">Enter Country</label>
            <Field
              as="select"
              name="country"
              className="field"
              value={formik.values.country ? formik.values.country : ''}
              onChange={formik.handleChange}
            >
              {countriesList.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </Field>
        </div>


					<button
						type="submit"
					>
						Update
					</button>
        </form>
			</FormikProvider>
		</div>
	);
};

export default Shipping;
