import { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Eye, EyeOff, RefreshCw } from 'lucide-react';
import PasswordStrengthMeter from './PasswordStrengthMeter';

const PasswordModal = ({ password, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    website: '',
    username: '',
    password: '',
    notes: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [strengthResult, setStrengthResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (password) {
      setFormData({
        website: password.website,
        username: password.username,
        password: password.password,
        notes: password.notes || ''
      });
      checkStrength(password.password);
    }
  }, [password]);

  const checkStrength = async (pwd) => {
    if (!pwd) {
      setStrengthResult(null);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/passwords/check-strength`, {
        password: pwd
      });
      setStrengthResult(response.data);
    } catch (error) {
      console.error('Failed to check strength:', error);
    }
  };

  const generatePassword = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/passwords/generate`, {
        length: 16,
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true
      });
      const newPassword = response.data.password;
      setFormData({ ...formData, password: newPassword });
      checkStrength(newPassword);
    } catch (error) {
      console.error('Failed to generate password:', error);
    }
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setFormData({ ...formData, password: pwd });
    checkStrength(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (password) {
        // Update existing password
        await axios.put(`${import.meta.env.VITE_API_URL}/vault/${password._id}`, formData);
      } else {
        // Create new password
        await axios.post(`${import.meta.env.VITE_API_URL}/vault`, formData);
      }
      onSave();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {password ? 'Edit Password' : 'Add New Password'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-lg text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Website / Service
            </label>
            <input
              type="text"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="input-field"
              placeholder="example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Username / Email
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="input-field"
              placeholder="user@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handlePasswordChange}
                  className="input-field pr-10"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <button
                type="button"
                onClick={generatePassword}
                className="btn-secondary flex items-center space-x-1"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {strengthResult && (
            <PasswordStrengthMeter
              strength={strengthResult.strength}
              score={strengthResult.score}
              maxScore={strengthResult.maxScore}
              feedback={strengthResult.feedback}
              details={{
                hasLowercase: strengthResult.hasLowercase,
                hasUppercase: strengthResult.hasUppercase,
                hasNumbers: strengthResult.hasNumbers,
                hasSpecialChars: strengthResult.hasSpecialChars
              }}
            />
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="input-field"
              rows="3"
              placeholder="Additional notes..."
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
