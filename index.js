// URL do seu servidor proxy
const apiUrl = "http://localhost:5500/api/";

// Variáveis
const ip = document.getElementById("ip");
const locationvar = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");

// Variáveis da área de busca
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("searchbtn");

// Função para obter detalhes do IP
const getIPDetails = (default_ip) => {
  let ip_url =
    default_ip === undefined
      ? `${apiUrl}`
      : `${apiUrl}?ipAddress=${default_ip}`;

  fetch(ip_url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // Verifique a resposta da API

      // Verifique se os dados possuem as propriedades esperadas
      if (data && data.location) {
        ip.innerHTML = data.ip || "N/A";
        locationvar.innerHTML = `${data.location.country || "Unknown"} ${
          data.location.city
        } ${data.location.region || "Unknown"}`;
        timezone.innerHTML = data.location.timezone || "Unknown";
        isp.innerHTML = data.isp || "Unknown";
        updateMarker([data.location.lat || 0, data.location.lng || 0]);
      } else {
        console.error("Data or location is undefined:", data);
        // Exiba uma mensagem para o usuário em caso de dados inválidos
        alert("Unable to retrieve IP details. Please try again later.");
      }
    })
    .catch((error) => console.error("Fetch error:", error));
};

// Inicialize o mapa
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

// Função para atualizar o marcador no mapa
const updateMarker = (position = [42, 42]) => {
  map.setView(position, 13);
  L.marker(position).addTo(map);
};

// Carregar detalhes do IP inicialmente
getIPDetails();

// Adicionar listener de evento ao botão de busca
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (searchInput.value) {
    getIPDetails(searchInput.value);
  } else {
    alert("Please, enter a valid IP Address");
  }
});
