import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import {deg2Rad} from '../Utils';

interface CameraState {
  position_x: number;
  position_y: number;
  position_z: number;
  rotation_x: number;
  rotation_y: number;
  rotation_z: number;
  fov: number;
}

const initialState: CameraState = {
  // position: {x: 0, y: 0, z: -20},
  // rotation: {x: -Math.PI / 2, y: -Math.PI / 2.5, z: 0},
  //rotation: {x: Math.PI/3, y: -Math.PI/2, z: 0},
  //rotation: {x: deg2Rad(90), y: deg2Rad(-90), z: 0},
  // rotation: {x: deg2Rad(90), y: deg2Rad(-90), z: 0},
  //rotation: {x: 0, y: 0, z: 0},
  
  position_x: 0,
  position_y: 0,
  position_z: -20,

  rotation_x: deg2Rad(90),
  rotation_y: deg2Rad(-90),
  rotation_z: 0,
  
  fov: 0.8, // default for Babylonjs
};

const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    setPosition_x: (state, action: PayloadAction<number>) => {
      state.position_x = action.payload;
    },
    
    setPosition_y: (state, action: PayloadAction<number>) => {
      state.position_y = action.payload;
    },
    
    setPosition_z: (state, action: PayloadAction<number>) => {
      state.position_z = action.payload;
    },
    
    setRotation_x: (state, action: PayloadAction<number>) => {
      state.rotation_x = action.payload;
    },

    setRotation_y: (state, action: PayloadAction<number>) => {
      state.rotation_y = action.payload;
    },

    setRotation_z: (state, action: PayloadAction<number>) => {
      state.rotation_z = action.payload;
    },

    setFov: (state, action: PayloadAction<number>) => {
      state.fov = action.payload;
    },

  },
});

export const { setPosition_x, setPosition_y, setPosition_z, setRotation_x, setRotation_y, setRotation_z, setFov } = cameraSlice.actions;

export default cameraSlice.reducer;
