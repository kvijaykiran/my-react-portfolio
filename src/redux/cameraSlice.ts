import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';

interface Vector3State {
    x: number;
    y: number;
    z: number;
  }
  

interface CameraState {
  position: Vector3State;
  rotation: Vector3State;
  //target: Vector3State;
}

const initialState: CameraState = {
  position: {x: 0, y: 0, z: -20},
  // rotation: {x: -Math.PI / 2, y: -Math.PI / 2.5, z: 0},
  rotation: {x: Math.PI/3, y: -Math.PI/2, z: 0},
  //target: {x: 0, y: 0, z: 0},
};

const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    setPosition: (state, action: PayloadAction<Vector3>) => {
      state.position = action.payload;
    },
    setRotation: (state, action: PayloadAction<Vector3>) => {
      state.rotation = action.payload;
    },
    // setTarget: (state, action: PayloadAction<Vector3>) => {
    //   state.target = action.payload;
    // }
  },
});

// export const { setPosition, setRotation, setTarget } = cameraSlice.actions;
export const { setPosition, setRotation } = cameraSlice.actions;

export default cameraSlice.reducer;
