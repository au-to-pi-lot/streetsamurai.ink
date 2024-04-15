import { configureStore } from '@reduxjs/toolkit'
import settingsSlice from "@/src/lib/slice/settings"
import {isDevelopment} from "@/src/lib/env";

export const makeStore = () => {
  return configureStore({
    reducer: {
      settings: settingsSlice
    },
    devTools: isDevelopment
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']