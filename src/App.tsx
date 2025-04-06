// frontend/src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TestCaseList from './components/TestCaseList';
import TestCaseForm from './components/TestCaseForm/TestCaseForm';
import TestSuiteForm from './components/TestSuiteForm';
import Sidebar from './components/Sidebar';
import CreateTestCaseAI from './components/CreateTestCaseAI';
import { Suite, TestCase } from './components/TestCaseForm/types';
import './App.css';

const App: React.FC = () => {
  const [suites, setSuites] = useState<Suite[]>([
    {
      name: 'Test cases without suite',
      testCases: [
        {
          id: 'OTH-3',
          title: 'Login Successfully',
          description: 'Verify that a user can log in successfully with valid username and password.',
          suite: 'Test cases without suite',
          severity: 'Normal',
          priority: 'Not set',
          type: 'Other',
          layer: 'Not set',
          isFlaky: 'No',
          milestone: 'Not set',
          automationStatus: 'Manual',
          behavior: 'Muted case',
          preConditions: 'User has a registered account with valid credentials.',
          postConditions: 'Not set',
          steps: [
            {
              id: 1,
              action: 'Navigate to the login page.',
              data: '',
              expectedResult: 'Login page is displayed.',
            },
            {
              id: 2,
              action: 'Enter valid username.',
              data: 'validUser',
              expectedResult: 'Username field is populated with "validUser".',
            },
            {
              id: 3,
              action: 'Enter valid password.',
              data: 'validPassword',
              expectedResult: 'Password field is populated with "validPassword".',
            },
            {
              id: 4,
              action: 'Click on the login button.',
              data: '',
              expectedResult: 'User is redirected to the dashboard.',
            },
          ],
        },
      ],
    },
    {
      name: 'test-suite1',
      testCases: [
        {
          id: 'OTH-4',
          title: 'Successful login with valid credentials',
          description: 'Verify that a user can log in successfully with valid username and password.',
          suite: 'test-suite1',
          severity: 'Normal',
          priority: 'Not set',
          type: 'Other',
          layer: 'Not set',
          isFlaky: 'No',
          milestone: 'Not set',
          automationStatus: 'Manual',
          behavior: 'Muted case',
          preConditions: 'User has a registered account with valid credentials.',
          postConditions: 'Not set',
          steps: [
            {
              id: 1,
              action: 'Navigate to the login page.',
              data: '',
              expectedResult: 'Login page is displayed.',
            },
            {
              id: 2,
              action: 'Enter valid username.',
              data: 'validUser',
              expectedResult: 'Username field is populated with "validUser".',
            },
            {
              id: 3,
              action: 'Enter valid password.',
              data: 'validPassword',
              expectedResult: 'Password field is populated with "validPassword".',
            },
            {
              id: 4,
              action: 'Click on the login button.',
              data: '',
              expectedResult: 'User is redirected to the dashboard.',
            },
          ],
        },
      ],
    },
  ]);

  const handleSaveTestCase = (testCase: TestCase) => {
    setSuites((prevSuites) => {
      // Kiểm tra xem suite đã tồn tại chưa
      const suiteExists = prevSuites.some(suite => suite.name === testCase.suite);
      
      if (!suiteExists) {
        // Nếu suite chưa tồn tại, tạo suite mới
        const newSuite: Suite = {
          name: testCase.suite,
          testCases: [testCase],
        };
        return [...prevSuites, newSuite];
      }

      // Nếu suite đã tồn tại, thêm test case vào suite đó
      return prevSuites.map(suite =>
        suite.name === testCase.suite
          ? { ...suite, testCases: [...suite.testCases, testCase] }
          : suite
      );
    });
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
            <Route
              path="/create-test-case-ai"
              element={
                <CreateTestCaseAI
                  onSave={handleSaveTestCase}
                  suites={suites}
                  onClose={() => window.history.back()}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;