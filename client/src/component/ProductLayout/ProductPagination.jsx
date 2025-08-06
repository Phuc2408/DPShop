import { NavLink } from "react-router-dom";
export default function ProductLayout({ currentPage, totalPages, onPageChange }) { 
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
      `px-4 py-2 rounded-md transition-colors ${
        currentPage === page
          ? 'text-[#9F8A46] font-bold'
          : 'text-gray-600 hover:text-gray-900'
      }`;
    
    const getDisabledClass = (isDisabled) => 
      isDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:text-gray-900';

    return (
        <div className="flex justify-center items-center space-x-2 my-4 text-sm font-semibold">
            <NavLink
                to={`/products?page=1`}
                onClick={() => onPageChange(1)}
                className={`px-3 py-2 rounded-md transition-colors ${getDisabledClass(currentPage === 1)}`}
                aria-disabled={currentPage === 1}
            >
                &lt;&lt;
            </NavLink>

            <NavLink
                to={`/products?page=${currentPage - 1}`}
                onClick={() => onPageChange(currentPage - 1)}
                className={`ml-2 px-3 py-2 rounded-md transition-colors ${getDisabledClass(currentPage === 1)}`}
                aria-disabled={currentPage === 1}
            >
                &lt;
            </NavLink>

            {pages[0] > 1 && (
                <span className="text-gray-600 mx-1">...</span>
            )}
            
            {pages.map((page) => (
                <NavLink
                    key={page}
                    to={`/products?page=${page}`}
                    onClick={() => onPageChange(page)}
                    className={`ml-2 ${getNavLinkClass(page)}`}
                >
                    {page}
                </NavLink>
            ))}

            {pages[pages.length - 1] < totalPages && (
                <span className="text-gray-600 mx-1">...</span>
            )}

            <NavLink
                to={`/products?page=${currentPage + 1}`}
                onClick={() => onPageChange(currentPage + 1)}
                className={`ml-2 px-3 py-2 rounded-md transition-colors ${getDisabledClass(currentPage === totalPages)}`}
                aria-disabled={currentPage === totalPages}
            >
                &gt;
            </NavLink>

            <NavLink
                to={`/products?page=${totalPages}`}
                onClick={() => onPageChange(totalPages)}
                className={`ml-2 px-3 py-2 rounded-md transition-colors ${getDisabledClass(currentPage === totalPages)}`}
                aria-disabled={currentPage === totalPages}
            >
                &gt;&gt;
            </NavLink>
        </div>
    );
}