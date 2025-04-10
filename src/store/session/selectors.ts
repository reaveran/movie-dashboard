import { RootState } from "../store";

export const lastViewSelector = (state: RootState) => state.session.lastView;
export const favoriteSelector = (state: RootState) => state.session.favorite;
