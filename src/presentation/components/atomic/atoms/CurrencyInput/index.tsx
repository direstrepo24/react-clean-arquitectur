import React, { useState } from 'react';
import './index.scss';
import { formatCurrencyDecimal } from '@core/utils/FormateCurrencyDecimal';
import { NumericFormat } from 'react-number-format';

type CurrencyInputProps = {
  value: number;
  onChange: (value: number) => void;
  currency: string;
  locale?: string;
  addMask?: boolean;
  maxDigits?: number;
  symbol: string;
};

const CurrencyInput: React.FC<CurrencyInputProps> = ({ value, onChange, currency, locale = 'en-US', addMask = false, maxDigits, symbol }) => {
  const [inputValue, setInputValue] = useState('');

  const handleBlur = () => {
    const formattedValue = formatCurrencyDecimal(parseFloat(inputValue), { currency, locale, symbol, addMask });
    setInputValue(formattedValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const splitValue = inputValue.split(/(\.\d+)/);
  const integerPart = splitValue[0];
  const decimalPart = splitValue[1];

  return (
    <div className="input-container">
      <div className="formatted-value">
        {integerPart}
        {decimalPart && <small>{decimalPart}</small>}
        {` ${currency}`}
      </div>
      <input
        type="text"
        value={focused ? value.toString() : formattedValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        className="currency-input"
      />
      <NumericFormat
        value={value}
        allowNegative={false}
        decimalScale={2}
        fixedDecimalScale
        thousandSeparator
        prefix={symbol}
        suffix={` ${currency}`}
        onValueChange={(values) => onChange(values.floatValue ?? 0)}
        className="currency-input"
      />
    </div>
  );
};

export default CurrencyInput;





