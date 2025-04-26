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
    reported_at: '2025-03-15T10:00:00Z',
  },
  {
    id: 2,
    title: 'LLM Hallucination in Critical Info',
    description: 'LLM provided incorrect safety procedure information...',
    severity: 'High',
    reported_at: '2025-04-01T14:30:00Z',
  },
  {
    id: 3,
    title: 'Minor Data Leak via Chatbot',
    description: 'Chatbot inadvertently exposed non-sensitive user metadata...',
    severity: 'Low',
    reported_at: '2025-03-20T09:15:00Z',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) return;

    const newIncident: Incident = {
      id: Date.now(),
      title: form.title,
      description: form.description,
      severity: form.severity as 'Low' | 'Medium' | 'High',
      reported_at: new Date().toISOString(),
    };

    setIncidents((prev) => [...prev, newIncident]);
    setForm({ title: '', description: '', severity: 'Low' });
  };

  const filtered = incidents
    .filter((i) => (filter === 'All' ? true : i.severity === filter))
    .sort((a, b) =>
      sortOrder === 'newest'
        ? new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime()
        : new Date(a.reported_at).getTime() - new Date(b.reported_at).getTime()
    );

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => {
      const copy = new Set(prev);
      if (copy.has(id)) {
        copy.delete(id);
      } else {
        copy.add(id);
      }
      return copy;
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Safety Incident Dashboard</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 rounded border"
        >
          <option value="All">All Severities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
          className="p-2 rounded border"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} className="form-section mb-8">
        <h2 className="text-lg font-semibold mb-2">Report New Incident</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleInputChange}
          className="mb-2"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleInputChange}
          className="mb-2"
          required
        />
        <select
          name="severity"
          value={form.severity}
          onChange={handleInputChange}
          className="mb-2"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white">
          Submit
        </button>
      </form>

      {filtered.map((incident) => (
        <div key={incident.id} className="incident-card">
          <div className="flex justify-between items-center">
            <div>
            {/* <h3 className="font-semibold text-lg text-gray-800">{incident.title}</h3> */}
            <h3 className="font-bold text-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text">
  {incident.title}
</h3>
              {/* <p className="text-sm text-gray-600">
                Severity: {incident.severity} | Reported: {new Date(incident.reported_at).toLocaleDateString()}
              </p> */}
              <p className="text-sm text-gray-600">
  <span
    className={`inline-block px-2 py-1 rounded text-white text-xs font-medium ${
      incident.severity === 'Low'
        ? 'bg-green-500'
        : incident.severity === 'Medium'
        ? 'bg-yellow-500'
        : 'bg-red-500'
    }`}
  >
    {incident.severity}
  </span>{' '}
  | Reported: {new Date(incident.reported_at).toLocaleDateString()}
</p>

            </div>
            <button onClick={() => toggleExpand(incident.id)} className="text-blue-600">
              {expandedIds.has(incident.id) ? 'Hide Details' : 'View Details'}
            </button>
          </div>
          {expandedIds.has(incident.id) && (
            <p className="mt-2 text-gray-700">{incident.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default App;
