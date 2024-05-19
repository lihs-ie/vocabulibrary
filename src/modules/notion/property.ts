const Mastery = {
    yet: 'インプット中',
    inputted: 'インプット済み',
    instantaneous: '瞬発クリア',
    talkable: '話せる',
} as const;

type Mastery = keyof typeof Mastery;

const Frequency = {
    often: '🥇よく使う',
    normal: '🥈普通に使う',
    occasionally: '🥉たまに使う',
    rarely: '🔺あまり使わない',
} as const;

export type Frequency = keyof typeof Frequency;

const Intelligence = {
    high: '🥇かなり知的',
    moderate: '🥈そこそこ知的',
    low: '🥉少し知的',
    veryLow: '🔺あまり知的ではない',
} as const;

export type Intelligence = keyof typeof Intelligence;

export type Properties = {
    Vocabulary: {
        title: [
            {
                text: {
                    content: string;
                };
            },
        ];
    };
    習得度: {
        status: {
            name: Mastery[keyof Mastery];
        };
    };
    頻出度: {
        select: {
            name: Frequency[keyof Frequency];
        };
    };
    知的度: {
        select: {
            name: Intelligence[keyof Intelligence];
        };
    };
};

export const createProperties = (
    title: string,
    mastery: Mastery,
    frequency: Frequency,
    intelligence: Intelligence,
): Properties => {
    return {
        Vocabulary: {
            title: [
                {
                    text: {
                        content: title,
                    },
                },
            ],
        },
        習得度: {
            status: {
                name: Mastery[mastery],
            },
        },
        頻出度: {
            select: {
                name: frequency,
            },
        },
        知的度: {
            select: {
                name: intelligence,
            },
        },
    };
};
