
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { LoanResults } from '../types';
import { formatCurrency } from '../utils/finance';

interface Props {
  results: LoanResults;
  currencyCode: string;
}

const Visualizations: React.FC<Props> = ({ results, currencyCode }) => {
  const pieData = [
    { name: 'Principal', value: results.principalAmount, color: '#6366f1' },
    { name: 'Total Interest', value: results.totalInterest, color: '#f59e0b' },
  ];

  const areaData = results.schedule.map(row => ({
    month: row.month,
    balance: row.balance,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-2xl border border-white/10">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-0.5">
            {label ? `Month ${label}` : payload[0].name}
          </p>
          <p className="text-xs font-bold">{formatCurrency(payload[0].value, currencyCode)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col">
        <div className="mb-4">
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Financing Composition</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Balance Breakdown</p>
        </div>
        <div className="flex-1 min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={6}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-slate-900 font-black text-sm">
                Split
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-2">
          {pieData.map(item => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full ring-2 ring-slate-50" style={{ backgroundColor: item.color }}></div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col">
        <div className="mb-4">
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Debt Exposure Curve</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Outstanding Projected Balance</p>
        </div>
        <div className="flex-1 min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" hide />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="balance" 
                stroke="#6366f1" 
                fillOpacity={1} 
                fill="url(#colorBalance)" 
                strokeWidth={3} 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center text-[9px] font-black text-indigo-500 uppercase tracking-[0.2em] mt-2">
          Residual Target: {formatCurrency(results.effectiveBalloonAmount, currencyCode)}
        </p>
      </div>
    </div>
  );
};

export default Visualizations;
