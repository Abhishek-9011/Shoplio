import { useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";

// Type definitions
interface Product {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  discountedPrice?: number;
  stock: number;
}

interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
}

interface Cart {
  _id: string;
  user: string;
  products: CartItem[];
  cartTotal: number;
  createdAt: string;
  updatedAt: string;
}

const CartPage = () => {
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [removing, setRemoving] = useState(false);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication required");
        }
        console.log(token);

        const response = await axios.get<{ cart: Cart }>(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/cart`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setCart(response.data.cart);
        console.log(cart);
      } catch (err) {
        const error = err as AxiosError<{ message: string }> | Error;
        setError(
          axios.isAxiosError(error)
            ? error.response?.data?.message || "Failed to fetch cart"
            : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setUpdating(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await axios.patch<{ cart: Cart }>(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/${productId}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCart(response.data.cart);
    } catch (err) {
      const error = err as AxiosError<{ message: string }> | Error;
      setError(
        axios.isAxiosError(error)
          ? error.response?.data?.message || "Failed to update cart"
          : error.message
      );
    } finally {
      setUpdating(false);
    }
  };

  const removeItem = async (productId: string) => {
    setRemoving(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await axios.delete<{ cart: Cart }>(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/${productId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCart(response.data.cart);
    } catch (err) {
      const error = err as AxiosError<{ message: string }> | Error;
      setError(
        axios.isAxiosError(error)
          ? error.response?.data?.message || "Failed to remove item"
          : error.message
      );
    } finally {
      setRemoving(false);
    }
  };

  if (loading) return <CartLoadingSkeleton />;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      {!cart?.products?.length ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cart.products.map((item) => (
              <CartItemCard
                key={item._id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
                updating={updating}
                removing={removing}
              />
            ))}
          </div>

          <OrderSummary cart={cart} updating={updating || removing} />
        </div>
      )}
    </div>
  );
};

// Sub-components for better organization
const CartLoadingSkeleton = () => (
  <div className="flex justify-center py-20">
    <div className="animate-pulse flex flex-col items-center gap-4">
      <div className="h-8 w-64 bg-gray-200 rounded"></div>
      <div className="h-4 w-48 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="text-red-500 text-center py-20">
    <p className="text-xl mb-4">{message}</p>
    <Link to="/" className="text-blue-600 hover:underline">
      Return to Home
    </Link>
  </div>
);

const EmptyCart = () => (
  <div className="text-center py-12">
    <p className="text-xl mb-4">Your cart is empty</p>
    <Link
      to="/products"
      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition inline-block"
    >
      Continue Shopping
    </Link>
  </div>
);

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  updating: boolean;
  removing: boolean;
}

const CartItemCard = ({
  item,
  onUpdateQuantity,
  onRemoveItem,
  updating,
  removing,
}: CartItemCardProps) => {
  const finalPrice = item.product.discountedPrice || item.product.price;
  const totalPrice = finalPrice * item.quantity;

  return (
    <div className="border-b border-gray-200 py-6 flex flex-col sm:flex-row gap-4">
      <div className="flex-shrink-0">
        <img
          src={item.product.image}
          alt={item.product.title}
          className="w-32 h-32 object-cover rounded-lg"
        />
      </div>

      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium">{item.product.title}</h3>
          <p className="text-lg font-semibold">
            ₹{totalPrice.toLocaleString()}
          </p>
        </div>

        <PriceDisplay
          price={item.product.price}
          discountedPrice={item.product.discountedPrice}
        />

        <QuantityControls
          quantity={item.quantity}
          stock={item.product.stock}
          onDecrease={() =>
            onUpdateQuantity(item.product._id, item.quantity - 1)
          }
          onIncrease={() =>
            onUpdateQuantity(item.product._id, item.quantity + 1)
          }
          disabled={updating}
        />

        <button
          onClick={() => onRemoveItem(item.product._id)}
          disabled={removing}
          className="text-red-500 hover:text-red-700 disabled:opacity-50 mt-2"
        >
          {removing ? "Removing..." : "Remove"}
        </button>

        {item.quantity >= item.product.stock && (
          <StockWarning stock={item.product.stock} />
        )}
      </div>
    </div>
  );
};

interface PriceDisplayProps {
  price: number;
  discountedPrice?: number;
}

const PriceDisplay = ({ price, discountedPrice }: PriceDisplayProps) => (
  <div className="flex gap-2 mt-1">
    <p className="text-gray-600">
      ₹{(discountedPrice || price).toLocaleString()} each
    </p>
    {discountedPrice && (
      <p className="text-gray-400 line-through">₹{price.toLocaleString()}</p>
    )}
  </div>
);

interface QuantityControlsProps {
  quantity: number;
  stock: number;
  onDecrease: () => void;
  onIncrease: () => void;
  disabled: boolean;
}

const QuantityControls = ({
  quantity,
  stock,
  onDecrease,
  onIncrease,
  disabled,
}: QuantityControlsProps) => (
  <div className="mt-4 flex items-center gap-4">
    <div className="flex items-center border border-gray-300 rounded-md">
      <button
        onClick={onDecrease}
        disabled={quantity <= 1 || disabled}
        className="px-3 py-1 disabled:opacity-50"
      >
        -
      </button>
      <span className="px-3">{quantity}</span>
      <button
        onClick={onIncrease}
        disabled={quantity >= stock || disabled}
        className="px-3 py-1 disabled:opacity-50"
      >
        +
      </button>
    </div>
  </div>
);

const StockWarning = ({ stock }: { stock: number }) => (
  <p className="text-red-500 text-sm mt-2">Only {stock} available in stock</p>
);

interface OrderSummaryProps {
  cart: Cart;
  updating: boolean;
}

const OrderSummary = ({ cart, updating }: OrderSummaryProps) => (
  <div className="bg-gray-50 p-6 rounded-lg h-fit sticky top-4">
    <h2 className="text-xl font-bold mb-4">Order Summary</h2>

    <div className="space-y-3 mb-6">
      <div className="flex justify-between">
        <span>
          Subtotal (
          {cart.products.reduce((acc, item) => acc + item.quantity, 0)} items)
        </span>
        <span>₹{cart.cartTotal.toLocaleString()}</span>
      </div>
      <div className="flex justify-between">
        <span>Shipping</span>
        <span>Free</span>
      </div>
      <div className="flex justify-between border-t border-gray-200 pt-3">
        <span className="font-semibold">Total</span>
        <span className="font-semibold">
          ₹{cart.cartTotal.toLocaleString()}
        </span>
      </div>
    </div>

    <Link
      to="/checkout"
      className="block w-full text-center bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
      aria-disabled={updating}
    >
      {updating ? "Processing..." : "Proceed to Checkout"}
    </Link>
  </div>
);

export default CartPage;
