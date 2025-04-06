// frontend/src/components/TestCaseForm/StepsSection.tsx
import React from 'react';
import { TestStep } from './types';

interface StepsSectionProps {
  steps: TestStep[];
  anchorEl: HTMLElement | null;
  currentStepIndex: number | null;
  handleStepChange: (index: number, field: keyof TestStep, value: string) => TestStep[];
  handleAddStep: () => void;
  handleDeleteStep: (index: number) => void;
  handleDuplicateStep: (index: number) => void;
  handleMoveToTop: (index: number) => void;
  handleMoveToBottom: (index: number) => void;
  handleMoveUp: (index: number) => void;
  handleMoveDown: (index: number) => void;
  handleOpenMenu: (event: React.MouseEvent<HTMLElement>, index: number) => void;
  handleCloseMenu: () => void;
}

const StepsSection: React.FC<StepsSectionProps> = ({
  steps,
  handleStepChange,
  handleAddStep,
  handleDeleteStep,
  handleDuplicateStep,
  handleMoveToTop,
  handleMoveToBottom,
  handleMoveUp,
  handleMoveDown,
  handleOpenMenu,
  handleCloseMenu,
  anchorEl,
  currentStepIndex,
}) => {
  return (
    <div>
      <h3>Test Steps</h3>
      {steps.map((step, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <div>
            <label>Action:</label>
            <input
              value={step.action}
              onChange={(e) => handleStepChange(index, 'action', e.target.value)}
            />
          </div>
          <div>
            <label>Expected Result:</label>
            <input
              value={step.expectedResult}
              onChange={(e) => handleStepChange(index, 'expectedResult', e.target.value)}
            />
          </div>
          <button onClick={() => handleDeleteStep(index)}>Delete</button>
          <button onClick={() => handleDuplicateStep(index)}>Duplicate</button>
          <button onClick={() => handleMoveToTop(index)}>Move to Top</button>
          <button onClick={() => handleMoveToBottom(index)}>Move to Bottom</button>
          <button onClick={() => handleMoveUp(index)}>Move Up</button>
          <button onClick={() => handleMoveDown(index)}>Move Down</button>
          <button onClick={(event) => handleOpenMenu(event, index)}>Menu</button>
        </div>
      ))}
      <button onClick={handleAddStep}>Add Step</button>
      {/* Giả sử bạn có một menu hiển thị khi nhấp vào "Menu" */}
      {anchorEl && (
        <div>
          <button onClick={handleCloseMenu}>Close Menu</button>
        </div>
      )}
    </div>
  );
};

export default StepsSection;