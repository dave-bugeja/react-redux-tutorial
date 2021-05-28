import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const ProductComponent = () => {
    const products = useSelector((state) => state.allProducts.products);
    const renderList = products.map((product) => {
        const { id, title, image, price, category } = product;

        let formattedPrice = "";
        if (price && price !== "") {
            formattedPrice = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(price);
        }

        return (
            <div className="card" key={id}>
                <Link to={`/product/${id}`} className="cardLink">
                    <div className="image"><img src={image} alt={title} /></div>
                    <div className="content">
                        <div className="header">{title}</div>
                        <div className="meta price">{formattedPrice}</div>
                        <div className="meta">{category}</div>
                    </div>
                </Link>
            </div>
        );
    });
    
    return (
        <div className="four ui links equal height cards">
                {renderList}
        </div>
    );
}

export default ProductComponent;