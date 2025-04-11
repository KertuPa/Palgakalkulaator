import { t } from '../../i18n/useTranslations';
import styles from './ResultsSection.module.css';
import { Button } from '../shared/Button';

type Props = {
    netoResult: number | null;
    brutoResult: number | null;
    employerCostResult: number | null;
    aiComment: string | null;
    isLoadingComment: boolean;
    onGenerateComment: () => void;
};

export const ResultsSection: React.FC<Props> = ({
    netoResult,
    brutoResult,
    employerCostResult,
    aiComment,
    isLoadingComment,
    onGenerateComment,
}) => {
    if (netoResult === null || brutoResult === null || employerCostResult === null) {
        return null;
    }

    return (
        <div className="card">
            <h2>{t('resultsTitle')}</h2>
            <p className={styles.results}>
                {t('netoLabel')}: {netoResult.toFixed(2)} €
            </p>
            <p className={styles.results}>
                {t('brutoLabel')}: {brutoResult.toFixed(2)} €
            </p>
            <p className={styles.results}>
                {t('employerCostLabel')}: {employerCostResult.toFixed(2)} €
            </p>
            <Button
                variant="primary"
                className={styles.resultsButton}
                onClick={() => onGenerateComment?.()}
            >
                {isLoadingComment ? t('loadingButtonLabel') : t('generateCommentButtonLabel')}
            </Button>
            {aiComment && (
                <div className={styles.aiComment}>
                    <h3>{t('openAICommentTitle')}</h3>
                    <p>{aiComment}</p>
                </div>
            )}
        </div>
    );
};
