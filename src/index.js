import API from './fetchPictures';

const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery')
};

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefault();
    let textInput = e.target.searchQuery.value;
    // console.log(textInput)
    // resetMarkup();
    if (textInput === '') {
        return
    };
    API.fetchPictures(textInput)
        .then(renderMarkup)
        .catch(onFetchError)
};

function resetMarkup() {
    console.log('будет убивать разметку')
};

function renderMarkup() {
    console.log('будет создавать разметку')
};

function onFetchError() {'будет выдавать ошибки'};