import React, { useState, useEffect } from 'react';
import SubmissionForm from './components/SubmissionForm';
import PriceFeed from './components/PriceFeed';
import Leaderboard from './components/Leaderboard';

function App() {
  const [prices, setPrices] = useState([]);
  const [heroes, setHeroes] = useState([]);

  const fetchPrices = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/feed`);
      if (res.ok) {
        const data = await res.json();
        setPrices(data);
      }
    } catch (e) {
      console.error("Failed to fetch prices", e);
    }
  };

  const fetchHeroes = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/leaderboard`);
      if (res.ok) {
        const data = await res.json();
        setHeroes(data);
      }
    } catch (e) {
      console.error("Failed to fetch leaderboard", e);
    }
  }

  useEffect(() => {
    fetchPrices();
    fetchHeroes();
  }, []);

  const handlePriceSubmit = async (formData) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchPrices(); // Refresh feed
        fetchHeroes(); // Refresh leaderboard
      }
    } catch (e) {
      console.error("Submission failed", e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-indigo-600 tracking-tight">JimatKaki 🦶</h1>
          <p className="mt-2 text-lg text-gray-600">Community-powered price checker.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <SubmissionForm onSubmit={handlePriceSubmit} />
            <PriceFeed prices={prices} />
          </div>

          <div className="lg:col-span-1">
            <Leaderboard heroes={heroes} />
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <h3 className="font-bold text-indigo-800">About</h3>
              <p className="text-sm text-indigo-700 mt-2">
                JimatKaki helps you find the best deals by crowdsourcing prices.
                Data is verified via our Silver Layer and scored for freshness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
