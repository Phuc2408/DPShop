import { useState } from "react";
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
export default function LoginForm() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async(event) => {
        event.preventDefault();
        const userData = {
            email: email,
            password: password
        };
        try {
            const apiUrl = `${API_BASE_URL}/api/auth/login`;
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
            navigate('/');
        }
        catch (error) {
            console.error("Error during login:", error);
        }
    }
    const handleGoogleLogin = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async tokenResponse => {
            console.log('Google login success:', tokenResponse.code);
            try {
                const response = await fetch(`${API_BASE_URL}/api/auth/google`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code: tokenResponse.code }),
                });
                if (!response.ok) {
                    const errorData = response.json();
                    console.error("Error:", errorData.message);
                    alert(errorData.message);
                    return;
                }
                const data = await response.json();
                localStorage.setItem('user', JSON.stringify({
                    token: data.token,
                    user: data.user
                }
                ));
                navigate('/');
            }
            catch (error) {
                console.error("Error during Google login:", error);
            }
        },
        onError: error => {
            console.log('Google login failed:', error);
        },
    });
     
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
            </div>
        </div>
    );
}