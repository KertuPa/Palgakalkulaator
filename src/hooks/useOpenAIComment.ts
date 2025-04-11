import { useState } from 'react';
import { getOpenAIComment } from '../utils/openAIService';

export const useOpenAIComment = () => {
    const [aiComment, setAiComment] = useState<string | null>(null);
    const [isLoadingComment, setIsLoadingComment] = useState<boolean>(false);

    const fetchAIComment = async (netSalary: number) => {
        try {
            setIsLoadingComment(true);
            const comment = await getOpenAIComment(netSalary);
            setAiComment(comment);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingComment(false);
        }
    };

    return { aiComment, isLoadingComment, fetchAIComment };
};
