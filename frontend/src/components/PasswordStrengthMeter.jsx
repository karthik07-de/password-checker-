import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const PasswordStrengthMeter = ({ strength, score, maxScore, feedback, details }) => {
  const getStrengthColor = () => {
    switch (strength) {
      case 'strong':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      default:
        return 'bg-red-500';
    }
  };

  const getStrengthText = () => {
    switch (strength) {
      case 'strong':
        return 'Strong';
      case 'medium':
        return 'Medium';
      default:
        return 'Weak';
    }
  };

  const percentage = (score / maxScore) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Password Strength
        </span>
        <span className={`text-sm font-bold ${
          strength === 'strong' ? 'text-green-600 dark:text-green-400' :
          strength === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
          'text-red-600 dark:text-red-400'
        }`}>
          {getStrengthText()}
        </span>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-300 ${getStrengthColor()}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {details && (
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center space-x-2">
            {details.hasLowercase ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
            <span className="text-gray-700 dark:text-gray-300">Lowercase</span>
          </div>
          <div className="flex items-center space-x-2">
            {details.hasUppercase ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
            <span className="text-gray-700 dark:text-gray-300">Uppercase</span>
          </div>
          <div className="flex items-center space-x-2">
            {details.hasNumbers ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
            <span className="text-gray-700 dark:text-gray-300">Numbers</span>
          </div>
          <div className="flex items-center space-x-2">
            {details.hasSpecialChars ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
            <span className="text-gray-700 dark:text-gray-300">Special Chars</span>
          </div>
        </div>
      )}

      {feedback && feedback.length > 0 && (
        <div className="space-y-1">
          {feedback.map((item, index) => (
            <div key={index} className="flex items-start space-x-2 text-sm">
              <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600 dark:text-gray-400">{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;
