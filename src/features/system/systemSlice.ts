import { createSlice } from '@reduxjs/toolkit'

export interface SystemState {
    progress: number
    drawer: boolean
    modal: boolean
    doneDialog: boolean
    rankNotice: boolean
    bingoNotice: boolean
}

interface State {
    system: SystemState
}

export const initialState: SystemState = {
    progress: 0, // プログレスバー
    drawer: false, // ドロワー
    modal: false, // モーダル
    doneDialog: false, // 完了ダイアログ
    rankNotice: false, // 順位上昇通知
    bingoNotice: false, // ビンゴ通知
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
        setDoneDialog: (state, action) => {
            state.doneDialog = action.payload
        },
        setRankNotice: (state, action) => {
            state.rankNotice = action.payload
        },
        setBingoNotice: (state, action) => {
            state.bingoNotice = action.payload
        },
    },
})

export const {
    calculateScrollRate,
    setDrawer,
    setModal,
    setDoneDialog,
    setRankNotice,
    setBingoNotice,
} = systemSlice.actions

export const selectProgress = (state: State) => state.system.progress
export const selectDrawer = (state: State) => state.system.drawer
export const selectModal = (state: State) => state.system.modal
export const selectDoneDialog = (state: State) => state.system.doneDialog
export const selectRankNotice = (state: State) => state.system.rankNotice
export const selectBingoNotice = (state: State) => state.system.bingoNotice

export default systemSlice.reducer
