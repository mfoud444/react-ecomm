import Hero from '../components/Hero/Hero';
import Navbar from '../components/Navbar/Navbar';
import Category from '../components/Category/Category';
import Category2 from '../components/Category/Category2';
import Services from '../components/Services/Services';
import Banner from '../components/Banner/Banner';
import Products from '../components/Products/Products';
import Blogs from '../components/Blogs/Blogs';
import References from '../components/References/References';
import Footer from '../components/Footer/Footer';
import LoginPage from './LoginPage';
const BannerData = {
    discount: "30% OFF",
    title: "lorem lorem",
    date: "10 Jan to 28 Jan",
    image: "product img",
    title2: "product name",
    title3: "Winter Sale",
    title4: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis",
    bgColor: "#f42c37",
};

const BannerData2 = {
    discount: "30% OFF",
    title: "lorem lorem",
    date: "14 Jan to 28 Jan",
    image: "product img",
    title2: "product name",
    title3: "Winter Sale",
    title4: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis",
    bgColor: "#2dcc6f",
};

const HomePage = () => {
    return (
        <div>
            <Navbar/>
            <Hero />
            <Category />
            <Category2 />
            <Services />
            <Banner data={BannerData} />
            <Products />
            <Banner data={BannerData2} />
            <Blogs />
            <References />
            <Footer />
        </div>
    );
};

export default HomePage;
