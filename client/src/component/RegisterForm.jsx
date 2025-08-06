import { useState } from "react";
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { z } from 'zod';

const registerSchema = z.object({
    FirstName: z.string().min(1, { message: "Họ không được để trống" }),
    LastName: z.string().min(1, { message: "Tên không được để trống" }),
    dayOfBirth: z.string().min(1, { message: "Vui lòng chọn ngày sinh" }),
    email: z.string().email({ message: "Địa chỉ email không hợp lệ" }),
    phoneNumber: z.string().regex(/^\d{10}$/, { message: "Số điện thoại phải gồm 10 chữ số" }),
    password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
});

export default function RegisterForm() {
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
        setErrors({}); // Xóa lỗi cũ

        const validationResult = registerSchema.safeParse(formData);

        if (!validationResult.success) {
            const formattedErrors = validationResult.error.flatten().fieldErrors;
            setErrors(formattedErrors);
            console.log("Dữ liệu không hợp lệ:", formattedErrors);
            return;
        }
        try { 
            const apiUrl = 'http://localhost:5000/api/auth/register'; 
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
        }
        catch (error) {
            console.error("Lỗi khi đăng ký:", error);
            alert("Đăng ký không thành công: " + error.message);
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
        // Khôi phục class gốc của bạn
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

                <button
                    onClick={handleFacebookLogin}
                    className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                    <FaFacebook className="w-6 h-6 mr-3 text-[#1877F2]" />
                    <span className="font-semibold text-gray-700">Đăng nhập với Facebook</span>
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