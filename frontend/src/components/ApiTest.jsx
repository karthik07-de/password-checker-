import { useState } from 'react';
import axios from 'axios';

const ApiTest = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testApi = async () => {
    setLoading(true);
    try {
      // Test password strength
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/passwords/check-strength`, {
        password: 'TestPassword123!'
      });
      
      setResult({
        success: true,
        message: 'API is working!',
        data: response.data
      });
    } catch (error) {
      setResult({
        success: false,
        message: 'API Error',
        error: error.message,
        details: error.response?.data
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={testApi}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
      >
        {loading ? 'Testing...' : 'Test API'}
      </button>
      
      {result && (
        <div className="mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md">
          <pre className="text-xs overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiTest;
