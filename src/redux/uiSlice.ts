import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deg2Rad } from '../Utils';

interface SliderState {
    sliderval_pvfov: number;    // perspective view fov slider
}

const initialState: SliderState = {
    sliderval_pvfov: deg2Rad(45),
}

const uiSlice = createSlice({
    name: 'UI',
    initialState,
    reducers: {
        setSliderPVFovVal: (state, action: PayloadAction<number>) => {
            state.sliderval_pvfov = action.payload;
        },

    },
});

export const {setSliderPVFovVal} = uiSlice.actions;

export default uiSlice.reducer;
