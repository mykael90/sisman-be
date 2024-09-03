import { isValid } from 'date-fns';
import { formatWithOptions, parseISO } from 'date-fns/fp';
import { ptBR } from 'date-fns/locale';
export const formatDates = (input: any) => {
  const formatWithLocale = formatWithOptions({ locale: ptBR });

  if (typeof input === 'string' && isValid(parseISO(input))) {
    return formatWithLocale('dd/MM/yyyy HH:mm:ss', parseISO(input));
  }

  if (input instanceof Date) {
    return formatWithLocale('dd/MM/yyyy HH:mm:ss', input);
  }

  if (Array.isArray(input)) {
    return input.map(formatDates);
  }

  if (typeof input === 'object' && input !== null) {
    for (const key in input) {
      if (input[key] instanceof Date) {
        input[key] = formatWithLocale('dd/MM/yyyy HH:mm:ss', input[key]);
      } else if (
        typeof input[key] === 'string' &&
        isValid(parseISO(input[key]))
      ) {
        input[key] = formatWithLocale(
          'dd/MM/yyyy HH:mm:ss',
          parseISO(input[key]),
        );
      } else if (typeof input[key] === 'object' && input[key] !== null) {
        formatDates(input[key]);
      }
    }
  }

  return input;
};
