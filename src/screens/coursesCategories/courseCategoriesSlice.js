import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../api';

const initialState = {
  isLoading: false,
  isSubmitting: false,
  isSaved: false,
  error: null,
  data: [],
  getById: null,
};

export const fetchCategories = createAsyncThunk(
  'courseCategories/fetchCategories',
  async () => {
    try {
      const response = await API.get('/course-categories');
      const categories = response.data.map(category => ({
        ...category,
        key: category.id,
      }));
      return categories;
    } catch (err) {
      return error;
    }
  }
);

export const createCategory = createAsyncThunk(
  'courseCategories/createCategory',
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.post('/course-categories', data);
      response.data.key = response.data.id;
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const updateCategory = createAsyncThunk(
  'courseCategories/updateCategory',
  async (data, { rejectWithValue }) => {
    const { id, ...fields } = data;
    try {
      const response = await API.put(`/course-categories/${id}`, fields);
      response.data.key = response.data.id;
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const deleteCategory = createAsyncThunk(
  'courseCategories/deleteCategory',
  async (id, { rejectWithValue }) => {
    try {
      await API.delete('/course-categories', { data: { id } });
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const courseCategoriesSlice = createSlice({
  name: 'courseCategories',
  initialState,
  reducers: {
    getCategoryById(state, action) {
      const { payload } = action;
      const item = state.data.find(d => d.id === payload);
      state.getById = { title: item.title, type: item.type };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCategories.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      const { payload } = action;
      state.isLoading = false;
      state.data = payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      const { payload } = action;
      state.isLoading = false;
      state.error = payload;
    });
    //
    builder.addCase(createCategory.pending, state => {
      state.isSubmitting = true;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      const { payload } = action;
      state.isSubmitting = false;
      state.isSaved = true;
      state.data = [...state.data, payload];
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      const { payload } = action;
      state.isSubmitting = false;
      state.error = payload;
    });
    //
    builder.addCase(updateCategory.pending, state => {
      state.isSubmitting = true;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const { payload } = action;
      state.isSubmitting = false;
      const updateData = state.data.reduce((acc, newData) => {
        if (newData.id === payload.id) {
          return [...acc, payload];
        } else {
          return [...acc, newData];
        }
      }, []);
      state.data = updateData;
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      const { payload } = action;
      state.isSubmitting = false;
      state.error = payload;
    });
    //
    builder.addCase(deleteCategory.pending, state => {
      state.isSubmitting = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      const { payload } = action;
      state.isSubmitting = false;
      state.data = state.data.filter(item => item.id !== payload);
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      const { payload } = action;
      state.isSubmitting = false;
      state.error = payload;
    });
  },
});

export const { getCategoryById } = courseCategoriesSlice.actions;

export default courseCategoriesSlice.reducer;
