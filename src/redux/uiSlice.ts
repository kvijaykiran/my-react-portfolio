import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SliderState {
    pvsliderfov: number;    // perspective view fov slider
    pvsliderfovtitle: string;
}

const initialState: SliderState = {
    pvsliderfov: 0.8,
    pvsliderfovtitle: 'Camera FOV: 45 °',
}

const uiSlice = createSlice({
    name: 'UI',
    initialState,
    reducers: {
        setSliderPVFov: (state, action: PayloadAction<number>) => {
            state.pvsliderfov = action.payload;
        },

        setSliderPVFovTitle: (state, action: PayloadAction<string>) => {
            state.pvsliderfovtitle = action.payload;
        },

    },
});

export const {setSliderPVFov, setSliderPVFovTitle} = uiSlice.actions;

export default uiSlice.reducer;
