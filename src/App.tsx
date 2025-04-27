import React, { useState } from 'react';

type Incident = {
  id: number;
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
  reported_at: string;
};

const initialIncidents: Incident[] = [
  {
    id: 1,
    title: 'Biased Recommendation Algorithm',
    description: 'Algorithm consistently favored certain demographics...',
    severity: 'Medium',
    reported_at: '2025/03/15 10:00:00',
  },
  {
    id: 2,
    title: 'LLM Hallucination in Critical Info',
    description: 'LLM provided incorrect safety procedure information...',
    severity: 'High',
    reported_at: '2025/04/01 14:30:00',
  },
  {
    id: 3,
    title: 'Minor Data Leak via Chatbot',
    description: 'Chatbot inadvertently exposed non-sensitive user metadata...',
    severity: 'Low',
    reported_at: '2025/03/20 09:15:00',
  },
];

const App: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [filter, setFilter] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  const [form, setForm] = useState({
    title: '',
    description: '',
    severity: 'Low',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const getCurrentFormattedDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return;

    const newIncident: Incident = {
      id: Date.now(),
      title: form.title,
      description: form.description,
      severity: form.severity as 'Low' | 'Medium' | 'High',
      reported_at: getCurrentFormattedDate(),
    };

    const updatedIncidents = [...incidents, newIncident];
    setIncidents(updatedIncidents);
    setForm({ title: '', description: '', severity: 'Low' });
  };

  const filtered = incidents
    .filter((i) => (filter === 'All' ? true : i.severity === filter))
    .sort((a, b) =>
      sortOrder === 'newest'
        ? new Date(b.reported_at.replace(/\//g, '-')).getTime() - new Date(a.reported_at.replace(/\//g, '-')).getTime()
        : new Date(a.reported_at.replace(/\//g, '-')).getTime() - new Date(b.reported_at.replace(/\//g, '-')).getTime()
    );

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => {
      const copy = new Set(prev);
      copy.has(id) ? copy.delete(id) : copy.add(id);
      return copy;
    });
  };

  return (
    <div className="animate-slide-in max-w-4xl mx-auto p-4 bg-teal-50 rounded-lg shadow-md">
      <h1 className="relative text-5xl md:text-6xl font-extrabold mb-10 text-center text-gray-900 py-8 rounded-2xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 shadow-[0_0_20px_rgba(0,0,255,0.2)] tracking-widest uppercase overflow-hidden">
        <span className="absolute inset-0 animate-glitch text-gray-300 opacity-40 z-0">
          AI Safety Incident Dashboard
        </span>
        <span className="relative z-10">
          AI Safety Incident Dashboard
        </span>
      </h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 bg-transparent text-gray-900 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full sm:w-auto shadow-md transition duration-200 ease-in-out"
        >
          <option value="All">All Severities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
          className="p-3 rounded-lg border border-gray-300 bg-transparent text-gray-900 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full sm:w-auto shadow-md transition duration-200 ease-in-out"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {filtered.map((incident) => (
        <div key={incident.id} className="incident-card p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-outfit font-semibold text-lg text-gray-800 hover:text-gray-900 transition duration-200">
                {incident.title}
              </h3>
              <p className="text-sm text-gray-500 flex items-center space-x-2">
                <span className={`font-semibold ${incident.severity === 'High' ? 'text-red-400' : incident.severity === 'Medium' ? 'text-yellow-400' : 'text-green-400'}`}>
                  {incident.severity}
                </span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-400">
                  Reported: {incident.reported_at}
                </span>
              </p>
            </div>
            <button
              onClick={() => toggleExpand(incident.id)}
              className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-pink-400 hover:to-red-400 text-white rounded-md text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              {expandedIds.has(incident.id) ? 'Hide Details' : 'View Details'}
            </button>
          </div>
          {expandedIds.has(incident.id) && (
            <p className="mt-2 text-gray-700">{incident.description}</p>
          )}
        </div>
      ))}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Report New Incident</h2>

        <input
          type="text"
          name="title"
          placeholder="Incident Title"
          value={form.title}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          required
        />

        <textarea
          name="description"
          placeholder="Incident Description"
          value={form.description}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-none"
          rows={4}
          required
        />

        <select
          name="severity"
          value={form.severity}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        >
          <option value="" disabled>Select Severity</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-green-500 shadow-md hover:shadow-lg transition-all duration-300"
        >
          Submit Incident
        </button>
      </form>
    </div>
  );
};

export default App;
