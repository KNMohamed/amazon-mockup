import React, { useState } from 'react';
import { saveShipping } from '../actions/cartActions';
import { useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingPage(props) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const dispatch = useDispatch();


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({address, city, country, postalCode}));
    props.history.push('/payment')
  }

  return (
    <div>
      <CheckoutSteps step1 step2/>
      <div className="form">
        <form action="post" onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Shipping</h2>
            </li>
            <li>
              <label htmlFor="address">Address</label>
              <input type="text" name="address" id="address" required={true} onChange={(e) => setAddress(e.target.value)} />
            </li>
            <li>
              <label htmlFor="city">City</label>
              <input type="text" name="city" id="city" required={true} onChange={(e) => setCity(e.target.value)} />
            </li>
            <li>
              <label htmlFor="country">Country</label>
              <input type="text" name="country" id="country" required={true} onChange={(e) => setCountry(e.target.value)} />
            </li>
            <li>
              <label htmlFor="postalCode">Postal Code</label>
              <input type="text" name="postalCode" id="postalCode" required={true} onChange={(e) => setPostalCode(e.target.value)} />
            </li>
            <li><button className="button primary" type="submit">Continue</button></li>
          </ul>
        </form>
      </div>
    </div>
  )
}
