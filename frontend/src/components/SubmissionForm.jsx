import React, { useState } from 'react';
import { useGuestIdentity } from '../hooks/useGuestIdentity';

const SubmissionForm = ({ onSubmit }) => {
    const guestId = useGuestIdentity();
    const [formData, setFormData] = useState({
        item_name: '',
        price: '',
        store_name: '',
        category: 'General'
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit({ ...formData, reported_by: guestId });
            setFormData({ item_name: '', price: '', store_name: '', category: 'General' });
            alert('Price reported successfully!');
        } catch (error) {
            console.error('Error submitting price:', error);
            alert('Failed to report price.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Report a Price 🏷️</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Item Name</label>
                    <input
                        type="text"
                        name="item_name"
                        value={formData.item_name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        placeholder="e.g. Ayam Goreng"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price (RM)</label>
                        <input
                            type="number"
                            step="0.01"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                            placeholder="0.00"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        >
                            <option>General</option>
                            <option>Food</option>
                            <option>Groceries</option>
                            <option>Services</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Store Name</label>
                    <input
                        type="text"
                        name="store_name"
                        value={formData.store_name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        placeholder="e.g. Restoran ABC"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
                >
                    {loading ? 'Submitting...' : 'Submit Price'}
                </button>
            </form>
        </div>
    );
};

export default SubmissionForm;
