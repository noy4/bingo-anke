import { FIVE_POINT } from './const'

export const bonusTitle = '上で実施したアンケートについてのアンケート'

export const bonusQuestions = [
    {
        id: 'Q1',
        type: FIVE_POINT,
        title: '今の日本政治についてどう思いますか。',
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
]
