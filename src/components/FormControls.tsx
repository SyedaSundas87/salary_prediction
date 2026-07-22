import React from 'react';

export const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/5 border border-white/10 p-5 rounded-2xl ${className}`}>
    {children}
  </div>
);

export const Label = ({ children, tooltip }: { children: React.ReactNode, tooltip?: string }) => (
  <div className="flex items-center gap-2 mb-2">
    <label className="text-[10px] text-slate-400 uppercase">{children}</label>
    {tooltip && (
      <span className="text-[10px] text-slate-500 cursor-help" title={tooltip}>
        ⓘ
      </span>
    )}
  </div>
);

export const Slider = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
  valueSuffix = ''
}: {
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step?: number;
  label: string;
  valueSuffix?: string;
}) => (
  <div className="space-y-2 mb-4">
    <label className="text-[10px] text-slate-400 uppercase">{label}</label>
    <div className="flex items-center gap-3">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-[#3B82F6]"
      />
      <span className="text-sm font-mono w-10 text-right">{value}{valueSuffix}</span>
    </div>
  </div>
);

export const Toggle = ({
  checked,
  onChange,
  label
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  label: string;
}) => (
  <div 
    className={`flex justify-between items-center bg-[#1A1F2E] p-3 rounded-xl border border-white/5 cursor-pointer ${!checked ? 'opacity-70' : ''}`}
    onClick={() => onChange(!checked)}
  >
    <span className="text-xs font-medium text-slate-100">{label}</span>
    <div className={`w-10 h-5 rounded-full relative transition-colors ${checked ? 'bg-[#3B82F6] shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-slate-700'}`}>
      <div className={`w-3 h-3 rounded-full absolute top-1 transition-all ${checked ? 'bg-white right-1' : 'bg-slate-400 left-1'}`}></div>
    </div>
  </div>
);

export const Select = ({
  value,
  onChange,
  options,
  label
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  label: string;
}) => (
  <div className="space-y-2 mb-4">
    <label className="text-[10px] text-slate-400 uppercase">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#1A1F2E] border border-white/10 rounded-lg p-2 text-xs outline-none focus:border-[#3B82F6] text-slate-100"
    >
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-[#1A1F2E] text-slate-100">
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export const Stepper = ({
  value,
  onChange,
  min,
  max,
  label
}: {
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  label: string;
}) => (
  <div className="bg-[#1A1F2E] p-2 rounded-xl text-center border border-white/5 flex flex-col justify-center items-center h-full min-h-[70px]">
    <span className="text-[10px] text-slate-500 block uppercase mb-1">{label}</span>
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-slate-700 disabled:opacity-50 text-slate-400 hover:text-white"
      >
        -
      </button>
      <span className="text-lg font-bold text-slate-100 w-4 text-center">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.max(max, value + 1))}
        disabled={value >= max}
        className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-slate-700 disabled:opacity-50 text-slate-400 hover:text-white"
      >
        +
      </button>
    </div>
  </div>
);

export const SegmentedControl = ({
  value,
  onChange,
  options,
  label
}: {
  value: number;
  onChange: (val: number) => void;
  options: { label: string; value: number }[];
  label: string;
}) => (
  <div className="space-y-2 mb-4">
    <label className="text-[10px] text-slate-400 uppercase">{label}</label>
    <div className="flex bg-[#1A1F2E] rounded-lg p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 py-1.5 text-[10px] rounded-md transition-all ${
            value === opt.value
              ? 'bg-[#3B82F6] text-white font-medium'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);