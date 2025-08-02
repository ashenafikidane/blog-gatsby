import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  author: string;
  summary: string;
  content: string;
  tags: string[];
}

interface BlogFormState {
  currentPost: Partial<BlogPost>;
  posts: BlogPost[];
  isEditing: boolean;
}

const initialState: BlogFormState = {
  currentPost: {
    title: '',
    slug: '',
    date: new Date().toISOString().split('T')[0],
    author: '',
    summary: '',
    content: '',
    tags: [],
  },
  posts: [],
  isEditing: false,
};

const blogFormSlice = createSlice({
  name: 'blogForm',
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<{ field: keyof BlogPost; value: any }>) => {
      const { field, value } = action.payload;
      state.currentPost[field] = value;
    },
    setCurrentPost: (state, action: PayloadAction<BlogPost>) => {
      state.currentPost = action.payload;
      state.isEditing = true;
    },
    clearForm: (state) => {
      state.currentPost = {
        title: '',
        slug: '',
        date: new Date().toISOString().split('T')[0],
        author: '',
        summary: '',
        content: '',
        tags: [],
      };
      state.isEditing = false;
    },
    savePost: (state, action: PayloadAction<BlogPost>) => {
      const existingIndex = state.posts.findIndex(post => post.id === action.payload.id);
      if (existingIndex >= 0) {
        state.posts[existingIndex] = action.payload;
      } else {
        state.posts.push(action.payload);
      }
      // Save to localStorage
      localStorage.setItem('blogPosts', JSON.stringify(state.posts));
    },
    loadPosts: (state) => {
      const savedPosts = localStorage.getItem('blogPosts');
      if (savedPosts) {
        state.posts = JSON.parse(savedPosts);
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
      localStorage.setItem('blogPosts', JSON.stringify(state.posts));
    },
  },
});

export const { 
  updateField, 
  setCurrentPost, 
  clearForm, 
  savePost, 
  loadPosts, 
  deletePost 
} = blogFormSlice.actions;

export default blogFormSlice.reducer; 