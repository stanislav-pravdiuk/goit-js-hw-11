
import Notiflix from 'notiflix';
import axios from 'axios';

const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

let searchQuery = '';
let totalHits = 1000;
const API_KEY = '34574978-aeefc0d62f6da3cbea3bfb7cd';
let page = 0;
const per_page = 40;


function onSearch(e) {
    e.preventDefault();
    searchQuery = e.target.searchQuery.value;
    resetMarkup();
    if (searchQuery === '') {
        location. reload()
        return
    };
    fetchPictures(searchQuery)
        // .then(renderMarkup)
        // .catch(onFetchError)
    
    e.target.searchQuery.value = '';
};

function resetMarkup() {
    refs.galleryContainer.innerHTML = '';
};

function renderMarkup(pictures) {
    totalHits = pictures.totalHits
    if (pictures.hits.length === 0) {
        Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');   
    };
    
    const createdElements = pictures.hits.map(el => {
        const createdEl = `
        <div class="gallery photo-card">
            <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                <b>Likes: ${el.likes}</b>
                </p>
                <p class="info-item">
                <b>Views: ${el.views}</b>
                </p>
                <p class="info-item">
                <b>Comments: ${el.comments}</b>
                </p>
                <p class="info-item">
                <b>Downloads: ${el.downloads}</b>
                </p>
            </div>
            </div>
        `;
        return createdEl;
    }).join('');

    refs.galleryContainer.innerHTML = createdElements;
};

function onFetchError() {
    Notiflix.Notify.failure('WTF?!');
};

function onLoadMore() {
    fetchPictures(searchQuery)
        // .then(renderMarkup)
        // .catch(onFetchError)
};

function fetchPictures(searchQuery) {
    page += 1;
    console.log(totalHits)
    if ((totalHits - page * per_page) < 0) {
        Notiflix.Notify.warning('We`re sorry, but you`ve reached the end of search results.');
        return
    }
    // const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`;

    axios({
    method: 'get',
    url: 'https://pixabay.com/api/',
    params: {
        key: API_KEY,
        q: searchQuery,
        per_page: per_page,
        page: page,
        safesearch: true,
        orientation: 'horizontal',
        image_type: 'photo',
        }
    })
    
        .then(renderMarkup)
        .catch(onFetchError)
    // return fetch(url).then(response => {
    //     if (response.ok) {
    //         return response.json()
    //     } throw new Error(response.statusText)
    // } 
// ) 
};