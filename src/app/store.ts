import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import systemReducer from '../features/system/systemSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        system: systemReducer,
    },
})
