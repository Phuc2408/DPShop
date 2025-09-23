import ProductLayout from '../component/ProductLayout/ProductLayout';
import Header from '../component/Header/Header';
import Footer from '../component/Footer';
import Layout from '../component/Layout';
import SearchBar from '../component/SearchBar';
import { useParams } from 'react-router-dom';

export default function ProductPage() {
    const { categorySlug, subSlug } = useParams();
    return (
        <div>
            <Header />
            <Layout>
                <SearchBar />
                <ProductLayout category={categorySlug} sub={subSlug} />
            </Layout>
            <Footer />
        </div>
    );
}