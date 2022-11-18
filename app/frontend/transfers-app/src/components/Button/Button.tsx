import React from 'react';
import './index.css';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  text: string;
  testId: string;
  handleClick?(): void;
}

export default function Button({
  type, text, testId, handleClick,
}: ButtonProps) {
  return (
    <button type={type} data-testid={testId} onClick={handleClick}>
      { text }
    </button>
  );
}

Button.defaultProps = {
  handleClick: () => null,
};
