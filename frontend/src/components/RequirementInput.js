import { useState } from "react";
import axios from "axios";

const RequirementInput = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/process/", { input });
      setResponse(res.data.requirement);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Enter Requirement</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
          rows="4"
          placeholder="Describe your software requirement..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded">
          Submit
        </button>
      </form>
      {response && (
        <div className="mt-4 p-2 bg-gray-700 rounded">
          <strong>Generated Requirement:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default RequirementInput;
