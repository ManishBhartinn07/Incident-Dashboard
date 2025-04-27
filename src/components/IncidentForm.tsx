import React, { useState } from 'react';
import { Incident } from '../types';

type IncidentFormProps = {
  onAddIncident: (incident: Incident) => void;
};

const IncidentForm: React.FC<IncidentFormProps> = ({ onAddIncident }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'Low' | 'Medium' | 'High'>('Low');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newIncident: Incident = {
      id: Date.now(),
      title,
      description,
      severity,
      date: new Date().toISOString().split('T')[0],
    };

    onAddIncident(newIncident);
    setTitle('');
    setDescription('');
    setSeverity('Low');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Report New Incident</h2>

      <div>
        <label className="block text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-md p-2"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-md p-2"
          required
        ></textarea>
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Severity</label>
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value as 'Low' | 'Medium' | 'High')}
          className="w-full border rounded-md p-2"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-all"
      >
        Submiting
      </button>
    </form>
  );
};

export default IncidentForm;
