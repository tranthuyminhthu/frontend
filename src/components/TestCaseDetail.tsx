// frontend/src/components/TestCaseDetail.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TestCaseDetail.css';

interface TestStep {
  id: number;
  action: string;
  data: string;
  expectedResult: string;
}

interface TestCase {
  id: string;
  title: string;
  description: string;
  suite: string;
  severity: string;
  priority: string;
  type: string;
  layer: string;
  isFlaky: string;
  milestone: string;
  automationStatus: string;
  behavior: string;
  preConditions: string;
  postConditions: string;
  steps: TestStep[];
}

interface TestCaseDetailProps {
  suites: { name: string; testCases: TestCase[] }[];
}

const TestCaseDetail: React.FC<TestCaseDetailProps> = ({ suites }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const testCase = suites
    .flatMap((suite) => suite.testCases)
    .find((tc) => tc.id === id);

  if (!testCase) {
    return <div>Test case not found</div>;
  }

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="test-case-detail-page">
      <div className="detail-header">
        <button className="back-btn" onClick={handleBack}>
          ← Back
        </button>
        <h2>
          <span className="test-case-id">{testCase.id}</span> {testCase.title}
        </h2>
        <div className="detail-actions">
          <button>✏️</button>
          <button>🗑️</button>
        </div>
      </div>
      <div className="detail-tabs">
        <button className="tab active">General</button>
        <button className="tab">Properties</button>
        <button className="tab">Runs</button>
        <button className="tab">History</button>
        <button className="tab">Defects</button>
        <button className="tab">Comments</button>
      </div>
      <div className="detail-content">
        <div className="detail-section">
          <h3>Description</h3>
          <p>{testCase.description || 'Not set'}</p>
        </div>
        <div className="detail-section">
          <h3>Pre-conditions</h3>
          <p>{testCase.preConditions}</p>
        </div>
        <div className="detail-section">
          <h3>Post-conditions</h3>
          <p>{testCase.postConditions}</p>
        </div>
        <div className="detail-section">
          <h3>Steps</h3>
          {testCase.steps && testCase.steps.length > 0 ? (
            <>
              <div className="steps-header">
                <span className="step-number"></span>
                <span className="step-action">Action</span>
                <span className="step-data">Data</span>
                <span className="step-expected">Expected result</span>
                <span className="step-attachment">Attachment</span>
              </div>
              {testCase.steps.map((step) => (
                <div key={step.id} className="step-row">
                  <span className="step-number">{step.id}</span>
                  <span className="step-action">{step.action}</span>
                  <span className="step-data">{step.data || 'None'}</span>
                  <span className="step-expected">{step.expectedResult}</span>
                  <span className="step-attachment"></span>
                </div>
              ))}
            </>
          ) : (
            <p>Not set</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestCaseDetail;