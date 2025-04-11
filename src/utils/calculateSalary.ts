import { SalaryType } from '../types/salary';
interface CalculateSalaryParams {
    salaryInput: number;
    salaryType: SalaryType;
    pensionEnabled: boolean;
    pensionPercentage: number;
    includeUnemploymentEmployee: boolean;
    includeUnemploymentEmployer: boolean;
}

interface SalaryResults {
    neto: number;
    bruto: number;
    employerCost: number;
}

export const calculateSalary = ({
    salaryInput,
    salaryType,
    pensionEnabled,
    pensionPercentage,
    includeUnemploymentEmployee,
    includeUnemploymentEmployer,
}: CalculateSalaryParams): SalaryResults | null => {
    if (!salaryInput || salaryInput <= 0) {
        return null;
    }

    const DEFAULT_SOCIAL_TAX = 0.33;
    const INCOME_TAX_RATE = 0.22;
    const UNEMPLOYMENT_EMPLOYEE = includeUnemploymentEmployee ? 0.016 : 0;
    const UNEMPLOYMENT_EMPLOYER = includeUnemploymentEmployer ? 0.008 : 0;
    const pensionRate = pensionEnabled ? pensionPercentage / 100 : 0;

    let bruto: number;
    let neto: number;
    let employerCost: number;

    if (salaryType === 'bruto') {
        bruto = salaryInput;

        const unemploymentPayment = bruto * UNEMPLOYMENT_EMPLOYEE;
        const pensionPayment = bruto * pensionRate;
        const taxableIncome = bruto - unemploymentPayment - pensionPayment;
        const incomeTax = taxableIncome * INCOME_TAX_RATE;

        neto = bruto - unemploymentPayment - pensionPayment - incomeTax;
        employerCost = bruto * (1 + DEFAULT_SOCIAL_TAX + UNEMPLOYMENT_EMPLOYER);
    } else if (salaryType === 'neto') {
        const preTaxDeductions = pensionRate + UNEMPLOYMENT_EMPLOYEE;
        const divisor = 1 - INCOME_TAX_RATE * (1 - preTaxDeductions) - preTaxDeductions;

        bruto = salaryInput / divisor;

        const unemploymentPayment = bruto * UNEMPLOYMENT_EMPLOYEE;
        const pensionPayment = bruto * pensionRate;
        const taxableIncome = bruto - unemploymentPayment - pensionPayment;
        const incomeTax = taxableIncome * INCOME_TAX_RATE;

        neto = bruto - unemploymentPayment - pensionPayment - incomeTax;
        employerCost = bruto * (1 + DEFAULT_SOCIAL_TAX + UNEMPLOYMENT_EMPLOYER);
    } else if (salaryType === 'employerCost') {
        bruto = salaryInput / (1 + DEFAULT_SOCIAL_TAX + UNEMPLOYMENT_EMPLOYER);

        const unemploymentPayment = bruto * UNEMPLOYMENT_EMPLOYEE;
        const pensionPayment = bruto * pensionRate;
        const taxableIncome = bruto - unemploymentPayment - pensionPayment;
        const incomeTax = taxableIncome * INCOME_TAX_RATE;

        neto = bruto - unemploymentPayment - pensionPayment - incomeTax;
        employerCost = salaryInput;
    } else {
        throw new Error('Invalid salary type');
    }

    return { neto, bruto, employerCost };
};
