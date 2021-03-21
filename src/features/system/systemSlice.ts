import { createSlice } from '@reduxjs/toolkit'
import { INTRODUCTION, Step } from '../../app/const'

export interface SystemState {
    progress: number
    drawer: boolean
    modal: boolean
    evaluation: boolean
    bonus: boolean
    step: Step
    doneDialog: boolean
    rankNotice: boolean
    bingoNotice: boolean
    bingo: boolean
    ranking: boolean
}

interface State {
    system: SystemState
}

export const initialState: SystemState = {
    progress: 0, // プログレスバー
    drawer: false, // ドロワー
    modal: false, // モーダル
    evaluation: true,
    bonus: true,
    step: INTRODUCTION,
    doneDialog: true, // 完了ダイアログ
    rankNotice: false, // 順位上昇通知
    bingoNotice: false, // ビンゴ通知
    bingo: false,
    ranking: false,
}

export const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        calculateScrollRate: (state) => {
            const innerHeight = window.innerHeight
            const element =
                document.getElementById('root') || new HTMLHtmlElement()
            const rect = element?.getBoundingClientRect()
            const elementHeight = rect?.height
            const scrollMax = elementHeight - innerHeight
            const scrollY = window.pageYOffset
            const scrollRate = ~~((scrollY / scrollMax) * 100)
            state.progress = scrollRate
        },
        setDrawer: (state, action) => {
            state.drawer = action.payload
        },
        setModal: (state, action) => {
            state.modal = action.payload
        },
        setEvaluation: (state, action) => {
            state.evaluation = action.payload
        },
        setBonus: (state, action) => {
            state.bonus = action.payload
        },
        setStep: (state, action) => {
            state.step = action.payload
        },
        setDoneDialog: (state, action) => {
            state.doneDialog = action.payload
        },
        setRankNotice: (state, action) => {
            state.rankNotice = action.payload
        },
        setBingoNotice: (state, action) => {
            state.bingoNotice = action.payload
        },
        setBingo: (state, action) => {
            state.bingo = action.payload
        },
        setRanking: (state, action) => {
            state.ranking = action.payload
        },
    },
})

export const {
    calculateScrollRate,
    setDrawer,
    setModal,
    setEvaluation,
    setBonus,
    setStep,
    setDoneDialog,
    setRankNotice,
    setBingoNotice,
    setBingo,
    setRanking,
} = systemSlice.actions

export const selectProgress = (state: State) => state.system.progress
export const selectDrawer = (state: State) => state.system.drawer
export const selectModal = (state: State) => state.system.modal
export const selectEvaluation = (state: State) => state.system.evaluation
export const selectBonus = (state: State) => state.system.bonus
export const selectStep = (state: State) => state.system.step
export const selectDoneDialog = (state: State) => state.system.doneDialog
export const selectRankNotice = (state: State) => state.system.rankNotice
export const selectBingoNotice = (state: State) => state.system.bingoNotice
export const selectBingo = (state: State) => state.system.bingo
export const selectRanking = (state: State) => state.system.ranking

export default systemSlice.reducer
