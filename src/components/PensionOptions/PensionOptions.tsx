import { t } from '../../i18n/useTranslations';
import styles from './PensionOptions.module.css';
import arrowDown from '../../assets/arrow-down.svg';

type Props = {
    pensionEnabled: boolean;
    setPensionEnabled: (enabled: boolean) => void;
    pensionPercentage: number;
    setPensionPercentage: (percentage: number) => void;
};

export const PensionOptions: React.FC<Props> = ({
    pensionEnabled,
    setPensionEnabled,
    pensionPercentage,
    setPensionPercentage,
}) => {
    return (
        <div className="card">
            <label className={styles.pensionOptionsLabel}>
                <input
                    className="default_checkbox"
                    type="checkbox"
                    checked={pensionEnabled}
                    onChange={() => setPensionEnabled(!pensionEnabled)}
                />
                <span className="custom_checkbox"></span>
                {t('pensionEnabled')}
            </label>
            <div>
                <label className={styles.pensionOptions}>
                    {t('pensionPercentage')}
                    <select
                        className={styles.pensionOptionsItem}
                        style={{
                            backgroundImage: `url("${arrowDown}")`
                        }}
                        value={pensionPercentage}
                        onChange={(e) => setPensionPercentage(Number(e.target.value))}
                        disabled={!pensionEnabled}
                    >
                        {[2, 4, 6].map((percentage) => (
                            <option key={percentage} value={percentage}>
                                {percentage}%
                            </option>
                        ))}
                    </select>
                </label>
            </div>
        </div>
    );
};
