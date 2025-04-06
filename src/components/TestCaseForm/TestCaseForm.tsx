// frontend/src/components/TestCaseForm/TestCaseForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BasicSection from './BasicSection';
import ConditionsSection from './ConditionsSection';
import StepsSection from './StepsSection';
import TagsSection from './TagsSection';
import AttachmentsSection from './AttachmentsSection';
import ParametersSection from './ParametersSection';
import { useSteps } from './useSteps';
import { TestCase, TestCaseFormProps } from './types';
import './TestCaseForm.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff',
    },
  },
});

const TestCaseForm: React.FC<TestCaseFormProps> = ({ onSave, suites }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TestCase>({
    id: `OHT-${Math.floor(Math.random() * 1000)}`,
    title: '',
    description: '',
    suite: suites.length > 0 ? suites[0].name : 'Test cases without suite',
    severity: 'Normal',
    priority: 'Not set',
    type: 'Other',
    layer: 'Not set',
    isFlaky: 'No',
    milestone: 'Not set',
    automationStatus: 'To be automated',
    behavior: 'Muted case',
    preConditions: 'Empty value',
    postConditions: 'Empty value',
    steps: [],
  });

  const {
    steps,
    anchorEl,
    currentStepIndex,
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
  } = useSteps();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    newValue?: string,
    name?: string
  ) => {
    const value = newValue !== undefined ? newValue : e.target.value;
    const fieldName = name || e.target.name;
    setFormData((prev: TestCase) => ({ ...prev, [fieldName]: value }));
  };

  const handleSave = () => {
    const errors: string[] = [];

    if (!formData.title.trim()) {
      errors.push('Title is required');
    }

    if (formData.severity === 'Not set') {
      errors.push('Severity is required');
    }

    if (formData.priority === 'Not set') {
      errors.push('Priority is required');
    }

    if (formData.type === '') {
      errors.push('Type is required');
    }

    if (formData.layer === 'Not set') {
      errors.push('Layer is required');
    }

    if (formData.automationStatus === '') {
      errors.push('Automation status is required');
    }

    if (formData.isFlaky === '') {
      errors.push('Is flaky is required');
    }

    if (formData.behavior === 'Not set') {
      errors.push('Behavior is required');
    }

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    onSave({ ...formData, steps });
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="test-case-form">
        <div className="form-header">
          <h2>Create test case</h2>
          <button className="config-btn">Configure</button>
        </div>

        <BasicSection formData={formData} suites={suites} handleChange={handleChange} />
        <ConditionsSection formData={formData} handleChange={handleChange} />
        <TagsSection />
        <AttachmentsSection />
        <ParametersSection />
        <StepsSection
          steps={steps}
          anchorEl={anchorEl}
          currentStepIndex={currentStepIndex}
          handleStepChange={handleStepChange}
          handleAddStep={handleAddStep}
          handleDeleteStep={handleDeleteStep}
          handleDuplicateStep={handleDuplicateStep}
          handleMoveToTop={handleMoveToTop}
          handleMoveToBottom={handleMoveToBottom}
          handleMoveUp={handleMoveUp}
          handleMoveDown={handleMoveDown}
          handleOpenMenu={handleOpenMenu}
          handleCloseMenu={handleCloseMenu}
        />

        <div className="form-actions">
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
          <button className="save-and-create-btn">Save & create another</button>
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default TestCaseForm;