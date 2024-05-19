import { Explanation } from '../open-ai/explanation';
import { notion } from './client';
import { createProperties, Frequency, Intelligence } from './property';
import { type CreatePageParameters } from '@notionhq/client/build/src/api-endpoints';

export type VocabularyPageJson = {
    properties: ReturnType<typeof createProperties>;
    children: Array<object>;
};

const createFrequencyArea = (frequency: string, reason: string) => {
    return {
        object: 'block',
        archived: false,
        callout: {
            icon: {
                type: 'emoji',
                emoji: '🗣',
            },
            color: 'gray_background',
            rich_text: [
                {
                    type: 'text',
                    text: {
                        content: frequency,
                        link: null,
                    },
                    annotations: {
                        bold: false,
                        italic: false,
                        strikethrough: false,
                        underline: false,
                        code: false,
                        color: 'default',
                    },
                },
            ],
            children: [
                {
                    type: 'divider',
                    divider: {},
                },
                {
                    has_children: true,
                    archived: false,
                    in_trash: false,
                    type: 'toggle',
                    toggle: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: '理由',
                                    link: null,
                                },
                                annotations: {
                                    bold: true,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: true,
                                    color: 'gray',
                                },
                                plain_text: '理由',
                                href: null,
                            },
                        ],
                        color: 'default',
                        children: [
                            {
                                object: 'block',
                                has_children: false,
                                archived: false,
                                in_trash: false,
                                type: 'paragraph',
                                paragraph: {
                                    rich_text: [
                                        {
                                            type: 'text',
                                            text: {
                                                content: reason,
                                                link: null,
                                            },
                                            annotations: {
                                                bold: false,
                                                italic: false,
                                                strikethrough: false,
                                                underline: false,
                                                code: false,
                                                color: 'gray',
                                            },
                                            plain_text: reason,
                                            href: null,
                                        },
                                    ],
                                    color: 'default',
                                },
                            },
                        ],
                    },
                },
            ],
        },
    };
};

export const createIntelligenceArea = (intelligence: string, reason: string) => {
    return {
        object: 'block',
        archived: false,
        in_trash: false,
        type: 'callout',
        callout: {
            rich_text: [
                {
                    type: 'text',
                    text: {
                        content: intelligence,
                        link: null,
                    },
                    annotations: {
                        bold: false,
                        italic: false,
                        strikethrough: false,
                        underline: false,
                        code: false,
                        color: 'default',
                    },
                    plain_text: intelligence,
                    href: null,
                },
            ],
            icon: {
                type: 'emoji',
                emoji: '👨\u200d🎓',
            },
            color: 'gray_background',
            children: [
                {
                    archived: false,
                    in_trash: false,
                    type: 'divider',
                    divider: {},
                },
                {
                    object: 'block',
                    has_children: true,
                    archived: false,
                    in_trash: false,
                    type: 'toggle',
                    toggle: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: '理由',
                                    link: null,
                                },
                                annotations: {
                                    bold: true,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: true,
                                    color: 'gray',
                                },
                                plain_text: '理由',
                                href: null,
                            },
                        ],
                        color: 'default',
                        children: [
                            {
                                object: 'block',
                                has_children: false,
                                archived: false,
                                in_trash: false,
                                type: 'paragraph',
                                paragraph: {
                                    rich_text: [
                                        {
                                            type: 'text',
                                            text: {
                                                content: reason,
                                                link: null,
                                            },
                                            annotations: {
                                                bold: false,
                                                italic: false,
                                                strikethrough: false,
                                                underline: false,
                                                code: false,
                                                color: 'gray',
                                            },
                                            plain_text: reason,
                                            href: null,
                                        },
                                    ],
                                    color: 'default',
                                },
                            },
                        ],
                    },
                },
            ],
        },
    };
};

