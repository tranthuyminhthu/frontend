// frontend/src/components/TestCaseForm/ConditionsSection.tsx
import React from 'react';

interface ConditionsSectionProps {
  formData: {
    preConditions: string;
    postConditions: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const ConditionsSection: React.FC<ConditionsSectionProps> = ({ formData, handleChange }) => {
  return (
    <div className="form-section">
      <h3>Conditions</h3>
      <div className="form-row">
        <div className="form-group">
          <label>Pre-conditions</label>
          <input
            type="text"
            name="preConditions"
            value={formData.preConditions}
            onChange={(e) => handleChange(e)}
            placeholder="Empty value"
          />
        </div>
        <div className="form-group">
          <label>Post-conditions</label>
          <input
            type="text"
            name="postConditions"
            value={formData.postConditions}
            onChange={(e) => handleChange(e)}
            placeholder="Empty value"
          />
        </div>
      </div>
    </div>
  );
};

export default ConditionsSection;