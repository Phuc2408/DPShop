import Header from "../component/Header/Header";
import Footer from "../component/Footer";
import Layout from "../component/Layout";
import SearchBar from "../component/SearchBar";
import LoginForm from "../component/LoginForm.jsx";
export default function Loginpage() {
    return (
        <>
            <Header/>
                <Layout>
                    <SearchBar />
                    <LoginForm />
                </Layout>
                    <Footer />
        </>
    );
}