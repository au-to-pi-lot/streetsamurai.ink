import {createSlice} from "@reduxjs/toolkit";

interface SettingsState {
}

const initialState: SettingsState = {}

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {}
})

export const {} = settingsSlice.actions;
export default settingsSlice.reducer;