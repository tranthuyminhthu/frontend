// frontend/src/components/TestCaseForm/useSteps.ts
import { useState } from 'react';
import { TestStep } from './types';

export const useSteps = (initialSteps: TestStep[] = []) => {
  const [steps, setSteps] = useState<TestStep[]>(initialSteps);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(null);

  const handleStepChange = (index: number, field: keyof TestStep, value: string) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = {
      ...updatedSteps[index],
      [field]: value,
    };
    setSteps(updatedSteps);
    return updatedSteps;
  };

  const handleAddStep = () => {
    const newStep: TestStep = {
      id: steps.length + 1,
      action: '',
      data: '',
      expectedResult: '',
    };
    setSteps([...steps, newStep]);
  };

  const handleDeleteStep = (index: number) => {
    const updatedSteps = steps.filter((_, i) => i !== index).map((step, i) => ({ ...step, id: i + 1 }));
    setSteps(updatedSteps);
    handleCloseMenu();
    return updatedSteps;
  };

  const handleDuplicateStep = (index: number) => {
    const stepToDuplicate = { ...steps[index], id: steps.length + 1 };
    const updatedSteps = [...steps, stepToDuplicate];
    setSteps(updatedSteps);
    handleCloseMenu();
    return updatedSteps;
  };

  const handleMoveToTop = (index: number) => {
    const updatedSteps = [...steps];
    const [step] = updatedSteps.splice(index, 1);
    updatedSteps.unshift(step);
    setSteps(updatedSteps.map((step, i) => ({ ...step, id: i + 1 })));
    handleCloseMenu();
    return updatedSteps;
  };

  const handleMoveToBottom = (index: number) => {
    const updatedSteps = [...steps];
    const [step] = updatedSteps.splice(index, 1);
    updatedSteps.push(step);
    setSteps(updatedSteps.map((step, i) => ({ ...step, id: i + 1 })));
    handleCloseMenu();
    return updatedSteps;
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return steps;
    const updatedSteps = [...steps];
    [updatedSteps[index - 1], updatedSteps[index]] = [updatedSteps[index], updatedSteps[index - 1]];
    setSteps(updatedSteps.map((step, i) => ({ ...step, id: i + 1 })));
    handleCloseMenu();
    return updatedSteps;
  };

  const handleMoveDown = (index: number) => {
    if (index === steps.length - 1) return steps;
    const updatedSteps = [...steps];
    [updatedSteps[index], updatedSteps[index + 1]] = [updatedSteps[index + 1], updatedSteps[index]];
    setSteps(updatedSteps.map((step, i) => ({ ...step, id: i + 1 })));
    handleCloseMenu();
    return updatedSteps;
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget);
    setCurrentStepIndex(index);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setCurrentStepIndex(null);
  };

  return {
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
  };
};