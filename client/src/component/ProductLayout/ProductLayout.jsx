import React, { useState, useEffect } from 'react';
import ProductGrid from './ProductGrid';
import Pagination from './ProductPagination';
// import Filter from './ProductFilter';
import sampleProducts from '../../../sampledata/sample';
export default function ProductLayout() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(0);
    const limitPerPage = 64;

    const totalProducts = sampleProducts.length;
    const totalPages = Math.ceil(totalProducts / limitPerPage);
    useEffect(() => {
        // const fetchProducts = async () => {
        //     try {
        //         const response = await fetch(`/api/products?page=${currentPage}`);
        //         const data = await response.json();
        //         setProducts(data.products);
        //         setTotalPages(Math.ceil(data.totalCount / limitPerPage));
        //     } catch (error) {
        //         console.error('Error fetching products:', error);
        //     }
        // }
        // fetchProducts();
        const startIndex = (currentPage - 1) * limitPerPage;
        const endIndex = startIndex + limitPerPage;
        
        // Cắt mảng mẫu để lấy sản phẩm của trang hiện tại
        const displayedProducts = sampleProducts.slice(startIndex, endIndex);

        setProducts(displayedProducts);
    }, [currentPage]);
    const handleCurrentPage = (page) => { 
        setCurrentPage(page);
        window.scrollTo(0, 0); 
    }
    return (
        <div>
            {/* <Filter /> */}
            <ProductGrid products={products} />
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handleCurrentPage}
            />
        </div>
    );
}
    
