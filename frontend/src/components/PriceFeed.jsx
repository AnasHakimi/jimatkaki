import React from 'react';

const PriceFeed = ({ prices }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Live Price Feed 📉</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (RM)</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {prices.map((price) => (
                            <tr key={price.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{price.item_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">RM {parseFloat(price.price).toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{price.store_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${price.freshness_status === 'FRESH' ? 'bg-green-100 text-green-800' :
                                            price.freshness_status === 'STALE' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'}`}>
                                        {price.freshness_status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(price.created_at).toLocaleTimeString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {prices.length === 0 && (
                    <div className="text-center py-4 text-gray-500">No prices reported yet. Be the first!</div>
                )}
            </div>
        </div>
    );
};

export default PriceFeed;
