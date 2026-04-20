import { useState, useEffect, CSSProperties } from 'react'

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  value: string
  css?: Record<string, CSSProperties | string>
}

export default function CustomInput({
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  onFocus,
  className,
  style,
  css: cssProp,
  ...rest
}: CustomInputProps) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(!!value)

  useEffect(() => {
    setHasValue(!!value && value.length > 0)
  }, [value])

  const isFloating = focused || hasValue

  return (
    <div className="relative w-full">
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={(e) => {
          setFocused(true)
          onFocus?.(e)
        }}
        onBlur={(e) => {
          setFocused(false)
          onBlur?.(e)
        }}
        className={`w-full border border-gray-300 rounded px-4 pt-5 pb-2 text-sm outline-none focus:border-blue-500 transition-colors bg-transparent ${className ?? ''}`}
        style={style}
        {...rest}
      />
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
    </div>
  )
}
