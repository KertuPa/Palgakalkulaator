import { t } from '../../i18n/useTranslations';
import styles from './UnemploymentInsuranceOption.module.css';

type Props = {
    includeUnemploymentEmployee: boolean;
    setIncludeUnemploymentEmployee: (enabled: boolean) => void;
    includeUnemploymentEmployer: boolean;
    setIncludeUnemploymentEmployer: (enabled: boolean) => void;
};

export const UnemploymentInsuranceOption: React.FC<Props> = ({
    includeUnemploymentEmployee,
    setIncludeUnemploymentEmployee,
    includeUnemploymentEmployer,
    setIncludeUnemploymentEmployer,
}) => {
    return (
        <div className={`card ${styles.unemploymentInsuranceContainer}`}>
            <label className={styles.employeeInsuranceLabel}>
                <input
                    type="checkbox"
                    checked={includeUnemploymentEmployee}
                    onChange={() => setIncludeUnemploymentEmployee(!includeUnemploymentEmployee)}
                    className="default_checkbox"
                />
                <span className="custom_checkbox"></span>
                {t('employeeInsuranceLabel')}
            </label>
            <label className={styles.employerInsuranceLabel}>
                <input
                    type="checkbox"
                    checked={includeUnemploymentEmployer}
                    onChange={() => setIncludeUnemploymentEmployer(!includeUnemploymentEmployer)}
                    className="default_checkbox"
                />
                <span className="custom_checkbox"></span>
                {t('employerInsuranceLabel')}
            </label>
        </div>
    );
};
