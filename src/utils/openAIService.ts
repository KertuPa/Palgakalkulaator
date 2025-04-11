import axios from 'axios';

export const getOpenAIComment = async (netSalary: number): Promise<string> => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const prompt = `Kuidas on võimalik Eestis ${netSalary} euroga kuus ära elada? Palun anna lühike hinnang (1-2 lauset).`;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
                max_tokens: 100,
                temperature: 0.7,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
            },
        );

        return response.data.choices?.[0]?.message?.content?.trim();
    } catch (error) {
        console.error('OpenAI API päring ebaõnnestus', error);
        return 'Tekkis viga OpenAI kommentaari laadimisel.';
    }
};
