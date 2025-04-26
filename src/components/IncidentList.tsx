import { useState } from "react";
import { Incident } from "../types/Incident";

type Props = {
  incidents: Incident[];
  onToggleDescription: (id: number) => void;
  expandedIncidentIds: Set<number>;
};

const IncidentList = ({ incidents, onToggleDescription, expandedIncidentIds }: Props) => {
  if (incidents.length === 0) {
    return <p className="text-center text-gray-500">No incidents found.</p>;
  }

  return (
    <div className="space-y-4">
      {incidents.map((incident) => (
        <div
          key={incident.id}
          className="bg-white p-4 rounded-lg shadow-md border hover:shadow-lg transition-all"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{incident.title}</h2>
              <p className="text-sm text-gray-600">
                Severity: <span className="font-medium">{incident.severity}</span>
              </p>
              <p className="text-sm text-gray-500">
                Reported on: {new Date(incident.reported_at).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => onToggleDescription(incident.id)}
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              {expandedIncidentIds.has(incident.id) ? "Hide Details" : "View Details"}
            </button>
          </div>

          {expandedIncidentIds.has(incident.id) && (
            <p className="mt-3 text-gray-700">{incident.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default IncidentList;
