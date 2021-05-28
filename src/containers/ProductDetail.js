import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectedProduct } from '../redux/actions/productActions';

export const ProductDetail = () => {
    //initial product is empty; after component is refreshed, product details will be populated
    let product = useSelector((state) => state.product);
    const { image, title, price, category, description } = product;

    //productId is resolved from the URL param declared in App.js
    const { productId } = useParams();
    const dispatch = useDispatch();

    //once productId is resolved, useEffect is called to render 
    useEffect(() => {
        if (productId && productId !== "") {
            const fetchProductDetail = async () => {
                const response = await axios
                .get(`https://fakestoreapi.com/products/${productId}`)
                .catch((err) => {
                    console.log("Error ", err);
                });
        
                dispatch(selectedProduct(response.data));
            };

            fetchProductDetail();
        }

    }, [productId, dispatch]);
    
    return (
        <div className="ui grid container">
        {Object.keys(product).length === 0 ? (
          <div></div>
        ) : (
          <div className="ui placeholder segment">
            <div className="ui two column stackable center aligned grid">
              <div className="middle aligned row">
                <div className="column lp">
                  <img className="ui fluid image" src={image} alt={title}/>
                </div>
                <div className="column rp">
                  <h1>{title}</h1>
                  <h2>
                    <a className="ui teal tag label" href="/price-tracker">${price}</a>
                  </h2>
                  <h3 className="ui brown block header">{category}</h3>
                  <p>{description}</p>
                  <div className="ui vertical animated button" tabIndex="0">
                    <div className="hidden content">
                      <i className="shop icon"></i>
                    </div>
                    <div className="visible content">Add to Cart</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default ProductDetail;