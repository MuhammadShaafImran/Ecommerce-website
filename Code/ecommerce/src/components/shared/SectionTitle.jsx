// components/shared/SectionTitle.jsx
import React from 'react';

const SectionTitle = ({ title, subtitle, centered = false }) => {
  return (
    <div className={`mb-8 ${centered ? 'text-center' : ''}`}>
      {subtitle && <p className="text-red-500 mb-1">{subtitle}</p>}
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
  );
};

export default SectionTitle;