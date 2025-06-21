import axios from "axios";
import { Button } from "./Button";
import { useContext } from "react";
import CartContext from "../../context/CartContext";
import { toast } from "react-toastify";

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
  const { setCart } = useContext(CartContext);
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
  const discountPercentage = discountedPrice
    ? Math.round(((price - discountedPrice) / price) * 100)
    : 0;

  const addTocart = async (_id: string, price: number) => {
    try {
      const response = await axios.post(
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

      // ✅ Update the cart context here
      setCart(response.data.cart);

      toast("Added to cart");
      console.log("Successfully added to cart");
    } catch (e) {
      console.error("Some error occurred: ", e);
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
      {/* Image section with overlay effects */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discountedPrice && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
              {discountPercentage}% OFF
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
              OUT OF STOCK
            </span>
          )}
        </div>

        {/* Stock indicator */}
        {!isOutOfStock && stock <= 5 && (
          <div className="absolute top-3 right-3">
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
              Only {stock} left!
            </span>
          </div>
        )}

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content section */}
      <div className="p-5 flex flex-col h-full">
        {/* Title and rating row */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 flex-1 pr-2 leading-tight">
            {title}
          </h3>
          {rating !== undefined && rating > 0 && (
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full border border-yellow-200 flex-shrink-0">
              <svg
                className="w-4 h-4 text-yellow-400 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <span className="text-sm font-semibold text-yellow-700">
                {rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Price section */}
        <div className="flex items-center gap-3 mb-4">
          {discountedPrice ? (
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-green-600">
                ₹{discountedPrice.toLocaleString()}
              </span>
              <span className="text-lg line-through text-gray-400">
                ₹{price.toLocaleString()}
              </span>
            </div>
          ) : (
            <span className="text-2xl font-bold text-purple-600">
              ₹{price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Stock info */}
        <div className="mb-4">
          {isOutOfStock ? (
            <div className="flex items-center gap-2 text-red-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">Out of Stock</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-green-600">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">In Stock</span>
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {stock} available
              </span>
            </div>
          )}
        </div>

        {/* Add to cart button */}
        <div className="mt-auto">
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
            className={`w-full transition-all duration-300 ${
              isOutOfStock
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105"
            }`}
          />
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
    </div>
  );
};
