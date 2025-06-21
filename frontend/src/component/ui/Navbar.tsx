import { useContext, useState } from "react";
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CartContext from "../../context/CartContext";
import UserContext from "../../context/UserContext";
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <button
              className="md:hidden mr-4 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <h1 className="text-2xl font-bold text-indigo-600">ShopEase</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              onClick={() => {
                navigate("/");
              }}
              href="#"
              className="text-gray-800 hover:text-indigo-600 font-medium"
            >
              Home
            </a>
            <a
              onClick={() => {
                navigate("/products");
              }}
              href="#"
              className="text-gray-600 hover:text-indigo-600"
            >
              Shop
            </a>

            <a href="#" className="text-gray-600 hover:text-indigo-600">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">
              Contact
            </a>
          </nav>

          {/* Search and Icons */}
          <div className="flex items-center space-x-4">
            {/* <SearchBar/> */}
            <button
              onClick={() => {
                navigate("/cart");
              }}
              className="p-2 text-gray-700 hover:text-indigo-600 relative"
            >
              <FiShoppingCart size={20} />
              {cart?.products?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.products.length}
                </span>
              )}
            </button>
           {
            localStorage.getItem("token")? <button onClick={() => {
                navigate("/profile");
              }} className="p-2 text-gray-700 hover:text-indigo-600">
              <FiUser size={20} />
            </button>:""
           }

            
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-3 space-y-3">
            <a
              href="#"
              className="block text-gray-800 hover:text-indigo-600 font-medium"
            >
              Home
            </a>
            <a href="#" className="block text-gray-600 hover:text-indigo-600">
              Shop
            </a>

            <a href="#" className="block text-gray-600 hover:text-indigo-600">
              About
            </a>
            <a href="#" className="block text-gray-600 hover:text-indigo-600">
              Contact
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
