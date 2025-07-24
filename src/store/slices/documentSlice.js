import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { documentAPI } from '../../services/api';

const initialState = {
  documents: [],
  document: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
};

// Get all documents
export const getDocuments = createAsyncThunk(
  'documents/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await documentAPI.getAll();
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get document by ID
export const getDocumentById = createAsyncThunk(
  'documents/getById',
  async (id, thunkAPI) => {
    try {
      const response = await documentAPI.getById(id);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Upload document
export const uploadDocument = createAsyncThunk(
  'documents/upload',
  async (formData, thunkAPI) => {
    try {
      const response = await documentAPI.upload(formData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Download document
export const downloadDocument = createAsyncThunk(
  'documents/download',
  async (id, thunkAPI) => {
    try {
      const response = await documentAPI.download(id);
      
      // Get the filename from the Content-Disposition header if available
      let filename = `document-${id}`;
      const contentDisposition = response.headers['content-disposition'];
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/i);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1];
        }
      }
      
      // Create a URL for the blob and trigger download
      // Use the response data directly as a blob instead of creating a new one
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      return id;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete document
export const deleteDocument = createAsyncThunk(
  'documents/delete',
  async (id, thunkAPI) => {
    try {
      await documentAPI.delete(id);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    clearDocument: (state) => {
      state.document = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get all documents
      .addCase(getDocuments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDocuments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.documents = action.payload;
      })
      .addCase(getDocuments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get document by ID
      .addCase(getDocumentById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDocumentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.document = action.payload;
      })
      .addCase(getDocumentById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Upload document
      .addCase(uploadDocument.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.documents.push(action.payload);
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Download document (only handle loading and errors)
      .addCase(downloadDocument.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(downloadDocument.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(downloadDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete document
      .addCase(deleteDocument.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.documents = state.documents.filter((doc) => doc._id !== action.payload);
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset, clearDocument } = documentSlice.actions;
export default documentSlice.reducer;