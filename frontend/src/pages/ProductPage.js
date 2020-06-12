import React from 'react';
import data from '../data';
import { Link } from 'react-router-dom';

export default function ProductPage(props) {
  const product = data.products.find(x => x._id === parseInt(props.match.params.id));

  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>
      <div className="details">
        <div className="image">
          <img src={product.image} alt="product" />
        </div>
        <div className="details-info">
          <ul>
            <li><h4>{product.name}</h4></li>
            <li>{product.price}</li>
            <li>{product.brand}</li>
            <li>{product.review} Stars out of {product.numReviews}</li>
            <li>{product.desc}</li>
          </ul>
        </div>
        <div className="details-action">
          <ul>
            <li>Price: {product.price}</li>
            <li>Status: {product.status}</li>
            <li>Qty: 
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </li>
            <li><button className="button primary">Add to cart</button></li>
          </ul>
        </div>
        
      </div>
    </div>
  )
}
