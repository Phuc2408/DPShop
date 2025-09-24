import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from './ProductGrid';
import Pagination from './ProductPagination';

export default function ProductLayout({ category, sub }) {
    const [products, setProducts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const limitPerPage = 64;
    const [searchParams, setSearchParams] = useSearchParams();

    // Lấy currentPage từ URL và ép kiểu về số
    const currentPage = Number(searchParams.get('page')) || 1;
    const totalPages = Math.max(1, Math.ceil(totalCount / limitPerPage));

    // Loại bỏ useEffect đầu tiên ở đây.
    // Logic reset trang 1 đã được xử lý ở Navigation.jsx.

    useEffect(() => {
        const base = 'http://localhost:5000/api/products';
        let path = '';

        if (category) {
            path += `/${category}`;
        }
        if (sub) {
            path += `/${sub}`;
        }

        // Tạo URL API hoàn toàn chính xác
        const url = `${base}${path}?page=${currentPage}&limit=${limitPerPage}`;
        console.log('Fetching products from URL:', url);

        const fetchProducts = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) { // Thêm xử lý lỗi nếu response không thành công
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data.items);
                setTotalCount(data.total);
            }
            catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();

    }, [category, sub, currentPage, limitPerPage]);

    const handlePageChange = (page) => {
        // Ép kiểu các giá trị về string trước khi set
        setSearchParams({ page: page.toString(), limit: limitPerPage.toString() });
        window.scrollTo(0, 0);
    }

    return (
        <div>
            <ProductGrid products={products} />
            <Pagination
                category={category}
                sub={sub}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}