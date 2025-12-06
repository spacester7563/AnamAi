import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, History, Settings, Bot } from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();
  // Check if current path matches /coach/:id pattern (Chat Page)
  // We keep the nav for /coach (List Page) but hide it for the actual chat
  const isChatPage = /^\/coach\/[^/]+$/.test(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark text-slate-900 dark:text-white flex flex-col transition-colors duration-300">
      
      {/* Content Area */}
      {/* Remove bottom padding on chat page so it can control its own layout/scroll */}
      <main className={`flex-1 w-full overflow-y-auto scroll-smooth no-scrollbar ${isChatPage ? '' : 'pb-24'}`}>
        <Outlet />
      </main>

      {/* Bottom Navigation - Hide on Chat Page */}
      {!isChatPage && (
        <nav className="fixed bottom-0 w-full bg-white/90 dark:bg-card/90 backdrop-blur-lg border-t border-gray-200 dark:border-white/10 z-50 pb-safe transition-colors duration-300">
          <div className="flex justify-around items-center h-16">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                  isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
                }`
              }
            >
              <Home size={24} strokeWidth={2} />
              <span className="text-[10px] font-medium">Home</span>
            </NavLink>

            <NavLink
              to="/coach"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                  isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
                }`
              }
            >
              <Bot size={24} strokeWidth={2} />
              <span className="text-[10px] font-medium">AI Coach</span>
            </NavLink>

            <NavLink
              to="/history"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                  isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
                }`
              }
            >
              <History size={24} strokeWidth={2} />
              <span className="text-[10px] font-medium">History</span>
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                  isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
                }`
              }
            >
              <Settings size={24} strokeWidth={2} />
              <span className="text-[10px] font-medium">Settings</span>
            </NavLink>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;