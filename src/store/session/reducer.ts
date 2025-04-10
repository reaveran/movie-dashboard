import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
  lastView: Movie[];
  favorite: Movie[];
}

const initialState: SessionState = {
  lastView: [],
  favorite: [],
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setLastView: (state, action: PayloadAction<Movie[]>) => {
      state.lastView = action.payload;
    },
    setFavorite: (state, action: PayloadAction<Movie[]>) => {
      state.favorite = action.payload;
    },
    resetSession: () => initialState,
  },
});

export const { setLastView, setFavorite, resetSession } = sessionSlice.actions;

export const sessionReducer = sessionSlice.reducer;
