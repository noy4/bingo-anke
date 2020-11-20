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
        DESCRIPTION: `実験へのご参加ありがとうございます。
            これからあなたに2つのアンケートに答えていただき、実験は終了となります。
            設問のうち、Q2.公開名 と Q3.所属 の回答内容を研究のためにWeb上で公開する事をご了承ください。
            公開名には、電話番号、住所、他のウェブサイトで使っているパスワードなど、個人情報を記入しないようご注意ください。
            ではまず1つ目のアンケートへの回答をお願いします。`,
    },
    EXPERIMENT: {
        TITLE: '回答を送信しました。',
        DESCRIPTION:
            'ありがとうございます。続いて2つ目のアンケートへの回答をお願いします。',
    },
    EVALUATION: {
        TITLE: '回答を送信しました。',
        DESCRIPTION: '以上で実験は終了です。ご協力ありがとうございました。',
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

export type GroupName =
    | typeof GROUP.A1
    | typeof GROUP.A2
    | typeof GROUP.A3
    | typeof GROUP.B1
    | typeof GROUP.B2
    | typeof GROUP.B3

export interface Question {
    id: string
    type?: string
    title: string
    negative?: string
    positive?: string
    slotCount?: number
    unit?: string
}

export const NOTICE = {
    RANK: 0,
    BINGO: 1,
}
