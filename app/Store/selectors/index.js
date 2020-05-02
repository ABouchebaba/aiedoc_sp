import { createSelector } from "reselect";

export const default_selector = createSelector(
  (state) => state.init,
  (init) => !init.loading
);
