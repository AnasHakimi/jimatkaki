import React, { useState, useMemo } from 'react';

const CATEGORIES = [
    { id: 'all', label: 'All', icon: '🌈' },
    { id: 'Bakery', label: 'Bakery', icon: '🍞' },
    { id: 'Meat', label: 'Meat', icon: '🥩' },
    { id: 'Dairy', label: 'Dairy', icon: '🥛' },
    { id: 'Produce', label: 'Produce', icon: '🍎' },
    { id: 'Pantry', label: 'Pantry', icon: '🥫' },
    { id: 'Beverages', label: 'Beverages', icon: '🥤' },
    { id: 'Household', label: 'Household', icon: '🧼' },
    { id: 'Personal Care', label: 'Personal Care', icon: '🧴' },
    { id: 'General', label: 'General', icon: '📦' }
];

const PriceFeed = ({ prices }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [visibleCount, setVisibleCount] = useState(6);

    // Filtering logic
    const filteredPrices = useMemo(() => {
        return prices.filter(price => {
            const matchesSearch = price.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                price.store_name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || price.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [prices, searchQuery, selectedCategory]);

    const visiblePrices = filteredPrices.slice(0, visibleCount);
    const hasMore = visibleCount < filteredPrices.length;

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 6);
    };

    return (
        <div className="cartoon-card p-4 sm:p-6 md:p-8 bg-[#60A5FA]">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <h2 className="text-2xl sm:text-3xl font-black text-white bg-[#8B5CF6] border-3 border-black px-4 py-2 rounded-lg shadow-[4px_4px_0px_#000] inline-block -rotate-1 shrink-0">
                    Live Feed
                </h2>

                {/* Search Bar */}
                <div className="relative w-full md:max-w-md">
                    <input
                        type="text"
                        placeholder="Search items or stores..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="cartoon-input w-full pl-12 py-3 bg-white text-black font-bold placeholder:text-gray-400"
                    />
                </div>
            </div>

            {/* Category Bubbles - Horizontal Scroll */}
            <div className="flex overflow-x-auto pb-6 gap-3 no-scrollbar mask-fade-right">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-black font-black whitespace-nowrap transition-all
                            ${selectedCategory === cat.id
                                ? 'bg-[#FBBF24] shadow-[3px_3px_0px_#000] translate-y-[-2px]'
                                : 'bg-white hover:bg-gray-50 shadow-[0px_0px_0px_#000]'}`}
                    >
                        <span>{cat.label}</span>
                    </button>
                ))}
            </div>

            {/* Grid Container */}
            {visiblePrices.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visiblePrices.map((price) => (
                        <div
                            key={price.id}
                            className="cartoon-card bg-white p-5 border-3 border-black shadow-[4px_4px_0px_#000] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_#000] transition-all cursor-default group"
                        >
                            {/* Header: Status & Time */}
                            <div className="flex justify-between items-start mb-4">
                                <span className={`cartoon-badge text-[10px] font-black uppercase tracking-tighter
                                    ${price.freshness_status === 'FRESH' ? 'bg-[#34D399] text-black' :
                                        price.freshness_status === 'STALE' ? 'bg-[#FCD34D] text-black' :
                                            'bg-[#F87171] text-white'}`}>
                                    {price.freshness_status}
                                </span>
                                <span className="text-[10px] font-bold text-gray-400 font-mono">
                                    {new Date(price.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>

                            {/* Body: Item & Price */}
                            <div className="mb-4">
                                <h3 className="text-xl font-black text-black leading-tight mb-1 truncate group-hover:text-[#8B5CF6] transition-colors">
                                    {price.item_name}
                                </h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-black text-emerald-600">
                                        RM {parseFloat(price.price).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Footer: Store & Category */}
                            <div className="pt-3 border-t-2 border-dashed border-gray-100 flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">📍</span>
                                    <span className="text-sm font-bold text-gray-600 truncate">
                                        {price.store_name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-md border border-gray-200 text-gray-500 font-bold">
                                        {price.category || 'General'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white/10 rounded-2xl border-4 border-dashed border-white/20 py-20 text-center">
                    <div className="text-2xl mb-6 grayscale opacity-40">Nothing found</div>
                    <h3 className="text-2xl font-black text-white/80 mb-2">No deals found!</h3>
                    <p className="text-white/60 font-bold max-w-sm mx-auto">
                        Maybe try searching for something else or check a different category?
                    </p>
                </div>
            )}

            {/* Load More Button */}
            {hasMore && (
                <div className="mt-12 text-center">
                    <button
                        onClick={handleLoadMore}
                        className="cartoon-btn bg-[#FBBF24] text-lg px-10 py-4 hover:translate-y-[-4px] active:translate-y-[0px] transition-all"
                    >
                        FETCH MORE!
                    </button>
                    <p className="mt-4 text-white/50 font-bold text-sm">
                        Showing {visiblePrices.length} of {filteredPrices.length} reports
                    </p>
                </div>
            )}
        </div>
    );
};

export default PriceFeed;
