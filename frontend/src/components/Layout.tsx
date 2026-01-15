import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, CheckSquare } from 'lucide-react';

const Layout: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col">
            <nav className="glass-panel sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2 text-primary font-bold text-xl">
                    <CheckSquare className="w-8 h-8" />
                    <span>TaskFlow</span>
                </div>
                <div>
                   <button 
                        onClick={handleLogout}
                        className="text-slate-300 hover:text-white transition-colors flex items-center space-x-2"
                   >
                       <LogOut size={20} />
                       <span>Logout</span>
                   </button>
                </div>
            </nav>
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="animate-fade-in">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
