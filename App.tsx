
import React, { useState, useMemo } from 'react';
import { LoanInputs, LoanResults } from './types';
import { calculateLoan } from './utils/finance';
import InputSection from './components/InputSection';
import SummaryCards from './components/SummaryCards';
import AmortizationTable from './components/AmortizationTable';
import Visualizations from './components/Visualizations';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<LoanInputs>({
    carPrice: 150000,
    downPayment: 49525,
    downPaymentPercent: 33.01,
    downPaymentMode: 'amount',
    calculationMode: 'balloon',
    targetMonthlyPayment: 2113.10,
    apr: 11,
    termMonths: 60,
    balloonAmount: 92128.22,
    currencyCode: 'SAR'
  });

  const loanResults = useMemo(() => calculateLoan(inputs), [inputs]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Dynamic Modern Header */}
      <header className="relative bg-slate-950 text-white pt-12 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl shadow-2xl shadow-indigo-500/20 ring-1 ring-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m.599-1c.51-.513.844-1.258.844-2 0-.742-.334-1.487-.844-2M12 16h-1.11c-1.11 0-2.08-.402-2.599-1M12 16v1m0-8V7m0 1c-.51.513-.844 1.258-.844 2 0 .742.334 1.487.844 2" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                    FinCalc <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-violet-300">Pro</span>
                  </h1>
                  <p className="text-slate-500 text-[10px] font-black tracking-[0.2em] uppercase mt-0.5">365 Xperts Ltd</p>
                </div>
              </div>
              <p className="text-slate-400 max-w-xl font-medium text-base leading-relaxed">
                Precision car financing engine with real-time balloon residual analysis and intelligent amortization tracking.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="flex flex-col items-end opacity-40">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">System Status</span>
                <span className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  Operational Engine v2.4
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Experience Area */}
      <main className="max-w-7xl mx-auto w-full px-6 -mt-20 space-y-8 flex-grow pb-20 relative z-20">
        <SummaryCards results={loanResults} currencyCode={inputs.currencyCode} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-8">
            <InputSection 
              inputs={inputs} 
              setInputs={setInputs} 
              calculatedMonthlyPayment={loanResults.monthlyPayment} 
            />
          </div>

          <div className="lg:col-span-8 space-y-8">
            <Visualizations results={loanResults} currencyCode={inputs.currencyCode} />
            <AmortizationTable schedule={loanResults.schedule} currencyCode={inputs.currencyCode} />
          </div>
        </div>
      </main>

      {/* Modern Footer */}
      <footer className="bg-slate-950 text-white pt-16 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-sm">365</div>
                <h2 className="text-xl font-black uppercase tracking-tighter">365 Xperts <span className="text-indigo-500">Ltd</span></h2>
              </div>
              <p className="text-slate-500 text-sm font-medium max-w-sm">
                Next-generation financial tools designed for transparency and expert decision-making in the automotive industry.
              </p>
              <div className="pt-2 text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">
                &copy; {new Date().getFullYear()} FinCalc Pro Suite
              </div>
            </div>
            
            <div className="flex flex-col items-start md:items-end gap-6">
              <a 
                href="https://365-xperts.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl transition-all duration-300"
              >
                <span className="text-sm font-bold group-hover:text-indigo-400 transition-colors text-slate-200">Visit 365-xperts.com</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <div className="text-right">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mb-1">Lead Developer</p>
                <p className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-400">
                  Mahmoud Elgendi
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
