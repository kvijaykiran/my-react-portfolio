import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SliderState {
    pvsliderfov: number;    // perspective view fov slider
}

const initialState: SliderState = {
    pvsliderfov: 0.8,
}

const uiSlice = createSlice({
    name: 'UI',
    initialState,
    reducers: {
        setSliderPVFov: (state, action: PayloadAction<number>) => {
            state.pvsliderfov = action.payload;
        },
    },
});

export const {setSliderPVFov} = uiSlice.actions;

export default uiSlice.reducer;
