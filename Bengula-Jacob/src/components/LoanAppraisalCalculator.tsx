import React, { useMemo, useState } from 'react';
import { Calculator, CalendarDays, CheckCircle2, FileSpreadsheet, Percent, ReceiptText, ShieldCheck } from 'lucide-react';

type LoanTab = 'qualify' | 'factors' | 'apr' | 'schedule';

const fmt = (value: number) =>
  Number.isFinite(value)
    ? Math.round(value).toLocaleString('en-KE')
    : '-';

const fmtMoney = (value: number) => `KSh ${fmt(value)}`;

const fmtD = (value: number, digits = 2) =>
  Number.isFinite(value)
    ? value.toLocaleString('en-KE', { minimumFractionDigits: digits, maximumFractionDigits: digits })
    : '-';

function pmt(rate: number, nper: number, pv: number) {
  if (rate === 0) return pv / nper;
  return (pv * rate * Math.pow(1 + rate, nper)) / (Math.pow(1 + rate, nper) - 1);
}

function calcFactor(annualRate: number, months: number, moratorium: number, insuranceFinanced: boolean, insuranceRate: number) {
  const r = annualRate / 12;
  const principal = insuranceFinanced ? 1000 + insuranceRate * months : 1000;
  return pmt(r, months, principal) * (1 + moratorium * r);
}

function rateCalc(months: number, monthlyPayment: number, presentValue: number) {
  let rate = 0.01;
  for (let i = 0; i < 200; i += 1) {
    const pow = Math.pow(1 + rate, months);
    const f = monthlyPayment - (rate * presentValue * pow) / (pow - 1);
    const df = -presentValue * (pow * (1 + rate * months) - pow) / Math.pow(pow - 1, 2);
    const next = Math.max(rate - f / df, 1e-8);
    if (Math.abs(next - rate) < 1e-10) return next;
    rate = next;
  }
  return rate;
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="space-y-1.5 text-xs font-bold text-slate-700">
      <span>{label}</span>
      {children}
      {hint && <span className="block text-[10px] font-medium leading-snug text-slate-500">{hint}</span>}
    </label>
  );
}

function NumberInput({
  value,
  onChange,
  min,
  max,
  step,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(event) => onChange(Number(event.target.value))}
      className="h-10 w-full rounded-lg border border-violet-100 bg-white px-3 font-mono text-sm font-semibold text-slate-900 outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-100"
    />
  );
}

function SelectInput({
  value,
  onChange,
  children,
}: {
  value: string | number;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-10 w-full rounded-lg border border-violet-100 bg-white px-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-100"
    >
      {children}
    </select>
  );
}

function MetricCard({ label, value, sub }: { label: string; value: React.ReactNode; sub?: string }) {
  return (
    <div className="rounded-xl border border-violet-100 bg-violet-50/55 p-4 min-w-0">
      <span className="block text-[10px] font-extrabold uppercase tracking-wider text-violet-700">{label}</span>
      <div className="mt-1 text-lg font-black tracking-tight text-slate-950 tabular-nums break-words">{value}</div>
      {sub && <span className="mt-0.5 block text-[10px] font-medium text-slate-500">{sub}</span>}
    </div>
  );
}

