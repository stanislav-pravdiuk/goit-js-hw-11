var e={fetchPictures:function(e){return fetch(`https://pixabay.com/api/?key=34574978-aeefc0d62f6da3cbea3bfb7cd&q=${e}&image_type=photo&orientation=horizontal&safesearch=true`).then((e=>{if(e.ok)return e.json();throw new Error(e.statusText)}))}};function t(){console.log("будет создавать разметку")}function r(){}({searchForm:document.querySelector("#search-form"),galleryContainer:document.querySelector(".gallery")}).searchForm.addEventListener("submit",(function(n){n.preventDefault();let o=n.target.searchQuery.value;if(""===o)return;e.fetchPictures(o).then(t).catch(r)}));
//# sourceMappingURL=index.7df9ac75.js.map
