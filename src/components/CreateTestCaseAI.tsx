// frontend/src/components/CreateTestCaseAI.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateTestCaseAI.css';
import { TestCase, TestStep, Suite } from './TestCaseForm/types';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface CreateTestCaseAIProps {
  onSave: (testCase: TestCase) => void;
  selectedSuiteName?: string;
  suites: Suite[];
  onClose: () => void;
}

interface GroqResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

interface AITestCase {
  id: number;
  description: string;
  preConditions: string;
  postConditions: string;
  action: string;
  data: string;
  expectedResult: string;
}

const CreateTestCaseAI: React.FC<CreateTestCaseAIProps> = ({ onSave, selectedSuiteName, suites, onClose }) => {
  const [aiFormData, setAIFormData] = useState({
    title: '',
    description: '',
    source: 'Copy & Paste',
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [generatedTestCases, setGeneratedTestCases] = useState<TestCase[]>([]);
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [selectedSuite, setSelectedSuite] = useState<string>(selectedSuiteName || '');

  const navigate = useNavigate();
  const GROQ_TOKEN = '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';
  const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

  const handleGenerateWithAI = async () => {
    if (!aiFormData.title.trim() || !aiFormData.description.trim()) {
      alert('Title và Description là bắt buộc. Vui lòng nhập đầy đủ.');
      return;
    }

    if (!GROQ_TOKEN) {
      alert('API key cho Groq không được tìm thấy. Vui lòng kiểm tra biến môi trường REACT_APP_GROQ_API_KEY.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post<GroqResponse>(
        GROQ_API_URL,
        {
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content:
              'You are a QA expert. Based on the test scenario description below, please generate test cases in JSON format. Each test case should include the following fields: "id": the step number of the test case, starting from 1 "description": a brief description of the test case’s purpose "preConditions": the prerequisites required to execute the test case (leave empty if none) "postConditions": the system state after executing the test case (leave empty if none) "action": the specific action performed in the test step "data": the data used in the test step, as a string (leave empty if none) "expectedResult": the expected outcome after performing the action. The test cases generate by English',
            },
            {
              role: 'user',
              content: aiFormData.description,
            },
          ],
          temperature: 0.3,
        },
        {
          headers: {
            Authorization: `Bearer ${GROQ_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      let result = response.data.choices[0].message.content;
      console.log('AI raw response:', result);

      const jsonStartIndex = result.indexOf('[');
      const jsonEndIndex = result.lastIndexOf(']') + 1;
      if (jsonStartIndex === -1 || jsonEndIndex === -1) {
        throw new Error('Không tìm thấy JSON hợp lệ trong phản hồi từ AI.');
      }
      result = result.substring(jsonStartIndex, jsonEndIndex);
      console.log('Cleaned JSON response:', result);

      let aiTestCases: AITestCase[] = [];

      try {
        aiTestCases = JSON.parse(result);
        if (!Array.isArray(aiTestCases) || !aiTestCases.every(testCase => 
          typeof testCase === 'object' && 
          'id' in testCase && 
          typeof testCase.id === 'number' && 
          'description' in testCase && 
          typeof testCase.description === 'string' && 
          'preConditions' in testCase && 
          typeof testCase.preConditions === 'string' && 
          'postConditions' in testCase && 
          typeof testCase.postConditions === 'string' && 
          'action' in testCase && 
          typeof testCase.action === 'string' && 
          'data' in testCase && 
          typeof testCase.data === 'string' && 
          'expectedResult' in testCase && 
          typeof testCase.expectedResult === 'string'
        )) {
          throw new Error('Định dạng test cases không hợp lệ. Phản hồi từ AI không đúng định dạng JSON mong đợi.');
        }
      } catch (error) {
        console.error('Lỗi phân tích JSON:', error);
        console.error('Phản hồi từ AI:', result);
        alert(
          'Không thể phân tích kết quả từ AI. Phản hồi không đúng định dạng JSON mong đợi. Phản hồi nhận được:\n' +
          result +
          '\nVui lòng thử lại với mô tả chi tiết hơn, ví dụ:\n' +
          '"Người dùng đăng nhập vào hệ thống:\n1. Mở trình duyệt\n2. Nhập URL\n3. Nhập tên người dùng và mật khẩu\n4. Nhấn nút Đăng nhập\nKết quả mong đợi: Hệ thống hiển thị trang chính."'
        );
        setLoading(false);
        return;
      }

      const newTestCases: TestCase[] = aiTestCases.map((aiTestCase, index) => ({
        id: `OTH-${Math.floor(Math.random() * 1000) + index}`,
        title: aiTestCase.description,
        description: aiTestCase.description,
        suite: selectedSuite || 'Test cases without suite',
        severity: 'Normal',
        priority: 'Not set',
        type: 'Other',
        layer: 'Not set',
        isFlaky: 'No',
        milestone: 'Not set',
        automationStatus: 'Manual',
        behavior: 'Positive',
        preConditions: aiTestCase.preConditions || 'Not set',
        postConditions: aiTestCase.postConditions || 'Not set',
        steps: [
          {
            id: 1,
            action: aiTestCase.action,
            data: aiTestCase.data,
            expectedResult: aiTestCase.expectedResult,
          },
        ],
      }));

      setGeneratedTestCases([...generatedTestCases, ...newTestCases]);
      setIsFormVisible(false);
    } catch (err) {
      console.error('Lỗi khi gọi Groq API:', err);
      alert('Đã xảy ra lỗi khi gọi Groq API. Vui lòng kiểm tra kết nối hoặc API key.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTestCase = (testCase: TestCase) => {
    setSelectedTestCase(testCase === selectedTestCase ? null : testCase);
  };

  const handleRemoveTestCase = (testCaseId: string) => {
    setGeneratedTestCases(generatedTestCases.filter(testCase => testCase.id !== testCaseId));
  };

  const handleSaveAll = async () => {
    if (generatedTestCases.length === 0) {
      alert('Không có test case nào để lưu.');
      return;
    }

    setSaving(true);

    try {
      const updatedTestCases = generatedTestCases.map(testCase => ({
        ...testCase,
        suite: selectedSuite || testCase.suite,
      }));

      updatedTestCases.forEach(testCase => onSave(testCase));
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/'); // Chuyển hướng về màn hình chính
    } catch (err) {
      console.error('Lỗi khi lưu test case:', err);
      alert('Đã xảy ra lỗi khi lưu test case. Vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setGeneratedTestCases([]);
    setSelectedTestCase(null);
    onClose();
  };

  const handleGenerateMore = () => {
    setIsFormVisible(true);
    setAIFormData({ title: '', description: '', source: 'Copy & Paste' });
  };

  return (
    <div className="ai-create-form">
      <div className="ai-form-header">
        <h2>AI test case generation</h2>
      </div>

      {isFormVisible ? (
        <div className="ai-form-content">
          <div className="ai-form-right">
            <div className="form-group">
              <label>
                Feature<span className="required-asterisk">*</span>
              </label>
              <input
                type="text"
                value={aiFormData.title}
                onChange={(e) => setAIFormData({ ...aiFormData, title: e.target.value })}
                placeholder="Please enter the feature name"
              />
            </div>
            <div className="form-group">
              <label>
              Requirement <span className="required-asterisk">*</span>
              </label>
              <textarea
                value={aiFormData.description}
                onChange={(e) => setAIFormData({ ...aiFormData, description: e.target.value })}
                placeholder="Enter the feature requirements to generate test cases"
              ></textarea>
            </div>
            <div className="ai-form-actions">
              <button className="generate-btn" onClick={handleGenerateWithAI} disabled={loading}>
                {loading ? 'Đang tạo...' : 'Generate'}
              </button>
              <button className="cancel-btn" onClick={handleCancel} disabled={loading}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="test-case-list">
          {generatedTestCases.length === 0 ? (
            <p>Chưa có test case nào được tạo.</p>
          ) : (
            <>
              <div className="ai-form-content">
                <div className="ai-form-left">
                  <label className="lable-ai">  You can choose a suite where all<br />
                  the generated tests will be created</label>
                  <FormControl sx={{ minWidth: 200 }}>
  <InputLabel id="suite-select-label">Suite name</InputLabel>
  <Select
    labelId="suite-select-label"
    value={selectedSuite}
    label="Suite name"
    onChange={(e) => setSelectedSuite(e.target.value)}
  >
    <MenuItem value="">
      <em>Suite name</em>
    </MenuItem>
    {suites.map(suite => (
      <MenuItem key={suite.name} value={suite.name}>
        {suite.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>
                </div>
                <div className="ai-form-right">
                  <ul className="ul-ai-form-right">
                    {generatedTestCases.map(testCase => (
                      <li key={testCase.id} className="test-case-item">
                        <div className="test-case-title-container">
                          <div
                            className="test-case-title"
                            onClick={() => handleSelectTestCase(testCase)}
                          >
                            <span className="toggle-icon">
                              {selectedTestCase === testCase ? '▼' : '▶'}
                            </span>
                            <span className="test-case-icon">✔</span>
                            {testCase.title}
                          </div>
                          <button
                            className="remove-test-case-btn"
                            onClick={() => handleRemoveTestCase(testCase.id)}
                          >
                            ✕
                          </button>
                        </div>
                        {selectedTestCase === testCase && (
                          <div className="test-case-details">
                            <div className="detail-section">
                              <strong>Description</strong>
                              <p>{testCase.description}</p>
                            </div>
                            <div className="detail-section">
                              <strong>Precondition</strong>
                              <p>{testCase.preConditions}</p>
                            </div>
                            <div className="detail-section">
                              <strong>Postcondition</strong>
                              <p>{testCase.postConditions}</p>
                            </div>
                            <div className="detail-section">
                              <strong>Steps</strong>
                              {testCase.steps.map((step: TestStep) => (
                                <div key={step.id} className="step-item">
                                  <div className="step-header">
                                    <span className="toggle-icon">▼</span>
                                    <span className="step-number">{step.id}</span>
                                    {step.action}
                                  </div>
                                  <div className="step-details">
                                    {step.data && (
                                      <div className="step-data">
                                        <strong>Input data</strong>
                                        <p>{step.data}</p>
                                      </div>
                                    )}
                                    <div className="step-expected">
                                      <strong>Expected result</strong>
                                      <p>{step.expectedResult}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="list-actions">
                <button className="save-btn" onClick={handleSaveAll} disabled={saving}>
                  {saving ? (
                    <span className="loading-spinner">Đang lưu...</span>
                  ) : (
                    'Save'
                  )}
                </button>
                <button className="generate-btn" onClick={handleGenerateMore} disabled={saving}>
                  Create more test case
                </button>
                <button className="cancel-btn" onClick={handleCancel} disabled={saving}>
                  Cancel
                </button>
              </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateTestCaseAI;