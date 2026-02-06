
import { LoanInputs, LoanResults, AmortizationRow } from '../types';

/**
 * Calculates loan results. Supports two modes:
 * 1. 'balloon': Calculates Monthly Payment based on a fixed Balloon Amount.
 * 2. 'installment': Calculates implied Balloon Amount based on a fixed Monthly Payment.
 */
export const calculateLoan = (inputs: LoanInputs): LoanResults => {
  const { carPrice, downPayment, apr, termMonths, balloonAmount, calculationMode, targetMonthlyPayment } = inputs;
  
  const principalAmount = carPrice - downPayment;
  const monthlyRate = (apr / 100) / 12;
  const n = termMonths;
  const pv = principalAmount;

  let monthlyPayment = 0;
  let effectiveBalloon = 0;

  if (calculationMode === 'balloon') {
    // Standard mode: Solve for PMT
    effectiveBalloon = balloonAmount;
    if (monthlyRate === 0) {
      monthlyPayment = (pv - effectiveBalloon) / n;
    } else {
      const pow = Math.pow(1 + monthlyRate, n);
      monthlyPayment = (pv * monthlyRate * pow - effectiveBalloon * monthlyRate) / (pow - 1);
    }
  } else {
    // Fixed Installment mode: Solve for FV (Balloon)
    monthlyPayment = targetMonthlyPayment;
    if (monthlyRate === 0) {
      effectiveBalloon = pv - (monthlyPayment * n);
    } else {
      const pow = Math.pow(1 + monthlyRate, n);
      // FV = PV*(1+r)^n - PMT * ((1+r)^n - 1) / r
      effectiveBalloon = (pv * pow) - (monthlyPayment * (pow - 1) / monthlyRate);
    }
  }

  // Ensure balloon isn't negative for UI sanity (though mathematically possible if PMT is huge)
  effectiveBalloon = Math.max(0, effectiveBalloon);

  const schedule: AmortizationRow[] = [];
  let currentBalance = pv;
  let totalInterest = 0;

  for (let m = 1; m <= n; m++) {
    const interestForMonth = currentBalance * monthlyRate;
    const principalForMonth = monthlyPayment - interestForMonth;
    
    currentBalance = currentBalance - principalForMonth;
    totalInterest += interestForMonth;
    
    schedule.push({
      month: m,
      payment: monthlyPayment,
      principal: principalForMonth,
      interest: interestForMonth,
      balance: Math.max(0, currentBalance)
    });
  }

  return {
    monthlyPayment,
    totalInterest,
    totalCost: principalAmount + totalInterest + downPayment,
    principalAmount,
    effectiveBalloonAmount: effectiveBalloon,
    schedule
  };
};

export const formatCurrency = (value: number, currencyCode: string = 'SAR') => {
  // Saudi Riyal special handling for the new symbol representation
  if (currencyCode === 'SAR') {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value) + ' ﷼';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(value);
};

export const downloadCSV = (schedule: AmortizationRow[]) => {
  const headers = ['Month', 'Payment', 'Principal', 'Interest', 'Remaining Balance'];
  const rows = schedule.map(row => [
    row.month,
    row.payment.toFixed(2),
    row.principal.toFixed(2),
    row.interest.toFixed(2),
    row.balance.toFixed(2)
  ]);
  
  const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "amortization_schedule.csv");
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
