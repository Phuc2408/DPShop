import Header from "../component/Header/Header";
import Footer from "../component/Footer";
import Layout from "../component/Layout";
import SearchBar from "../component/SearchBar";
import RegisterForm from "../component/RegisterForm.jsx";
export default function Loginpage() {
    return (
        <>
            <Header/>
                <Layout>
                    <SearchBar />
                    <RegisterForm/>
                </Layout>
                    <Footer />
        </>
    );
}