import {
  createSlice,
  createAsyncThunk,
  isAsyncThunkAction,
} from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import {
  createAComponent,
  deleteBatch,
  deleteComponent,
  getComponents,
  login,
  modifyAllBatches,
  modifyAllProcess,
} from "./componentService";

// const components = JSON.parse(localStorage.getItem("components"))
const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  message: "",
  components: [],
  currComponent: {},
  currBatchName: null,
  isSuccess: false,
};

export const getAllComponents = createAsyncThunk(
  "component/getAllComponents",
  async (_, thunkAPI) => {
    try {
      return await getComponents();
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createComponent = createAsyncThunk(
  "component/createComponent",
  async (component, thunkAPI) => {
    try {
      return await createAComponent(component);
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const modifyBatches = createAsyncThunk(
  "component/modifyBatches",
  async (batches, thunkAPI) => {
    try {
      const name = thunkAPI.getState().components.currComponent;
      // console.log(name[0].name);
      return await modifyAllBatches(batches, name[0].name);
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const modifyProcess = createAsyncThunk(
  "component/modifyProcess",
  async (process, thunkAPI) => {
    try {
      const name = thunkAPI.getState().components.currComponent;
      const { currBatchName } = thunkAPI.getState().components;
      // console.log(name);
      return await modifyAllProcess(process, name[0].name, currBatchName);
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteAComponent = createAsyncThunk(
  "component/deleteAComponent",
  async (component, thunkAPI) => {
    try {
      return await deleteComponent(component);
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteABatch = createAsyncThunk(
  "/component/deleteABatch",
  async (batch, thunkAPI) => {
    try {
      const name = thunkAPI.getState().components.currComponent;
      // console.log(name[0].name);

      return await deleteBatch(batch, name[0].name);
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "/components/loginUser",
  async (data, thunkAPI) => {
    try {
      return await login(data);
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const componentSlice = createSlice({
  name: "component",
  initialState,
  reducers: {
    reset: (state) => {
      // state.components = [];
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    setCurrComponent: (state, action) => {
      state.currComponent = action.payload;
    },
    setCurrBatch: (state, action) => {
      state.currBatchName = action.payload;
    },
    setIsError: (state, action) => {
      state.isError = false;
    },
    resetError: (state, action) => {
      state.isError = false;
      state.message = "";
    },
    setBatchError: (state) => {
      state.isError = true;
      state.isSuccess = true;
      state.message = "Batch already exists";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllComponents.pending, (state) => {})
      .addCase(getAllComponents.fulfilled, (state, action) => {
        state.components = action.payload.components;
        // localStorage.setItem('components',JSON.stringify(action.payload))
        state.isError = false;
        state.message = "";
      })
      .addCase(getAllComponents.rejected, (state, action) => {
        state.message = action.payload.error;
        // console.log(action.payload);
      })
      .addCase(createComponent.pending, (state, action) => {})
      .addCase(createComponent.fulfilled, (state, action) => {
        // state.components.components = state.components.components.push(action.payload.createdComponent)
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
      })
      .addCase(createComponent.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload.error;
      })
      .addCase(modifyBatches.pending, (state) => {})
      .addCase(modifyBatches.fulfilled, (state, action) => {
        state.components.forEach((c) =>
          c.name === action.payload?.name
            ? (c.batches = action.payload?.batches)
            : c
        );
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
      })
      .addCase(modifyBatches.rejected, (state) => {})
      .addCase(modifyProcess.pending, (state) => {})
      .addCase(modifyProcess.fulfilled, (state, action) => {
        state.components.forEach((c) =>
          c.name === action.payload?.name
            ? (c.batches = action.payload?.batches)
            : c
        );
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
      })
      .addCase(modifyProcess.rejected, (state) => {})
      .addCase(deleteAComponent.pending, (state) => {})
      .addCase(deleteAComponent.fulfilled, (state, action) => {
        // console.log(action.payload.name);
        state.components = state.components.filter(
          (el) => el.name !== action.payload.component
        );
        state.isError = false;
        state.message = "";
      })
      .addCase(deleteAComponent.rejected, (state) => {})
      .addCase(deleteABatch.pending, (state) => {})
      .addCase(deleteABatch.fulfilled, (state, action) => {
        state.components.forEach((c) =>
          c.name === action.payload?.name
            ? (c.batches = c.batches.filter(
                (b) => b.batchName !== action.payload?.batch
              ))
            : c
        );
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
      })
      .addCase(deleteABatch.rejected, (state) => {})
      .addCase(loginUser.pending, (state) => {})
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload?.user;
        state.isError = false;
        state.message = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload.error;
      });
  },
});

export const {
  reset,
  setCurrComponent,
  setCurrBatch,
  setIsError,
  setBatchError,
} = componentSlice.actions;

export default componentSlice.reducer;
