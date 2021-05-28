import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeSelectedProduct, setProducts } from '../redux/actions/productActions';
import ProductComponent from './ProductComponent';

export const ProductListing = () => {
    const products = useSelector((state) => state.allProducts.products);
    const dispatch = useDispatch();

    useEffect(() => {
        //if product data hasn't been retrieved already, fetch it
        //assumption: product data doesn't change so this check is for performance reasons
        if (!products || Object.keys(products).length === 0) {
            const fetchProducts = async () => {
                const response = await axios
                .get("https://fakestoreapi.com/products")
                .catch((err) => {
                    console.log("Error", err);
                });
                dispatch(setProducts(response.data));
            }

            fetchProducts();
        }

        //remove previously-selected PDP product info to prevent quick-flash of stale product data
        return dispatch(removeSelectedProduct());
    }, [products, dispatch]);

    return (
        <div className="ui grid container">
            <ProductComponent />
        </div>
    )
}

export default ProductListing;