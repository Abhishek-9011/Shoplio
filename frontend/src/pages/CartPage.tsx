import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/cart`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setCart(response.data.cart);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = async (productId, newQuantity) => {
    setUpdating(true);
    console.log(productId);
    console.log(newQuantity);

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/${productId}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setCart(response.data.cart);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update cart");
    } finally {
      setUpdating(false);
    }
  };

  const removeItem = async (productId) => {
    setRemoving(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/${productId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setCart(response.data.cart);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove item");
    } finally {
      setRemoving(false);
    }
  };

  if (loading)
    return <div className="flex justify-center py-20">Loading cart...</div>;
  if (error)
    return <div className="text-red-500 text-center py-20">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      {cart?.products?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-4">Your cart is empty</p>
          <Link
            to="/products"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cart?.products?.map((item) => {
              const finalPrice =
                item.product.discountedPrice || item.product.price;
              const totalPrice = finalPrice * item.quantity;

              return (
                <div
                  key={item._id}
                  className="border-b border-gray-200 py-6 flex flex-col sm:flex-row gap-4"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium">
                        {item.product.title}
                      </h3>
                      <p className="text-lg font-semibold">
                        ₹{totalPrice.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex gap-2 mt-1">
                      <p className="text-gray-600">
                        ₹{finalPrice.toLocaleString()} each
                      </p>
                      {item.product.discountedPrice && (
                        <p className="text-gray-400 line-through">
                          ₹{item.product.price.toLocaleString()}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() =>
                            updateQuantity(item.product._id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1 || updating}
                          className="px-3 py-1 disabled:opacity-50"
                        >
                          -
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product._id, item.quantity + 1)
                          }
                          disabled={
                            item.quantity >= item.product.stock || updating
                          }
                          className="px-3 py-1 disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product._id)}
                        disabled={removing}
                        className="text-red-500 hover:text-red-700 disabled:opacity-50"
                      >
                        {removing ? "Removing..." : "Remove"}
                      </button>
                    </div>

                    {item.quantity >= item.product.stock && (
                      <p className="text-red-500 text-sm mt-2">
                        Only {item.product.stock} available in stock
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-lg h-fit sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>
                  Subtotal (
                  {cart?.products?.reduce(
                    (acc, item) => acc + item.quantity,
                    0
                  ) || 0}{" "}
                  items)
                </span>
                <span>₹{(cart?.cartTotal || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">
                  ₹{(cart?.cartTotal || 0).toLocaleString()}
                </span>
              </div>
            </div>

            <button
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              disabled={updating || removing}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
