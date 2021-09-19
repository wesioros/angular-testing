import { createReducer } from "@ngrx/store";

export const dogFeatureKey = "dog";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface State {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface

export const initialState: State = {};

export const reducer = createReducer(initialState);
