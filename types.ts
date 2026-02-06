
export type DownPaymentMode = 'amount' | 'percentage';
export type CalculationMode = 'balloon' | 'installment';

export interface LoanInputs {
  carPrice: number;
  downPayment: number;
  downPaymentPercent: number;
  downPaymentMode: DownPaymentMode;
  calculationMode: CalculationMode;
  targetMonthlyPayment: number;
  apr: number;
  termMonths: number;
  balloonAmount: number;
  currencyCode: string;
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface LoanResults {
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  principalAmount: number;
  effectiveBalloonAmount: number;
  schedule: AmortizationRow[];
}
