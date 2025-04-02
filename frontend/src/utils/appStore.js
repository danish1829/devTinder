import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import connectionSlice from './connectionSlice'
import requestReducer from './requestSlice'

const appStore = configureStore({
    reducer: {
        user : userReducer,
        feed : feedReducer,
        connection: connectionSlice,
        request: requestReducer,
    }
})

export default appStore