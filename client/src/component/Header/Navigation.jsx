import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Drawer from '../Drawer';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const User = localStorage.getItem('user');
    if (User) {
      setUser(JSON.parse(User));
    }
  }, []);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isDrawerOpen]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsOpen(false);
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
                  onClick={() => setIsDrawerOpen(true)}
                  className="text-[#0A0A0A] hover:text-[#9F8A46] transition-colors cursor-pointer"
                >
                  {link.label}
                </span>
              ) : (<NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-[#0A0A0A] hover:text-[#9F8A46] transition-colors ${isActive ? 'text-[#9F8A46]' : ''}`
                }
              >
                {link.label}
              </NavLink>
              )}

            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-6 text-sm uppercase font-semibold">
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <span
              className="text-[#0A0A0A] font-bold cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              Xin chào, {user.user.fullName} ▼
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
          authLinks.map((link) => (
            <NavLink key={link.label} to={link.path} className={getNavLinkClass}>
              {link.label}
            </NavLink>
          ))
        )
        }
      </div>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <h2 className='text-2xl font-bold mb-4'>Danh mục sản phẩm</h2>
        <ul className='flex flex-col gap-2'>
          <li className='text-lg hover:text-[#9F8A46] transition-colors cursor-pointer'>Guitar Electric</li>
          <li className='text-lg hover:text-[#9F8A46] transition-colors cursor-pointer'>Guitar Acoustic</li>
          <li className='text-lg hover:text-[#9F8A46] transition-colors cursor-pointer'>Guitar Bass</li>
          <li className='text-lg hover:text-[#9F8A46] transition-colors cursor-pointer'>Phụ kiện</li>
        </ul>
      </Drawer>
    </div>
  );
}