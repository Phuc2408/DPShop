import product_picture from "../../assets/product.webp"
export default function ProductCard({ product }) {
    return (
        <div>
            <img src={product_picture} alt="Sample" />
            <div>
                <h3 className="text-[#231E18] font-medium no-underline cursor-pointer line-normal break-words ">
                    {product.name}
                </h3>
                <p className="text-[#231E18] text-base font-semibold leading-tight tracking-normal mb-0">
                    {product.price.toLocaleString('vi-VN')} VNĐ
                </p>
                <p>
                    {product.status}
                </p>
            </div>
        </div>
    );
}