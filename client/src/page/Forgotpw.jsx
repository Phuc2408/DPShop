import Header from "../component/Header/Header";
import Footer from "../component/Footer";
import Layout from "../component/Layout";
import SearchBar from "../component/SearchBar";
import ForgotPasswordForm from "../component/Forgotpw.jsx";
export default function Loginpage() {
    return (
        <div>
            <Header/>
            <Layout className="pb-[85px]">
                <SearchBar />
                <ForgotPasswordForm />
            </Layout>
            <Footer />
        </div>
    );
}