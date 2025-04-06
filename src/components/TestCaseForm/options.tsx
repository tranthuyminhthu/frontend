import { red, green, blue } from '@mui/material/colors';

export const severityOptions = [
  { label: 'Not set', value: 'Not set', icon: null },
  { label: 'Blocker', value: 'Blocker', icon: <span style={{ color: red[500] }}>⛔</span> },
  { label: 'Critical', value: 'Critical', icon: <span style={{ color: red[500] }}>⚠️</span> },
  { label: 'Major', value: 'Major', icon: <span style={{ color: red[500] }}>▲</span> },
  { label: 'Normal', value: 'Normal', icon: <span style={{ color: 'inherit' }}>○</span> },
  { label: 'Minor', value: 'Minor', icon: <span style={{ color: green[500] }}>✔</span> },
  { label: 'Trivial', value: 'Trivial', icon: <span style={{ color: '#6c757d' }}>▼</span> },
];

export const priorityOptions = [
  { label: 'Not set', value: 'Not set', icon: null },
  { label: 'High', value: 'High', icon: <span style={{ color: red[500] }}>↑</span> },
  { label: 'Medium', value: 'Medium', icon: <span style={{ color: 'inherit' }}>○</span> },
  { label: 'Low', value: 'Low', icon: <span style={{ color: green[500] }}>↓</span> },
  { label: 'MANUAL', value: 'MANUAL', icon: <span style={{ color: blue[500] }}>✍️</span> },
];

export const typeOptions = [
  { label: 'Other', value: 'Other' },
  { label: 'Functional', value: 'Functional' },
  { label: 'Smoke', value: 'Smoke' },
  { label: 'Regression', value: 'Regression' },
  { label: 'Security', value: 'Security' },
  { label: 'Usability', value: 'Usability' },
  { label: 'Performance', value: 'Performance' },
  { label: 'Acceptance', value: 'Acceptance' },
  { label: 'Compatibility', value: 'Compatibility' },
  { label: 'Integration', value: 'Integration' },
];

export const layerOptions = [
  { label: 'Not set', value: 'Not set', icon: null },
  { label: 'E2E', value: 'E2E', icon: <span style={{ color: blue[500] }}>🖥️</span> },
  { label: 'API', value: 'API', icon: <span style={{ color: blue[500] }}>🌐</span> },
  { label: 'Unit', value: 'Unit', icon: <span style={{ color: blue[500] }}>🧩</span> },
];

export const isFlakyOptions = [
  { label: 'No', value: 'No' },
  { label: 'Yes', value: 'Yes' },
];

export const milestoneOptions = [
  { label: 'Not set', value: 'Not set' },
];

export const behaviorOptions = [
  { label: 'Not set', value: 'Not set' },
  { label: 'Positive', value: 'Positive' },
  { label: 'Negative', value: 'Negative' },
  { label: 'Destructive', value: 'Destructive' },
];

export const automationStatusOptions = [
  { label: 'Manual', value: 'Manual', icon: <span style={{ color: blue[500] }}>✍️</span> },
  { label: 'Automated', value: 'Automated', icon: <span style={{ color: blue[500] }}>⚙️</span> },
];