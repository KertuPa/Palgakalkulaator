import { t } from '../../i18n/useTranslations';
import styles from './SalaryTypeSelector.module.css';
import { SalaryType } from '../../types/salary';
import { Button } from '../shared/Button';

type Props = {
    salaryType: 'neto' | 'bruto' | 'employerCost';
    setSalaryType: (type: SalaryType) => void;
};

const salaryTypes: SalaryType[] = ['neto', 'bruto', 'employerCost'];
export const SalaryTypeSelector: React.FC<Props> = ({ salaryType, setSalaryType }) => {
    return (
        <div className={styles.salaryType}>
            {salaryTypes.map((type) => (
                <Button
                    key={type}
                    variant="primary"
                    className={`${styles.salaryTypeButton} ${salaryType === type ? styles.active : ''}`}
                    onClick={() => setSalaryType(type)}
                    type="button"
                >
                    {t(`salaryTypes.${type}`)}
                </Button>
            ))}
        </div>
    );
};
