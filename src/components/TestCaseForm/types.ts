export interface TestStep {
  id: number;
  action: string;
  data: string;
  expectedResult: string;
}

export interface TestCase {
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

export interface Suite {
  name: string;
  testCases: TestCase[];
}

export interface TestCaseFormProps {
  onSave: (testCase: TestCase) => void;
  suites: Suite[];
  onClose: () => void;
}