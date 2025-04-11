import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import { calculateSalary } from './utils/calculateSalary';
import { t } from './i18n/useTranslations';
import { SalaryTypeSelector } from './components/SalaryTypeSelector/SalaryTypeSelector';
import { PensionOptions } from './components/PensionOptions/PensionOptions';
import { SalaryInput } from './components/SalaryInput/SalaryInput';
import { UnemploymentInsuranceOption } from './components/UnemploymentInsuranceOption/UnemploymentInsuranceOption';
import { ResultsSection } from './components/ResultsSection/ResultsSection';
import { useOpenAIComment } from './hooks/useOpenAIComment';

type SalaryType = 'neto' | 'bruto' | 'employerCost';

export const App: React.FC = () => {
    const [salaryType, setSalaryType] = useState<SalaryType>('neto');
    const [salaryInput, setSalaryInput] = useState<number | ''>('');
    const [pensionPercentage, setPensionPercentage] = useState<number>(2);
    const [pensionEnabled, setPensionEnabled] = useState<boolean>(true);
    const { aiComment, isLoadingComment, fetchAIComment } = useOpenAIComment();
    const [includeUnemploymentEmployee, setIncludeUnemploymentEmployee] = useState<boolean>(true);
    const [includeUnemploymentEmployer, setIncludeUnemploymentEmployer] = useState<boolean>(true);

    const [netoResult, setNetoResult] = useState<number | null>(null);
    const [brutoResult, setBrutoResult] = useState<number | null>(null);
    const [employerCostResult, setEmployerCostResult] = useState<number | null>(null);

    useEffect(() => {
        if (!salaryInput || salaryInput <= 0) {
            resetResults();
            return;
        }

        const results = calculateSalary({
            salaryInput: salaryInput as number,
            salaryType,
            pensionEnabled,
            pensionPercentage,
            includeUnemploymentEmployee,
            includeUnemploymentEmployer,
        });

        if (results) {
            setNetoResult(results.neto);
            setBrutoResult(results.bruto);
            setEmployerCostResult(results.employerCost);
        }
    }, [
        salaryInput,
        salaryType,
        pensionEnabled,
        pensionPercentage,
        includeUnemploymentEmployee,
        includeUnemploymentEmployer,
    ]);

    const resetResults = () => {
        setNetoResult(null);
        setBrutoResult(null);
        setEmployerCostResult(null);
    };

    const handleGenerateComment = () => {
        if (netoResult != null) {
            fetchAIComment(+netoResult.toFixed(2));
        }
    };

    return (
        <div className="app-container">
            <h1>{t('title')}</h1>
            <SalaryTypeSelector salaryType={salaryType} setSalaryType={setSalaryType} />
            <SalaryInput salaryInput={salaryInput} setSalaryInput={setSalaryInput} />
            <PensionOptions
                pensionEnabled={pensionEnabled}
                setPensionEnabled={setPensionEnabled}
                pensionPercentage={pensionPercentage}
                setPensionPercentage={setPensionPercentage}
            />
            <UnemploymentInsuranceOption
                includeUnemploymentEmployee={includeUnemploymentEmployee}
                setIncludeUnemploymentEmployee={setIncludeUnemploymentEmployee}
                includeUnemploymentEmployer={includeUnemploymentEmployer}
                setIncludeUnemploymentEmployer={setIncludeUnemploymentEmployer}
            />
            <ResultsSection
                netoResult={netoResult}
                brutoResult={brutoResult}
                employerCostResult={employerCostResult}
                aiComment={aiComment}
                isLoadingComment={isLoadingComment}
                onGenerateComment={handleGenerateComment}
            />
        </div>
    );
};
