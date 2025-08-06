import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
    return (
    <div className="relative w-full mx-auto">
      {/* Icon tìm kiếm bên trái */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <FaSearch className="text-gray-400" />
      </div>
      <input 
        type="text"
        placeholder="Tìm kiếm sản phẩm hoặc thương hiệu"
        className="block w-full h-10 pl-10 pr-10 rounded-md bg-gray-200 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2"
      />
    </div>
    );
}