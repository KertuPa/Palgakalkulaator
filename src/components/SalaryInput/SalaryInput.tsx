import { t } from '../../i18n/useTranslations';
import styles from './SalaryInput.module.css';

type Props = {
    salaryInput: number | '';
    setSalaryInput: (value: number | '') => void;
};

export const SalaryInput: React.FC<Props> = ({ salaryInput, setSalaryInput }) => {
    return (
        <div className={styles.salaryInputContainer}>
            <label>
                {t('inputLabel')}
                <input
                    type="number"
                    value={salaryInput}
                    className={styles.salaryInput}
                    onChange={(e) =>
                        setSalaryInput(e.target.value === '' ? '' : Number(e.target.value))
                    }
                    placeholder={t('inputPlaceholder')}
                />
            </label>
        </div>
    );
};
