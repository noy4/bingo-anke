import { FIVE_POINT, TEXTAREA } from '../const'

export const evaluationTitle = '上で実施したアンケートについてのアンケート'

export const evaluationQuestions = [
    {
        id: 'Q1',
        type: FIVE_POINT,
        title: '本調査アンケートへの回答はいかがでしたか。',
        negative: 'つまらなかった',
        positive: '楽しかった',
        slotCount: 20,
    },
    {
        id: 'Q2',
        type: FIVE_POINT,
        title: '回答中のお気持ちはいかがでしたか。',
        negative: 'やる気が出なかった',
        positive: 'やる気が出た',
        slotCount: 20,
    },
    {
        id: 'Q3',
        type: FIVE_POINT,
        title: '回答後のお気持ちはいかがでしたか。',
        negative: '達成感がなかった',
        positive: '達成感があった',
        slotCount: 20,
    },
    {
        id: 'Q4',
        type: FIVE_POINT,
        title: '回答後のお気持ちはいかがでしたか。',
        negative: '満足感がなかった',
        positive: '満足感があった',
        slotCount: 20,
    },
    {
        id: 'Q5',
        type: FIVE_POINT,
        title:
            '各設問回答後に抽選が行われ、ビンゴをプレイしながらアンケートに回答できると、回答者のモチベーションを向上させられるという仮説について、あなたはどう思いますか。',
        negative: '有効だと思わない',
        positive: '有効だと思う',
        slotCount: 20,
    },
    {
        id: 'Q6',
        type: FIVE_POINT,
        title:
            'アンケートに「得点を稼ぐ」というゲームの要素を取り入れ、その最終得点をランキング形式で公開すると、回答者のモチベーションを向上させられるという仮説について、あなたはどう思いますか。',
        negative: '有効だと思わない',
        positive: '有効だと思う',
        slotCount: 20,
    },
    {
        id: 'Q7',
        type: FIVE_POINT,
        title: '本調査アンケートへの回答を他の人にも勧めますか。',
        negative: '勧めない',
        positive: '勧める',
        slotCount: 20,
    },
    {
        id: 'Q8',
        type: FIVE_POINT,
        title: '回答フォームの操作はいかがでしたか。',
        negative: '難しかった',
        positive: '簡単だった',
        slotCount: 20,
    },
    {
        id: 'Q9',
        type: TEXTAREA,
        title: '本調査アンケートについて、良い点は何だと思いますか。',
        slotCount: 20,
    },
    {
        id: 'Q10',
        type: TEXTAREA,
        title: '本調査アンケートについて、悪い点は何だと思いますか。',
        slotCount: 20,
    },
    {
        id: 'Q11',
        type: TEXTAREA,
        title:
            'その他本調査アンケートについて、または以上回答への補足等何かありますか。',
        slotCount: 20,
    },
]
