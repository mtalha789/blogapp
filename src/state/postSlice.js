import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    post :[]
}

const postSlice = createSlice({
    name:'post',
    initialState,
    reducers:{
        addPost : (state,action)=>{
            state.post.push(action.payload.post)
        },
        removePost : (state,action)=>{
            state.post=state.post.filter((element)=>element.slug !== action.payload.slug )
        },
        updatePost:(state,action)=>{
            const index = state.post.find((obj)=>obj.slug===action.payload)
        }
    }
})