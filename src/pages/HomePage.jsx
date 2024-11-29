import { useState, useEffect } from 'react';
import Hero from '@/components/Hero/Hero';
import Navbar from '@/components/Navbar/Navbar';
import Category from '@/components/Category/Category';
import Services from '@/components/Services/Services';
import Banner from '@/components/Banner/Banner';
import Products from '@/components/Products/Products';
import Footer from '@/components/Footer/Footer';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';

const BannerData = {
  discount: "30% OFF",
  title: "Special Winter Collection",
  date: "10 Jan to 28 Jan",
  image: "/images/winter-collection.jpg", // Update with actual image path
  title2: "Seasonal Favorites",
  title3: "Winter Sale",
  title4: "Discover our curated collection of winter essentials with exclusive discounts",
  bgColor: "#f42c37",
};

const BannerData2 = {
  discount: "30% OFF",
  title: "New Arrivals",
  date: "14 Jan to 28 Jan",
  image: "/images/new-arrivals.jpg", // Update with actual image path
  title2: "Fresh Collection",
  title3: "Spring Preview",
  title4: "Be the first to explore our latest arrivals with special launch prices",
  bgColor: "#2dcc6f",
};

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-4">
          <LoadingSkeleton className="h-[60vh] mb-8" /> {/* Hero skeleton */}
          <LoadingSkeleton className="h-40 mb-8" /> {/* Category skeleton */}
          <LoadingSkeleton className="h-32 mb-8" /> {/* Services skeleton */}
          <LoadingSkeleton className="h-64 mb-8" /> {/* Products skeleton */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      {/* Main content wrapper */}
      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="mb-12">
          <Hero />
        </section>

        {/* Category Section */}
        <section className="mb-12">
          <Category />
        </section>

        {/* Services Section */}
        <section className="mb-12">
          <Services />
        </section>

        {/* First Banner */}
        <section className="mb-12">
          <Banner data={BannerData} />
        </section>

        {/* Products Section */}
        <section className="mb-12">
          <Products />
        </section>

        {/* Second Banner */}
        <section className="mb-12">
          <Banner data={BannerData2} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
