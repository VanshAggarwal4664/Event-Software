import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../ReduxFeatures/User/UserSlice.js'
import chatReducer from '../ReduxFeatures/Chat/ChatSlice.js'
export const store = configureStore({
   reducer:{
    user:userReducer,
    chat:chatReducer
   }
})