export default function LoanAppraisalCalculator() {
  const [activeTab, setActiveTab] = useState<LoanTab>('qualify');

  const [netPay, setNetPay] = useState(13414);
  const [basicSalary, setBasicSalary] = useState(38900);
  const [temporaryAllowances, setTemporaryAllowances] = useState(0);
  const [serviceFee, setServiceFee] = useState(116);
  const [hasBuyoff, setHasBuyoff] = useState(false);
  const [currentDeduction, setCurrentDeduction] = useState(0);
  const [buyoffBalance, setBuyoffBalance] = useState(0);
  const [qMoratorium, setQMoratorium] = useState(1);
  const [qPeriod, setQPeriod] = useState(60);
  const [qRate, setQRate] = useState(13);
  const [qInsuranceFinanced, setQInsuranceFinanced] = useState(true);
  const [qInsuranceRate, setQInsuranceRate] = useState(0.55);

  const [factorStartRate, setFactorStartRate] = useState(12.5);
  const [factorStep, setFactorStep] = useState(0.5);
  const [factorCols, setFactorCols] = useState(8);
  const [factorPeriodStep, setFactorPeriodStep] = useState(12);
  const [factorInsuranceFinanced, setFactorInsuranceFinanced] = useState(true);
  const [factorInsuranceRate, setFactorInsuranceRate] = useState(0.55);
  const [factorMoratorium, setFactorMoratorium] = useState(1);

  const [aprAmount, setAprAmount] = useState(562464);
  const [aprRate, setAprRate] = useState(13);
  const [cbr, setCbr] = useState(10);
  const [aprTerm, setAprTerm] = useState(84);
  const [aprMoratorium, setAprMoratorium] = useState(1);
  const [aprInsuranceFinanced, setAprInsuranceFinanced] = useState(true);
  const [negotiationFee, setNegotiationFee] = useState(0);
  const [aprServiceFee, setAprServiceFee] = useState(100);
  const [exciseDuty, setExciseDuty] = useState(0);
  const [aprInsuranceRate, setAprInsuranceRate] = useState(0.55);

  const [scheduleAmount, setScheduleAmount] = useState(562464);
  const [scheduleRate, setScheduleRate] = useState(13);
  const [scheduleTerm, setScheduleTerm] = useState(60);
  const [scheduleMoratorium, setScheduleMoratorium] = useState(1);
  const [scheduleInsuranceFinanced, setScheduleInsuranceFinanced] = useState(false);
  const [scheduleInsuranceRate, setScheduleInsuranceRate] = useState(0.55);

  const qualification = useMemo(() => {
    const period = Math.min(Math.max(qPeriod || 60, 2), 144);
    const basicThird = basicSalary / 3;
    const temporaryDeduction = temporaryAllowances * 0.7;
    const cleared = hasBuyoff ? currentDeduction : 0;
    const buyoff = hasBuyoff ? buyoffBalance : 0;
    const ability = netPay - basicThird - serviceFee + cleared - temporaryDeduction;
    const factor = calcFactor(qRate / 100, period, qMoratorium, qInsuranceFinanced, qInsuranceRate);
    const maxLoan = factor > 0 ? (ability / factor) * 1000 : 0;
    const disbursement = maxLoan - buyoff;
    const status =
      ability <= 0 ? 'Does not qualify' : disbursement < 0 ? 'Buyoff exceeds loan' : disbursement < 50000 ? 'Marginal' : 'Qualifies';

    return { period, basicThird, temporaryDeduction, ability, factor, maxLoan, disbursement, status };
  }, [
    basicSalary,
    buyoffBalance,
    currentDeduction,
    hasBuyoff,
    netPay,
    qInsuranceFinanced,
    qInsuranceRate,
    qMoratorium,
    qPeriod,
    qRate,
    serviceFee,
    temporaryAllowances,
  ]);

  const factorTable = useMemo(() => {
    const cols = Math.min(Math.max(factorCols || 1, 1), 15);
    const rates = Array.from({ length: cols }, (_, index) => factorStartRate + index * factorStep);
    const periods: number[] = [];
    for (let p = factorPeriodStep; p <= 144; p += factorPeriodStep) periods.push(p);
    if (!periods.includes(2)) periods.unshift(2);
    if (!periods.includes(144)) periods.push(144);
    return { rates, periods };
  }, [factorCols, factorPeriodStep, factorStartRate, factorStep]);

  const apr = useMemo(() => {
    const term = Math.min(Math.max(aprTerm || 84, 2), 144);
    const r = aprRate / 100 / 12;
    const insuranceTotal = (aprInsuranceRate / 1000) * term * aprAmount;
    const principal = aprInsuranceFinanced ? aprAmount + insuranceTotal : aprAmount;
    const monthlyInstallment = pmt(r, term, principal) * (1 + aprMoratorium * r);
    const negotiationTotal = (negotiationFee / 100) * aprAmount;
    const serviceTotal = aprServiceFee * term;
    const exciseTotal = (exciseDuty / 100) * negotiationTotal;
    const totalBankCharges = negotiationTotal + serviceTotal;
    const thirdParty = exciseTotal + insuranceTotal;
    const totalInterest = monthlyInstallment * term - aprAmount;
    const totalCharges = totalBankCharges + thirdParty;
    const totalCost = totalInterest + totalCharges;
    const netProceeds = aprInsuranceFinanced ? aprAmount + insuranceTotal - totalCharges : aprAmount - totalCharges;
    const aprValue = rateCalc(term, monthlyInstallment, netProceeds) * 12 * 100;

    return { term, monthlyInstallment, insuranceTotal, negotiationTotal, serviceTotal, exciseTotal, totalBankCharges, thirdParty, totalInterest, totalCharges, totalCost, aprValue };
  }, [aprAmount, aprInsuranceFinanced, aprInsuranceRate, aprMoratorium, aprRate, aprServiceFee, aprTerm, exciseDuty, negotiationFee]);

  const schedule = useMemo(() => {
    const term = Math.min(Math.max(scheduleTerm || 60, 2), 144);
    const r = scheduleRate / 100 / 12;
    const insuranceTotal = scheduleInsuranceFinanced ? (scheduleInsuranceRate / 1000) * term * scheduleAmount : 0;
    const principal = scheduleAmount + insuranceTotal;
    const monthlyInstallment = pmt(r, term, principal) * (1 + scheduleMoratorium * r);
    let balance = principal;
    let totalInterest = 0;
    let totalPrincipal = 0;
    const rows = [];
    const now = new Date();

    for (let month = 1; month <= term; month += 1) {
      const interest = balance * r;
      const principalPaid = Math.min(monthlyInstallment - interest, balance);
      balance = Math.max(balance - principalPaid, 0);
      totalInterest += interest;
      totalPrincipal += principalPaid;
      const date = new Date(now.getFullYear(), now.getMonth() + month, 1);
      rows.push({
        month,
        date: date.toLocaleDateString('en-KE', { month: 'short', year: 'numeric' }),
        installment: monthlyInstallment,
        interest,
        principal: principalPaid,
        balance,
      });
      if (balance <= 0) break;
    }

    return { rows, monthlyInstallment, totalInterest, totalPrincipal };
  }, [scheduleAmount, scheduleInsuranceFinanced, scheduleInsuranceRate, scheduleMoratorium, scheduleRate, scheduleTerm]);

  const tabs: { id: LoanTab; label: string; icon: React.ElementType }[] = [
    { id: 'qualify', label: 'Loan Qualification', icon: ShieldCheck },
    { id: 'factors', label: 'Factor Tables', icon: FileSpreadsheet },
    { id: 'apr', label: 'APR Calculator', icon: Percent },
    { id: 'schedule', label: 'Repayment Schedule', icon: CalendarDays },
  ];

  return (
    <div className="rounded-2xl border border-violet-100 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-violet-100 bg-violet-50/70 px-5 py-4 md:px-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-violet-700">Banking Decision Tool</p>
            <h3 className="mt-1 text-xl font-black tracking-tight text-slate-950">Loan Appraisal Calculator</h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-600">
              Estimate unsecured-loan qualification, repayment factors, APR, and amortization schedules before a formal bank assessment.
            </p>
          </div>
          <span className="rounded-full border border-violet-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-800">
            KES model
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 border-b border-violet-100 bg-white p-3 md:grid-cols-4">
        {tabs.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 py-2 text-[11px] font-extrabold transition ${
                activeTab === item.id
                  ? 'bg-violet-700 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-violet-50 hover:text-violet-800'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-5 md:p-6">
        {activeTab === 'qualify' && (
          <div className="grid gap-5 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Customer Income</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Net pay (KES)" hint="Take-home after statutory deductions">
                    <NumberInput value={netPay} onChange={setNetPay} />
                  </Field>
                  <Field label="Basic salary (KES)" hint="A third is deducted from ability">
                    <NumberInput value={basicSalary} onChange={setBasicSalary} />
                  </Field>
                  <Field label="Temporary allowances (KES)" hint="70% removed from lending ability">
                    <NumberInput value={temporaryAllowances} onChange={setTemporaryAllowances} />
                  </Field>
                  <Field label="Bank service fee (KES/month)">
                    <NumberInput value={serviceFee} onChange={setServiceFee} />
                  </Field>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <label className="flex items-center gap-2 rounded-lg bg-violet-50 p-3 text-xs font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={hasBuyoff}
                    onChange={(event) => setHasBuyoff(event.target.checked)}
                    className="h-4 w-4 accent-violet-700"
                  />
                  Refinancing / buying off existing loan
                </label>
                {hasBuyoff && (
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <Field label="Current monthly deduction cleared">
                      <NumberInput value={currentDeduction} onChange={setCurrentDeduction} />
                    </Field>
                    <Field label="Buyoff balance">
                      <NumberInput value={buyoffBalance} onChange={setBuyoffBalance} />
                    </Field>
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Loan Parameters</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Moratorium">
                    <SelectInput value={qMoratorium} onChange={(value) => setQMoratorium(Number(value))}>
                      {[0, 1, 2, 3].map((value) => <option key={value} value={value}>{value} month{value === 1 ? '' : 's'}</option>)}
                    </SelectInput>
                  </Field>
                  <Field label="Period (months)">
                    <NumberInput value={qPeriod} min={2} max={144} onChange={setQPeriod} />
                  </Field>
                  <Field label="Annual interest rate (%)">
                    <NumberInput value={qRate} step={0.01} onChange={setQRate} />
                  </Field>
                  <Field label="Insurance premium per KSh 1,000/month">
                    <NumberInput value={qInsuranceRate} step={0.01} onChange={setQInsuranceRate} />
                  </Field>
                </div>
                <label className="mt-3 flex items-center gap-2 text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={qInsuranceFinanced}
                    onChange={(event) => setQInsuranceFinanced(event.target.checked)}
                    className="h-4 w-4 accent-violet-700"
                  />
                  Add insurance to loan principal
                </label>
              </div>
            </div>

            <div className="space-y-4 lg:col-span-7">
              <div className="rounded-2xl border border-violet-200 bg-violet-700 p-5 text-white">
                <p className="text-xs font-bold text-violet-100">Maximum loan amount</p>
                <p className="mt-1 text-3xl font-black tracking-tight">{fmtMoney(qualification.maxLoan)}</p>
                <p className="mt-1 text-xs text-violet-100">Net disbursement after buyoff: {fmtMoney(qualification.disbursement)}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard label="Lending ability" value={fmtMoney(qualification.ability)} />
                <MetricCard label="Factor" value={fmtD(qualification.factor, 4)} sub="per KSh 1,000" />
                <MetricCard label="Monthly instalment" value={fmtMoney(qualification.factor * (qualification.maxLoan / 1000))} />
                <MetricCard
                  label="Status"
                  value={
                    <span className={qualification.status === 'Qualifies' ? 'text-emerald-700' : 'text-amber-700'}>
                      {qualification.status}
                    </span>
                  }
                />
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs leading-relaxed text-slate-700">
                Ability = Net pay - Basic/3 - service fee + cleared deduction - 70% temporary allowances.
                <br />
                {fmtMoney(netPay)} - {fmtMoney(qualification.basicThird)} - {fmtMoney(serviceFee)}
                {hasBuyoff ? ` + ${fmtMoney(currentDeduction)} - ${fmtMoney(qualification.temporaryDeduction)}` : ` - ${fmtMoney(qualification.temporaryDeduction)}`}
                {' = '}
                {fmtMoney(qualification.ability)}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'factors' && (
          <div className="space-y-5">
            <div className="grid gap-3 md:grid-cols-4">
              <Field label="Starting rate (%)"><NumberInput value={factorStartRate} step={0.5} onChange={setFactorStartRate} /></Field>
              <Field label="Rate step (%)"><NumberInput value={factorStep} step={0.1} onChange={setFactorStep} /></Field>
              <Field label="Rate columns"><NumberInput value={factorCols} min={1} max={15} onChange={setFactorCols} /></Field>
              <Field label="Period step">
                <SelectInput value={factorPeriodStep} onChange={(value) => setFactorPeriodStep(Number(value))}>
                  <option value={12}>Every 12 months</option>
                  <option value={6}>Every 6 months</option>
                  <option value={1}>Every month</option>
                </SelectInput>
              </Field>
            </div>
            <div className="flex flex-wrap gap-2">
              {[0, 1, 2, 3].map((value) => (
                <button
                  key={value}
                  onClick={() => setFactorMoratorium(value)}
                  className={`rounded-full border px-4 py-2 text-xs font-bold ${
                    factorMoratorium === value ? 'border-violet-700 bg-violet-700 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-violet-300'
                  }`}
                >
                  {value} month{value === 1 ? '' : 's'}
                </button>
              ))}
              <label className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700">
                <input type="checkbox" checked={factorInsuranceFinanced} onChange={(event) => setFactorInsuranceFinanced(event.target.checked)} className="accent-violet-700" />
                Insurance financed
              </label>
              <div className="w-full max-w-xs">
                <Field label="Insurance premium">
                  <NumberInput value={factorInsuranceRate} step={0.01} onChange={setFactorInsuranceRate} />
                </Field>
              </div>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full min-w-[620px] text-xs">
                <thead className="bg-violet-50 text-violet-900">
                  <tr>
                    <th className="p-3 text-left font-black">Months</th>
                    {factorTable.rates.map((rate) => <th key={rate} className="p-3 text-right font-black">{fmtD(rate, 1)}%</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {factorTable.periods.map((period) => (
                    <tr key={period} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-700">{period}</td>
                      {factorTable.rates.map((rate) => (
                        <td key={`${period}-${rate}`} className="p-3 text-right font-mono text-slate-700">
                          {fmtD(calcFactor(rate / 100, period, factorMoratorium, factorInsuranceFinanced, factorInsuranceRate), 4)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] font-medium text-slate-500">Factor is per KSh 1,000. Max loan = ability / factor x 1,000.</p>
          </div>
        )}

        {activeTab === 'apr' && (
          <div className="grid gap-5 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Loan amount"><NumberInput value={aprAmount} onChange={setAprAmount} /></Field>
                <Field label="Interest rate (%)"><NumberInput value={aprRate} step={0.01} onChange={setAprRate} /></Field>
                <Field label="Central bank rate (%)"><NumberInput value={cbr} step={0.01} onChange={setCbr} /></Field>
                <Field label="Term (months)"><NumberInput value={aprTerm} min={2} max={144} onChange={setAprTerm} /></Field>
                <Field label="Moratorium"><SelectInput value={aprMoratorium} onChange={(value) => setAprMoratorium(Number(value))}>{[0, 1, 2, 3].map((value) => <option key={value} value={value}>{value}</option>)}</SelectInput></Field>
                <Field label="Insurance per KSh 1,000/month"><NumberInput value={aprInsuranceRate} step={0.01} onChange={setAprInsuranceRate} /></Field>
                <Field label="Negotiation fee (%)"><NumberInput value={negotiationFee} step={0.1} onChange={setNegotiationFee} /></Field>
                <Field label="Service fee (KES/month)"><NumberInput value={aprServiceFee} onChange={setAprServiceFee} /></Field>
                <Field label="Excise duty (%)"><NumberInput value={exciseDuty} step={0.1} onChange={setExciseDuty} /></Field>
              </div>
              <label className="flex items-center gap-2 rounded-lg bg-violet-50 p-3 text-xs font-bold text-slate-800">
                <input type="checkbox" checked={aprInsuranceFinanced} onChange={(event) => setAprInsuranceFinanced(event.target.checked)} className="accent-violet-700" />
                Insurance financed
              </label>
            </div>
            <div className="space-y-4 lg:col-span-7">
              <div className="grid gap-3 sm:grid-cols-2">
                <MetricCard label="Monthly instalment" value={fmtMoney(apr.monthlyInstallment)} />
                <MetricCard label="APR" value={`${fmtD(apr.aprValue, 2)}%`} />
                <MetricCard label="Total cost of credit" value={fmtMoney(apr.totalCost)} />
                <MetricCard label="Margin over CBR" value={`${fmtD(aprRate - cbr, 2)}%`} />
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs">
                {[
                  ['Negotiation fee', apr.negotiationTotal],
                  ['Service fee total', apr.serviceTotal],
                  ['Excise duty', apr.exciseTotal],
                  ['Credit life insurance', apr.insuranceTotal],
                  ['Total interest', apr.totalInterest],
                  ['Total charges', apr.totalCharges],
                ].map(([label, value]) => (
                  <div key={label as string} className="flex justify-between border-b border-slate-200 py-2 last:border-0">
                    <span className="font-semibold text-slate-600">{label}</span>
                    <span className="font-mono font-bold text-slate-900">{fmtMoney(value as number)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-5">
            <div className="grid gap-3 md:grid-cols-3">
              <Field label="Loan amount"><NumberInput value={scheduleAmount} onChange={setScheduleAmount} /></Field>
              <Field label="Annual interest rate (%)"><NumberInput value={scheduleRate} step={0.01} onChange={setScheduleRate} /></Field>
              <Field label="Term (months)"><NumberInput value={scheduleTerm} min={2} max={144} onChange={setScheduleTerm} /></Field>
              <Field label="Moratorium"><SelectInput value={scheduleMoratorium} onChange={(value) => setScheduleMoratorium(Number(value))}>{[0, 1, 2, 3].map((value) => <option key={value} value={value}>{value}</option>)}</SelectInput></Field>
              <Field label="Insurance per KSh 1,000/month"><NumberInput value={scheduleInsuranceRate} step={0.01} onChange={setScheduleInsuranceRate} /></Field>
              <label className="flex items-end gap-2 rounded-lg bg-violet-50 p-3 text-xs font-bold text-slate-800">
                <input type="checkbox" checked={scheduleInsuranceFinanced} onChange={(event) => setScheduleInsuranceFinanced(event.target.checked)} className="mb-1 accent-violet-700" />
                Insurance financed
              </label>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <MetricCard label="Monthly instalment" value={fmtMoney(schedule.monthlyInstallment)} />
              <MetricCard label="Total interest" value={fmtMoney(schedule.totalInterest)} />
              <MetricCard label="Total repaid" value={fmtMoney(schedule.totalInterest + schedule.totalPrincipal)} />
            </div>
            <div className="max-h-[360px] overflow-auto rounded-xl border border-slate-200">
              <table className="w-full min-w-[680px] text-xs">
                <thead className="sticky top-0 bg-violet-50 text-violet-900">
                  <tr>
                    {['#', 'Month', 'Instalment', 'Interest', 'Principal', 'Balance'].map((head) => (
                      <th key={head} className="p-3 text-right font-black first:text-left">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {schedule.rows.map((row) => (
                    <tr key={row.month} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-600">{row.month}</td>
                      <td className="p-3 text-left font-semibold text-slate-600">{row.date}</td>
                      <td className="p-3 text-right font-mono">{fmtMoney(row.installment)}</td>
                      <td className="p-3 text-right font-mono">{fmtMoney(row.interest)}</td>
                      <td className="p-3 text-right font-mono">{fmtMoney(row.principal)}</td>
                      <td className="p-3 text-right font-mono font-bold">{fmtMoney(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-violet-100 bg-slate-50 px-5 py-4 text-[11px] leading-relaxed text-slate-500 md:px-6">
        <div className="flex gap-2">
          <ReceiptText className="mt-0.5 h-4 w-4 shrink-0 text-violet-700" />
          <p>
            This calculator is educational and approximates internal loan appraisal logic. Formal eligibility, pricing, fees, insurance, and disbursement are confirmed only by the licensed lender handling the application.
          </p>
        </div>
      </div>
    </div>
  );
}

