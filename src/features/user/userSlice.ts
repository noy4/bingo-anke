import { createSlice } from '@reduxjs/toolkit'
import { makeBingoCard } from '../../components/Bingo'

export interface Square {
    value: number
    isValid: boolean
}

export interface Ranker {
    iam?: boolean
    rank: number
    name: string
    from: string
    numberOfBingo: number
    score: number
}

export interface UserState {
    bingoCount: number
    score: number
    answers: {
        [key: string]: string
    }
    rankInfo: {
        prev: number
        current: number
    }
    slotCount: number
    slotValues: number[]
    bingoCard: Square[]
    balls: number[]
    rankers: Ranker[]
}

interface State {
    user: UserState
}

export const initialState: UserState = {
    bingoCard: makeBingoCard(), // ビンゴカード
    balls: Array(75) // 抽選の玉
        .fill(0)
        .map((_, i) => i + 1),
    slotCount: 1, // スロット数
    slotValues: Array(15).fill(75), // スロットの値
    rankers: [], // ランキング上のプレイヤーたち

    bingoCount: 0, // ビンゴ数
    score: 0, // スコア
    rankInfo: {
        // 順位
        prev: 0,
        current: 0,
    },
    answers: {}, // 回答
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setBingoCount: (state, action) => {
            state.bingoCount = action.payload
        },
        setScore: (state, action) => {
            state.score = action.payload
        },
        setAnswers: (state, action) => {
            state.answers = { ...state.answers, ...action.payload }
        },
        updateRankingCard: (state, action) => {
            const index = state.rankers.findIndex((ranker) => ranker.iam)
            const { key, value } = action.payload
            console.log(key, value)

            switch (key) {
                case 'familyName':
                    if (!value) {
                        state.rankers[index].name = 'あなた'
                    } else if (!state.answers.displayName) {
                        state.rankers[index].name = value
                    }
                    break
                case 'displayName':
                    if (!value) {
                        state.rankers[index].name =
                            state.answers.familyName || 'あなた'
                    } else {
                        state.rankers[index].name = value
                    }
                    break
                case 'from':
                    state.rankers[index].from = value
                    break

                default:
                    break
            }
        },
        setRankInfo: (state, action) => {
            state.rankInfo = action.payload
        },
        setSlotCount: (state, action) => {
            state.slotCount = action.payload
        },
        setSlotValues: (state, action) => {
            state.slotValues = {
                ...state.slotValues,
                ...action.payload,
            }
        },
        setBingoCard: (state, action) => {
            state.bingoCard[action.payload].isValid = true
        },
        setBalls: (state, action) => {
            state.balls = action.payload
        },
        setRankers: (state, action) => {
            state.rankers = action.payload
        },
        handleRankers: (state, action) => {
            const newRankers = state.rankers.slice()
            const prevIndex = newRankers.findIndex((ranker) => ranker.iam)
            const newRanker = newRankers[prevIndex]
            if (newRanker !== undefined) {
                newRanker.numberOfBingo = action.payload.updatedNumberOfBingo
                newRanker.score = action.payload.updatedScore
                newRanker.name =
                    state.answers.displayName ||
                    state.answers.familyName ||
                    'あなた'
            }

            newRankers.sort((a, b) => b.score - a.score)
            newRankers.sort((a, b) => b.numberOfBingo - a.numberOfBingo)
            state.rankers = newRankers

            const currentIndex = newRankers.findIndex((ranker) => ranker.iam)
            state.rankInfo = { prev: prevIndex + 1, current: currentIndex + 1 }
        },
    },
})

export const {
    setBingoCount,
    setScore,
    setAnswers,
    updateRankingCard,
    setSlotCount,
    setSlotValues,
    setBingoCard,
    setBalls,
    setRankers,
    setRankInfo,
    handleRankers,
} = userSlice.actions

export const selectBingoCount = (state: State) => state.user.bingoCount
export const selectScore = (state: State) => state.user.score
export const selectAnswers = (state: State) => state.user.answers
export const selectSlotCount = (state: State) => state.user.slotCount
export const selectSlotValues = (state: State) => state.user.slotValues
export const selectBingoCard = (state: State) => state.user.bingoCard
export const selectBalls = (state: State) => state.user.balls
export const selectRankers = (state: State) => state.user.rankers
export const selectRankInfo = (state: State) => state.user.rankInfo

export default userSlice.reducer
