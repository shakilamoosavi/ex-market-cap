import React, { useState, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import CustomInput from './CustomInput';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  onError?: (error: string | null) => void;
  showValidationConditions?: boolean;
  showValidationStatus?: boolean;
}

interface ValidationRule {
  key: string;
  label: string;
  test: (password: string) => boolean;
}

const validationRules: ValidationRule[] = [
  { key: 'length', label: 'charLengthLable', test: (p) => p.length >= 8 },
  { key: 'noSpace', label: 'noSpaceLable', test: (p) => !/\s/.test(p) },
  { key: 'letter', label: 'onlyEnglishCharLable', test: (p) => /[A-Za-z]/.test(p) },
  { key: 'number', label: 'enterNumberLable', test: (p) => /[0-9]/.test(p) },
  { key: 'special', label: 'specialCharLable', test: (p) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(p) },
  { key: 'validChars', label: 'validCharLabel', test: (p) => !/[^A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(p) },
];

function validatePassword(password: string): string | null {
  // if (passwسسسZa-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return 'Password must only contain English letters, numbers, and special characters.';
  return null;
}

function getPasswordStrength(password: string): { strength: 'weak' | 'medium' | 'strong'; percentage: number } {
  if (!password) return { strength: 'weak', percentage: 0 };
  
  const passedRules = validationRules.filter(rule => rule.test(password)).length;
  const percentage = (passedRules / validationRules.length) * 100;
  
  if (passedRules <= 2) return { strength: 'weak', percentage };
  if (passedRules <= 4) return { strength: 'medium', percentage };
  return { strength: 'strong', percentage };
}

const PasswordInput: React.FC<PasswordInputProps> = ({ 
  value, 
  onChange, 
  label, 
  onError,
  showValidationConditions = false,
  showValidationStatus = false
}) => {
  const t = useTranslations("components.passwordInput");
  const [touched, setTouched] = useState(false);
  const [show, setShow] = useState(false);
  const locale = useLocale();
  const isRtl = locale === 'fa' || locale === 'fa-IR' || locale === 'ar' || locale === 'ar-AE';
  const validationError = touched ? validatePassword(value) : null;

  const validationStates = useMemo(() => {
    return validationRules.map(rule => ({
      ...rule,
      passed: value.length > 0 && rule.test(value) 
    }));
  }, [value]);

  const { strength, percentage } = useMemo(() => getPasswordStrength(value), [value]);

  React.useEffect(() => {
    if (onError) onError(validationError);
  }, [validationError, onError]);

  const strengthColors = {
    weak: 'bg-red-500',
    medium: 'bg-yellow-500',
    strong: 'bg-green-500'
  };

 

  return (
    <div className="w-full">
      <div className="relative flex items-center">
        <CustomInput
          type={show ? "text" : "password"}
          value={value}
          label={label ?? ""}
          onChange={e => onChange(e.target.value)}
          onBlur={() => setTouched(true)}
          className="w-full rounded border px-3 py-2 focus:border-blue-500 focus:outline-none"
          autoComplete="new-password"
          inputMode="text"
          style={{ WebkitTextSecurity: show ? "none" : "disc" } as React.CSSProperties}
        />
        <button
          type="button"
          tabIndex={-1}
          className={`absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 ${isRtl ? 'left-3' : 'right-3'}`}
          onClick={() => setShow(s => !s)}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? (
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          ) : (
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>

      {showValidationStatus && value && (
        <div className="mt-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-600">{t("passwordStrength")}: {t(strength)}</span>
            <span className="text-xs text-gray-600">{Math.round(percentage)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${strengthColors[strength]}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}

      {showValidationConditions && (
        <div className="mt-3 space-y-1.5">
          {validationStates.map(rule => (
            <div key={rule.key} className="flex items-center gap-2 text-sm">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                rule.passed ? 'bg-green-500' : 'bg-gray-300'
              }`}>
                {rule.passed && (
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className={rule.passed ? 'text-green-600' : 'text-gray-600'}>
                {t(rule.label)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
