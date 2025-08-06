import { useState } from "react";
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async(event) => {
        event.preventDefault();
        const userData = {
            email: email,
            password: password
        };
        try {
            const apiUrl = 'http://localhost:5000/api/auth/login';
            console.log("Sending user data:", userData);
            const response= await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error:", errorData.message);
                alert(errorData.message);
                return;
            }
            const data = await response.json();
            console.log("User successfully log in:", data);
            alert("Đang nhập thành công!");
        }
        catch (error) {
            console.error("Error during login:", error);
        }
    }
    const handleGoogleLogin = useGoogleLogin({
        onSuccess: tokenResponse => {
            // tokenResponse.access_token chứa token để xác thực với backend
            console.log('Google login success:', tokenResponse);
            const accessToken = tokenResponse.access_token;

            // **BẮT BUỘC**: Gửi accessToken này về server của bạn để xác thực,
            // lấy thông tin người dùng và tạo phiên đăng nhập an toàn.
            // Ví dụ:
            // fetch('/api/auth/google', {
            //   method: 'POST',
            //   headers: { 'Authorization': `Bearer ${accessToken}` }
            // });
        },
        onError: error => {
            console.log('Google login failed:', error);
        },
    });
     const handleFacebookLogin = () => {
        // Kiểm tra xem SDK đã tải xong chưa (đối tượng FB đã tồn tại trên window)
        if (window.FB) {
            window.FB.login(function(response) {
                if (response.authResponse) {
                    console.log('Facebook login success:', response.authResponse);
                    const { accessToken } = response.authResponse;

                    // **BẮT BUỘC**: Gửi accessToken này về server của bạn để
                    // xác thực và hoàn tất quá trình đăng nhập.
                    // Ví dụ:
                    // fetch('/api/auth/facebook', {
                    //   method: 'POST',
                    //   body: JSON.stringify({ accessToken }),
                    // });

                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            }, { scope: 'email,public_profile' }); // Các quyền bạn muốn lấy từ người dùng
        } else {
            alert("Chức năng đăng nhập Facebook đang được tải, vui lòng thử lại sau giây lát.");
        }
    }
    return (
        <div className="w-[500px] mx-auto mt-4 border p-8 rounded-lg shadow">
            <h2 className="text-[#9F8A46] font-bold text-2xl mb-1">ĐĂNG NHẬP</h2>
            <p className="mb-4 py-2">Chưa đăng ký thành viên? {""}
                <Link className="text-[#9F8A46] underline" to='/register'>Đăng ký</Link>
                {" "}tại đây.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
        <label className="text-[#0A0A0A] block"> 
            Email:
            <input
            type="email"
                value={email}
                className="w-full py-2 border-b border-gray-300 focus:border-[#9F8A46] focus:outline-none placeholder-gray-300"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Địa chỉ Email"
            />
        </label>
      <label className="text-[#0A0A0A] block">
        Mật khẩu:
        <input
          type="password"
              value={password}
              className="w-full py-2 border-b border-gray-300 focus:border-[#9F8A46] focus:outline-none placeholder-gray-300"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••••"
        />
      </label>
          <button className="w-full bg-[#9F8A46] font-bold text-white py-2 rounded-md hover:bg-[#8e793d] transition" type="submit">Đăng nhập</button>
            </form>
          <Link to='/forgotpw' className="block mt-3 underline text-sm"> Quên mật khẩu </Link>
            <div className="mt-4 space-y-4">
                <button
                    onClick={() => handleGoogleLogin()}
                    className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                    <FcGoogle className="w-6 h-6 mr-3" />
                    <span className="font-semibold text-gray-700">Đăng nhập với Google</span>
                </button>

                <button
                    onClick={handleFacebookLogin}
                    className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                    <FaFacebook className="w-6 h-6 mr-3 text-[#1877F2]" />
                    <span className="font-semibold text-gray-700">Đăng nhập với Facebook</span>
                </button>
            </div>
        </div>
    );
}