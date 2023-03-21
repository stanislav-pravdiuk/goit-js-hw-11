import API from './fetchPictures';
import Notiflix from 'notiflix';

const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();
    let textInput = e.target.searchQuery.value;
    resetMarkup;
    if (textInput === '') {
        return
    };
    API.fetchPictures(textInput)
        .then(renderMarkup)
        .catch(onFetchError)
    
    e.target.searchQuery.value = '';
};

function resetMarkup() {
    refs.galleryContainer.innerHTML = '';
};

function renderMarkup(pictures) {
    
    if (pictures.hits.length === 0) {
        Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');   
    };
    
    const createdElements = pictures.hits.map(el => {
        const createdEl = `
        <div class="photo-card">
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

};