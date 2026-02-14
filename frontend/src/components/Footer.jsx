import React from 'react';
import KDLogo from '../assets/KD.png';

const Footer = () => {
    return (
        <footer className="mt-20 pb-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Main Card */}
                <div className="cartoon-card bg-[#1F2937] p-6 sm:p-8 border-3 border-black shadow-[6px_6px_0px_#000] sm:rotate-1">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Compact Branding */}
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl sm:text-3xl font-black text-white leading-none mb-1">
                                KakiJimat
                            </h2>
                            <p className="text-gray-400 font-bold text-xs sm:text-sm">
                                Community powered price intelligence.
                            </p>
                        </div>

                        {/* Streamlined Icon Links */}
                        <div className="flex items-center gap-3 sm:gap-4">
                            <a
                                href="https://github.com/AnasHakimi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] transition-all"
                                title="GitHub"
                            >
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/anashakimi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-[#0077B5] text-white border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] transition-all"
                                title="LinkedIn"
                            >
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                                </svg>
                            </a>
                            <a
                                href="https://krackeddevs.com/profile/naskimii"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-[#B58543] border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] transition-all"
                                title="KrackedDevs"
                            >
                                <img src={KDLogo} alt="KrackedDevs" className="w-6 h-6 sm:w-8 sm:h-8" />
                            </a>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t-2 border-gray-700/50 flex flex-col sm:flex-row justify-between items-center gap-2">
                        <p className="text-gray-500 font-black text-[10px] sm:text-xs uppercase tracking-widest text-center sm:text-left">
                            &copy; {new Date().getFullYear()} KakiJimat by Anaskimii.
                        </p>
                        <p className="text-gray-600 font-bold text-[10px] uppercase tracking-tighter">
                            Built for Krackathon 26
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

