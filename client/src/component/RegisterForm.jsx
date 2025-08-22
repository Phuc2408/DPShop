import { useState } from "react";
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import { z } from 'zod';
import { useNavigate } from "react-router-dom";

const registerSchema = z.object({
    FirstName: z.string().min(1, { message: "Họ không được để trống" }),
    LastName: z.string().min(1, { message: "Tên không được để trống" }),
    dayOfBirth: z.string().min(1, { message: "Vui lòng chọn ngày sinh" }),
    email: z.string().email({ message: "Địa chỉ email không hợp lệ" }),
    phoneNumber: z.string().regex(/^\d{10}$/, { message: "Số điện thoại phải gồm 10 chữ số" }),
    password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
});

export default function RegisterForm() {
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        dayOfBirth: '',
        email: '',
        phoneNumber: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

     const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
         
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        setErrors({}); 

        const validationResult = registerSchema.safeParse(formData);

        if (!validationResult.success) {
            const formattedErrors = validationResult.error.flatten().fieldErrors;
            setErrors(formattedErrors);
            console.log("Dữ liệu không hợp lệ:", formattedErrors);
            return;
        }
        try { 
            const apiUrl = `${API_BASE_URL}/api/auth/register`; 
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(validationResult.data),
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Đăng ký không thành công');
            }
            const data = await response.json();
            console.log("Đăng ký thành công:", data);
            alert("Đăng ký thành công! Vui lòng đăng nhập.");
            navigate('/login');
            
        }
        catch (error) {
            console.error("Lỗi khi đăng ký:", error);
            alert("Đăng ký không thành công: " + error.message);
        }
    }
    const handleGoogleLogin = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async (codeResponse) => {
            console.log('Google login success, received code:', codeResponse.code);
            try {
                const apiUrl = `${API_BASE_URL}/api/auth/google`;
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code: codeResponse.code }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Google login failed on server');
                }

                const data = await response.json();
                localStorage.setItem('user', JSON.stringify({
                    token: data.token,
                    user: data.user
                }));
                navigate('/');
                alert(data.message);
            } catch (error) {
                console.error("Error during Google login:", error);
                alert("Google login failed: " + error.message);
            }
        },
        onError: error => {
            console.log('Google login failed:', error);
            alert('Google login failed. Please try again.');
        },
    });
    return (
        <div className="w-[500px] mx-auto mt-4 border p-8 rounded-lg shadow">
            <h2 className="text-[#9F8A46] font-bold text-2xl mb-1">TẠO TÀI KHOẢN</h2>
            <p className="mb-4 py-2">
                Đã đăng ký thành viên?{" "}
                <a className="text-[#9F8A46] underline" href='/login'>Đăng nhập</a>
                {" "}tại đây.
            </p>
            <div className="mt-4 space-y-4">
                <button
                    onClick={() => handleGoogleLogin()}
                    className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                    <FcGoogle className="w-6 h-6 mr-3" />
                    <span className="font-semibold text-gray-700">Đăng nhập với Google</span>
                </button>
 
                <p className="text-center py-1 text-gray-300 ">HOẶC</p>
            </div>
            <form className="space-y-5 mt-4" onSubmit={handleSubmit} noValidate>
                <label className="text-[#0A0A0A] block">
                    Họ:
                    <input
                        type="text"
                        name="FirstName"
                        value={formData.FirstName}
                        className="w-full py-2 border-b border-gray-300 focus:border-[#9F8A46] focus:outline-none placeholder-gray-300"
                        onChange={handleInputChange}
                        placeholder="Họ"
                    />
                    {errors.FirstName && <p className="text-red-500 text-xs mt-1">{errors.FirstName}</p>}
                </label>
                <label className="text-[#0A0A0A] block">
                    Tên:
                    <input
                        type="text"
                        name="LastName"
                        value={formData.LastName}
                        className="w-full py-2 border-b border-gray-300 focus:border-[#9F8A46] focus:outline-none placeholder-gray-300"
                        onChange={handleInputChange}
                        placeholder="Tên"
                    />
                    {errors.LastName && <p className="text-red-500 text-xs mt-1">{errors.LastName}</p>}
                </label>
                <label className="text-[#0A0A0A] block">
                    Ngày sinh:
                    <input
                        type="date"
                        name="dayOfBirth"
                        value={formData.dayOfBirth}
                        className="w-full py-2 border-b border-gray-300 focus:border-[#9F8A46] focus:outline-none placeholder-gray-300"
                        onChange={handleInputChange}
                    />
                    {errors.dayOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dayOfBirth}</p>}
                </label>
                <label className="text-[#0A0A0A] block">
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        className="w-full py-2 border-b border-gray-300 focus:border-[#9F8A46] focus:outline-none placeholder-gray-300"
                        onChange={handleInputChange}
                        placeholder="Địa chỉ Email"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </label>
                <label className="text-[#0A0A0A] block">
                    Số điện thoại:
                    <input
                        type="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        className="w-full py-2 border-b border-gray-300 focus:border-[#9F8A46] focus:outline-none placeholder-gray-300"
                        onChange={handleInputChange}
                        placeholder="Số điện thoại"
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                </label>
                <label className="text-[#0A0A0A] block">
                    Mật khẩu:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        className="w-full py-2 border-b border-gray-300 focus:border-[#9F8A46] focus:outline-none placeholder-gray-300"
                        onChange={handleInputChange}
                        placeholder="Mật khẩu"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </label>
                <button
                    type="submit"
                    className="w-full bg-[#9F8A46] font-bold text-white py-2 rounded-md hover:bg-[#8e793d] transition"
                >
                    Tạo tài khoản
                </button>
            </form>
        </div>
    );
}