document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('events-grid');
    try {
        const events = await apiHelper.get('/events');
        grid.innerHTML = ''; // Wipe out loading text
        
        events.forEach(event => {
            const card = document.createElement('div');
            card.className = 'event-card';
            card.innerHTML = `
                <div class="event-content">
                    <h3 class="event-title">${event.title}</h3>
                    <p class="event-desc">${event.description}</p>
                    <button class="btn" onclick="eventModal.open('${event.id}')">View Details & RSVP</button>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (err) {
        grid.innerHTML = `<div class="error">Failed to load platform events. Please verify backend configurations.</div>`;
    }
});
