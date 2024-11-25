/*
    from https://www.freecodecamp.org/news/learn-rest-apis-javascript-project/
    rewrote create_map function, fixing parameter list.
    rewrote search_ip_address, fixing parameters being sent to create_map
    TODO :: Need to add support for domains and IP validation 
            Rewrite in node.js
            Rewrite as Kotlin project
*/

const searchForm = document.querySelector('.header_form');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = document.getElementById('search').value;
    console.log(value);
    search_ip_address(value);
});

async function search_ip_address(ip_address) {
    const api_key = "";
    const request = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${api_key}&ipAddress=${ip_address}`,
    );
    const response = await request.json();

    const {location,ip,isp} = response;
    update_ui(ip, location.city, location.timezone, isp);

    if (map !== undefined && map !== null) {
        map.remove();
    }
    console.log(response);
    create_map(response.location.lat, response.location.lng, response.location.country, response.location.region);
}

function update_ui(ip_address, location, timezone, isp) {
    const address = document.querySelector('.address');
    const city = document.querySelector('.location');
    const utc = document.querySelector('.utc');
    const isprovider = document.querySelector('.isp');

    address.textContent = ip_address;
    city.textContent = location;
    utc.textContent = 'UTC' + timezone;
    isprovider.textContent = isp;
}

let map;
function create_map(lat, lng, country, region) {
  map = L.map('map').setView([lat, lng], 14);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`${region}, ${country}`)
    .openPopup();
}

//const defaultIp = '195.88.55.16';
//search_ip_address(defaultIp);
