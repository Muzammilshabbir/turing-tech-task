import { configureStore } from '@reduxjs/toolkit'
import calls from "./callSlice";
import loader from "./loaderSlice";

export const store = configureStore({
    reducer:{ calls,loader}
})