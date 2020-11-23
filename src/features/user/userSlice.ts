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
    bingoCount: number
    score: number
}

interface Answer {
    [key: string]: string
}

export interface UserState {
    bingoCount: number
    score: number
    answers: {
        experiment: Answer
        evaluation: Answer
        bonus: Answer
        [key: string]: Answer
    }
    unusedGalapons: string[]
    rankInfo: {
        prev: number
        current: number
    }
    slotCount: number
    slotValues: number[]
    bingoCard: Square[]
    balls: number[]
    rankers: Ranker[]
    userId: string
    startTime: number
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
    answers: {
        experiment: {},
        evaluation: {},
        bonus: {},
    }, // 回答
    unusedGalapons: [],
    userId: '',
    startTime: 0,
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
            const { key, value } = action.payload
            state.answers[key] = { ...state.answers[key], ...value }
        },
        setUnusedGalapons: (state, action) => {
            state.unusedGalapons = action.payload
        },
        removeUsedGalapon: (state, action) => {
            state.unusedGalapons = state.unusedGalapons.filter(
                (v) => v !== action.payload
            )
            console.log(action.payload)
            console.log(state.unusedGalapons)
        },
        updateRankingCard: (state, action) => {
            const index = state.rankers.findIndex((ranker) => ranker.iam)
            const { key, value } = action.payload

            switch (key) {
                case 'familyName':
                    if (!value) {
                        state.rankers[index].name = 'あなた'
                    } else if (!state.answers.experiment.displayName) {
                        state.rankers[index].name = value
                    }
                    break
                case 'displayName':
                    if (!value) {
                        state.rankers[index].name =
                            state.answers.experiment.familyName || 'あなた'
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
        setSquareTrue: (state, action) => {
            state.bingoCard[action.payload].isValid = true
        },
        resetBingoCard: (state) => {
            state.bingoCard = makeBingoCard()
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
                newRanker.bingoCount = action.payload.updatedBingoCount
                newRanker.score = action.payload.updatedScore
                newRanker.name =
                    state.answers.experiment.displayName ||
                    state.answers.experiment.familyName ||
                    'あなた'
            }

            newRankers.sort((a, b) => b.score - a.score)
            newRankers.sort((a, b) => b.bingoCount - a.bingoCount)
            state.rankers = newRankers

            const currentIndex = newRankers.findIndex((ranker) => ranker.iam)
            state.rankInfo = { prev: prevIndex + 1, current: currentIndex + 1 }
        },
        setUserId: (state, action) => {
            state.userId = action.payload
        },
        setStartTime: (state, action) => {
            state.startTime = action.payload
        },
        setNewIam: (state) => {
            const index = state.rankers.findIndex((ranker) => ranker.iam)
            state.rankers[index].iam = false
            state.rankers.push({
                iam: true,
                rank: 0,
                name:
                    state.answers.experiment.displayName ||
                    state.answers.experiment.familyName,
                from: state.answers.experiment.from || '',
                bingoCount: 0,
                score: 0,
            })
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
    setSquareTrue,
    resetBingoCard,
    setBalls,
    setRankers,
    setRankInfo,
    handleRankers,
    setUserId,
    setStartTime,
    setNewIam,
    setUnusedGalapons,
    removeUsedGalapon,
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
export const selectUserId = (state: State) => state.user.userId
export const selectStartTime = (state: State) => state.user.startTime
export const selectUnusedGalapons = (state: State) => state.user.unusedGalapons

export default userSlice.reducer
