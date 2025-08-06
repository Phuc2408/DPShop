import { useState } from "react";
export default function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email);
        // Here you would typically send the email to your backend for processing
    };
    return (
        <div className="w-[500px] mx-auto mt-4 border p-8 rounded-lg shadow">
            <h2 className="text-[#9F8A46] font-bold text-2xl mb-1">LẤY LẠI MẬT KHẨU</h2>
            <p className="mb-4 py-2">Chúng tôi sẽ gửi cho bạn một email để đặt lại mật khẩu mới.</p>
            <form onSubmit={handleSubmit} className="space-y-5">
                <label className="text-[#0A0A0A] block">
                    Địa chỉ Email:
                    <input
                        type="email"
                        value={email}
                        className="w-full py-2 border-b border-gray-300 focus:border-[#9F8A46] focus:outline-none placeholder-gray-300"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Địa chỉ Email"
                        required
                    />
                </label>
                <button
                    type="submit"
                    className="w-full bg-[#9F8A46] font-bold text-white py-2 rounded-md hover:bg-[#8e793d] transition"
                >
                    Submit
                </button>
            </form>

        </div>
    );
}