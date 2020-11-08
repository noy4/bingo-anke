export const INTRODUCTION = 'introduction'
export const EXPERIMENT = 'experiment'
export const EVALUATION = 'evaluation'
export const BONUS = 'bonus'
export type Step =
    | typeof INTRODUCTION
    | typeof EXPERIMENT
    | typeof EVALUATION
    | typeof BONUS

export const NAME = 'name'
export const DISPLAY_NAME = 'displayName'
export const FROM = 'from'
export const SEX = 'sex'
export const FIVE_POINT = 'fivePoint'
export const TEXTAREA = 'textarea'
export const NUMBER = 'number'

export const DIALOG = {
    INTRODUCTION: {
        TITLE: 'こんにちは。',
        DESCRIPTION:
            '実験へのご参加ありがとうございます。今からこんなことをします。よろしくお願いします。',
    },
    EXPERIMENT: {
        TITLE: '回答を送信しました。',
        DESCRIPTION:
            'ありがとうございます。続いて実験2へのご協力をお願いします。',
    },
    EVALUATION: {
        TITLE: '回答を送信しました。',
        DESCRIPTION:
            '以上で実験は終了です。ご協力いただきありがとうございました。',
    },
    BONUS: {
        TITLE: '回答を送信しました。',
        DESCRIPTION: 'うにょん',
    },
}

export const GROUP = {
    A1: '/a-1',
    A2: '/a-2',
    A3: '/a-3',
    B1: '/b-1',
    B2: '/b-2',
    B3: '/b-3',
}
