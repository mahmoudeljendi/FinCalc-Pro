
import React from 'react';
import { AmortizationRow } from '../types';
import { formatCurrency, downloadCSV } from '../utils/finance';

interface Props {
  schedule: AmortizationRow[];
  currencyCode: string;
}

const AmortizationTable: React.FC<Props> = ({ schedule, currencyCode }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col h-[600px]">
      <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white sticky top-0 z-20">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <div className="p-1.5 bg-slate-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            Payment Registry
          </h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Amortization Ledger</p>
        </div>
        <button 
          onClick={() => downloadCSV(schedule)}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-950 hover:bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-xl shadow-slate-200 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </button>
      </div>
      
      <div className="overflow-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/50 backdrop-blur-md sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Mo.</th>
              <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Payment</th>
              <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Interest</th>
              <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Principal</th>
              <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {schedule.map((row) => (
              <tr key={row.month} className="hover:bg-indigo-50/20 transition-all duration-150">
                <td className="px-6 py-4">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 text-[10px] font-black text-slate-600 tracking-tight border border-slate-200">
                    {row.month}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs font-bold text-slate-900 text-right">
                  {new Intl.NumberFormat('en-US').format(row.payment)}
                </td>
                <td className="px-6 py-4 text-xs text-amber-600 text-right font-semibold">
                  {new Intl.NumberFormat('en-US').format(row.interest)}
                </td>
                <td className="px-6 py-4 text-xs text-emerald-600 text-right font-semibold">
                  {new Intl.NumberFormat('en-US').format(row.principal)}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-xs font-black text-slate-900 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                    {new Intl.NumberFormat('en-US').format(row.balance)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AmortizationTable;
