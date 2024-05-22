import React, { useState } from 'react';
import './index.scss';
import { formatCurrency } from '@core/utils/FormatCurrency';

type CurrencyInputProps = {
  value: number;
  onChange: (value: number) => void;
  currency: string;
  locale?: string;
  addMask?: boolean;
  maxDigits?: number;
};

const CurrencyInput: React.FC<CurrencyInputProps> = ({ value, onChange, currency, locale = 'en-US', addMask = false, maxDigits }) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const formatInputValue = (rawValue: string): string => {
    const numberValue = parseFloat(rawValue.replace(/[^0-9.-]+/g, ''));
    if (isNaN(numberValue)) {
      return '';
    }
    return formatCurrency(numberValue, { currency, locale, addMask });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.-]+/g, '');
    if (maxDigits && rawValue.length > maxDigits) {
      return;
    }
    onChange(parseFloat(rawValue));
  };

  const handleClear = () => {
    onChange(0);
  };

  const formattedValue = focused ? value.toString() : formatInputValue(value.toString());

  return (
    <div className="input-container">
      <input
        type="text"
        value={formattedValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        className="currency-input"
      />
      <button onClick={handleClear} className="clear-button">Clear</button>
    </div>
  );
};

export default CurrencyInput;






  







