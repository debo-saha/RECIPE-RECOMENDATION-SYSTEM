import { create } from "zustand";
import axios from "axios";

// const API_URL = import.meta.env.MODE === "development" ? "http://localhost:1000/api/auth" : "/api/auth";

const API_URL = "http://localhost:1000/api/payments";
axios.defaults.withCredentials = true;


export const usePaymentStore = create((set) => ({
  donation: null,
  error: null,
  isLoading: false,
  isProcessing: false,
  message: null,

  // Create a new donation
  createDonation: async (email,name, text, amount) => {
    set({ isProcessing: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/donate`, { name, amount, email });
      set({
        donation: response.data.donation,
        message: 'Donation recorded successfully',
        isProcessing: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.error || 'Failed to process donation',
        isProcessing: false,
      });
      throw error;
    }
  },

  // Fetch recent donations
  fetchDonations: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/donations`);
      set({
        donation: response.data,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.error || 'Failed to fetch donations',
        isLoading: false,
      });
    }
  },
}));

// export default usePaymentStore;
