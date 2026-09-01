import React from 'react';

type Props = {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  maxLength?: number;
  name?: string;
  type?: string;
  isTextarea?: boolean;
  rows?: number;
  autoComplete?: string;
};

export const FloatingField: React.FC<Props> = ({
  label,
  id,
  value,
  onChange,
  required,
  maxLength,
  name,
  type = 'text',
  isTextarea = false,
  rows = 4,
  autoComplete,
}) => {
  const filled = Boolean(value && value.length > 0);

  const labelCls = [
    'pointer-events-none absolute left-0 transition-all duration-200 ease-out origin-left',
    'text-foreground/50',
    filled
      ? 'top-0 text-xs uppercase tracking-wider font-medium opacity-60'
      : 'top-5 text-base',
    'peer-focus:top-0 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-wider peer-focus:font-medium peer-focus:opacity-90',
  ].join(' ');

  const fieldCls =
    'peer w-full bg-transparent border-0 border-b border-foreground/20 px-0 pt-6 pb-2.5 ' +
    'text-base text-foreground focus:outline-none focus:border-foreground ' +
    'transition-colors duration-200 placeholder-transparent';

  return (
    <div className="relative">
      {isTextarea ? (
        <textarea
          id={id}
          name={name ?? id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          maxLength={maxLength}
          rows={rows}
          placeholder={label}
          className={`${fieldCls} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={name ?? id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          maxLength={maxLength}
          autoComplete={autoComplete}
          placeholder={label}
          className={fieldCls}
        />
      )}
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
    </div>
  );
};
