import React, { useEffect, useState } from 'react';
import get from '../../utils/request';
import Heading from "../Shared/Heading";
import ProductCard from "./ProductCard";

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get({ url: 'artworks', method: 'GET' });
        console.log(response.items)
        setProductsData(response.items); // Set the fetched items to the state
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Map the fetched data to a suitable format for the ProductCard
  const mappedProducts = productsData.map(product => ({
    id: product.id,
    img: "https://cdn.prod.website-files.com/665858d6442988bba748fa67/6684443d10d2d858150d8aaf_imagem-1-ux-design-e-product-design-descubra-a-diferenca_61f14bab0929ddc819c0d8d688512a0b_2000.png", // You can set this based on your data if available
    title: product.title,
    price: product.price,
    aosDelay: "200", // You can adjust this for animation delay based on your needs
  }));

  return (
    <div>
      <div className="container">
        {/* Header section */}
        <Heading title="What we offer" subtitle={"Explore Our pieces"} />
        
        {/* Body section */}
        <ProductCard data={mappedProducts} />
      </div>
    </div>
  );
};

export default Products;
