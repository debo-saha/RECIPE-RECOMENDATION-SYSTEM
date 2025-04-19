import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:1000/api/posts";
axios.defaults.withCredentials = true;

export const usePostStore = create((set) => ({
  posts: [],
  error: null,
  isLoading: false,
  isProcessing: false,
  message: null,

  fetchPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/getrecipe`);
      set({ posts: Array.isArray(response.data) ? response.data : [], isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.error || "Failed to fetch posts",
        isLoading: false,
      });
    }
  },

  createPost: async (recipe_name, recipe_process, creator, recipe_tags, recipe_image_url) => {
    set({ isProcessing: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/createRecipe`, {
        recipe_name,
        recipe_process,
        creator,
        recipe_tags, // Already converted to an array in the frontend
        recipe_image_url})
        set({
          post:response.data,
          message: "Post created successfully",
          isProcessing: false,
        })
      ;

      ;
    } catch (error) {
      set({
        error: error.response?.data?.error || "Failed to create post",
        isProcessing: false,
      });
    }
  },
}));
