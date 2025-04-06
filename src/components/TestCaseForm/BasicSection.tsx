// frontend/src/components/TestCaseForm/BasicSection.tsx
import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {
  severityOptions,
  priorityOptions,
  typeOptions,
  layerOptions,
  isFlakyOptions,
  milestoneOptions,
  behaviorOptions,
  automationStatusOptions,
} from './options'
import './BasicSection.css';

interface BasicSectionProps {
  formData: {
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
  };
  suites: { name: string }[];
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    newValue?: string,
    name?: string
  ) => void;
}

const BasicSection: React.FC<BasicSectionProps> = ({ formData, suites, handleChange }) => {
  const suiteOptions = suites.map((suite) => ({
    label: suite.name,
    value: suite.name,
  }));

  return (
    <div className="form-section">
      <h3>Basic</h3>
      <div className="form-group">
        <label>
          Title <span className="required-asterisk">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) => handleChange(e)}
          placeholder="Authorization"
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={(e) => handleChange(e)}
          placeholder="For example: We can authorize on the page http://example.com/login"
        ></textarea>
      </div>
      <div className="form-row three-columns">
        <div className="form-group">
          <label>Suite</label>
          <Autocomplete
            size="small"
            options={suiteOptions}
            getOptionLabel={(option) => option.label}
            value={suiteOptions.find((option) => option.value === formData.suite) || null}
            onChange={(event, newValue) => {
              if (newValue) {
                handleChange(event as any, newValue.value, 'suite');
              }
            }}
            renderInput={(params) => <TextField {...params} label="Type to search" />}
            renderOption={(props, option) => (
              <li {...props}>
                <span style={{ marginLeft: 8 }}>{option.label}</span>
              </li>
            )}
            sx={{
              '& .MuiAutocomplete-option': {
                '&[aria-selected="true"]': {
                  backgroundColor: '#e9ecef',
                },
              },
            }}
          />
        </div>
        <div className="form-group">
          <label>
            Severity <span className="required-asterisk">*</span>
          </label>
          <Autocomplete
            size="small"
            options={severityOptions}
            getOptionLabel={(option) => option.label}
            value={severityOptions.find((option) => option.value === formData.severity) || null}
            onChange={(event, newValue) => {
              if (newValue) {
                handleChange(event as any, newValue.value, 'severity');
              }
            }}
            renderInput={(params) => <TextField {...params} label="Type to search" />}
            renderOption={(props, option) => (
              <li {...props}>
                {option.icon}
                <span style={{ marginLeft: 8 }}>{option.label}</span>
              </li>
            )}
            sx={{
              '& .MuiAutocomplete-option': {
                '&[aria-selected="true"]': {
                  backgroundColor: '#e9ecef',
                },
              },
            }}
          />
        </div>
        <div className="form-group">
          <label>
            Priority <span className="required-asterisk">*</span>
          </label>
          <Autocomplete
            size="small"
            options={priorityOptions}
            getOptionLabel={(option) => option.label}
            value={priorityOptions.find((option) => option.value === formData.priority) || null}
            onChange={(event, newValue) => {
              if (newValue) {
                handleChange(event as any, newValue.value, 'priority');
              }
            }}
            renderInput={(params) => <TextField {...params} label="Type to search" />}
            renderOption={(props, option) => (
              <li {...props}>
                {option.icon}
                <span style={{ marginLeft: 8 }}>{option.label}</span>
              </li>
            )}
            sx={{
              '& .MuiAutocomplete-option': {
                '&[aria-selected="true"]': {
                  backgroundColor: '#e9ecef',
                },
              },
            }}
          />
        </div>
      </div>
      <div className="form-row three-columns">
        <div className="form-group">
          <label>
            Type <span className="required-asterisk">*</span>
          </label>
          <Autocomplete
            size="small"
            options={typeOptions}
            getOptionLabel={(option) => option.label}
            value={typeOptions.find((option) => option.value === formData.type) || null}
            onChange={(event, newValue) => {
              if (newValue) {
                handleChange(event as any, newValue.value, 'type');
              }
            }}
            renderInput={(params) => <TextField {...params} label="Type to search" />}
            renderOption={(props, option) => (
              <li {...props}>
                <span style={{ marginLeft: 8 }}>{option.label}</span>
              </li>
            )}
            sx={{
              '& .MuiAutocomplete-option': {
                '&[aria-selected="true"]': {
                  backgroundColor: '#e9ecef',
                },
              },
            }}
          />
        </div>
        <div className="form-group">
          <label>
            Layer <span className="required-asterisk">*</span>
          </label>
          <Autocomplete
            size="small"
            options={layerOptions}
            getOptionLabel={(option) => option.label}
            value={layerOptions.find((option) => option.value === formData.layer) || null}
            onChange={(event, newValue) => {
              if (newValue) {
                handleChange(event as any, newValue.value, 'layer');
              }
            }}
            renderInput={(params) => <TextField {...params} label="Type to search" />}
            renderOption={(props, option) => (
              <li {...props}>
                {option.icon}
                <span style={{ marginLeft: 8 }}>{option.label}</span>
              </li>
            )}
            sx={{
              '& .MuiAutocomplete-option': {
                '&[aria-selected="true"]': {
                  backgroundColor: '#e9ecef',
                },
              },
            }}
          />
        </div>
        <div className="form-group">
          <label>
            Automation status <span className="required-asterisk">*</span>
          </label>
          <Autocomplete
            size="small"
            options={automationStatusOptions}
            getOptionLabel={(option) => option.label}
            value={automationStatusOptions.find((option) => option.value === formData.automationStatus) || null}
            onChange={(event, newValue) => {
              if (newValue) {
                handleChange(event as any, newValue.value, 'automationStatus');
              }
            }}
            renderInput={(params) => <TextField {...params} label="Type to search" />}
            renderOption={(props, option) => (
              <li {...props}>
                {option.icon}
                <span style={{ marginLeft: 8 }}>{option.label}</span>
              </li>
            )}
            sx={{
              '& .MuiAutocomplete-option': {
                '&[aria-selected="true"]': {
                  backgroundColor: '#e9ecef',
                },
              },
            }}
          />
        </div>
      </div>
      <div className="form-row three-columns">
        <div className="form-group">
          <label>
            Is flaky <span className="required-asterisk">*</span>
          </label>
          <Autocomplete
            size="small"
            options={isFlakyOptions}
            getOptionLabel={(option) => option.label}
            value={isFlakyOptions.find((option) => option.value === formData.isFlaky) || null}
            onChange={(event, newValue) => {
              if (newValue) {
                handleChange(event as any, newValue.value, 'isFlaky');
              }
            }}
            renderInput={(params) => <TextField {...params} label="Type to search" />}
            renderOption={(props, option) => (
              <li {...props}>
                <span style={{ marginLeft: 8 }}>{option.label}</span>
              </li>
            )}
            sx={{
              '& .MuiAutocomplete-option': {
                '&[aria-selected="true"]': {
                  backgroundColor: '#e9ecef',
                },
              },
            }}
          />
        </div>
        <div className="form-group">
          <label>Milestone</label>
          <Autocomplete
            size="small"
            options={milestoneOptions}
            getOptionLabel={(option) => option.label}
            value={milestoneOptions.find((option) => option.value === formData.milestone) || null}
            onChange={(event, newValue) => {
              if (newValue) {
                handleChange(event as any, newValue.value, 'milestone');
              }
            }}
            renderInput={(params) => <TextField {...params} label="Type to search" />}
            renderOption={(props, option) => (
              <li {...props}>
                <span style={{ marginLeft: 8 }}>{option.label}</span>
              </li>
            )}
            sx={{
              '& .MuiAutocomplete-option': {
                '&[aria-selected="true"]': {
                  backgroundColor: '#e9ecef',
                },
              },
            }}
          />
        </div>
        <div className="form-group">
          <label>
            Behavior <span className="required-asterisk">*</span>
          </label>
          <Autocomplete
            size="small"
            options={behaviorOptions}
            getOptionLabel={(option) => option.label}
            value={behaviorOptions.find((option) => option.value === formData.behavior) || null}
            onChange={(event, newValue) => {
              if (newValue) {
                handleChange(event as any, newValue.value, 'behavior');
              }
            }}
            renderInput={(params) => <TextField {...params} label="Type to search" />}
            renderOption={(props, option) => (
              <li {...props}>
                <span style={{ marginLeft: 8 }}>{option.label}</span>
              </li>
            )}
            sx={{
              '& .MuiAutocomplete-option': {
                '&[aria-selected="true"]': {
                  backgroundColor: '#e9ecef',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicSection;