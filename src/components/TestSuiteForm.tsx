import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Định nghĩa interface riêng cho TestSuiteForm
interface TestSuiteFormProps {
  onSubmit: (data: { name: string; description: string; preconditions: string }) => void;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff',
    },
  },
});

const TestSuiteForm: React.FC<TestSuiteFormProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    preconditions: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert('Suite name is required');
      return;
    }
    onSubmit(formData);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="test-suite-form">
        <h2>Create Test Suite</h2>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label>Preconditions</label>
          <textarea name="preconditions" value={formData.preconditions} onChange={handleChange} />
        </div>
        <div>
          <button onClick={handleSubmit}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default TestSuiteForm;