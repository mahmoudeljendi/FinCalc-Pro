
import React from 'react';
import { LoanInputs, DownPaymentMode, CalculationMode } from '../types';
import { formatCurrency } from '../utils/finance';

interface Props {
  inputs: LoanInputs;
  setInputs: React.Dispatch<React.SetStateAction<LoanInputs>>;
  calculatedMonthlyPayment: number;
}

const InputSection: React.FC<Props> = ({ inputs, setInputs, calculatedMonthlyPayment }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value) || 0;

    setInputs(prev => {
      let next = { ...prev, [name]: name === 'currencyCode' ? value : numericValue };

      if (name === 'carPrice') {
        if (prev.downPaymentMode === 'percentage') {
          next.downPayment = (numericValue * prev.downPaymentPercent) / 100;
        } else {
          next.downPaymentPercent = numericValue > 0 ? (prev.downPayment / numericValue) * 100 : 0;
        }
      } else if (name === 'downPayment') {
        next.downPaymentPercent = prev.carPrice > 0 ? (numericValue / prev.carPrice) * 100 : 0;
      } else if (name === 'downPaymentPercent') {
        next.downPayment = (prev.carPrice * numericValue) / 100;
      }

      return next;
    });
  };

  const setPresetApr = (rate: number) => {
    setInputs(prev => ({ ...prev, apr: rate }));
  };

  const toggleDownPaymentMode = (mode: DownPaymentMode) => {
    setInputs(prev => ({ ...prev, downPaymentMode: mode }));
  };

  const toggleCalculationMode = (mode: CalculationMode) => {
    setInputs(prev => ({ ...prev, calculationMode: mode }));
  };

  const inputClasses = "w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all text-slate-900 font-semibold outline-none shadow-sm placeholder:text-slate-300 text-sm";
  const labelClasses = "block mb-1.5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]";
  const toggleBtnBase = "px-3 py-1.5 text-[10px] font-black rounded-lg transition-all duration-300 flex-1 flex items-center justify-center gap-2 uppercase";

  const interestRatio = inputs.carPrice > inputs.downPayment 
    ? (calculatedMonthlyPayment * inputs.termMonths + (inputs.calculationMode === 'balloon' ? inputs.balloonAmount : 0) - (inputs.carPrice - inputs.downPayment)) / (inputs.carPrice - inputs.downPayment)
    : 0;

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-slate-50">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Parameters</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Control Panel</p>
        </div>
        <div className="relative group">
          <select 
            name="currencyCode" 
            value={inputs.currencyCode} 
            onChange={handleInputChange}
            className="appearance-none bg-indigo-50 text-indigo-700 text-[9px] font-black py-1.5 px-3 pr-8 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer border-none uppercase shadow-sm"
          >
            <option value="SAR">SAR ﷼</option>
            <option value="EGP">EGP</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="space-y-5">
        <div className="group">
          <label className={labelClasses}>Vehicle Valuation</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
              {inputs.currencyCode === 'SAR' ? '﷼' : inputs.currencyCode === 'EGP' ? 'E£' : '$'}
            </span>
            <input 
              type="number" 
              name="carPrice" 
              value={inputs.carPrice} 
              onChange={handleInputChange} 
              className={`${inputClasses} pl-10`} 
              placeholder="0.00" 
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className={labelClasses}>Down Payment</label>
            <div className="flex bg-slate-100 p-1 rounded-lg w-28 border border-slate-200/50">
              <button 
                type="button" 
                onClick={() => toggleDownPaymentMode('amount')} 
                className={`${toggleBtnBase} ${inputs.downPaymentMode === 'amount' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >Val</button>
              <button 
                type="button" 
                onClick={() => toggleDownPaymentMode('percentage')} 
                className={`${toggleBtnBase} ${inputs.downPaymentMode === 'percentage' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >%</button>
            </div>
          </div>
          {inputs.downPaymentMode === 'amount' ? (
            <input type="number" name="downPayment" value={inputs.downPayment} onChange={handleInputChange} className={inputClasses} />
          ) : (
            <input type="number" name="downPaymentPercent" value={inputs.downPaymentPercent} onChange={handleInputChange} className={inputClasses} />
          )}
        </div>

        <div className="space-y-3 pt-1">
          <div className="flex justify-between items-center">
            <label className={labelClasses}>Interest Rate (APR %)</label>
            <div className="relative w-24">
              <input 
                type="number"
                name="apr"
                value={inputs.apr}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                max="100"
                className="w-full bg-indigo-50 text-indigo-700 text-[11px] font-black py-1.5 px-3 rounded-lg border-none focus:ring-2 focus:ring-indigo-500 text-right pr-6 shadow-sm outline-none transition-all"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-black text-indigo-400 pointer-events-none">%</span>
            </div>
          </div>
          <div className="relative pt-1">
            <input 
              type="range" 
              name="apr" 
              min="0" 
              max="25" 
              step="0.1" 
              value={inputs.apr} 
              onChange={handleInputChange} 
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
          <div className="flex gap-1.5">
            {[5, 11, 15, 20].map(rate => (
              <button 
                key={rate} 
                onClick={() => setPresetApr(rate)}
                className={`flex-1 py-1.5 rounded-lg text-[9px] font-black border transition-all ${inputs.apr === rate ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300'}`}
              >
                {rate}%
              </button>
            ))}
          </div>
          <div className="bg-slate-50 rounded-lg p-2.5 flex items-center justify-between border border-slate-100">
             <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Interest Impact</span>
             <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${interestRatio > 0.5 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
               +{ (interestRatio * 100).toFixed(1) }% Markup
             </span>
          </div>
        </div>

        <div>
          <label className={labelClasses}>Term (mo)</label>
          <input type="number" name="termMonths" value={inputs.termMonths} onChange={handleInputChange} className={inputClasses} />
        </div>

        <div className="pt-5 border-t border-slate-50">
          <label className="block mb-3 text-[9px] font-black text-slate-500 uppercase tracking-[0.25em] text-center">Engine Logic</label>
          <div className="flex bg-slate-100 p-1 rounded-xl mb-5 border border-slate-200/50">
            <button 
              type="button" 
              onClick={() => toggleCalculationMode('balloon')} 
              className={`${toggleBtnBase} py-2 px-1 ${inputs.calculationMode === 'balloon' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-indigo-600'}`}
            >
              Fixed Balloon
            </button>
            <button 
              type="button" 
              onClick={() => toggleCalculationMode('installment')} 
              className={`${toggleBtnBase} py-2 px-1 ${inputs.calculationMode === 'installment' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-indigo-600'}`}
            >
              Fixed Budget
            </button>
          </div>

          <div className="transition-all duration-500">
            {inputs.calculationMode === 'balloon' ? (
              <div className="animate-in fade-in slide-in-from-top-1 duration-300">
                <label className={labelClasses}>Balloon Residual Goal</label>
                <input type="number" name="balloonAmount" value={inputs.balloonAmount} onChange={handleInputChange} className={`${inputClasses} bg-indigo-50/50 border-indigo-100`} />
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-top-1 duration-300">
                <label className={labelClasses}>Fixed Monthly Payment</label>
                <input type="number" name="targetMonthlyPayment" value={inputs.targetMonthlyPayment} onChange={handleInputChange} className={`${inputClasses} bg-indigo-50/50 border-indigo-100`} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-2">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-6 rounded-2xl space-y-4 shadow-xl shadow-indigo-200/50 ring-1 ring-white/20">
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-indigo-100 uppercase tracking-[0.3em] mb-1.5 opacity-80">Net Principal</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[10px] font-bold text-white/60">{inputs.currencyCode}</span>
              <span className="text-xl font-extrabold text-white tracking-tight">
                {new Intl.NumberFormat('en-US').format(inputs.carPrice - inputs.downPayment)}
              </span>
            </div>
          </div>
          
          <div className="h-px bg-white/10 w-full"></div>

          <div className="flex flex-col">
            <span className="text-[8px] font-black text-emerald-300 uppercase tracking-[0.3em] mb-1.5">Monthly Repayment</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[10px] font-bold text-white/40">{inputs.currencyCode}</span>
              <span className="text-3xl font-black text-white tracking-tighter">
                {new Intl.NumberFormat('en-US').format(calculatedMonthlyPayment)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputSection;
