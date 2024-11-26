import React, { useEffect, useState, useMemo } from "react";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import get from "../utils/request";
import Heading from "../components/Shared/Heading";
import Loading from "../components/Shared/Loading";
import ProductCard from "../components/Products/ProductCard";
import Navbar from "../components/Navbar/Navbar";
import StateError from "../components/Shared/StateError";
import StateNotFound from "../components/Shared/StateNotFound";
import Footer from '../components/Footer/Footer';
const ProductsPage = () => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtering and Sorting States
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [priceFilter, setPriceFilter] = useState({
    min: 0,
    max: Infinity
  });

  // Fetch Products
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await get({ url: "artworks", method: "GET" });
      setProductsData(response.items);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch products");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Memoized and Filtered Products
  const processedProducts = useMemo(() => {
    return productsData
      .filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price >= priceFilter.min &&
        product.price <= priceFilter.max
      )
      .sort((a, b) => {
        switch(sortOption) {
          case "priceAsc":
            return a.price - b.price;
          case "priceDesc":
            return b.price - a.price;
          case "titleAsc":
            return a.title.localeCompare(b.title);
          case "titleDesc":
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      })
      .map((product) => ({
        id: product.id,
        img: "https://cdn.prod.website-files.com/665858d6442988bba748fa67/6684443d10d2d858150d8aaf_imagem-1-ux-design-e-product-design-descubra-a-diferenca_61f14bab0929ddc819c0d8d688512a0b_2000.png",
        title: product.title,
        price: product.price,
        aosDelay: "200",
      }));
  }, [productsData, searchTerm, sortOption, priceFilter]);

  // Render Loading State
  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex h-[80vh] justify-center items-center">
        <Loading />
        </div>
       
      </div>
    );
  }

  // Render Error State
  if (error) {
    return (
      <div>
        <Navbar />
        <div className="flex h-[80vh] justify-center items-center">
        <StateError
          message={error}
          onTryAgain={fetchData}
         
        />
        </div>
      </div>
    );
  }

  // Render Not Found State
  if (!processedProducts.length) {
    return (
      <div>
        <Navbar />
        <div className="flex h-[80vh] justify-center items-center">
        <StateNotFound
          message="No products found. Please adjust your filters."
          onBack={() => console.log("Navigate back")}
        />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Heading 
          title="What we offer" 
          subtitle="Explore Our Pieces" 
          className="text-center mb-8"
        />

        {/* Responsive Filtering Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search Input */}
          <div className="relative flex-grow">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>

          {/* Price Filter */}
          <div className="flex items-center space-x-2">
            <input 
              type="number" 
              placeholder="Min Price" 
              value={priceFilter.min || ''}
              onChange={(e) => setPriceFilter(prev => ({ 
                ...prev, 
                min: e.target.value ? Number(e.target.value) : 0 
              }))}
              className="w-24 px-2 py-2 border rounded-lg"
            />
            <input 
              type="number" 
              placeholder="Max Price" 
              value={priceFilter.max === Infinity ? '' : priceFilter.max}
              onChange={(e) => setPriceFilter(prev => ({ 
                ...prev, 
                max: e.target.value ? Number(e.target.value) : Infinity 
              }))}
              className="w-24 px-2 py-2 border rounded-lg"
            />
          </div>

          {/* Sort Dropdown */}
          <select 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="default">Default Sorting</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="titleAsc">Title: A-Z</option>
            <option value="titleDesc">Title: Z-A</option>
          </select>
        </div>

        {/* Product Grid */}
       
          <ProductCard data={processedProducts} />
          <Footer />
      </div>
    </div>
  );
};

export default ProductsPage;