const newJokeBtn = document.getElementById('new-joke');
const copyBtn = document.getElementById('copy-joke');
const jokeText = document.getElementById('joke');
const jokeType = document.getElementById('joke-type');
const modoBtn = document.getElementById('modo');

// Dark mode toggle
modoBtn.onclick = () => {
    document.body.classList.toggle('oscuro');
    localStorage.setItem('darkMode', document.body.classList.contains('oscuro'));
};

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('oscuro');
}

// Fetch joke from API
async function getJoke() {
    try {
        newJokeBtn.disabled = true;
        newJokeBtn.textContent = 'Cargando...';
        
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        const data = await response.json();
        
        jokeText.textContent = data.setup + ' ' + data.punchline;
        jokeType.textContent = `Tipo: ${data.type}`;
        
        newJokeBtn.disabled = false;
        newJokeBtn.textContent = 'Nuevo Chiste 😂';
    } catch (error) {
        jokeText.textContent = 'Error al cargar el chiste. Intenta de nuevo.';
        console.error('Error:', error);
        newJokeBtn.disabled = false;
        newJokeBtn.textContent = 'Nuevo Chiste 😂';
    }
}

// Copy joke to clipboard
copyBtn.onclick = () => {
    const text = jokeText.textContent;
    navigator.clipboard.writeText(text).then(() => {
        copyBtn.textContent = '¡Copiado! ✓';
        setTimeout(() => {
            copyBtn.textContent = 'Copiar 📋';
        }, 2000);
    });
};

// Event listener
newJokeBtn.addEventListener('click', getJoke);

// Load joke on page load
window.addEventListener('load', getJoke);