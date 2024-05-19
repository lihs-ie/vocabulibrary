import { RawEntryMedia } from './client';

export class Explanation {
    public constructor(
        public vocabulary: string,
        public frequency: {
            name: string;
            reason: string;
        },
        public intelligence: {
            name: string;
            reason: string;
        },
        public meaning: {
            content: string;
            supplement: string;
        },
        public etymology: string,
        public pronunciation: string,
        public collocations: { sentence: string; japanese: string }[],
        public examples: {
            sentence: string;
            japanese: string;
        }[],
        public expressions: {
            sentence: string;
            japanese: string;
        }[],
        public image?: string,
    ) {}
}

const translateFrequencyLevel = (level: number) => {
    if (level <= 2) {
        return '🔺あまり使わない';
    } else if (level <= 5) {
        return '🥉たまに使う';
    } else if (level <= 8) {
        return '🥈普通に使う';
    } else {
        return '🥇よく使う';
    }
};

const translateIntelligenceLevel = (level: number) => {
    if (level <= 2) {
        return '🔺あまり知的ではない';
    } else if (level <= 5) {
        return '🥉少し知的';
    } else if (level <= 8) {
        return '🥈そこそこ知的';
    } else {
        return '🥇かなり知的';
    }
};

export const translateExplanation = (media: RawEntryMedia): Explanation => {
    const frequency = media.frequency_of_use_by_native_speakers;

    return new Explanation(
        media.vocabulary,
        {
            name: translateFrequencyLevel(frequency.level),
            reason: frequency.reason,
        },
        {
            name: translateIntelligenceLevel(media.intellectual_level.level),
            reason: media.intellectual_level.reason,
        },
        {
            content: media.meanings.join(', '),
            supplement: media.supplement,
        },
        media.etymology,
        media.pronunciation_symbol,
        media.collocation.map((collocation) => {
            return {
                sentence: collocation.sentence,
                japanese: collocation.japanese,
            };
        }),
        media.example_sentences.map((example) => {
            return {
                sentence: example.english,
                japanese: example.japanese,
            };
        }),
        media.similar_expressions.map((expression) => {
            return {
                sentence: expression.english,
                japanese: `「${expression.japanese}」\n${expression.point}`,
            };
        }),
    );
};
