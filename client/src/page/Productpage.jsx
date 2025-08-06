import ProductLayout from '../component/ProductLayout/ProductLayout';
import Header from '../component/Header/Header';
import Footer from '../component/Footer';
import Layout from '../component/Layout';
export default function ProductPage() {
    return (
        <div>
            <Header/>
            <Layout>
                <ProductLayout />
            </Layout>
            <Footer />
        </div>
    );
}