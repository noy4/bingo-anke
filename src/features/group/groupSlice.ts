import { createSlice } from '@reduxjs/toolkit'
import { GroupName, GROUP } from '../../app/const'

interface GroupState {
    group: GroupName
}

interface State {
    group: GroupState
}

const initialState: GroupState = {
    group: GROUP.A1,
}

const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        setGroup: (state, action) => {
            state.group = action.payload
        },
    },
})

export const { setGroup } = groupSlice.actions

export const selectGroup = (state: State) => state.group.group

export default groupSlice.reducer
