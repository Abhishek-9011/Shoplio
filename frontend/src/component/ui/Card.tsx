import axios from "axios";
import { Button } from "./Button";
interface CardProps {
  _id?: string;
  title: string;
  description: string;
  image: string;
  price: number;
  discountedPrice?: number;
  stock: number;
  rating?: number;
}

export const Card = (props: CardProps) => {
  const {
    _id,
    title,
    description,
    image,
    price,
    discountedPrice,
    stock,
    rating,
  } = props;

  const isOutOfStock = stock <= 0;
  const addTocart = async (_id: any, price: any) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/cart`,
        {
          products: [
            {
              product: _id,
              quantity: 1,
              price: price,
            },
          ],
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      alert("Added to cart");
      console.log("successfully added to cart");
    } catch (e) {
      console.log("some error ocurred" + e);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 max-w-xl w-full flex gap-4">
      {/* Image section */}
      <div className="w-40 h-40 flex-shrink-0 overflow-hidden rounded-md">
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </div>

      {/* Info section */}
      <div className="flex flex-col justify-between flex-1">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

          {rating !== undefined && rating > 0 && (
            <div className="text-yellow-500 text-sm">
              ⭐ {rating.toFixed(1)}
            </div>
          )}

          <div className="flex items-center gap-2">
            {discountedPrice ? (
              <>
                <span className="text-lg font-bold text-purple-700">
                  ₹{discountedPrice}
                </span>
                <span className="text-sm line-through text-gray-500">
                  ₹{price}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-purple-700">
                ₹{price}
              </span>
            )}
          </div>

          <div className="text-xs text-gray-500">
            {isOutOfStock ? "Out of Stock" : `${stock} in stock`}
          </div>
        </div>

        {/* Button */}
        <div className="mt-2">
          <Button
            variant="primary"
            size="md"
            text={isOutOfStock ? "Unavailable" : "Add to Cart"}
            disabled={isOutOfStock}
            //@ts-ignore
            onClick={() => {
              if (!isOutOfStock) {
                addTocart(_id, discountedPrice || price);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
