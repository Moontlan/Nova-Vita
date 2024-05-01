import { createSlice } from "@reduxjs/toolkit";

const US = {
  idInstitucion: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: US,
  reducers: {
    addUser: (state, action) => {
      state.idInstitucion = action.idInstitucion;
    },
    deleteUser: (state, action) => {
      state.idInstitucion = null;
    }
  },
});

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
