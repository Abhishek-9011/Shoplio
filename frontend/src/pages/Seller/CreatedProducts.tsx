import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../../component/ui/Card";
import { SellerCard } from "../../component/ui/SellerCard";

const CreatedProducts = () => {
  let [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/createdProducts`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setProducts(products.data.products);
      } catch (e) {
        console.log("some error occured" + e);
      }
    };
    getProducts();
  }, []);
  return (
    <div>
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
            <SellerCard
              key={_id}
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
    </div>
  );
};

export default CreatedProducts;
