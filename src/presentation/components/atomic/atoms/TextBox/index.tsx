// Textbox.tsx
import { ReactNode, useEffect, useState } from 'react';
import './index.scss'
import classNames from 'classnames';

type TextboxColor = 'primary' | 'secondary' | 'third';

interface TextboxProps {
  label?: string;
  placeholder?: string;
  type?: string;
  color?: TextboxColor;
  value: string; // Nuevo prop para el valor del Textbox (para recibirlo desde otro componente)
  onSearch: (query: string) => void; // Función para simular la búsqueda
  
}

const Textbox: React.FC<TextboxProps> = ({
  label,
  placeholder,
  type = 'text',
  color = 'primary',
  value,
  onSearch,
  
}) => {

  const [textboxValue, setTextboxValue] = useState(value);


  useEffect(() => {
    // Actualizar el valor del TextBox cuando el valor prop cambie
    setTextboxValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextboxValue(e.target.value);
    const query = e.target.value;
    onSearch(query);
  };

  

  const textboxClass = classNames('textbox', {
    [`mak-textbox--${color}`]: color,
  });

  return (
    <div className="textbox-container">
      <div className="textbox-line" />
      <input
        type={type}
        className={textboxClass}
        placeholder={placeholder}
        value={textboxValue}
        onChange={handleChange}
      />
      {label && (
        <label className="textbox-label" htmlFor={label}>
          {label}
        </label>
      )}
    </div>
  );
};

export default Textbox;


