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

export interface CounterState {
    bingoCount: number
    score: number
    playerInfo: {
        [key: string]: string
    }
    doneDialog: boolean
    drawer: boolean
    modal: boolean
    rankInfo: {
        prev: number
        current: number
    }
    rankNotice: boolean
    slotCount: number
    slotValues: number[]
    bingoCard: Square[]
    balls: number[]
    bingoNotice: boolean
    rankers: Ranker[]
}

export const initialState: CounterState = {
    bingoCount: 0,
    score: 0,
    playerInfo: {},
    doneDialog: false,
    drawer: false,
    modal: false,
    rankInfo: {
        prev: 0,
        current: 0,
    },
    rankNotice: false,
    slotCount: 1,
    slotValues: Array(15).fill(75),
    bingoCard: makeBingoCard(),
    balls: Array(75)
        .fill(0)
        .map((_, i) => i + 1),
    bingoNotice: false,
    rankers: [],
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setBingoCount: (state, action) => {
            state.bingoCount = action.payload
        },
        setScore: (state, action) => {
            state.score = action.payload
        },
        setPlayerInfo: (state, action) => {
            state.playerInfo = { ...state.playerInfo, ...action.payload }
        },
        setDoneDialog: (state, action) => {
            state.doneDialog = action.payload
        },
        setDrawer: (state, action) => {
            state.drawer = action.payload
        },
        setModal: (state, action) => {
            state.modal = action.payload
        },
        handleCloseModal: (state) => {
            state.modal = false

            if (state.rankInfo.prev !== state.rankInfo.current) {
                state.rankNotice = true
            }
        },
        setRankInfo: (state, action) => {
            state.rankInfo = action.payload
        },
        setRankNotice: (state, action) => {
            state.rankNotice = action.payload
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
        setBingoNotice: (state, action) => {
            state.bingoNotice = action.payload
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
                    state.playerInfo.displayName ||
                    state.playerInfo.familyName ||
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
    setPlayerInfo,
    setDoneDialog,
    setDrawer,
    setModal,
    handleCloseModal,
    setRankNotice,
    setSlotCount,
    setSlotValues,
    setBingoCard,
    setBalls,
    setBingoNotice,
    setRankers,
    setRankInfo,
    handleRankers,
} = counterSlice.actions

export const selectBingoCount = (state: { counter: CounterState }) =>
    state.counter.bingoCount
export const selectScore = (state: { counter: CounterState }) =>
    state.counter.score
export const selectPlayerInfo = (state: { counter: CounterState }) =>
    state.counter.playerInfo
export const selectDoneDialog = (state: { counter: CounterState }) =>
    state.counter.doneDialog
export const selectDrawer = (state: { counter: CounterState }) =>
    state.counter.drawer
export const selectModal = (state: { counter: CounterState }) =>
    state.counter.modal
export const selectRankNotice = (state: { counter: CounterState }) =>
    state.counter.rankNotice
export const selectSlotCount = (state: { counter: CounterState }) =>
    state.counter.slotCount
export const selectSlotValues = (state: { counter: CounterState }) =>
    state.counter.slotValues
export const selectBingoCard = (state: { counter: CounterState }) =>
    state.counter.bingoCard
export const selectBalls = (state: { counter: CounterState }) =>
    state.counter.balls
export const selectBingoNotice = (state: { counter: CounterState }) =>
    state.counter.bingoNotice
export const selectRankers = (state: { counter: CounterState }) =>
    state.counter.rankers
export const selectRankInfo = (state: { counter: CounterState }) =>
    state.counter.rankInfo

export default counterSlice.reducer