export const createMeaningArea = (meaning: string, supplement: string) => {
    return {
        object: 'block',
        has_children: true,
        archived: false,
        in_trash: false,
        type: 'toggle',
        toggle: {
            rich_text: [
                {
                    type: 'text',
                    text: {
                        content: '意味',
                        link: null,
                    },
                    annotations: {
                        bold: true,
                        italic: false,
                        strikethrough: false,
                        underline: false,
                        code: false,
                        color: 'blue',
                    },
                    plain_text: '意味',
                    href: null,
                },
            ],
            color: 'gray_background',
            children: [
                {
                    object: 'block',
                    has_children: false,
                    archived: false,
                    in_trash: false,
                    type: 'paragraph',
                    paragraph: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: meaning,
                                    link: null,
                                },
                                annotations: {
                                    bold: true,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: 'gray',
                                },
                                plain_text: meaning,
                                href: null,
                            },
                        ],
                        color: 'default',
                    },
                },
                {
                    object: 'block',
                    has_children: false,
                    archived: false,
                    in_trash: false,
                    type: 'paragraph',
                    paragraph: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: '',
                                    link: null,
                                },
                                annotations: {
                                    bold: true,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: 'gray',
                                },
                                plain_text: '',
                                href: null,
                            },
                        ],
                        color: 'default',
                    },
                },
                {
                    object: 'block',
                    has_children: false,
                    archived: false,
                    in_trash: false,
                    type: 'divider',
                    divider: {},
                },
                {
                    object: 'block',
                    has_children: false,
                    archived: false,
                    in_trash: false,
                    type: 'paragraph',
                    paragraph: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: supplement,
                                    link: null,
                                },
                                annotations: {
                                    bold: false,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: 'gray',
                                },
                                plain_text: supplement,
                                href: null,
                            },
                        ],
                        color: 'default',
                    },
                },
                {
                    object: 'block',
                    has_children: false,
                    archived: false,
                    in_trash: false,
                    type: 'paragraph',
                    paragraph: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: '',
                                    link: null,
                                },
                                annotations: {
                                    bold: true,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: 'gray',
                                },
                                plain_text: '',
                                href: null,
                            },
                        ],
                        color: 'default',
                    },
                },
            ],
        },
    };
};

export const createEtymologyArea = (etymology: string) => {
    return {
        object: 'block',
        has_children: true,
        archived: false,
        in_trash: false,
        type: 'toggle',
        toggle: {
            rich_text: [
                {
                    type: 'text',
                    text: {
                        content: '語源',
                        link: null,
                    },
                    annotations: {
                        bold: true,
                        italic: false,
                        strikethrough: false,
                        underline: false,
                        code: false,
                        color: 'blue',
                    },
                    plain_text: '語源',
                    href: null,
                },
            ],
            color: 'gray_background',
            children: [
                {
                    object: 'block',
                    has_children: false,
                    archived: false,
                    in_trash: false,
                    type: 'paragraph',
                    paragraph: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: etymology,
                                    link: null,
                                },
                                annotations: {
                                    bold: false,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: 'gray',
                                },
                                plain_text: etymology,
                                href: null,
                            },
                        ],
                        color: 'default',
                    },
                },
                {
                    object: 'block',
                    has_children: false,
                    archived: false,
                    in_trash: false,
                    type: 'paragraph',
                    paragraph: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: '',
                                    link: null,
                                },
                                annotations: {
                                    bold: false,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: 'gray',
                                },
                                plain_text: '',
                                href: null,
                            },
                        ],
                        color: 'default',
                    },
                },
                {
                    object: 'block',
                    has_children: false,
                    archived: false,
                    in_trash: false,
                    type: 'paragraph',
                    paragraph: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: '',
                                    link: null,
                                },
                                annotations: {
                                    bold: false,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: 'gray',
                                },
                                plain_text: '',
                                href: null,
                            },
                        ],
                        color: 'default',
                    },
                },
            ],
        },
    };
};

