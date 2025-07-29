import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-md z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="mr-2 text-gray-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-800">CA Portal</h1>
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-800">
              {location.pathname === '/admin' && 'Dashboard'}
              {location.pathname === '/admin/clients' && 'Clients'}
              {location.pathname.startsWith('/admin/clients/') && (location.pathname.includes('/new') ? 'Add Client' : 'Client Details')}
              {location.pathname === '/admin/tasks' && 'Tasks'}
              {location.pathname === '/admin/documents' && 'Documents'}
            </h2>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-white shadow-lg z-20 ${isSidebarOpen ? 'fixed inset-0' : ''} md:relative transition-all duration-300`}>
        <div className="p-6 bg-gradient-to-r from-indigo-700 to-indigo-500">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">CA Portal</h1>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="text-white focus:outline-none md:hidden"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-indigo-100 text-sm mt-1">Admin Dashboard</p>
        </div>
        
        <div className="mt-2">
          <div className="px-4 py-2">
            <Link
              to="/admin"
              className={`flex items-center py-3 px-4 rounded-lg ${location.pathname === '/admin' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'} transition duration-200`}
              onClick={() => setSidebarOpen(false)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="ml-3">Dashboard</span>
            </Link>
          </div>
          
          <div className="px-4 py-2">
            <Link
              to="/admin/clients"
              className={`flex items-center py-3 px-4 rounded-lg ${location.pathname.startsWith('/admin/clients') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'} transition duration-200`}
              onClick={() => setSidebarOpen(false)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="ml-3">Clients</span>
            </Link>
          </div>
          
          <div className="px-4 py-2">
            <Link
              to="/admin/tasks"
              className={`flex items-center py-3 px-4 rounded-lg ${location.pathname.startsWith('/admin/tasks') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'} transition duration-200`}
              onClick={() => setSidebarOpen(false)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <span className="ml-3">Tasks</span>
            </Link>
          </div>
          
          <div className="px-4 py-2">
            <Link
              to="/admin/documents"
              className={`flex items-center py-3 px-4 rounded-lg ${location.pathname.startsWith('/admin/documents') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'} transition duration-200`}
              onClick={() => setSidebarOpen(false)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="ml-3">Documents</span>
            </Link>
          </div>
        </div>
        
        <div className="md:absolute md:bottom-0 w-full p-4 border-t border-gray-200">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-gray-500">{user?.email || 'admin@example.com'}</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-red-500 hover:text-red-700 transition duration-200"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header - Desktop Only */}
        <header className="hidden md:block bg-white shadow-sm sticky top-0 z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {location.pathname === '/admin' && 'Dashboard'}
              {location.pathname === '/admin/clients' && 'Clients Management'}
              {location.pathname.startsWith('/admin/clients/') && (location.pathname.includes('/new') ? 'Add New Client' : 'Client Details')}
              {location.pathname === '/admin/tasks' && 'Tasks Management'}
              {location.pathname === '/admin/documents' && 'Documents Management'}
            </h2>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <div className="relative">
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 p-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} CA Portal. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;