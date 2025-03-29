import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const RequirementInput = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/process/", { input });
      setTimeout(() => {
        setResponse(res.data.requirement);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1e1e2e] to-[#151526] p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg p-6 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <motion.img 
            src="/logo.png" 
            alt="Logo"
            className="w-16 h-16"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <h2 className="text-3xl font-bold text-white text-center mb-4">AI Requirement Generator</h2>
        <p className="text-gray-300 text-sm text-center mb-4">Describe your software idea, and AI will generate structured requirements.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            rows="4"
            placeholder="Enter your requirement..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 p-3 rounded-lg text-white font-semibold transition shadow-lg"
          >
            {loading ? "Generating..." : "Generate Requirement"}
          </motion.button>
        </form>

        {loading && (
          <p className="text-center text-gray-400 mt-4 animate-pulse">AI is processing your input...</p>
        )}

        {response && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3 }}
            className="mt-6 p-4 bg-gray-800 rounded-xl text-white shadow-lg"
          >
            <strong className="block text-blue-400 mb-2">Generated Requirement:</strong>
            <p className="text-gray-300">{response}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default RequirementInput;
