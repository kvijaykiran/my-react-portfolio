import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deg2Rad } from '../Utils';

interface SliderState {
    sliderval_pvfov: number;    // perspective view fov slider
    clipplaneval_h: number;
    clipplaneval_v: number;

}

const initialState: SliderState = {
    sliderval_pvfov: deg2Rad(45),
    clipplaneval_h: 0,
    clipplaneval_v: 0,
}

const uiSlice = createSlice({
    name: 'UI',
    initialState,
    reducers: {
        setSliderPVFovVal: (state, action: PayloadAction<number>) => {
            state.sliderval_pvfov = action.payload;
        },

        setClipPlaneH: (state, action: PayloadAction<number>) => {
            state.clipplaneval_h = action.payload;
        },

        setClipPlaneV: (state, action: PayloadAction<number>) => {
            state.clipplaneval_v = action.payload;
        },


    },
});

export const {setSliderPVFovVal, setClipPlaneH, setClipPlaneV} = uiSlice.actions;

export default uiSlice.reducer;
