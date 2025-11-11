
import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-primary-500 text-white'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-start">
            <NavLink to="/dashboard" className="flex-shrink-0 flex items-center gap-2">
              <svg className="h-8 w-8 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-bold text-xl text-gray-800 dark:text-white">SaaSBoard</span>
            </NavLink>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
                <NavLink to="/plans" className={navLinkClass}>Plans</NavLink>
                {isAdmin && <NavLink to="/admin/subscriptions" className={navLinkClass}>Admin</NavLink>}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <ThemeToggle />
            {user && (
              <div className="ml-3 relative" ref={dropdownRef}>
                <div>
                  <button onClick={() => setDropdownOpen(!dropdownOpen)} className="bg-gray-200 dark:bg-gray-700 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </button>
                </div>
                {dropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b dark:border-gray-600">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs truncate">{user.email}</p>
                    </div>
                    <a href="#" onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600" role="menuitem">Sign out</a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
