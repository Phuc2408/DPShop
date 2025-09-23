// File: data/sampleProducts.js
import product_picture from "F:\\Project\\Bandan\\client\\src\\assets\\product.webp"

const sampleProducts = [];
for (let i = 1; i <= 100; i++) {
    sampleProducts.push({
        id: i,
        name: `Sản phẩm mẫu ${i}`,
        price: (Math.floor(Math.random() * 200) + 100) * 1000,
        image: product_picture,
        status: 'Có hàng'
    });
}

export default sampleProducts;