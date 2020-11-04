export const NAME = 'name'
export const DISPLAY_NAME = 'displayName'
export const FROM = 'from'
export const SEX = 'sex'
export const FIVE_POINT = 'fivePoint'
export const TEXTAREA = 'textarea'
export const NUMBER = 'number'

export const title = 'アンケートについてのアンケート'

export const questions = [
    {
        id: 'Q1',
        type: NAME,
        title: '名前',
        slotCount: 4,
    },
    {
        id: 'Q2',
        type: DISPLAY_NAME,
        title: 'ランキング表示名',
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
        slotCount: 20,
    },
    {
        id: 'Q5',
        type: FIVE_POINT,
        title: '大学の事務から依頼される調査アンケートに答えますか。',
        negative: '全て答えない',
        positive: '全て答える',
        slotCount: 20,
    },
    {
        id: 'Q6',
        type: FIVE_POINT,
        title: '友人から依頼される調査アンケートに答えますか。',
        negative: '全て答えない',
        positive: '全て答える',
        slotCount: 20,
    },
    {
        id: 'Q7',
        type: FIVE_POINT,
        title: '企業から依頼される調査アンケートに答えますか。',
        negative: '全て答えない',
        positive: '全て答える',
        slotCount: 15,
    },
    {
        id: 'Q8',
        type: TEXTAREA,
        title: 'どういう時に調査アンケートに答えますか。',
        slotCount: 15,
    },
    {
        id: 'Q9',
        type: TEXTAREA,
        title: 'どういう時に調査アンケートに答えないですか。',
        slotCount: 15,
    },
    {
        id: 'Q10',
        type: FIVE_POINT,
        title: '調査アンケートに回答することについてどう感じますか。',
        negative: 'つまらない',
        positive: '面白い',
        slotCount: 4,
    },
    {
        id: 'Q11',
        type: FIVE_POINT,
        title:
            'つまらないと感じるアンケートは回答者へのメリットがないためだという仮定についてどう思いますか。',
        negative: 'そう思わない',
        positive: 'そう思う',
        slotCount: 4,
    },
    {
        id: 'Q12',
        type: NUMBER,
        title:
            'あなたが一般的なアンケートに喜んで回答するには報酬はいくら以上必要だと思いますか。',
        unit: '円',
        slotCount: 4,
    },
    {
        id: 'Q13',
        type: NUMBER,
        title:
            '一般的に調査アンケートに答える際、設問が何問以上あると回答するのがしんどいと感じますか。',
        unit: '問',
        slotCount: 4,
    },
    {
        id: 'Q14',
        type: FIVE_POINT,
        title:
            '各設問回答後に抽選が行われ、ビンゴをプレイしながらアンケートに回答できると、回答者のモチベーションを向上させられるという仮説について、あなたはどう思いますか。',
        negative: '有効だと思わない',
        positive: '有効だと思う',
        slotCount: 4,
    },
    {
        id: 'Q15',
        type: FIVE_POINT,
        title:
            'アンケートにゲームの要素を取り入れ、その最終スコアを他の回答者にも開示すると回答者のモチベーションを向上させられるという仮説について、あなたはどう思いますか。',
        negative: '有効だと思わない',
        positive: '有効だと思う',
        slotCount: 4,
    },
    {
        id: 'Q16',
        type: FIVE_POINT,
        title:
            'ゲームのスコアが匿名（または任意のニックネーム）で開示されることに抵抗はありますか',
        negative: '抵抗がない',
        positive: '抵抗がある',
        slotCount: 4,
    },
    {
        id: 'Q17',
        type: TEXTAREA,
        title: '一般的な調査アンケートに対する不満はありますか。',
        slotCount: 4,
    },
    {
        id: 'Q18',
        type: TEXTAREA,
        title:
            'その他一般的な調査アンケートについて、または以上回答への補足等何かありますか。',
        slotCount: 4,
    },
]

export const questionsCount = questions.length
