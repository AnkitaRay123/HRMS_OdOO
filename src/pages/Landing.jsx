import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Briefcase, Mail, Lock, User, X, Hash } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [uniqueId, setUniqueId] = useState('');

  // Auto-generate Unique ID and Role based on email input
  useEffect(() => {
    if (email.trim().length > 0) {
      // Simple hash function for demonstration
      let hash = 0;
      for (let i = 0; i < email.length; i++) {
        hash = email.charCodeAt(i) + ((hash << 5) - hash);
      }
      const hex = Math.abs(hash).toString(16).toUpperCase();
      const generatedId = `UID-${hex.padStart(6, '0').slice(0, 6)}`;
      setUniqueId(generatedId);
      
      // Decide role based on hash: even = HR, odd = Employee
      if (Math.abs(hash) % 2 === 0) {
        setRole('HR');
      } else {
        setRole('Employee');
      }
    } else {
      setUniqueId('');
      setRole('');
    }
  }, [email]);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would create an account.
    // For now, redirect to login page.
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative circles to match dashboard vibe */}
      <div className="absolute -left-8 -top-8 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute right-16 -bottom-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute right-0 top-0 w-48 h-48 bg-violet-500/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

      <AnimatePresence mode="wait">
        {!isRegistering ? (
          <motion.div
            key="landing-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="z-10 flex flex-col items-center text-center px-6 max-w-4xl"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-20 h-20 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 mb-8 shadow-xl"
            >
              <Briefcase className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              We value your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-white">skills</span> <br className="hidden md:block" /> rather than resume.
            </h1>
            
            <p className="text-lg md:text-xl text-indigo-100/90 mb-10 max-w-2xl font-medium">
              Empowering organizations to discover, nurture, and manage top talent through skill-based insights and intuitive human resource management.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsRegistering(true)}
              className="group relative inline-flex items-center gap-2 bg-white text-indigo-700 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Register
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="register-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4 }}
            className="z-10 bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative"
          >
            <button 
              onClick={() => setIsRegistering(false)} 
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
              <p className="text-sm text-gray-500 mt-1">Join us to discover top talent.</p>
            </div>
            
            <form onSubmit={handleRegisterSubmit} className="space-y-5">
              <div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email ID" 
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 outline-none transition-all"
                    required
                  />
                </div>
              </div>
              
              <div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password" 
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 outline-none transition-all"
                    required
                  />
                </div>
                <div className="flex justify-end mt-2.5">
                  <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Show unique ID and Auto-assigned role section */}
              <AnimatePresence>
                {uniqueId && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">Generated Unique ID</p>
                          <div className="flex items-center gap-1.5">
                            <Hash className="w-4 h-4 text-indigo-500" />
                            <p className="font-mono text-lg font-bold text-indigo-900">{uniqueId}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 pt-3 border-t border-indigo-200/60">
                        <span className="text-sm font-medium text-indigo-700">System Assigned Role:</span>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-md shadow-sm border border-indigo-100">
                          {role === 'HR' ? <Briefcase className="w-3.5 h-3.5 text-indigo-600" /> : <User className="w-3.5 h-3.5 text-indigo-600" />}
                          <span className="text-sm font-bold text-indigo-900">{role}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Register Account <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
