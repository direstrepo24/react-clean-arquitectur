// Radio.tsx
import { useState } from 'react';
import './index.scss';
import classNames from 'classnames';

interface RadioProps {
  label: string;
  value: string;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  color: string;
  
}

const Radio: React.FC<RadioProps> = ({ label, value, selectedValue, setSelectedValue, color }) => {
  const handleRadioChange = () => {
    setSelectedValue(value);
  };

  const radioClass = classNames('radio-label', {
    [`mak-radio--${color}`]: color,
  });

  return (
    <div className="radio-container">
      <label className={radioClass}>
        <input
          type="radio"
          className="radio"
          value={value}
          checked={selectedValue === value}
          onChange={handleRadioChange}
        />
        <span className="radio-custom" />
        {label}
      </label>
    </div>
  );
};

export default Radio;

