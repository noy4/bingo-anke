import { FIVE_POINT, TEXTAREA } from '../const'

export const bonusTitle = 'おまけ'

export const bonusQuestions = [
    {
        id: '解説',
        title: `この実験は「アンケートにゲームの要素を取り入れる事で、回答者のモチベは向上するか」的なことの検証のために実施しました。
            被験者を「①普通アンケ」「②ビンゴアンケ」「③ビンゴアンケ＋ランキング」のグループに分け、比較実験を行いました。
            下に「③ビンゴアンケ＋ランキング」のデモを用意したので興味のある人はぜひ遊んでみてください。
            （*注 グループ③の実験を行った人は回答を送信してもランキングは更新されません。）`,
    },
    {
        id: 'Q1',
        type: FIVE_POINT,
        title: '調子はどうですか。',
        negative: '最悪',
        positive: '絶好調',
        slotCount: 6,
    },
    {
        id: 'Q2',
        type: FIVE_POINT,
        title: 'キノコ派ですかタケノコ派ですか。',
        negative: 'キノコ派',
        positive: 'タケノコ派',
        slotCount: 6,
    },
    {
        id: 'Q3',
        type: FIVE_POINT,
        title: '1人で悩んでいませんか。',
        negative: 'アカン死にたい。。',
        positive: 'ウチ。。大丈夫やから。。',
        slotCount: 6,
    },
    {
        id: 'Q4',
        type: FIVE_POINT,
        title: '本当に大丈夫ですか。',
        negative: 'もう何もかんもイヤや。。',
        positive: 'ホンマ大丈夫やから。。',
        slotCount: 6,
    },
    {
        id: 'Q5',
        type: FIVE_POINT,
        title: '苦しくなったら、いつでも相談してくださいね。',
        negative: 'うわぁぁあん(ToT)',
        positive: 'ありがとう。。泣',
        slotCount: 6,
    },
    {
        id: 'Q6',
        type: TEXTAREA,
        title: 'バストサイズを教えてください。',
        slotCount: 15,
    },
    {
        id: 'Q7',
        type: TEXTAREA,
        title: '桑村に一言',
        slotCount: 15,
    },
]
