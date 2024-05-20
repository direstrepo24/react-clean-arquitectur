

import React from 'react';
import './index.scss';
import { formatCurrency } from '@core/utils/FormatCurrency';


type CurrencyDisplayProps = {
  value: number;
  currency: string;
  locale?: string;
  addMask?: boolean;
};
/**
 * Componente para mostrar valores monetarios formateados
 * 
 * Recibe un valor numérico y opciones para formatear el valor según la configuración
 * regional y el tipo de moneda especificados. También puede añadir una máscara personalizada.
 * 
 * @param props Propiedades del componente
 * @param props.value Valor numérico a formatear y mostrar
 * @param props.currency Tipo de moneda a utilizar (ej. 'USD', 'COP')
 * @param props.locale Configuración regional a utilizar (opcional, por defecto 'en-US')
 * @param props.addMask Si se debe añadir una máscara personalizada al final del valor (opcional, por defecto false)
 * @returns Un elemento JSX que muestra el valor monetario formateado
 */



const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({ value, currency, locale, addMask }) => {
  const formattedValue = formatCurrency(value, { currency, locale, addMask });

  return <span className="currency-value">{formattedValue}</span>;
};

export default CurrencyDisplay;
