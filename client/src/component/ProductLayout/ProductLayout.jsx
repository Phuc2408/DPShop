import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // Thêm hook này
import ProductGrid from './ProductGrid';
import Pagination from './ProductPagination';
// import Filter from './ProductFilter';

export default function ProductLayout({ category, sub }) {
    const [products, setProducts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const limitPerPage = 64;

    // Sử dụng useSearchParams để đọc và ghi tham số URL
    const [searchParams, setSearchParams] = useSearchParams();

    // Lấy currentPage từ URL, nếu không có thì mặc định là 1
    const currentPage = Number(searchParams.get('page')) || 1;
    const totalPages = Math.max(1, Math.ceil(totalCount / limitPerPage));

    // Chuyển useEffect này thành một useEffect để xử lý việc chuyển trang
    useEffect(() => {
        // Reset về trang 1 khi category hoặc sub thay đổi
        if (Number(searchParams.get('page')) !== 1) {
            setSearchParams({ page: 1, limit: limitPerPage });
        }
    }, [category, sub, setSearchParams, limitPerPage]);

    useEffect(() => {
        const base = 'http://localhost:5000/api/products';
        let path = '';

        if (category) {
            path += `/${category}`;
        }
        if (sub) {
            path += `/${sub}`;
        }

        const url = `${base}${path}?page=${currentPage}&limit=${limitPerPage}`;
        const fetchProducts = async () => {
            try {
                const response = await fetch(url);
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

    // Hàm này bây giờ sẽ cập nhật URL thay vì cập nhật state
    const handlePageChange = (page) => {
        setSearchParams({ page: page, limit: limitPerPage });
        window.scrollTo(0, 0);
    }

    return (
        <div>
            {/* <Filter /> */}
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