import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Desktop Navbar - Hidden on mobile/tablet */}
            <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 px-4 py-3">
                <div className="max-w-6xl mx-auto bg-white border-[3px] border-black rounded-2xl px-6 py-3 flex justify-between items-center shadow-[6px_6px_0px_#000]">
                    <Link to="/" className="text-3xl font-black text-black tracking-tight transform hover:scale-105 transition-transform">
                        KakiJimat 💸
                    </Link>
                    <div className="flex space-x-3">
                        <DesktopNavLink to="/" active={isActive('/')}>Home</DesktopNavLink>
                        <DesktopNavLink to="/feed" active={isActive('/feed')}>Live Feed</DesktopNavLink>
                        <DesktopNavLink to="/submit" active={isActive('/submit')}>Report Price</DesktopNavLink>
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Navigation - Visible only on mobile/tablet */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-[3px] border-black shadow-[0px_-4px_0px_#000]">
                <div className="flex justify-around items-center py-2">
                    <MobileNavLink to="/" active={isActive('/')} label="Home">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 14L12 14M12 14L9 14M12 14L12 11M12 14L12 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                            <path d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                        </svg>
                    </MobileNavLink>
                    <MobileNavLink to="/feed" active={isActive('/feed')} label="Feed">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 4.00195C18.175 4.01406 19.3529 4.11051 20.1213 4.87889C21 5.75757 21 7.17179 21 10.0002V16.0002C21 18.8286 21 20.2429 20.1213 21.1215C19.2426 22.0002 17.8284 22.0002 15 22.0002H9C6.17157 22.0002 4.75736 22.0002 3.87868 21.1215C3 20.2429 3 18.8286 3 16.0002V10.0002C3 7.17179 3 5.75757 3.87868 4.87889C4.64706 4.11051 5.82497 4.01406 8 4.00195" stroke="currentColor" strokeWidth="1.5"></path>
                            <path d="M10.5 14L17 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                            <path d="M7 14H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                            <path d="M7 10.5H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                            <path d="M7 17.5H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                            <path d="M10.5 10.5H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                            <path d="M10.5 17.5H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                            <path d="M8 3.5C8 2.67157 8.67157 2 9.5 2H14.5C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5Z" stroke="currentColor" strokeWidth="1.5"></path>
                        </svg>
                    </MobileNavLink>
                    <MobileNavLink to="/submit" active={isActive('/submit')} label="Report">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 21L11 13M11 13H5M11 13V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                        </svg>
                    </MobileNavLink>
                </div>
            </nav>
        </>
    );
};

const DesktopNavLink = ({ to, children, active }) => (
    <Link
        to={to}
        className={`px-4 py-2 rounded-xl text-sm font-bold border-[2px] border-black transition-all duration-200
        ${active
                ? 'bg-[#FBBF24] text-black shadow-[3px_3px_0px_#000] -translate-y-1'
                : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-[3px_3px_0px_#000] hover:-translate-y-1 shadow-none'}`}
    >
        {children}
    </Link>
);

const MobileNavLink = ({ to, active, children, label }) => (
    <Link
        to={to}
        className={`flex flex-col items-center justify-center px-6 py-2 rounded-xl transition-all duration-200 min-w-[80px]
        ${active
                ? 'bg-[#FBBF24] border-2 border-black shadow-[3px_3px_0px_#000] -translate-y-1'
                : 'bg-transparent text-gray-600'}`}
    >
        <div className={`mb-1 ${active ? 'text-black' : 'text-gray-600'}`}>{children}</div>
        <span className={`text-xs font-bold ${active ? 'text-black' : 'text-gray-600'}`}>{label}</span>
    </Link>
);

export default Navbar;
