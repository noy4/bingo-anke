import { DISPLAY_NAME, FIVE_POINT, FROM, NAME, SEX, TEXTAREA } from '../const'

export const titleB = '大学についてのアンケート'

export const questionsB = [
    {
        id: 'Q1',
        type: NAME,
        title: '名前',
        slotCount: 4,
    },
    {
        id: 'Q2',
        type: DISPLAY_NAME,
        title: '公開名',
        slotCount: 4,
    },
    {
        id: 'Q3',
        type: FROM,
        title: '所属',
        slotCount: 4,
    },
    {
        id: 'Q4',
        type: SEX,
        title: '性別',
        slotCount: 4,
    },
    {
        id: '問',
        title:
            'あなたの大学生活に対する考えについてうかがいます。以下それぞれの項目について、あなたは大学生活にどの程度求めますか。',
    },
    {
        id: 'Q5',
        type: FIVE_POINT,
        title: '一般的・基礎的知識を身に付ける',
        negative: '求めない',
        positive: '求める',
        slotCount: 4,
    },
    {
        id: 'Q6',
        type: FIVE_POINT,
        title: '専門的な知識を身に付ける',
        negative: '求めない',
        positive: '求める',
        slotCount: 4,
    },
    {
        id: 'Q7',
        type: FIVE_POINT,
        title: '仕事に必要な技術や能力を身に付ける',
        negative: '求めない',
        positive: '求める',
        slotCount: 4,
    },
    {
        id: 'Q8',
        type: FIVE_POINT,
        title: '学歴や資格を得る',
        negative: '求めない',
        positive: '求める',
        slotCount: 4,
    },
    {
        id: 'Q9',
        type: FIVE_POINT,
        title: '自分の才能を伸ばす',
        negative: '求めない',
        positive: '求める',
        slotCount: 4,
    },
    {
        id: 'Q10',
        type: FIVE_POINT,
        title: '友達との友情を育む',
        negative: '求めない',
        positive: '求める',
        slotCount: 4,
    },
    {
        id: 'Q11',
        type: FIVE_POINT,
        title: '先生の人柄や生き方から学ぶ',
        negative: '求めない',
        positive: '求める',
        slotCount: 4,
    },
    {
        id: 'Q12',
        type: FIVE_POINT,
        title: '自由な時間を楽しむ',
        negative: '求めない',
        positive: '求める',
        slotCount: 4,
    },
    {
        id: 'Q13',
        type: FIVE_POINT,
        title: '課外活動に取り組む',
        negative: '求めない',
        positive: '求める',
        slotCount: 4,
    },
    {
        id: 'Q14',
        type: FIVE_POINT,
        title: 'あなたは、大学生活に満足していますか、それとも不満ですか。',
        negative: '不満',
        positive: '満足',
        slotCount: 4,
    },
    {
        id: 'Q15',
        type: TEXTAREA,
        title:
            '大学生活について思うこと、または以上設問に関わるコメント等何かあればお書きください。',
        slotCount: 4,
    },
]
