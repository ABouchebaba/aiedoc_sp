import {createSelector} from 'reselect';

export const default_selector = createSelector(
  (state) => state.init,
  (init) => !init.loading,
);

export const getAllServices = createSelector(
  (state) => state.services.types,
  (types) => {
    return types.reduce((data, t) => [...data, ...t.services], []);
  },
);
