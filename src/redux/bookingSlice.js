import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCarOptions = createAsyncThunk(
  "booking/fetchCarOptions",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://assignment-booking.onrender.com/api/getOptions",
        data
      );
      return response.data.carOptions;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const confirmBooking = createAsyncThunk(
  "booking/confirmBooking",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://assignment-booking.onrender.com/api/confirmBooking",
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    addresses: [],
    selectedCar: null,
    cars: [],
    loading: false,
    error: null,
    bookingDetails: null,
  },
  reducers: {
    setSelectedCar: (state, action) => {
      state.selectedCar = action.payload;
    },
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarOptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCarOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCarOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(confirmBooking.fulfilled, (state, action) => {
        state.bookingDetails = action.payload;
        localStorage.setItem("booking", JSON.stringify(action.payload));
      });
  },
});

export const { setSelectedCar, setAddresses } = bookingSlice.actions;
export default bookingSlice.reducer;
