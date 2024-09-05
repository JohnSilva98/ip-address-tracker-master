// URL do seu servidor proxy
const apiUrl = "http://localhost:5500/api/";

const bypassCors = "https://cors-anywhere.herokuapp.com/";
// Variables
const ip = document.getElementById("ip");
const locationvar = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");

// Search area variables
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("searchbtn");

const headers_opt = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

// Function to get IP details
const getIPDetails = (default_ip) => {
  let ip_url =
    default_ip === undefined
      ? `${bypassCors}${apiUrl}`
      : `${bypassCors}${apiUrl}?ipAddress=${default_ip}`;

  fetch(ip_url, headers_opt)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      ip.innerHTML = data.ip;
      locationvar.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`;
      timezone.innerHTML = data.location.timezone;
      isp.innerHTML = data.isp;
      updateMarker([data.location.lat, data.location.lng]);
    })
    .catch((error) => console.error("Fetch error:", error));
};

// Initialize the map
const map = L.map("map", {
  center: [0, 0],
  zoom: 0,
  layers: [
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }),
  ],
});

// Function to update the marker on the map
const updateMarker = (position = [42, 42]) => {
  map.setView(position, 13);
  L.marker(position).addTo(map);
};

// Load IP details initially
getIPDetails();

// Add event listener to the search button
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (searchInput.value) {
    getIPDetails(searchInput.value);
  } else {
    alert("Please, enter a valid IP Address");
  }
});
