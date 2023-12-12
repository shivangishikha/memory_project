import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from "../constants/actionType.js"
import * as  api from '../api/index';

export const getPosts = () => async(dispatch) => {
    try {
        const {data} = await api.fetchPosts();
        
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createPost = (postData) => async(dispatch) => {
    try {
        const { data } = await api.createPosts(postData);

        dispatch( {type:CREATE , payload: data} )
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = (currentId, postData) => async(dispatch) => {
    try {
        const { data } = await api.updatePost(currentId, postData);

        dispatch( {type:UPDATE, payload: data} )
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type:DELETE, payload: id })
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async(dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    // console.log(user);


    try {
        const { data } = await api.likePost(id, user?.token);

        dispatch( {type:LIKE, payload: data} )
    } catch (error) {
        console.log(error);
    }
}