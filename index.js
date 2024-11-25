const searchForm = document.querySelector('.header_form');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = document.getElementById('search').value;
    console.log(value);
    // ... your code to fetch and process the IP address ...
});