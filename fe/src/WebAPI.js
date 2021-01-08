export const getImgs = (page,query) => fetch(`https://api.unsplash.com/search/photos?client_id=773741e75ba8c52b7d3d825cd4c33cf637a1f77a7fe0f64109e4f5bdd35e22ad&query=${query}&per_page=30&page=${page}`)
.then(res => res.json())  

export const randomImgs = (page) => fetch(`https://api.unsplash.com/photos/?client_id=773741e75ba8c52b7d3d825cd4c33cf637a1f77a7fe0f64109e4f5bdd35e22ad&per_page=30&order_by=popular&page=${page}`).then(res => res.json())  

export const getSynonym = (word) => 
fetch(`https://words.bighugelabs.com/api/2/55fd0122831fdaadd4c00e498f7a1b73/${word}/json`)
  .then(res => res.json())
  .then(result => {
    if(result.noun !== undefined){
      return result.noun.syn
    } else if (result.adjective !== undefined) {
      return result.adjective.syn
    } 
    return null
  })

export const singleImg = (imgId) => fetch(`https://api.unsplash.com/photos/${imgId}?client_id=773741e75ba8c52b7d3d825cd4c33cf637a1f77a7fe0f64109e4f5bdd35e22ad`).then(res => res.json())

export const allCollections = (email) =>
  fetch(`https://gaze.joandes.com/collections/${email}`).then((res) =>
    res.json()
  );

export const postImg = (newSave) =>
  fetch("https://gaze.joandes.com/createImage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSave),
  }).then((res) => res.json());

export const allSaves = (email) =>
  fetch(`https://gaze.joandes.com/images/${email}`).then((res) => res.json());

export const deleteSave = (deleteSave) =>
  fetch("https://gaze.joandes.com/deleteImage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deleteSave),
  }).then((res) => res.json());

export const collectionSaves = (email, collection) =>
  fetch(
    `https://gaze.joandes.com/images/${email}/${collection}`
  ).then((res) => res.json());

export const deleteCollection = (deleteCollection) =>
  fetch("https://gaze.joandes.com/deleteCollection", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deleteCollection),
  }).then((res) => res.json());







