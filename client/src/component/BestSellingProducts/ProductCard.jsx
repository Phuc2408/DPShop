import React from 'react';

export default function ProductCard({ product }) {
    // Xử lý các trường hợp nếu dữ liệu bị thiếu
    const productName = product?.["Product Name"] || 'Không rõ tên sản phẩm';
    const productPrice = product?.Price || 'Liên hệ';
    const firstImage = product?.Images?.[0] || 'đường dẫn ảnh mặc định';
    const stockQuantity = product?.stock_quantity ?? 0;
    const stockStatus = stockQuantity > 0 ? 'Còn hàng' : 'Hết hàng';

    return (
        <div>
            {/* Sửa để hiển thị hình ảnh động từ JSON */}
            <img src={firstImage} alt={productName} />
            <div>
                {/* Sửa tên thuộc tính để khớp với JSON */}
                <h3 className="text-[#231E18] font-medium no-underline cursor-pointer line-normal break-words">
                    {productName}
                </h3>
                {/* Sửa tên thuộc tính và hiển thị giá trực tiếp */}
                <p className="text-[#231E18] text-base font-semibold leading-tight tracking-normal mb-0">
                    {productPrice}
                </p>
                {/* Hiển thị trạng thái dựa trên số lượng tồn kho */}
                <p>
                    {stockStatus}
                </p>
            </div>
        </div>
    );
}