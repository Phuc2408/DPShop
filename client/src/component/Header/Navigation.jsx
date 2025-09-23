import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Drawer from '../Drawer'; // giữ nguyên component Drawer của bạn

function slugify(str) {
  return (str || '')
    .toString()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null);
  const [isMainDrawerOpen, setIsMainDrawerOpen] = useState(false);
  const [isSubDrawerOpen, setIsSubDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  useEffect(() => {
    if (isMainDrawerOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isMainDrawerOpen]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsOpen(false);
    window.location.reload();
  };

  const subCategories = {
    'Guitars': ['Acoustic Guitar', 'Electric Guitar', 'Bass Guitar'],
    'Synthesizer&Piano': [],
    'Drums': ['Electric Drum', 'Acoustic Drum'],
    'Microphones': ['Condenser Mic', 'Dynamic Mic'],
    'Pedals': ['Acoustic Pedal', 'Electric Pedal', 'Bass Pedal'],
    'Phụ kiện': [],
  };

  const handleMainDrawerOpen = () => {
    setIsMainDrawerOpen(true);
    setIsSubDrawerOpen(false);
    setSelectedCategory(null);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (subCategories[category]?.length > 0) {
      setIsSubDrawerOpen(true);
    } else {
      const cat = slugify(category);
      navigate(`/products/${cat}&page=1&limit=64`);
      handleCloseAllDrawers();
    }
  };

  const handleSubCategoryClick = (category, sub) => {
    const cat = slugify(category);
    const subcat = slugify(sub);
    navigate(`/products/${cat}/sub=${subcat}&page=1&limit=64`);
    handleCloseAllDrawers();
  };

  const handleCloseAllDrawers = () => {
    setIsMainDrawerOpen(false);
    setIsSubDrawerOpen(false);
    setSelectedCategory(null);
  };

  const mainLinks = [
    { label: 'TRANG CHỦ', path: '/' },
    { label: 'SẢN PHẨM', path: '/products' },
    { label: 'PHỤ KIỆN', path: '/accessories' },
    { label: 'LIÊN HỆ', path: '/contact' },
  ];

  const authLinks = [
    { label: 'ĐĂNG NHẬP', path: '/login' },
    { label: 'ĐĂNG KÝ', path: '/register' },
  ];

  const getNavLinkClass = ({ isActive }) =>
    `text-[#0A0A0A] hover:text-[#9F8A46] transition-colors ${isActive ? 'text-[#9F8A46]' : ''}`;

  return (
    <div className="bg-[#f8f4e9] px-8 py-8 flex items-center justify-between rounded-lg shadow">
      <Link to='/' className='text-black-400 text-2xl font-bold'>DPshop</Link>

      <nav>
        <ul className="flex items-center text-sm uppercase font-semibold">
          {mainLinks.map((link, index) => (
            <li key={link.label} className="flex items-center">
              {index > 0 && <span className="text-gray-500 mx-4">|</span>}

              {link.label === 'SẢN PHẨM' ? (
                <span
                  onClick={() => {
                    // Hiển thị đang ở trang products trên URL + mở Drawer
                    // navigate('/products');
                    handleMainDrawerOpen();
                  }}
                  className="text-[#0A0A0A] hover:text-[#9F8A46] transition-colors cursor-pointer"
                >
                  {link.label}
                </span>
              ) : (
                <NavLink to={link.path} className={getNavLinkClass}>
                  {link.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-6 text-sm uppercase font-semibold">
        {user != undefined ? (
          <div className="relative" ref={dropdownRef}>
            <span
              className="text-[#0A0A0A] font-bold cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              Xin chào, {user?.user?.fullName ?? 'User'} ▼
            </span>
            {isOpen && (
              <ul className="absolute top-[120%] right-0 z-10 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2">
                <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                  <Link to="/profile" onClick={() => setIsOpen(false)}>
                    Thông tin cá nhân
                  </Link>
                </li>
                <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                  <Link to="/change-password" onClick={() => setIsOpen(false)}>
                    Đổi mật khẩu
                  </Link>
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-red-500"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </li>
              </ul>
            )}
          </div>
        ) : (
          authLinks.map((link) => {
            // Thêm redirect để sau đăng nhập quay lại trang hiện tại
            const redirect = encodeURIComponent(location.pathname + location.search);
            return (
              <NavLink key={link.label} to={`${link.path}?redirect=${redirect}`} className={getNavLinkClass}>
                {link.label}
              </NavLink>
            );
          })
        )}
      </div>

      {/* Drawer chính */}
      <Drawer isOpen={isMainDrawerOpen} onClose={handleCloseAllDrawers}>
        <h2 className='text-2xl font-bold mb-4'>Danh mục sản phẩm</h2>
        <ul className='flex flex-col gap-2'>
          {Object.keys(subCategories).map((category) => (
            <li
              key={category}
              className='text-lg hover:text-[#9F8A46] transition-colors cursor-pointer'
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </Drawer>

      {/* Drawer phụ */}
      <Drawer isOpen={isSubDrawerOpen} onClose={handleCloseAllDrawers}>
        <h2 className='text-2xl font-bold mb-4'>{selectedCategory}</h2>
        <ul className='flex flex-col gap-2'>
          {subCategories[selectedCategory]?.map((subCat) => (
            <li
              key={subCat}
              className='text-lg hover:text-[#9F8A46] transition-colors cursor-pointer'
              onClick={() => handleSubCategoryClick(selectedCategory, subCat)}
            >
              {subCat}
            </li>
          ))}
        </ul>
      </Drawer>
    </div>
  );
}
