import { ColumnDef } from './types';

function toJalali(date: Date): string {
  // تبدیل ساده گرگوری به جلالی
  const formatter = new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    calendar: 'persian',
  });
  const parts = formatter.formatToParts(date);
  const y = parts.find(p => p.type === 'year')?.value ?? '';
  const m = parts.find(p => p.type === 'month')?.value ?? '';
  const d = parts.find(p => p.type === 'day')?.value ?? '';
  return `${y}/${m}/${d}`;
}

function toGregorian(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}/${m}/${d}`;
}

export function formatValue(value: any, col: ColumnDef, isFa: boolean): string {
  if (value === null || value === undefined || value === '') return '—';

  switch (col.format) {
    case 'time': {
      // ورودی می‌تونه string مثل "14:30:00" یا Date باشه
      const str = String(value);
      const match = str.match(/(\d{2}):(\d{2})/);
      if (match) return `${match[1]}:${match[2]}`;
      return str;
    }

    case 'date': {
      const d = new Date(value);
      if (isNaN(d.getTime())) return String(value);
      return isFa ? toJalali(d) : toGregorian(d);
    }

    case 'dateTime': {
      const d = new Date(value);
      if (isNaN(d.getTime())) return String(value);
      const datePart = isFa ? toJalali(d) : toGregorian(d);
      const h = String(d.getHours()).padStart(2, '0');
      const min = String(d.getMinutes()).padStart(2, '0');
      return `${datePart} ${h}:${min}`;
    }

    case 'money': {
      const num = parseFloat(String(value));
      if (isNaN(num)) return String(value);
      const dp = col.decimalPlace ?? 0;
      return num.toLocaleString('en-US', {
        minimumFractionDigits: dp,
        maximumFractionDigits: dp,
      });
    }

    case 'number': {
      const num = parseFloat(String(value));
      if (isNaN(num)) return String(value);
      const dp = col.decimalPlace ?? 0;
      return num.toFixed(dp);
    }

    case 'boolean': {
      return value ? '✓' : '✗';
    }

    case 'percent': {
      const num = parseFloat(String(value));
      if (isNaN(num)) return String(value);
      const dp = col.decimalPlace ?? 2;
      return `${num.toFixed(dp)}%`;
    }

    default:
      return String(value);
  }
}
