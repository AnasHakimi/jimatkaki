import React from 'react';
import { Link } from 'react-router-dom';
import Leaderboard from '../components/Leaderboard';

const HomePage = ({ heroes }) => {
    return (
        <div className="animate-fade-in space-y-12 px-4">
            <section className="text-center py-12 sm:py-20 relative">
                {/* Comic Background Elements */}
                <div className="absolute top-10 left-10 text-4xl sm:text-6xl opacity-20 rotate-12">⭐</div>
                <div className="absolute top-20 right-20 text-4xl sm:text-6xl opacity-15 -rotate-12 hidden sm:block">⚡</div>
                <div className="absolute top-1/2 left-5 text-3xl sm:text-5xl opacity-10 rotate-45 hidden md:block">✨</div>
                <div className="absolute top-1/3 right-10 text-3xl sm:text-5xl opacity-10 -rotate-45">💨</div>
                <div className="absolute bottom-20 left-1/4 text-4xl sm:text-6xl opacity-15 rotate-12 hidden lg:block">🔥</div>
                <div className="absolute bottom-10 right-10 text-4xl sm:text-6xl opacity-20 -rotate-12">💥</div>
                {/* Full coverage additions */}
                <div className="absolute top-1/4 left-1/3 text-3xl opacity-5 rotate-12">📈</div>
                <div className="absolute bottom-1/3 right-1/3 text-4xl opacity-10 -rotate-12 hidden md:block">🍳</div>
                <div className="absolute top-2/3 left-10 text-4xl opacity-10 rotate-45">🛍️</div>
                <div className="absolute top-10 right-1/3 text-3xl opacity-15 -rotate-12">🍩</div>
                <div className="absolute bottom-5 left-1/2 text-3xl opacity-10 -translate-x-1/2 rotate-12">🥑</div>
                <div className="absolute top-1/2 left-1/4 text-4xl opacity-5 -rotate-45 hidden lg:block">🥛</div>

                <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-black mb-4 sm:mb-6 drop-shadow-[4px_4px_0px_#fff] px-2">
                    KakiJimat
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-bold max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed bg-white/50 inline-block px-4 rounded-lg">
                    The community-powered price intelligence engine.
                    <br />
                    <span className="text-purple-600 bg-[#FBBF24] px-2 border-2 border-black shadow-[3px_3px_0px_#000] rotate-2 inline-block ml-2 rounded mt-2 sm:mt-0">Find Cheaper. Buy Smarter.</span>
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-4">
                    <Link to="/submit" className="cartoon-btn text-lg sm:text-xl bg-[#F472B6]">
                        Report Price
                    </Link>
                    <Link to="/feed" className="cartoon-btn text-lg sm:text-xl bg-[#60A5FA]">
                        View Feed
                    </Link>
                </div>
            </section>

            {/* Main Content Grid: Leaderboard & Pro Tip */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 mb-8 items-stretch">
                {/* Left: Leaderboard (50% width) */}
                <div className="h-full">
                    <Leaderboard heroes={heroes} className="h-full" />
                </div>

                {/* Right: Pro Tip Box (50% width) */}
                <div className="h-full">
                    <div className="cartoon-card p-6 bg-gradient-to-br from-[#A78BFA] to-[#F472B6] relative overflow-hidden h-full min-h-[400px]">
                        {/* Content */}

                        <div className="relative z-10">
                            <h3 className="text-xl sm:text-2xl font-black mb-6 text-white flex items-center bg-[#FBBF24] border-2 border-black px-4 py-2 rounded-lg shadow-[4px_4px_0px_#000] inline-block rotate-1">
                                <span>Pro Tip!</span>
                            </h3>
                            <div className="space-y-4">
                                <div className="bg-black/10 p-4 rounded-xl border-2 border-black/30 text-white leading-relaxed">
                                    <p className="font-bold text-sm sm:text-base">
                                        <span className="text-yellow-300 block mb-1">Did you know?</span>
                                        You can earn points by reporting prices! The more accurate reports you submit, the higher you climb on the leaderboard.
                                    </p>
                                </div>

                                <div className="bg-black/10 p-4 rounded-xl border-2 border-black/30 text-white leading-relaxed">
                                    <p className="font-bold text-sm sm:text-base">
                                        <span className="text-yellow-300 block mb-1">Community Power!</span>
                                        KakiJimat depends on people like you. When you share a price, everyone saves!
                                    </p>
                                </div>

                                <div className="bg-black/10 p-4 rounded-xl border-2 border-black/30 text-white leading-relaxed">
                                    <p className="font-bold text-sm sm:text-base">
                                        <span className="text-yellow-300 block mb-1">Stay Fresh!</span>
                                        Prices change fast. Always check the "Freshness" badge in the feed to see how recent a report is!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Join Section - 3 Column Grid */}
            <div className="max-w-4xl mx-auto px-4 mt-24 mb-12 text-center">
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-10 bg-[#EC4899] border-2 border-black px-6 py-3 rounded-lg shadow-[4px_4px_0px_#000] inline-block rotate-1">
                    Why Join?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                    {/* Card 1 */}
                    <div className="cartoon-card p-6 bg-[#A78BFA] text-black flex flex-col items-center text-center">
                        <h4 className="font-black text-lg mb-2">Real-time Updates</h4>
                        <p className="text-sm font-bold">Get instant price alerts as they happen</p>
                    </div>

                    {/* Card 2 */}
                    <div className="cartoon-card p-6 bg-[#60A5FA] text-black flex flex-col items-center text-center">
                        <h4 className="font-black text-lg mb-2">Community Verified</h4>
                        <p className="text-sm font-bold">Trust data from real shoppers like you</p>
                    </div>

                    {/* Card 3 */}
                    <div className="cartoon-card p-6 bg-[#F472B6] text-black flex flex-col items-center text-center">
                        <h4 className="font-black text-lg mb-2">Earn Rewards</h4>
                        <p className="text-sm font-bold">Climb the leaderboard and win badges</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
