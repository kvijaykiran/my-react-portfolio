import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deg2Rad } from '../Utils';

interface SliderState {
    isPerspectiveView: boolean;
    fieldOfView: number;    // perspective view fov slider
    clipPlaneH: number;
    clipPlaneV: number;

}

const initialState: SliderState = {
    isPerspectiveView: true,
    fieldOfView: deg2Rad(45),
    clipPlaneH: -10,
    clipPlaneV: -10,
}

const uiSlice = createSlice({
    name: 'UI',
    initialState,
    reducers: {
        setIsPerspectiveView: (state, action: PayloadAction<boolean>) => {
            state.isPerspectiveView = action.payload;
        },

        setSliderFov: (state, action: PayloadAction<number>) => {
            state.fieldOfView = action.payload;
        },

        setClipPlaneH: (state, action: PayloadAction<number>) => {
            state.clipPlaneH = action.payload;
        },

        setClipPlaneV: (state, action: PayloadAction<number>) => {
            state.clipPlaneV = action.payload;
        },


    },
});

export const {setIsPerspectiveView, setSliderFov, setClipPlaneH, setClipPlaneV} = uiSlice.actions;

export default uiSlice.reducer;
