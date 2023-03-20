import API from './fetchPictures';

const refs = {
    form: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery')
};

// refs.form.addEventListener('input', onSearch);

fetch('https://pixabay.com/api/?key=34574978-aeefc0d62f6da3cbea3bfb7cd&q=yellow+flowers&image_type=photo')
    .then(response => {
        console.log(response.json())
    })