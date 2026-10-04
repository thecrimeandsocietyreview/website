import React from 'react';
import styled from 'styled-components';

interface SubmitAnimatedButtonProps {
  initialText?: string;
  completedText?: string;
  isSubmitting?: boolean;
  isSubmitted?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export const SubmitAnimatedButton: React.FC<SubmitAnimatedButtonProps> = ({
  initialText = 'Submit Manuscript',
  completedText = 'Submitted ✓',
  isSubmitting = false,
  isSubmitted = false,
  disabled = false,
  onClick,
  className = '',
}) => {
  const isChecked = isSubmitting || isSubmitted;

  const handleClick = (e: React.MouseEvent) => {
    if (disabled || isSubmitting || isSubmitted) {
      e.preventDefault();
      return;
    }

    if (onClick) {
      onClick(e);
    }

    // Trigger enclosing form submit
    const form = (e.currentTarget as HTMLElement).closest('form');
    if (form) {
      if (typeof form.requestSubmit === 'function') {
        form.requestSubmit();
      } else {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    }
  };

  return (
    <StyledWrapper className={className}>
      <div className="container">
        <label className="label" onClick={handleClick} title={isChecked ? 'Processing submission...' : 'Click to submit manuscript'}>
          <input
            type="checkbox"
            className="input"
            checked={isChecked}
            readOnly
            disabled={disabled}
            aria-label="Submit Manuscript"
          />
          <span className="circle">
            <svg
              className="icon"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M12 19V5m0 14-4-4m4 4 4-4"
              />
            </svg>
            <div className="square" />
          </span>
          <p className="title">{initialText}</p>
          <p className="title">{completedText}</p>
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .label {
    background-color: var(--accent-navy, #1E40AF);
    border: 2px solid rgb(91, 91, 240);
    display: flex;
    align-items: center;
    border-radius: 50px;
    width: 210px;
    cursor: pointer;
    transition: all 0.4s ease;
    padding: 5px;
    position: relative;
    box-shadow: 0 4px 14px rgba(30, 64, 175, 0.25);
    user-select: none;
  }

  .label:hover {
    box-shadow: 0 6px 20px rgba(91, 91, 240, 0.4);
    transform: translateY(-1px);
  }

  .label::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    width: 8px;
    height: 8px;
    transition: all 0.4s ease;
    border-radius: 100%;
    margin: auto;
    opacity: 0;
    visibility: hidden;
  }

  .label .input {
    display: none;
  }

  .label .title {
    font-size: 14px;
    font-weight: 700;
    font-family: inherit;
    letter-spacing: 0.02em;
    color: #fff;
    transition: all 0.4s ease;
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    margin: 0;
    line-height: 1;
  }

  .label .title:last-child {
    opacity: 0;
    visibility: hidden;
  }

  .label .circle {
    height: 45px;
    width: 45px;
    border-radius: 50%;
    background-color: rgb(91, 91, 240);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.4s ease;
    position: relative;
    box-shadow: 0 0 0 0 rgb(255, 255, 255);
    overflow: hidden;
    flex-shrink: 0;
  }

  .label .circle .icon {
    color: #fff;
    width: 26px;
    height: 26px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.4s ease;
  }

  .label .circle .square {
    aspect-ratio: 1;
    width: 14px;
    border-radius: 2px;
    background-color: #fff;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.4s ease;
  }

  .label .circle::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    background-color: #3333a8;
    width: 100%;
    height: 0;
    transition: all 0.4s ease;
  }

  .label:has(.input:checked) {
    width: 57px;
    animation: installed 0.35s ease 2.2s forwards;
  }

  .label:has(.input:checked)::before {
    animation: rotate 1.8s ease-in-out 0.3s forwards;
  }

  .label .input:checked + .circle {
    animation:
      pulse 0.9s forwards,
      circleDelete 0.2s ease 2.2s forwards;
    rotate: 180deg;
  }

  .label .input:checked + .circle::before {
    animation: installing 1.8s ease-in-out forwards;
  }

  .label .input:checked + .circle .icon {
    opacity: 0;
    visibility: hidden;
  }

  .label .input:checked ~ .circle .square {
    opacity: 1;
    visibility: visible;
  }

  .label .input:checked ~ .title {
    opacity: 0;
    visibility: hidden;
  }

  .label .input:checked ~ .title:last-child {
    animation: showInstalledMessage 0.35s ease 2.2s forwards;
  }

  @keyframes pulse {
    0% {
      scale: 0.95;
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
    }
    70% {
      scale: 1;
      box-shadow: 0 0 0 16px rgba(255, 255, 255, 0);
    }
    100% {
      scale: 0.95;
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }
  }

  @keyframes installing {
    from {
      height: 0;
    }
    to {
      height: 100%;
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(-90deg) translate(27px) rotate(0);
      opacity: 1;
      visibility: visible;
    }
    99% {
      transform: rotate(270deg) translate(27px) rotate(270deg);
      opacity: 1;
      visibility: visible;
    }
    100% {
      opacity: 0;
      visibility: hidden;
    }
  }

  @keyframes installed {
    100% {
      width: 170px;
      border-color: rgb(35, 174, 35);
      background-color: #14532d;
    }
  }

  @keyframes circleDelete {
    100% {
      opacity: 0;
      visibility: hidden;
    }
  }

  @keyframes showInstalledMessage {
    100% {
      opacity: 1;
      visibility: visible;
      right: 42px;
    }
  }
`;

export default SubmitAnimatedButton;
