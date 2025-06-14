import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../component/ui/Card";

const Products = () => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/products`
        );
        setProduct(productsData.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {products.map(
        ({
          _id,
          title,
          description,
          image,
          price,
          discountedPrice,
          stock,
          rating,
        }) => (
          <Card
            key={_id}
            _id={_id}
            title={title}
            description={description}
            image={image}
            price={price}
            discountedPrice={discountedPrice}
            stock={stock}
            rating={rating}
          />
        )
      )}
    </div>
  );
};

export default Products;
