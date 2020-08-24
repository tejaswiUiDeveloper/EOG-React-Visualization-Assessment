import { createSlice, PayloadAction } from 'redux-starter-kit';
import {
  OptionTypeBase,
} from 'react-select';

export type ApiErrorAction = {
  error: string;
};

const selectedMetrics:OptionTypeBase[] = []
const metrics:OptionTypeBase[] = []

const initialState = {
  metrics,
  selectedMetrics
};

const slice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    updateMetrics: (state, action: PayloadAction<OptionTypeBase[]>) => {
      state.metrics = action.payload;
    },
    updateSelections: (state, action: PayloadAction<OptionTypeBase[]>) => {
      state.selectedMetrics = action.payload;
    }
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