export const createPronunciationArea = (vocabulary: string, pronunciation: string) => {
    return {
        object: 'block',
        has_children: true,
        archived: false,
        in_trash: false,
        type: 'toggle',
        toggle: {
            rich_text: [
                {
                    type: 'text',
                    text: {
                        content: '発音',
                        link: {
                            url: `https://youglish.com/pronounce/${vocabulary}/us?`,
                        },
                    },
                    annotations: {
                        bold: true,
                        italic: false,
                        strikethrough: false,
                        underline: false,
                        code: false,
                        color: 'blue',
                    },
                    plain_text: '発音',
                    href: `https://youglish.com/pronounce/${vocabulary}/us?`,
                },
            ],
            color: 'gray_background',
            children: [
                {
                    object: 'block',
                    has_children: false,
                    archived: false,
                    in_trash: false,
                    type: 'paragraph',
                    paragraph: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: `■ ${pronunciation}`,
                                    link: null,
                                },
                                annotations: {
                                    bold: false,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: 'gray',
                                },
                                plain_text: `■ ${pronunciation}`,
                                href: null,
                            },
                        ],
                        color: 'default',
                    },
                },
                {
                    object: 'block',
                    has_children: false,
                    archived: false,
                    in_trash: false,
                    type: 'paragraph',
                    paragraph: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: '',
                                    link: null,
                                },
                                annotations: {
                                    bold: false,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: 'gray',
                                },
                                plain_text: '',
                                href: null,
                            },
                        ],
                        color: 'default',
                    },
                },
                {
                    object: 'block',
                    has_children: false,
                    archived: false,
                    in_trash: false,
                    type: 'paragraph',
                    paragraph: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: '',
                                    link: null,
                                },
                                annotations: {
                                    bold: false,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: 'gray',
                                },
                                plain_text: '',
                                href: null,
                            },
                        ],
                        color: 'default',
                    },
                },
                {
                    object: 'block',
                    has_children: false,
                    archived: false,
                    in_trash: false,
                    type: 'paragraph',
                    paragraph: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: '🔉 発音を聞く',
                                    link: {
                                        url: `https://youglish.com/pronounce/${vocabulary}/us?`,
                                    },
                                },
                                annotations: {
                                    bold: false,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: 'gray',
                                },
                                plain_text: '🔉 発音を聞く',
                                href: `https://youglish.com/pronounce/${vocabulary}/us?`,
                            },
                        ],
                        color: 'default',
                    },
                },
            ],
        },
    };
};

export const createCollocationPart = (sentence: string, collocation: string) => {
    return {
        object: 'block',
        has_children: false,
        archived: false,
        in_trash: false,
        type: 'paragraph',
        paragraph: {
            rich_text: [
                {
                    type: 'text',
                    text: {
                        content: `■ ${sentence}`,
                        link: null,
                    },
                    annotations: {
                        bold: false,
                        italic: false,
                        strikethrough: false,
                        underline: false,
                        code: false,
                        color: 'default',
                    },
                    plain_text: `■ ${sentence}`,
                    href: null,
                },
            ],
            color: 'default',
            children: [
                {
                    object: 'block',
                    type: 'paragraph',

                    paragraph: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: collocation,
                                    link: null,
                                },
                                annotations: {
                                    bold: false,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: 'default',
                                },
                                plain_text: collocation,
                                href: null,
                            },
                        ],
                        color: 'default',
                    },
                },
            ],
        },
    };
};

export const createCollocationArea = (
    explanations: {
        sentence: string;
        japanese: string;
    }[],
) => {
    return {
        object: 'block',
        has_children: true,
        archived: false,
        in_trash: false,
        type: 'callout',
        callout: {
            rich_text: [
                {
                    type: 'text',
                    text: {
                        content: 'コロケーション',
                        link: null,
                    },
                    annotations: {
                        bold: true,
                        italic: false,
                        strikethrough: false,
                        underline: false,
                        code: false,
                        color: 'blue',
                    },
                    plain_text: 'コロケーション',
                    href: null,
                },
            ],
            icon: {
                type: 'emoji',
                emoji: '🔗',
            },
            color: 'blue_background',
            children: explanations.map((explanation) =>
                createCollocationPart(explanation.sentence, explanation.japanese),
            ),
        },
    };
};

const createExampleChild = (sentence: string, japanese: string) => {
    return {
        object: 'block',
        has_children: false,
        archived: false,
        in_trash: false,
        type: 'paragraph',
        paragraph: {
            rich_text: [
                {
                    type: 'text',
                    text: {
                        content: `■ ${sentence}`,
                        link: null,
                    },
                    annotations: {
                        bold: false,
                        italic: false,
                        strikethrough: false,
                        underline: false,
                        code: false,
                        color: 'default',
                    },
                    plain_text: `■ ${sentence}`,
                    href: null,
                },
            ],
            color: 'default',
            children: [
                {
                    object: 'block',
                    type: 'paragraph',

                    paragraph: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: japanese,
                                    link: null,
                                },
                                annotations: {
                                    bold: false,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: 'default',
                                },
                                plain_text: japanese,
                                href: null,
                            },
                        ],
                        color: 'default',
                    },
                },
            ],
        },
    };
};

