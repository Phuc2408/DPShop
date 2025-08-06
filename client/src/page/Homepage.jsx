import Header from "../component/Header/Header";
import Footer from "../component/Footer";
import Layout from "../component/Layout";
import SearchBar from "../component/SearchBar";
import Slider from "../component/Slider";
import BestSellingProducts from "../component/BestSellingProducts/BestSellingProducts";
export default function Homepage() {
    return (
        <>
        <Header/>
            <Layout>
                <SearchBar />
                <Slider />
                <BestSellingProducts></BestSellingProducts>
        </Layout>
            <Footer />
        </>
    );
}