import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// import './styles.css';

const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

let searchQuery = '';
let totalHits = 40;
const API_KEY = '34574978-aeefc0d62f6da3cbea3bfb7cd';
let page = 0;
const per_page = 40;
const simpleLightbox = new SimpleLightbox(".gallery a", {
    captionSelector: 'img',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
    scrollZoom: false,
})


function onSearch(e) {
    e.preventDefault();
    searchQuery = e.target.searchQuery.value.trim();
    resetMarkup();
    if (!searchQuery) {
        return
    };
    fetchPictures(searchQuery)
    e.target.reset();
};

function resetMarkup() {
    refs.galleryContainer.innerHTML = '';
};

function renderMarkup(pictures) {
    
    totalHits = pictures.data.totalHits;
    if (pictures.data.hits.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');   
    };
    
    const createdElements = pictures.data.hits.map(el => {
        const createdEl = `
        <div class="gallery photo-card">
            <a href="${el.largeImageURL}">
            <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" />
            </a>
            <div class="info">
                <p class="info-item">
                <b>Likes:<br> ${el.likes}</b>
                </p>
                <p class="info-item">
                <b>Views:<br> ${el.views}</b>
                </p>
                <p class="info-item">
                <b>Comments:<br> ${el.comments}</b>
                </p>
                <p class="info-item">
                <b>Downloads:<br> ${el.downloads}</b>
                </p>
            </div>
            </div>
        `;
        return createdEl;
    }).join('');

    refs.galleryContainer.insertAdjacentHTML("beforeend", createdElements);

    refs.loadMoreBtn.classList.remove('visually-hidden');

    simpleLightbox.refresh();

    if (pictures.data.hits.length < 40) {
        refs.loadMoreBtn.classList.add('visually-hidden')
    }

    

};

function onFetchError() {
    Notiflix.Notify.failure('WTF?!');
};

function onLoadMore() {
    fetchPictures(searchQuery)
    searchQuery = '';
    if ((totalHits - page * per_page) > 0) {
        Notiflix.Notify.success(`Hooray! We found ${totalHits - page * per_page} images.`);
    } else {
        Notiflix.Notify.warning('We`re sorry, but you`ve reached the end of search results.');
        refs.loadMoreBtn.classList.add('visually-hidden');
    }

};

async function fetchPictures(searchQuery) {
    page += 1;
    try {
    const response = await axios.get('https://pixabay.com/api/', {
    params: {
        key: API_KEY,
        q: searchQuery,
        per_page: per_page,
        page: page,
        safesearch: true,
        orientation: 'horizontal',
        image_type: 'photo',
    },
    });
    renderMarkup(response);
    } catch (error) {
    onFetchError(error);
    }
}