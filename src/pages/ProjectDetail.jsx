import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <button onClick={() => navigate(-1)} className="text-purple-300 hover:text-purple-200 underline">← Back to Projects</button>
        <h1 className="text-4xl lg:text-6xl font-semibold mt-6">{slug?.replace(/-/g, ' ')}</h1>
        <p className="mt-6 text-lg text-gray-300">Project details page coming soon.</p>
      </div>
    </div>
  );
};

export default ProjectDetail;


