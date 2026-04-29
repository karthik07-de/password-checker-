import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, AlertTriangle, Key, CheckCircle, Sparkles, Zap, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with 3D Parallax */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        {/* Animated 3D Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-20 left-10 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl animate-pulse-glow-3d"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) translateZ(50px)`
            }}
          ></div>
          <div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse-glow-3d"
            style={{
              transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px) translateZ(30px)`,
              animationDelay: '1s'
            }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl animate-pulse-glow-3d"
            style={{
              transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) translateZ(20px)`,
              animationDelay: '2s'
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            {/* 3D Floating Shield Icon */}
            <div 
              className="inline-block mb-8 floating-3d"
              style={{
                transform: `rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-3xl blur-2xl animate-pulse-glow-3d"></div>
                <div className="relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/30 shadow-2xl">
                  <Shield className="h-20 w-20 drop-shadow-2xl" />
                </div>
              </div>
            </div>

            <h1 
              className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
                textShadow: '0 10px 30px rgba(0,0,0,0.3)'
              }}
            >
              SecurePass Guard
            </h1>
            
            <p 
              className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto"
              style={{
                transform: `perspective(1000px) translateZ(20px) rotateX(${mousePosition.y * 0.05}deg)`,
                textShadow: '0 5px 15px rgba(0,0,0,0.2)'
              }}
            >
              Your ultimate password security companion. Check strength, detect breaches, and manage passwords securely.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/register"
                className="btn-3d px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-all text-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Get Started Free
                </span>
              </Link>
              <Link
                to="/password-checker"
                className="btn-3d px-8 py-4 bg-purple-700/50 backdrop-blur-xl text-white rounded-xl font-semibold hover:bg-purple-600/50 transition-all border-2 border-white/30 text-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  <Zap className="h-5 w-5" />
                  Check Password
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* 3D Wave Effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#f9fafb"
              fillOpacity="1"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Features Section with 3D Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gray-50 dark:bg-gray-900">
        <h2 
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white"
          style={{
            transform: 'perspective(1000px) translateZ(30px)',
            textShadow: '0 5px 15px rgba(0,0,0,0.1)'
          }}
        >
          Powerful <span className="gradient-text">Security Features</span>
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-16 text-lg">
          Everything you need to protect your digital identity
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Lock className="h-10 w-10" />,
              title: "Strength Checker",
              description: "Real-time analysis of password strength with detailed feedback and recommendations.",
              gradient: "from-blue-500 to-cyan-500",
              delay: "0s"
            },
            {
              icon: <AlertTriangle className="h-10 w-10" />,
              title: "Breach Detection",
              description: "Check if your password has been exposed in known data breaches using HIBP API.",
              gradient: "from-purple-500 to-pink-500",
              delay: "0.1s"
            },
            {
              icon: <Eye className="h-10 w-10" />,
              title: "Password Manager",
              description: "Securely store and manage all your passwords with military-grade encryption.",
              gradient: "from-pink-500 to-rose-500",
              delay: "0.2s"
            },
            {
              icon: <Key className="h-10 w-10" />,
              title: "Password Generator",
              description: "Generate strong, random passwords with customizable options.",
              gradient: "from-orange-500 to-red-500",
              delay: "0.3s"
            },
            {
              icon: <CheckCircle className="h-10 w-10" />,
              title: "Security Dashboard",
              description: "Monitor all your passwords and get alerts for weak or compromised credentials.",
              gradient: "from-green-500 to-emerald-500",
              delay: "0.4s"
            },
            {
              icon: <Shield className="h-10 w-10" />,
              title: "Privacy First",
              description: "Your passwords are encrypted locally. We never see your plaintext passwords.",
              gradient: "from-indigo-500 to-purple-500",
              delay: "0.5s"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="card-3d group"
              style={{ animationDelay: feature.delay }}
            >
              <div className="glass-card p-8 h-full relative overflow-hidden">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Icon with 3D effect */}
                <div className={`inline-flex p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  style={{
                    transform: 'translateZ(20px)',
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)'
                  }}
                >
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white relative z-10">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 relative z-10">
                  {feature.description}
                </p>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section with 3D Effect */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: "256-bit", label: "AES Encryption", icon: <Lock className="h-8 w-8" /> },
              { number: "10B+", label: "Breaches Checked", icon: <Shield className="h-8 w-8" /> },
              { number: "100%", label: "Open Source", icon: <Star className="h-8 w-8" /> }
            ].map((stat, index) => (
              <div
                key={index}
                className="glass-morphic p-8 rounded-2xl text-center text-white group cursor-pointer"
              >
                <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 animate-bounce-3d">
                  {stat.icon}
                </div>
                <div className="text-5xl font-bold mb-2 gradient-text bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section with 3D Effect */}
      <div className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="relative">
            {/* Glowing background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-20 animate-pulse-glow-3d"></div>
            
            <div className="relative glass-card p-12 rounded-3xl">
              <div className="inline-flex p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6 animate-bounce-3d">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                Ready to secure your passwords?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Join thousands of users protecting their digital identity with SecurePass Guard.
              </p>
              <Link
                to="/register"
                className="btn-3d inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all text-lg shadow-2xl"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
