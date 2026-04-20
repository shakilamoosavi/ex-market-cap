import React from "react";

interface CustomRadioButtonProps {
  label?: string;
  labelKey?: string;
  valueKey?: string;
  dataList: any[];
  value?: any;
  onChange?: (value: any) => void;
  className?: string;
}

export default function CustomRadioButton({
  label,
  labelKey = "text",
  valueKey = "key",
  dataList = [],
  value,
  onChange,
  className = ""
}: CustomRadioButtonProps) {
  
  const defaultClass =
    "flex flex-col gap-2 p-3 border border-gray-300 rounded-md bg-white";

  return (
    <div className={`${defaultClass} ${className}`}>
      
      {label && (
        <p className="text-sm font-medium text-gray-700 mb-1">
          {label}
        </p>
      )}

      <div className="flex flex-row gap-2 justify-between">
        {dataList.map((item, idx) => {
          const itemValue = item[valueKey];
          const itemLabel = item[labelKey];

          return (
            <label
              key={idx}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <input
                type="radio"
                name="custom-radio-group"
                checked={value === itemValue}
                onChange={() => onChange?.(itemValue)}
                className="w-4 h-4 text-blue-600 cursor-pointer"
              />
              <span className="text-sm text-gray-700">{itemLabel}</span>
            </label>
          );
        })}
      </div>

    </div>
  );
}
