
import React from 'react';
import { LoanResults } from '../types';
import { formatCurrency } from '../utils/finance';

interface Props {
  results: LoanResults;
  currencyCode: string;
}

const SummaryCards: React.FC<Props> = ({ results, currencyCode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col justify-between group hover:border-indigo-200 transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Monthly Installment</p>
          <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">{formatCurrency(results.monthlyPayment, currencyCode)}</h2>
          <p className="text-slate-400 text-[11px] font-semibold mt-1.5">Fixed payment per month</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col justify-between group hover:border-amber-200 transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Borrowing Cost</p>
          <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-black text-amber-600 tracking-tighter">{formatCurrency(results.totalInterest, currencyCode)}</h2>
          <p className="text-slate-400 text-[11px] font-semibold mt-1.5">Total interest accumulation</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col justify-between group hover:border-violet-200 transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Total Commitment</p>
          <div className="p-2.5 bg-violet-50 rounded-xl text-violet-600 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-black text-violet-600 tracking-tighter">{formatCurrency(results.totalCost, currencyCode)}</h2>
          <p className="text-slate-400 text-[11px] font-semibold mt-1.5">Inclusive of all fees</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
