// src/components/IncidentCard.tsx
import React, { useState } from "react";
import { Incident } from "../types";

interface IncidentCardProps {
  incident: Incident;
}

const severityColors: Record<string, string> = {
  Low: "bg-green-100 text-green-800 hover:bg-green-200",
  Medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  High: "bg-red-100 text-red-800 hover:bg-red-200",
};

export const IncidentCard: React.FC<IncidentCardProps> = ({ incident }) => {
  const [style, setStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;  // 0 to 1
    const y = (e.clientY - top) / height;  // 0 to 1

    const rotateX = (y - 0.5) * 20; // up-down tilt
    const rotateY = (x - 0.5) * -20; // left-right tilt

    setStyle({
      transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)",
      transition: "transform 0.3s ease",
    });
  };

  return (
    <div
      className="bg-white rounded-lg p-6 shadow-md hover:shadow-2xl transition-transform duration-300 ease-in-out cursor-pointer"
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{incident.title}</h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${severityColors[incident.severity]}`}
        >
          {incident.severity}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{incident.description}</p>
      <div className="text-sm text-gray-400">Date: {incident.date}</div>
    </div>
  );
};
