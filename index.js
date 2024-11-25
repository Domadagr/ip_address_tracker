// initial 
const searchForm = document.querySelector('.headerForm');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = document.querySelector('#search').value;
    console.log(value);
});