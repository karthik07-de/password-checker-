import { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff, RefreshCw, Copy, Check, AlertTriangle, Shield, Sparkles } from 'lucide-react';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';

const PasswordChecker = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strengthResult, setStrengthResult] = useState(null);
  const [breachResult, setBreachResult] = useState(null);
  const [checkingBreach, setCheckingBreach] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [generatorOptions, setGeneratorOptions] = useState({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });

  const checkStrength = async (pwd) => {
    if (!pwd) {
      setStrengthResult(null);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/passwords/check-strength`, {
        password: pwd
      });
      
      // Handle both old and new response formats
      const data = response.data.data || response.data;
      setStrengthResult(data);
    } catch (error) {
      console.error('Failed to check strength:', error);
      console.error('Error details:', error.response?.data);
    }
  };

  const checkBreach = async () => {
    if (!password) return;

    setCheckingBreach(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/passwords/check-breach`, {
        password
      });
      
      // Handle both old and new response formats
      const data = response.data.data || response.data;
      setBreachResult(data);
    } catch (error) {
      console.error('Failed to check breach:', error);
      console.error('Error details:', error.response?.data);
      setBreachResult({ 
        error: true,
        isBreached: false,
        message: 'Failed to check breach status. Please try again.' 
      });
    } finally {
      setCheckingBreach(false);
    }
  };

  const generatePassword = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/passwords/generate`, generatorOptions);
      
      // Handle both old and new response formats
      const data = response.data.data || response.data;
      setGeneratedPassword(data.password);
      setCopied(false);
    } catch (error) {
      console.error('Failed to generate password:', error);
      console.error('Error details:', error.response?.data);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setBreachResult(null);
    checkStrength(pwd);
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Header with 3D effect */}
        <div className="text-center mb-12 animate-slide-in-3d">
          <div className="inline-flex p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-6 shadow-2xl floating-3d">
            <Shield className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4"
            style={{
              textShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transform: 'perspective(1000px) translateZ(20px)'
            }}
          >
            Password <span className="gradient-text">Security Checker</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Check your password strength and see if it's been compromised
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Password Checker Card */}
          <div className="card-3d">
            <div className="glass-card p-8 h-full relative overflow-hidden">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 animate-pulse-glow-3d"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Check Password
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Enter Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handlePasswordChange}
                        className="input-modern pr-12"
                        placeholder="Enter password to check"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {strengthResult && (
                    <div className="animate-slide-in-3d">
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
                    </div>
                  )}

                  <button
                    onClick={checkBreach}
                    disabled={!password || checkingBreach}
                    className="btn-3d w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {checkingBreach ? (
                      <>
                        <RefreshCw className="h-5 w-5 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      <>
                        <Shield className="h-5 w-5" />
                        Check for Data Breaches
                      </>
                    )}
                  </button>

                  {breachResult && (
                    <div className={`p-6 rounded-2xl border-2 card-3d ${
                      breachResult.error
                        ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700'
                        : breachResult.isBreached
                        ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'
                        : 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
                    }`}>
                      <div className="flex items-start space-x-3">
                        {breachResult.error ? (
                          <div className="p-2 bg-yellow-500 rounded-lg">
                            <AlertTriangle className="h-6 w-6 text-white" />
                          </div>
                        ) : breachResult.isBreached ? (
                          <div className="p-2 bg-red-500 rounded-lg">
                            <AlertTriangle className="h-6 w-6 text-white" />
                          </div>
                        ) : (
                          <div className="p-2 bg-green-500 rounded-lg">
                            <Shield className="h-6 w-6 text-white" />
                          </div>
                        )}
                        <div>
                          <p className={`font-bold text-lg ${
                            breachResult.error
                              ? 'text-yellow-800 dark:text-yellow-300'
                              : breachResult.isBreached
                              ? 'text-red-800 dark:text-red-300'
                              : 'text-green-800 dark:text-green-300'
                          }`}>
                            {breachResult.error 
                              ? 'Error Checking' 
                              : breachResult.isBreached 
                              ? 'Password Compromised!' 
                              : 'Password Safe'}
                          </p>
                          <p className={`text-sm mt-1 ${
                            breachResult.error
                              ? 'text-yellow-700 dark:text-yellow-400'
                              : breachResult.isBreached
                              ? 'text-red-700 dark:text-red-400'
                              : 'text-green-700 dark:text-green-400'
                          }`}>
                            {breachResult.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Password Generator Card */}
          <div className="card-3d">
            <div className="glass-card p-8 h-full relative overflow-hidden">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 animate-pulse-glow-3d" style={{ animationDelay: '1s' }}></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Password Generator
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Length: <span className="text-purple-600 dark:text-purple-400 font-bold">{generatorOptions.length}</span>
                    </label>
                    <input
                      type="range"
                      min="8"
                      max="32"
                      value={generatorOptions.length}
                      onChange={(e) => setGeneratorOptions({ ...generatorOptions, length: parseInt(e.target.value) })}
                      className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, rgb(147, 51, 234) 0%, rgb(147, 51, 234) ${((generatorOptions.length - 8) / 24) * 100}%, rgb(229, 231, 235) ${((generatorOptions.length - 8) / 24) * 100}%, rgb(229, 231, 235) 100%)`
                      }}
                    />
                  </div>

                  <div className="space-y-3">
                    {[
                      { key: 'uppercase', label: 'Uppercase (A-Z)', gradient: 'from-blue-500 to-cyan-500' },
                      { key: 'lowercase', label: 'Lowercase (a-z)', gradient: 'from-green-500 to-emerald-500' },
                      { key: 'numbers', label: 'Numbers (0-9)', gradient: 'from-orange-500 to-red-500' },
                      { key: 'symbols', label: 'Symbols (!@#$%)', gradient: 'from-purple-500 to-pink-500' }
                    ].map((option) => (
                      <label key={option.key} className="flex items-center space-x-3 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={generatorOptions[option.key]}
                            onChange={(e) => setGeneratorOptions({ ...generatorOptions, [option.key]: e.target.checked })}
                            className="sr-only"
                          />
                          <div className={`w-6 h-6 rounded-lg border-2 transition-all duration-300 ${
                            generatorOptions[option.key]
                              ? `bg-gradient-to-br ${option.gradient} border-transparent`
                              : 'border-gray-300 dark:border-gray-600'
                          }`}>
                            {generatorOptions[option.key] && (
                              <Check className="h-5 w-5 text-white" />
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>

                  <button
                    onClick={generatePassword}
                    className="btn-3d w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="h-5 w-5" />
                    Generate Password
                  </button>

                  {generatedPassword && (
                    <div className="space-y-3 animate-slide-in-3d">
                      <div className="relative">
                        <input
                          type="text"
                          value={generatedPassword}
                          readOnly
                          className="input-modern pr-12 font-mono text-sm bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
                        />
                        <button
                          onClick={() => copyToClipboard(generatedPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all hover:scale-110"
                        >
                          {copied ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <Copy className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          setPassword(generatedPassword);
                          checkStrength(generatedPassword);
                        }}
                        className="btn-3d w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400"
                      >
                        Use This Password
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordChecker;
