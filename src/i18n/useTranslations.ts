import { translations } from './translations';

export const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations;

    for (const phraseKey of keys) {
        result = result?.[phraseKey];
        if (!result) {
            console.warn(`Missing translation for key: ${key}`);
            return key;
        }
    }

    return result;
};
