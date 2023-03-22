// const API_KEY = '34574978-aeefc0d62f6da3cbea3bfb7cd';
// let page = 0;
// const per_page = 40;

// function fetchPictures(searchQuery) {
//     page += 1;
//     const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`;
//     return fetch(url).then(response => {
//         if (response.ok) {
//             return response.json()
//         } throw new Error(response.statusText)
//     } 
// ) 
// };

// export default {fetchPictures} 