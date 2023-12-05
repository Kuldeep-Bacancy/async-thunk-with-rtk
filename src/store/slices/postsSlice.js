import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts"

const initialState = {
  posts: [],
  status: "idle",
  error: ""
}


export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(BASE_URL)
  return response.data
})

export const deletePost = createAsyncThunk("post/deletePost", async (initialPost) => {
  const { id } = initialPost
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    if (response?.status === 200) return initialPost;
    return `${response.status} : ${response.statusText}`;
  } catch (error) {
    return error.message
  }
})


const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {},
  extraReducers(builder){
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.posts = state.posts.concat(action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action?.payload) {
          console.log("could not delete");
          console.log(action.payload)
          return
        }

        const id = action.payload;
        const OldPosts = state.posts.filter(post =>
          post.id !== id)
        state.posts = OldPosts
      })
    }
})

export default postsSlice.reducer