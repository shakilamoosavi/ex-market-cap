import React, { useEffect, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface DropdownProps {
  label?: string;
  dataList?: Array<{ label: string; value: string | number }>;
  apiUrl?: string;
  value?: string | number;
  onChange: (value: string | number, item?: any) => void;
  placeholder?: string;
  disabled?: boolean;
  tNamespace?: string;
}

const PAGE_SIZE = 30;

const Dropdown: React.FC<DropdownProps> = ({
  label,
  dataList,
  apiUrl,
  value,
  onChange,
  placeholder = '',
  disabled = false,
  tNamespace = 'dropdown',
}) => {
  const t = useTranslations(tNamespace);
  const [options, setOptions] = useState<Array<{ label: string; value: string | number }>>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // label باید بالا باشه فقط وقتی open هست یا value انتخاب شده
  const hasValue = value !== undefined && value !== null && value !== '';
  const isFloating = open || hasValue;

  const selectedLabel = options.find(o => o.value === value)?.label;

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  useEffect(() => {
    if (apiUrl) {
      fetchOptions('');
    } else if (dataList) {
      setOptions(dataList.slice(0, PAGE_SIZE));
    }
  }, [dataList, apiUrl]);

  const fetchOptions = async (searchTerm: string) => {
    setLoading(true);
    try {
      const url = new URL(apiUrl!);
      if (searchTerm) url.searchParams.append('search', searchTerm);
      url.searchParams.append('limit', PAGE_SIZE.toString());
      const res = await fetch(url.toString());
      const data = await res.json();
      setOptions(data);
    } catch {
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    if (apiUrl) {
      fetchOptions(val);
    } else if (dataList) {
      const filtered = dataList.filter(item =>
        item.label.toLowerCase().includes(val.toLowerCase())
      );
      setOptions(filtered.slice(0, PAGE_SIZE));
    }
  };

  const handleSelect = (item: { label: string; value: string | number }) => {
    onChange(item.value, item);
    setOpen(false);
    setSearch('');
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>

      {/* trigger */}
      <div
        onClick={() => !disabled && setOpen(!open)}
        className={`
          relative border rounded-lg bg-white flex items-center
          px-4 pt-5 pb-2 min-h-[48px] cursor-pointer
          transition-colors duration-200
          ${open ? 'border-blue-500' : 'border-gray-300'}
          ${disabled ? 'opacity-50 pointer-events-none' : ''}
        `}
      >
        {/* floating label — وسط وقتی خالیه، بالا وقتی open یا value داره */}
        {label && (
          <label
            className="absolute start-4 pointer-events-none font-medium transition-all duration-200 ease-out"
            style={{
              top: isFloating ? '6px' : '50%',
              fontSize: isFloating ? '11px' : '14px',
              color: isFloating ? '#3b82f6' : '#9ca3af',
              transform: isFloating ? 'translateY(0)' : 'translateY(-50%)',
            }}
          >
            {label}
          </label>
        )}

        {/* مقدار انتخاب شده — فقط وقتی واقعاً value هست نشون داده میشه */}
        <span className="flex-1 truncate text-sm text-gray-800">
          {selectedLabel ?? ''}
        </span>

        {/* chevron */}
        <span
          className={`
            ms-2 flex-shrink-0 text-gray-400 inline-block
            transition-transform duration-200
            ${open ? 'rotate-180' : ''}
          `}
        >
          <ChevronDownIcon className="h-5 w-5" />
        </span>
      </div>

      {/* dropdown list */}
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          <input
            className="w-full px-3 py-2 border-b border-gray-200 outline-none text-sm"
            placeholder={t('search', { defaultValue: 'Search...' })}
            value={search}
            onChange={handleSearch}
            autoFocus
          />
          {loading ? (
            <div className="p-2 text-center text-sm text-gray-500">
              {t('loading', { defaultValue: 'Loading...' })}
            </div>
          ) : options.length === 0 ? (
            <div className="p-2 text-center text-sm text-gray-500">
              {t('noResults', { defaultValue: 'No results' })}
            </div>
          ) : (
            options.map(item => (
              <div
                key={item.value}
                onClick={() => handleSelect(item)}
                className={`
                  px-3 py-2 text-sm cursor-pointer hover:bg-gray-100
                  ${item.value === value ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-800'}
                `}
              >
                {item.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