export const createExampleArea = (examples: { sentence: string; japanese: string }[]) => {
    return {
        object: 'block',
        has_children: true,
        archived: false,
        in_trash: false,
        type: 'callout',
        callout: {
            rich_text: [
                {
                    type: 'text',
                    text: {
                        content: '例文',
                        link: null,
                    },
                    annotations: {
                        bold: true,
                        italic: false,
                        strikethrough: false,
                        underline: false,
                        code: false,
                        color: 'blue',
                    },
                    plain_text: '例文',
                    href: null,
                },
            ],
            icon: {
                type: 'emoji',
                emoji: '📘',
            },
            color: 'blue_background',
            children: examples.map((example) => createExampleChild(example.sentence, example.japanese)),
        },
    };
};

const createImageArea = (vocabulary: string) => {
    return {
        object: 'block',
        has_children: true,
        archived: false,
        in_trash: false,
        type: 'callout',
        callout: {
            rich_text: [
                {
                    type: 'text',
                    text: {
                        content: 'イメージ',
                        link: null,
                    },
                    annotations: {
                        bold: true,
                        italic: false,
                        strikethrough: false,
                        underline: false,
                        code: false,
                        color: 'orange',
                    },
                    plain_text: 'イメージ',
                    href: null,
                },
            ],
            icon: {
                type: 'emoji',
                emoji: '🖼',
            },
            color: 'yellow_background',
            children: [
                {
                    object: 'block',
                    has_children: false,
                    archived: false,
                    in_trash: false,
                    type: 'paragraph',
                    paragraph: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: 'definitionで画像を検索',
                                    link: {
                                        url: `https://www.google.com/search?q=${vocabulary}+definition&tbm=isch`,
                                    },
                                },
                                annotations: {
                                    bold: false,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: 'default',
                                },
                                plain_text: 'definitionで画像を検索',
                                href: 'https://www.google.com/search?q=${vocabulary}+definition&tbm=isch',
                            },
                        ],
                        color: 'blue',
                    },
                },
                {
                    object: 'block',
                    has_children: false,
                    archived: false,
                    in_trash: false,
                    type: 'paragraph',
                    paragraph: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: 'definitionなしで画像を検索',
                                    link: {
                                        url: `https://www.google.com/search?q=${vocabulary}&tbm=isch`,
                                    },
                                },
                                annotations: {
                                    bold: false,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: 'default',
                                },
                                plain_text: 'definitionなしで画像を検索',
                                href: `https://www.google.com/search?q=${vocabulary}&tbm=isch`,
                            },
                        ],
                        color: 'blue',
                    },
                },
            ],
        },
    };
};

const createPseudoExpressionChild = (sentence: string, japanese: string) => {
    return {
        object: 'block',
        has_children: false,
        archived: false,
        in_trash: false,
        type: 'paragraph',
        paragraph: {
            rich_text: [
                {
                    type: 'text',
                    text: {
                        content: `■ ${sentence}`,
                        link: null,
                    },
                    annotations: {
                        bold: false,
                        italic: false,
                        strikethrough: false,
                        underline: false,
                        code: false,
                        color: 'default',
                    },
                    plain_text: `■ ${sentence}`,
                    href: null,
                },
            ],
            color: 'default',
            children: [
                {
                    object: 'block',
                    type: 'paragraph',

                    paragraph: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: japanese,
                                    link: null,
                                },
                                annotations: {
                                    bold: false,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: false,
                                    color: 'default',
                                },
                                plain_text: japanese,
                                href: null,
                            },
                        ],
                        color: 'default',
                    },
                },
            ],
        },
    };
};

