const timezones = [
    { id: 'ny', tz: 'America/New_York' },
    { id: 'london', tz: 'Europe/London' },
    { id: 'paris', tz: 'Europe/Paris' },
    { id: 'tokyo', tz: 'Asia/Tokyo' },
    { id: 'sydney', tz: 'Australia/Sydney' },
    { id: 'dubai', tz: 'Asia/Dubai' }
];

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

function updateClocks() {
    timezones.forEach(({ id, tz }) => {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('es-ES', {
            timeZone: tz,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        
        const dateFormatter = new Intl.DateTimeFormat('es-ES', {
            timeZone: tz,
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const time = formatter.format(now);
        const date = dateFormatter.format(now);
        
        document.getElementById(`time-${id}`).textContent = time;
        document.getElementById(`date-${id}`).textContent = date;
    });
}

// Update immediately
updateClocks();

// Update every second
setInterval(updateClocks, 1000);