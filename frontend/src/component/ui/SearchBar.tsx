import { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchProps {
  originalProducts: any;
  products: any;
  setProducts: any;
}

const SearchBar = ({
  originalProducts,
  products,
  setProducts,
}: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query === "") {
      // Reset to original products when search is empty
      setProducts(originalProducts);
      return;
    }
    //@ts-ignore
    const filteredProducts = originalProducts.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );

    setProducts(filteredProducts);
  };

  return (
    <div className="relative hidden md:block">
      <input
        type="text"
        placeholder="Search products..."
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
    </div>
  );
};
export default SearchBar;
