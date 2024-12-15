import {combineReducers} from "@reduxjs/toolkit"
import chatSlice from "./slice/chatSlice"

const rootReducer = combineReducers({
     chat: chatSlice
})

export default rootReducer