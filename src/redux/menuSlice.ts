// features/menuSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface MenuState {
  selectedMenu: string;
}

const initialState: MenuState = {
  selectedMenu: 'View',
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    selectMenu: (state, action) => {
      state.selectedMenu = action.payload;
    },
  },
});

export const { selectMenu } = menuSlice.actions;
export default menuSlice.reducer;
