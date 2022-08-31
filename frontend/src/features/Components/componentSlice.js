import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import {
  createAComponent,
  getComponents,
  modifyAllBatches,
  modifyAllProcess,
} from "./componentService";

// const components = JSON.parse(localStorage.getItem("components"))
const initialState = {
  components: [],
  currComponent : {},
  currBatchName:null
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


export const modifyBatches = createAsyncThunk('component/modifyBatches', async(batches,thunkAPI) => {
  try {
    const name = thunkAPI.getState().components.currComponent
    console.log(name[0].name)
    return await modifyAllBatches(batches,name[0].name)
  } catch (error) {
    (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
  }
})


export const modifyProcess = createAsyncThunk('component/modifyProcess',async(process,thunkAPI) => {
  try {
    const name = thunkAPI.getState().components.currComponent
    const {currBatchName}= thunkAPI.getState().components
    console.log(name)
    return await modifyAllProcess(process,name[0].name,currBatchName)
  } catch (error) {
    (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data);
  }
})


export const componentSlice = createSlice({
  name: "component",
  initialState,
  reducers: {
    reset: (state) => {
      state.components = [];
    },
    setCurrComponent : (state,action) => {
      state.currComponent = action.payload
    },
    setCurrBatch : (state,action) => {
      state.currBatchName = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllComponents.pending, (state) => {})
      .addCase(getAllComponents.fulfilled, (state, action) => {
        state.components = action.payload;
        // localStorage.setItem('components',JSON.stringify(action.payload))
      })
      .addCase(getAllComponents.rejected, (state,action) => {
        console.log(action.payload);
      })
      .addCase(createComponent.pending, (state) => {})
      .addCase(createComponent.fulfilled, (state) => {})
      .addCase(createComponent.rejected, (state) => {
        
      })
      .addCase(modifyBatches.pending, (state) => {})
      .addCase(modifyBatches.fulfilled, (state,action) => {
        state.components.components.forEach((c) => c.name === action.payload?.name ? c.batches = action.payload?.batches : c )
      })
      .addCase(modifyBatches.rejected, (state) => {})
      .addCase(modifyProcess.pending, (state) => {})
      .addCase(modifyProcess.fulfilled, (state,action) => {
        state.components.components.forEach((c) => c.name === action.payload?.name ? c.batches = action.payload?.batches : c )
      })
      .addCase(modifyProcess.rejected, (state) => {})
      
  },
});

export const { reset,setCurrComponent,setCurrBatch } = componentSlice.actions;

export default componentSlice.reducer;
