import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Eye, EyeOff, Edit2, Trash2, Copy, Check, AlertTriangle, Shield, Lock } from 'lucide-react';
import PasswordModal from '../components/PasswordModal';

const Dashboard = () => {
  const [passwords, setPasswords] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPassword, setEditingPassword] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchPasswords();
    fetchStats();
  }, []);

  const fetchPasswords = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/vault`);
      setPasswords(response.data);
    } catch (error) {
      console.error('Failed to fetch passwords:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/vault/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleAddPassword = () => {
    setEditingPassword(null);
    setShowModal(true);
  };

  const handleEditPassword = (password) => {
    setEditingPassword(password);
    setShowModal(true);
  };

  const handleDeletePassword = async (id) => {
    if (!confirm('Are you sure you want to delete this password?')) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/vault/${id}`);
      fetchPasswords();
      fetchStats();
    } catch (error) {
      console.error('Failed to delete password:', error);
    }
  };

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 'strong':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      default:
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Password Vault</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your passwords securely
            </p>
          </div>
          <button
            onClick={handleAddPassword}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Password</span>
          </button>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="card text-center">
              <Lock className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
            </div>
            <div className="card text-center">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.strong}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Strong</p>
            </div>
            <div className="card text-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.medium}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Medium</p>
            </div>
            <div className="card text-center">
              <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.weak}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Weak</p>
            </div>
            <div className="card text-center">
              <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.compromised}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Compromised</p>
            </div>
          </div>
        )}

        {/* Passwords List */}
        {passwords.length === 0 ? (
          <div className="card text-center py-12">
            <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No passwords saved yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start by adding your first password to the vault
            </p>
            <button onClick={handleAddPassword} className="btn-primary">
              Add Your First Password
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {passwords.map((pwd) => (
              <div key={pwd._id} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {pwd.website}
                      </h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStrengthColor(pwd.strength)}`}>
                        {pwd.strength}
                      </span>
                      {pwd.isCompromised && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                          Compromised
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Username: {pwd.username}
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="relative flex-1 max-w-md">
                        <input
                          type={visiblePasswords[pwd._id] ? 'text' : 'password'}
                          value={pwd.password}
                          readOnly
                          className="input-field pr-20 font-mono text-sm"
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                          <button
                            onClick={() => togglePasswordVisibility(pwd._id)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                          >
                            {visiblePasswords[pwd._id] ? (
                              <EyeOff className="h-4 w-4 text-gray-500" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-500" />
                            )}
                          </button>
                          <button
                            onClick={() => copyToClipboard(pwd.password, pwd._id)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                          >
                            {copiedId === pwd._id ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4 text-gray-500" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    {pwd.notes && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Note: {pwd.notes}
                      </p>
                    )}
                    {pwd.isCompromised && (
                      <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
                        <p className="text-xs text-red-700 dark:text-red-400">
                          ⚠️ This password has been seen {pwd.breachCount.toLocaleString()} times in data breaches. Change it immediately!
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEditPassword(pwd)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <Edit2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button
                      onClick={() => handleDeletePassword(pwd._id)}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <PasswordModal
          password={editingPassword}
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false);
            fetchPasswords();
            fetchStats();
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
