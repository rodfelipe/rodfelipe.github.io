// Variáveis e seleção de elementos
const apiKey = "fd9beaa872eb36b966df04cde6cd23cc";
const apiCountryURL = "https://flagsapi.com/{countryCode}/flat/64.png";  
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span"); // Definindo o windElement
const weatherContainer = document.querySelector("#weather-data");

// Funções
const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    try {
        const res = await fetch(apiWeatherURL);
        if (!res.ok) throw new Error('Cidade não encontrada');
        const data = await res.json();
        return data;
    } catch (error) {
        alert(error.message); // Exibe um alerta se a cidade não for encontrada
        return null;
    }
};

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);
    if (!data) return;  // Se os dados não foram encontrados, retorna sem fazer nada.

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    
    // Atualizando a URL da bandeira com o código do país dinâmico
    countryElement.setAttribute("src", apiCountryURL.replace("{countryCode}", data.sys.country));

    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed} km/h`; // Corrigindo windElement
    weatherContainer.classList.remove("hide");
};

// Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;
    if (city.trim() !== "") {
        showWeatherData(city);
    }
});
