import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect} from 'react';

export default function Navigation() {
    const [user, setUser] = useState(null);
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
  useEffect(() => { 
    const User = localStorage.getItem('user');
    if (User) {
      setUser(JSON.parse(User));
    }
  }, []);
  const getNavLinkClass = ({ isActive }) =>
        `text-[#0A0A0A] hover:text-[#9F8A46] transition-colors ${isActive ? 'text-[#9F8A46]' : ''}`;
    return (
        <div className="bg-[#f8f4e9] px-8 py-8 flex items-center justify-between rounded-lg shadow">
        <Link to ='/' className='text-black-400 text-2xl font-bold'>DPshop</Link>
        <nav>
            <ul className="flex items-center text-sm uppercase font-semibold">
          {mainLinks.map((link, index) => (
            <li key={link.label} className="flex items-center">
              {index > 0 && <span className="text-gray-500 mx-4">|</span>}
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-[#0A0A0A] hover:text-[#9F8A46] transition-colors ${isActive ? 'text-[#9F8A46]' : ''}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        </nav>
        <div className="flex items-center gap-6 text-sm uppercase font-semibold">
          {user ? (
            <>
              <span className="text-[#0A0A0A] font-bold">Xin chào, {user.user.fullName}</span>
            </>
          ) : (
            authLinks.map((link) => (
              <NavLink key={link.label} to={link.path} className={getNavLinkClass}>
                {link.label}
              </NavLink>
            ))
          )
          }
        </div>
        </div>
    );
}