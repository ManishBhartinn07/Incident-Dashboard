import React, { useState } from "react";
import { Incident } from "../types/Incident";

interface IncidentFormProps {
  onAddIncident: (newIncident: Incident) => void;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ onAddIncident }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<"Low" | "Medium" | "High">("Low");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input fields
    if (!title.trim() || !description.trim()) {
      setError("Both Title and Description are required.");
      return;
    }

    const newIncident: Incident = {
      id: Date.now(), // Unique ID based on timestamp
      title,
      description,
      severity,
      reported_at: new Date().toISOString(), // Auto-generate reported date
    };

    onAddIncident(newIncident);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSeverity("Low");
    setError("");
  };

  return (
    <div className="border rounded-lg p-6 shadow-sm mb-6 bg-white">
      <h2 className="text-xl font-semibold mb-4">Report New Incident</h2>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md shadow-sm"
            placeholder="Enter incident title"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md shadow-sm"
            placeholder="Enter incident description"
            rows={4}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="severity" className="block text-sm font-medium text-gray-700">Severity</label>
          <select
            id="severity"
            value={severity}
            onChange={(e) => setSeverity(e.target.value as "Low" | "Medium" | "High")}
            className="mt-1 p-2 w-full border rounded-md shadow-sm"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Report Incident
        </button>
      </form>
    </div>
  );
};

export default IncidentForm;
