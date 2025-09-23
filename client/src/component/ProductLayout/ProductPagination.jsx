import { NavLink } from "react-router-dom";

export default function Pagination({ currentPage, totalPages, onPageChange, category, sub }) {
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        let startPage;
        let endPage;

        if (totalPages <= maxPagesToShow) {
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage <= Math.floor(maxPagesToShow / 2)) {
            startPage = 1;
            endPage = maxPagesToShow;
        } else if (currentPage + Math.floor(maxPagesToShow / 2) >= totalPages) {
            startPage = totalPages - maxPagesToShow + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - Math.floor(maxPagesToShow / 2);
            endPage = currentPage + Math.floor(maxPagesToShow / 2);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pages = getPageNumbers();

    const getNavLinkClass = (page) =>
        `px-4 py-2 rounded-md transition-colors ${currentPage === page
            ? 'text-[#9F8A46] font-bold'
            : 'text-gray-600 hover:text-gray-900'
        }`;

    const getDisabledClass = (isDisabled) =>
        isDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:text-gray-900';

    // Helper function to build the base path
    const buildPath = () => {
        let path = '/products';
        if (category) {
            path += `/${category}`;
        }
        if (sub) {
            path += `/${sub}`;
        }
        return path;
    };

    const basePath = buildPath();

    return (
        <div className="flex justify-center items-center space-x-2 my-4 text-sm font-semibold">
            {/* First Page Link */}
            <NavLink
                to={`${basePath}?page=1&limit=64`}
                onClick={() => onPageChange(1)}
                className={`px-3 py-2 rounded-md transition-colors ${getDisabledClass(currentPage === 1)}`}
                aria-disabled={currentPage === 1}
            >
                &lt;&lt;
            </NavLink>

            {/* Previous Page Link */}
            <NavLink
                to={`${basePath}?page=${currentPage - 1}&limit=64`}
                onClick={() => onPageChange(currentPage - 1)}
                className={`ml-2 px-3 py-2 rounded-md transition-colors ${getDisabledClass(currentPage === 1)}`}
                aria-disabled={currentPage === 1}
            >
                &lt;
            </NavLink>

            {/* Ellipsis before page numbers */}
            {pages[0] > 1 && (
                <span className="text-gray-600 mx-1">...</span>
            )}

            {/* Page Numbers */}
            {pages.map((page) => (
                <NavLink
                    key={page}
                    to={`${basePath}?page=${page}&limit=64`}
                    onClick={() => onPageChange(page)}
                    className={`ml-2 ${getNavLinkClass(page)}`}
                >
                    {page}
                </NavLink>
            ))}

            {/* Ellipsis after page numbers */}
            {pages[pages.length - 1] < totalPages && (
                <span className="text-gray-600 mx-1">...</span>
            )}

            {/* Next Page Link */}
            <NavLink
                to={`${basePath}?page=${currentPage + 1}&limit=64`}
                onClick={() => onPageChange(currentPage + 1)}
                className={`ml-2 px-3 py-2 rounded-md transition-colors ${getDisabledClass(currentPage === totalPages)}`}
                aria-disabled={currentPage === totalPages}
            >
                &gt;
            </NavLink>

            {/* Last Page Link */}
            <NavLink
                to={`${basePath}?page=${totalPages}&limit=64`}
                onClick={() => onPageChange(totalPages)}
                className={`ml-2 px-3 py-2 rounded-md transition-colors ${getDisabledClass(currentPage === totalPages)}`}
                aria-disabled={currentPage === totalPages}
            >
                &gt;&gt;
            </NavLink>
        </div>
    );
}