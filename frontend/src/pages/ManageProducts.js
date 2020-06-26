import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts, deleteProduct } from '../actions/productActions';

export default function ManageProducts(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState("");

  /* Product List */
  const productList = useSelector(state => state.productList);
  const { loading, products, error } = productList;

  /* Product Save */
  const productSave = useSelector(state => state.productSave);
  const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

  /* Product Delete */
  const productDelete = useSelector(state => state.productDelete);
  const { success: successDelete } = productDelete;


  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successDelete,successSave, dispatch]);


  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveProduct({ _id: id, name, category, image, brand, price, description, countInStock }));
  }

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  }

  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" onClick={() => openModal({})}>Create Product</button>
      </div>
      {modalVisible &&
        <div className="form">
          <form action="post" onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create Product</h2>
              </li>
              <li>{loadingSave && <div>Loading..</div>}</li>
              <li>{errorSave && <div>{error}</div>}</li>
              <li>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </li>
              <li>
                <label htmlFor="category">Category</label>
                <input type="text" name="Category" id="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
              </li>
              <li>
                <label htmlFor="brand">Brand</label>
                <input type="text" name="brand" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input type="text" name="image" id="image" value={image} onChange={(e) => setImage(e.target.value)} />
              </li>
              <li>
                <label htmlFor="Price">Price</label>
                <input type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
              </li>
              <li>
                <label htmlFor="countInStock">count in stock</label>
                <input type="text" name="countInStock" id="countInStock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </li>
              <li><button className="button primary" type="submit">{id ? "Update" : "Create"}</button></li>
              <li><button className="button seconday" type="button" onClick={() => setModalVisible(false)}>Cancel</button></li>
            </ul>
          </form>
        </div>
      }
      {
        loading?<div>Loading Products...</div>:
        <div className="product-list">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                products.map(product =>
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <button className="button secondary" onClick={() => deleteHandler(product)}>Delete</button>
                      <button className="button secondary" onClick={() => openModal(product)}>Edit</button>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  )

}
