import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TestCaseList from './components/TestCaseList';
import TestCaseForm from './components/TestCaseForm/TestCaseForm';
import TestSuiteForm from './components/TestSuiteForm';
import Sidebar from './components/Sidebar';
import { Suite, TestCase } from './components/TestCaseForm/types';
import './App.css';

const App: React.FC = () => {
  const [suites, setSuites] = useState<Suite[]>([
    {
      name: 'Test cases without suite',
      testCases: [
        {
          id: 'OTH-1',
          title: 'Login Successfully',
          description: '',
          suite: 'Test cases without suite',
          severity: 'Normal',
          priority: 'Not set',
          type: 'Other',
          layer: 'Not set',
          isFlaky: 'No',
          milestone: 'Not set',
          automationStatus: 'Manual',
          behavior: 'Muted case',
          preConditions: 'Not set',
          postConditions: 'Not set',
          steps: [
            {
              id: 1,
              action: 'Go to the Home Page',
              data: 'url',
              expectedResult: 'The Home page should be displayed',
            },
            {
              id: 2,
              action: 'Select the left side bar on screen',
              data: 'url',
              expectedResult: 'okay',
            },
            {
              id: 3,
              action: 'Input a keyword into the text box',
              data: 'kkk',
              expectedResult: 'All search results include the keyword',
            },
          ],
        },
      ],
    },
  ]);

  const handleSaveTestCase = (testCase: TestCase) => {
    setSuites((prevSuites) =>
      prevSuites.map((suite) =>
        suite.name === testCase.suite
          ? { ...suite, testCases: [...suite.testCases, testCase] }
          : suite
      )
    );
  };

  const handleSaveSuite = (data: { name: string; description: string; preconditions: string }) => {
    const newSuite: Suite = {
      name: data.name,
      testCases: [],
    };
    setSuites((prevSuites) => [...prevSuites, newSuite]);
  };

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<TestCaseList suites={suites} />} />
            <Route
              path="/create-test-case"
              element={
                <TestCaseForm
                  onSave={handleSaveTestCase}
                  suites={suites}
                  onClose={() => window.history.back()}
                />
              }
            />
            <Route
              path="/create-suite"
              element={<TestSuiteForm onSubmit={handleSaveSuite} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;