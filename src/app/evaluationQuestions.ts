import { FIVE_POINT } from './const'

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
        title: '回答中のお気持ちはいかがでしたか。',
        negative: '達成感がなかった',
        positive: '達成感があった',
        slotCount: 20,
    },
    {
        id: 'Q4',
        type: FIVE_POINT,
        title: '回答中のお気持ちはいかがでしたか。',
        negative: '満足感がなかった',
        positive: '満足感があった',
        slotCount: 20,
    },
    {
        id: 'Q5',
        type: FIVE_POINT,
        title:
            'あなたはアンケートタイプXの回答者でした。タイプXではこのようなことを検証しました。この要素についてどう思いますか。',
        negative: '有効だと思わない',
        positive: '有効だと思う',
        slotCount: 20,
    },
]
