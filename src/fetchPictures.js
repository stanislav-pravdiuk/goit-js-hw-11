const API_KEY = '34574978-aeefc0d62f6da3cbea3bfb7cd';
const page = 1;
const per_page = 40;

function fetchPictures(pictureName) { 
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${pictureName}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`;
    return fetch(url).then(response => {
        if (response.ok) {
            return response.json()
        } throw new Error(response.statusText)
    } 
)
};

export default {fetchPictures} 