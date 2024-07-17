import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SliderState {
    isPerspectiveView: boolean;
    isContentInfoVisible: boolean;
    clipPlaneH: number;
    clipPlaneV: number;
    clipPlaneF: number;
    fieldOfView: number;    // perspective view fov slider
}

const initialState: SliderState = {
    isPerspectiveView: true,
    isContentInfoVisible: false,
    clipPlaneH: -10,
    clipPlaneV: -10,
    clipPlaneF: -10,
    fieldOfView: 45,
}

const uiSlice = createSlice({
    name: 'UI',
    initialState,
    reducers: {
        setIsPerspectiveView: (state, action: PayloadAction<boolean>) => {
            state.isPerspectiveView = action.payload;
        },

        setIsContentInfoVisible: (state, action: PayloadAction<boolean>) => {
            state.isContentInfoVisible = action.payload;
        },

        setClipPlaneH: (state, action: PayloadAction<number>) => {
            state.clipPlaneH = action.payload;
        },

        setClipPlaneV: (state, action: PayloadAction<number>) => {
            state.clipPlaneV = action.payload;
        },

        setClipPlaneF: (state, action: PayloadAction<number>) => {
            state.clipPlaneF = action.payload;
        },

        setSliderFov: (state, action: PayloadAction<number>) => {
            state.fieldOfView = action.payload;
        },
    },
});

export const {setIsPerspectiveView, setIsContentInfoVisible, setClipPlaneH, setClipPlaneV, setClipPlaneF, setSliderFov} = uiSlice.actions;

export default uiSlice.reducer;
