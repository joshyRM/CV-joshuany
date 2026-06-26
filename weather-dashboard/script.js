const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const modoBtn = document.getElementById('modo');

// Replace with your own API key from openweathermap.org
const API_KEY = 'demo'; // Get your key from https://openweathermap.org/api

// Dark mode toggle
modoBtn.onclick = () => {
    document.body.classList.toggle('oscuro');
    localStorage.setItem('darkMode', document.body.classList.contains('oscuro'));
};

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('oscuro');
}

// Get weather data
async function getWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        weatherInfo.innerHTML = '<p>Por favor ingresa una ciudad</p>';
        return;
    }

    try {
        weatherInfo.innerHTML = '<p>Cargando...</p>';
        
        // Using wttr.in API (no key required)
        const response = await fetch(`https://wttr.in/${city}?format=j1`);
        
        if (!response.ok) {
            throw new Error('Ciudad no encontrada');
        }

        const data = await response.json();
        const current = data.current_condition[0];
        const location = data.nearest_area[0];
        
        const html = `
            <div class="weather-card">
                <h2>${location.areaName[0].value}, ${location.country[0].value}</h2>
                <div class="weather-icon">☁️</div>
                <p>${current.weatherDesc[0].value}</p>
                <div class="temp-main">${current.temp_C}°C</div>
                
                <div class="weather-details">
                    <div class="detail-box">
                        <p>Sensación térmica</p>
                        <div class="detail-value">${current.FeelsLikeC}°C</div>
                    </div>
                    <div class="detail-box">
                        <p>Humedad</p>
                        <div class="detail-value">${current.humidity}%</div>
                    </div>
                    <div class="detail-box">
                        <p>Velocidad del viento</p>
                        <div class="detail-value">${current.windspeedKmph} km/h</div>
                    </div>
                    <div class="detail-box">
                        <p>Presión</p>
                        <div class="detail-value">${current.pressure} mb</div>
                    </div>
                </div>
            </div>
        `;
        
        weatherInfo.innerHTML = html;
    } catch (error) {
        weatherInfo.innerHTML = `<p class="error">❌ ${error.message}</p>`;
    }
}

searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});