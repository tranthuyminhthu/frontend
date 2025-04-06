// frontend/src/components/TestCaseForm/ParametersSection.tsx
import React from 'react';

const ParametersSection: React.FC = () => {
  return (
    <div className="form-section">
      <h3>Parameters</h3>
      <button className="add-btn">+ Single parameter</button>
      <button className="add-btn">+ Parameters group</button>
    </div>
  );
};

export default ParametersSection;