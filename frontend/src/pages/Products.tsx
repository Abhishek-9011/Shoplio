import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Card } from "../component/ui/Card";
import Pagination from "../component/ui/Pagination";
import SearchBar from "../component/ui/SearchBar";
import { FiLoader } from "react-icons/fi";
import Sidebar from "../component/ui/Sidebar";
import ProductContext from "../context/ProductContext";

const Products = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const { products, setProducts } = useContext(ProductContext );
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 100],
  });

  const lastPageIndex = currentPage * postPerPage;
  const firstPageIndex = lastPageIndex - postPerPage;
  const currentPost = products.slice(firstPageIndex, lastPageIndex);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/products`
        );
        setOriginalProducts(data.products);
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <FiLoader className="animate-spin text-6xl text-blue-600" />
            <div className="absolute inset-0 animate-ping">
              <FiLoader className="text-6xl text-blue-400 opacity-30" />
            </div>
          </div>
          <p className="text-gray-600 font-medium text-lg">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      {/* Header Section */}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
         

          {/* Products Section */}
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="bg-white rounded-2xl  border border-gray-100 p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8v2m0 6V9"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    No products found
                  </h3>
                  <p className="text-gray-600 text-lg mb-6">
                    We couldn't find any products matching your criteria
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-blue-800 font-medium">
                      Try adjusting your search criteria
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Products Grid */}
                <div className="bg-white rounded-2xl  border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                      {currentPost.map(
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
                          <div
                            key={_id}
                            className="transform transition-all duration-300 hover:scale-105"
                          >
                            <Card
                              _id={_id}
                              title={title}
                              description={description}
                              image={image}
                              price={price}
                              discountedPrice={discountedPrice}
                              stock={stock}
                              rating={rating}
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Pagination */}
                <div className="bg-white rounded-2xl  border border-gray-100 p-6">
                  <Pagination
                    totalProducts={products.length}
                    postPerPage={postPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label="Back to top"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
};

export default Products;
