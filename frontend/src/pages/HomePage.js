import React from 'react'
import data from '../data';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <ul className="products">
    {
      data.products.map(product =>
        <li key={product._id}>
          <div className="product">
            <Link to={`/products/${product._id}`}>
              <img className="product-image" src={product.image} alt="product" />
            </Link>
            <div className="product-name">
              <Link to={`/products/${product._id}`}>{product.name}</Link>
            </div>
            <div className="product-brand">{product.brand}</div>
            <div className="product-price">{product.price}</div>
            <div className="product-rating">{product.rating} Stars ({product.numReviews} reviews)</div>
          </div>
        </li>
      )}

  </ul>
  )
}
