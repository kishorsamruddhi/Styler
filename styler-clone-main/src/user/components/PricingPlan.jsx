import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const PricingPlan = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getPrices } = useAuth();

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getPrices();
        setPrices(response.data.data || []);
      } catch (err) {
        setError("Failed to fetch prices: " + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [getPrices]);

  if (loading) {
    return (
      <div className="py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          Loading pricing plans...
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pricing Plans
          </h2>
          <p className="text-gray-600 mb-8">
            Choose the perfect plan for your needs. Flexible pricing tailored to your growth.
          </p>
        </div>

        {error && (
          <div className="text-center mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prices.map((plan, index) => (
            <div key={plan._id || index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{plan.name || 'Standard Plan'}</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">${plan.price || 0}</div>
              <p className="text-sm text-gray-600 mb-6">{plan.description || 'Perfect for standard usage'}</p>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                {plan.features && plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center justify-start">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l.293-.293a1 1 0 011.414 0l3.293 3.293 7.207-7.207a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                )) || <li className="text-sm text-gray-500">No features listed</li>}
              </ul>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition">
                Get Started
              </button>
            </div>
          ))}
        </div>

        {prices.length === 0 && !error && (
          <div className="text-center mt-8 p-8 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Pricing Plans Available</h3>
            <p className="text-gray-500">Contact us to discuss your custom pricing needs.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingPlan;
