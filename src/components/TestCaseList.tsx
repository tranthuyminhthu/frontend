import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TestCaseForm from './TestCaseForm/TestCaseForm';
import TestSuiteForm from './TestSuiteForm';
import './TestCaseList.css';
import { TestCase, Suite } from './TestCaseForm/types';
import { IconButton, Tabs, Tab, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Edit, Delete, MoreVert, Close, ExpandMore, ExpandLess } from '@mui/icons-material';

interface TestCaseListProps {
  suites: Suite[];
}

const TestCaseList: React.FC<TestCaseListProps> = ({ suites }) => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [showSuiteForm, setShowSuiteForm] = useState(false);
  const [showCreateOptions, setShowCreateOptions] = useState(false);
  const [selectedSuite, setSelectedSuite] = useState<Suite | null>(suites[0] || null);
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);
  const [tabValue, setTabValue] = useState(0);

  // Cập nhật selectedSuite khi suites thay đổi
  useEffect(() => {
    if (suites.length > 0) {
      if (!selectedSuite || !suites.find((suite) => suite.name === selectedSuite.name)) {
        setSelectedSuite(suites[0]);
      } else {
        const updatedSuite = suites.find((suite) => suite.name === selectedSuite.name);
        setSelectedSuite(updatedSuite || suites[0]);
      }
    } else {
      setSelectedSuite(null);
    }
  }, [suites]);

  const handleNewTestClick = () => {
    setShowCreateOptions(!showCreateOptions); // Toggle hiển thị tùy chọn
  };

  const handleCreateManually = () => {
    setShowCreateOptions(false);
    navigate('/create-test-case');
  };

  const handleCreateWithAI = () => {
    setShowCreateOptions(false);
    navigate('/create-test-case-ai');
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleCloseSuiteForm = () => {
    setShowSuiteForm(false);
  };

  const handleSaveTestCase = (testCase: TestCase) => {
    setShowForm(false);
    navigate('/');
  };

  const handleSaveSuite = (data: { name: string; description: string; preconditions: string }) => {
    const newSuite: Suite = {
      name: data.name,
      testCases: [],
    };
    setSelectedSuite(newSuite);
    navigate('/');
  };

  const handleSelectSuite = (suite: Suite) => {
    setSelectedSuite(suite);
    setSelectedTestCase(null); // Reset selected test case when changing suite
  };

  const handleSelectTestCase = (testCase: TestCase) => {
    setSelectedTestCase(testCase);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const totalCases = suites.reduce((sum, suite) => sum + suite.testCases.length, 0);

  return (
    <div className="test-case-list">
      {showForm ? (
        <TestCaseForm onClose={handleCloseForm} onSave={handleSaveTestCase} suites={suites} />
      ) : (
        <div className="test-case-container">
          <div className="project-info">
              <h1 className="repository-name">OHT repository</h1>
              <span className="case-count">
                {totalCases} cases ({suites.length}) | {suites.length} suites
              </span>
            </div>
          <div className="header">
            <div className="actions">
              <div className="new-test-wrapper">
                <button className="new-test-btn" onClick={handleNewTestClick}>
                  New test
                  {showCreateOptions ? <ExpandLess /> : <ExpandMore />}
                </button>
                {showCreateOptions && (
                  <div className="create-options">
                    <button onClick={handleCreateManually}>
                      <span className="create-icon">📝</span> Create manually
                    </button>
                    <button onClick={handleCreateWithAI}>
                      <span className="create-icon">🤖</span> Create with AI
                    </button>
                  </div>
                )}
              </div>
              <button className="add-suite-btn" onClick={() => navigate('/create-suite')}>
                Add suite
              </button>
              <input type="text" placeholder="Search" className="search-input" />
              <button className="add-filter-btn">Add filter</button>
            </div>
            
          </div>

          <div className="content-wrapper">
            <div className="suites-and-cases">
              <div className="suites-list">
                <h3>Suites</h3>
                {suites.map((suite) => (
                  <div
                    key={suite.name}
                    className={`suite-item ${selectedSuite?.name === suite.name ? 'selected' : ''}`}
                    onClick={() => handleSelectSuite(suite)}
                  >
                    <span className="suite-name">{suite.name}</span>
                    <span className="suite-count">{suite.testCases.length}</span>
                    <div className="suite-actions">
                      <IconButton size="small">
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
                        <Delete fontSize="small" />
                      </IconButton>
                    </div>
                  </div>
                ))}
              </div>

              <div className="test-case-middle">
                {selectedSuite ? (
                  <>
                    <h2 className="suite-title">{selectedSuite.name}</h2>
                    {selectedSuite.testCases.length > 0 ? (
                      <div className="test-case-list-content">
                        {selectedSuite.testCases.map((testCase, index) => (
                          <div
                            key={testCase.id}
                            className={`test-case ${selectedTestCase?.id === testCase.id ? 'selected' : ''}`}
                            onClick={() => handleSelectTestCase(testCase)}
                          >
                            <span>{testCase.id}</span>
                            <span>{testCase.title}</span>
                            <div className="test-case-actions">
                              <IconButton size="small">
                                <MoreVert fontSize="small" />
                              </IconButton>
                            </div>
                          </div>
                        ))}
                        <button className="create-quick-test">+ Create quick test</button>
                      </div>
                    ) : (
                      <div className="empty-state">
                        <p>No test cases in this suite.</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="empty-state">
                    <p>Select a suite to view its test cases.</p>
                  </div>
                )}
              </div>
            </div>

            {selectedTestCase && (
              <div className="test-case-details">
                <div className="details-header">
                  <h2>{selectedTestCase.id}</h2>
                  <h3>{selectedTestCase.title}</h3>
                  <IconButton onClick={() => setSelectedTestCase(null)}>
                    <Close />
                  </IconButton>
                </div>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label="General" />
                  <Tab label="Properties" />
                  <Tab label="Runs" />
                  <Tab label="History" />
                  <Tab label="Defects" />
                  <Tab label="Comments" />
                </Tabs>
                {tabValue === 0 && (
                  <div className="details-content">
                    <div className="section">
                      <h4>Description</h4>
                      <p>{selectedTestCase.description || 'No description'}</p>
                    </div>
                    <div className="section">
                      <h4>Pre-conditions</h4>
                      <p>{selectedTestCase.preConditions || 'Not set'}</p>
                    </div>
                    <div className="section">
                      <h4>Post-conditions</h4>
                      <p>{selectedTestCase.postConditions || 'Not set'}</p>
                    </div>
                    <div className="section">
                      <h4>Steps</h4>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>Data</TableCell>
                            <TableCell>Expected result</TableCell>
                            <TableCell>Attachments</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedTestCase.steps.map((step, index) => (
                            <TableRow key={step.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{step.action}</TableCell>
                              <TableCell>{step.data || '-'}</TableCell>
                              <TableCell>{step.expectedResult}</TableCell>
                              <TableCell>-</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {showSuiteForm && <TestSuiteForm onSubmit={handleSaveSuite} />}
    </div>
  );
};

export default TestCaseList;