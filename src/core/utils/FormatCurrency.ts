/**
 * Función para formatear valores monetarios
 * 
 * Crea una representación formateada del valor monetario proporcionado según
 * la configuración regional y el tipo de moneda especificados. También puede 
 * añadir una máscara personalizada al final del valor.
 * 
 * @template T Tipo del valor de entrada (número)
 * @param value Valor numérico a formatear
 * @param options Opciones para formatear el valor
 * @param options.locale Configuración regional a utilizar (por defecto 'en-US')
 * @param options.currency Tipo de moneda a utilizar (ej. 'USD', 'COP', 'EUR')
 * @param options.addMask Si se debe añadir una máscara personalizada al final del valor (por defecto false)
 * @returns Una cadena que representa el valor monetario formateado
 * @example
 * // Ejemplo de uso:
 * const amount = 12345.67;
 * console.log(formatCurrency(amount, { currency: 'USD', addMask: true })); // $12,345.67.oo USD
 * console.log(formatCurrency(amount, { currency: 'COP', locale: 'es-CO', addMask: true })); // $12.345.678,00.oo COP
 */
export const formatCurrency = (value: number, options: { locale?: string; currency: string; addMask?: boolean }): string => {
  const { locale = 'en-US', currency, addMask = false } = options;
  let formattedValue = new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
  
  // Extraer el símbolo de la moneda
  let symbol = new Intl.NumberFormat(locale, { style: 'currency', currency }).formatToParts(value).find(part => part.type === 'currency')?.value || '';

  // Remover el símbolo de la moneda del valor formateado
  formattedValue = formattedValue.replace(symbol, '');

  // Añadir el símbolo de dólar manualmente para COP
  if (currency === 'COP') {
    symbol = '$';
  }

  if (addMask) {
    formattedValue += '.oo';
  }

  return `${symbol}${formattedValue} ${currency}`;
};


