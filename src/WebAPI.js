import axios from 'axios';
import firebase from 'firebase';

export const getImgs = (page,query) => fetch(`https://api.unsplash.com/search/photos?client_id=773741e75ba8c52b7d3d825cd4c33cf637a1f77a7fe0f64109e4f5bdd35e22ad&query=${query}&per_page=9&page=${page}`)
.then(res => res.json())  

export const randomImgs = (page) => fetch(`https://api.unsplash.com/photos/?client_id=773741e75ba8c52b7d3d825cd4c33cf637a1f77a7fe0f64109e4f5bdd35e22ad&per_page=9&order_by=popular&page=${page}`).then(res => res.json())  


export const getSynonym = (word) => fetch(`https://words.bighugelabs.com/api/2/55fd0122831fdaadd4c00e498f7a1b73/${word}/json`).then(res => res.json())


export const singleImg = (imgId) => fetch(`https://api.unsplash.com/photos/${imgId}?client_id=773741e75ba8c52b7d3d825cd4c33cf637a1f77a7fe0f64109e4f5bdd35e22ad`).then(res => res.json())















// export const getImgs = page => axios.get(`https://api.unsplash.com/photos/?client_id=773741e75ba8c52b7d3d825cd4c33cf637a1f77a7fe0f64109e4f5bdd35e22ad&per_page=9&order_by=popular&page=${page}`);

export const singlePost = (postId) => axios.get(`https://qootest.com/posts/${postId}`);

export const updatePost = (postId, author, title, body) => axios.patch(`https://qootest.com/posts/${postId}`, { author, title, body });

export const deletePost = (postId) => axios.delete(`https://qootest.com/posts/${postId}`);

export const createPost = (author, title, body) => axios.post('https://qootest.com/posts/', { author, title, body });
