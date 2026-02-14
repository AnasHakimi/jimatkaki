import React from 'react';

const Leaderboard = ({ heroes }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Jimat Heroes Leftboard 🏆</h2>
            <ul className="space-y-3">
                {heroes.map((hero, index) => (
                    <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                        <div className="flex items-center">
                            <span className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mr-3 
                                ${index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-yellow-600' : 'bg-blue-400'}`}>
                                {index + 1}
                            </span>
                            <span className="text-sm font-medium text-gray-900 truncate w-32" title={hero.reported_by}>
                                Guest-{hero.reported_by.slice(0, 8)}
                            </span>
                        </div>
                        <span className="text-sm font-bold text-indigo-600">{hero.total_reports} pts</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;