export const createPseudoExpression = (expressions: { sentence: string; japanese: string }[]) => {
    return {
        object: 'block',
        has_children: true,
        archived: false,
        in_trash: false,
        type: 'callout',
        callout: {
            rich_text: [
                {
                    type: 'text',
                    text: {
                        content: '類似表現',
                        link: null,
                    },
                    annotations: {
                        bold: true,
                        italic: false,
                        strikethrough: false,
                        underline: false,
                        code: false,
                        color: 'green',
                    },
                    plain_text: '類似表現',
                    href: null,
                },
            ],
            icon: {
                type: 'emoji',
                emoji: '🪞',
            },
            color: 'green_background',
            children: expressions.map((expression) =>
                createPseudoExpressionChild(expression.sentence, expression.japanese),
            ),
        },
    };
};

const createIllustrationArea = (vocabulary: string) => {
    return {
        object: 'block',
        has_children: true,
        archived: false,
        in_trash: false,
        type: 'callout',
        callout: {
            rich_text: [
                {
                    type: 'text',
                    text: {
                        content: '実例',
                        link: null,
                    },
                    annotations: {
                        bold: true,
                        italic: false,
                        strikethrough: false,
                        underline: false,
                        code: false,
                        color: 'green',
                    },
                    plain_text: '実例',
                    href: null,
                },
            ],
            icon: {
                type: 'emoji',
                emoji: '💡',
            },
            color: 'green_background',
            children: [
                {
                    object: 'block',
                    has_children: false,
                    archived: false,
                    in_trash: false,
                    type: 'paragraph',
                    paragraph: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: '🔍 洋画でチェック',
                                    link: {
                                        url: `https://www.playphrase.me/#/search?q=${vocabulary}`,
                                    },
                                },
                                annotations: {
                                    bold: true,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: true,
                                    color: 'blue',
                                },
                                plain_text: '🔍 洋画でチェック',
                                href: `https://www.playphrase.me/#/search?q=${vocabulary}`,
                            },
                        ],
                        color: 'default',
                    },
                },
                {
                    object: 'block',
                    has_children: false,
                    archived: false,
                    in_trash: false,
                    type: 'paragraph',
                    paragraph: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: '🔍 youglishでチェック',
                                    link: {
                                        url: `https://youglish.com/pronounce/${vocabulary}/us?`,
                                    },
                                },
                                annotations: {
                                    bold: true,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: true,
                                    color: 'blue',
                                },
                                plain_text: '🔍 youglish',
                                href: 'https://youglish.com/pronounce/english/us?',
                            },
                        ],
                        color: 'default',
                    },
                },
                {
                    object: 'block',
                    has_children: false,
                    archived: false,
                    in_trash: false,
                    type: 'paragraph',
                    paragraph: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: '🔍 Youtubeでチェック',
                                    link: {
                                        url: `https://youglish.com/pronounce/${vocabulary}/us?`,
                                    },
                                },
                                annotations: {
                                    bold: true,
                                    italic: false,
                                    strikethrough: false,
                                    underline: false,
                                    code: true,
                                    color: 'blue',
                                },
                                plain_text: '🔍 Youtubeでチェック',
                                href: `https://youglish.com/pronounce/${vocabulary}/english`,
                            },
                        ],
                        color: 'default',
                    },
                },
            ],
        },
    };
};

const createVocabularyPageSource = (explanation: Explanation): VocabularyPageJson => {
    return {
        properties: createProperties(
            explanation.vocabulary,
            'yet',
            explanation.frequency.name as Frequency,
            explanation.intelligence.name as Intelligence,
        ),
        children: [
            createFrequencyArea(explanation.frequency.name, explanation.frequency.reason),
            createIntelligenceArea(explanation.intelligence.name, explanation.intelligence.reason),
            createMeaningArea(explanation.meaning.content, explanation.meaning.supplement),
            createPronunciationArea(explanation.vocabulary, explanation.pronunciation),
            createCollocationArea(explanation.collocations),
            createExampleArea(explanation.examples),
            createImageArea(explanation.vocabulary),
            createPseudoExpression(explanation.expressions),
            createIllustrationArea(explanation.vocabulary),
        ],
    };
};

export const createVocabularyPage = async (explanation: Explanation): Promise<void> => {
    try {
        await notion.pages.create({
            parent: {
                database_id: process.env.NOTION_DATABASE_ID || '',
            },
            properties: createVocabularyPageSource(explanation).properties as CreatePageParameters['properties'],
            children: createVocabularyPageSource(explanation).children as CreatePageParameters['children'],
        });
    } catch (error) {
        console.log(error);
    }
};
