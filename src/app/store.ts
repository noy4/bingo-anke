import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import systemReducer from '../features/system/systemSlice'
import groupReducer from '../features/group/groupSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        system: systemReducer,
        group: groupReducer,
    },
})
