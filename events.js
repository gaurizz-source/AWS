const eventModal = {
    modal: document.getElementById('rsvp-modal'),
    
    async open(eventId) {
        this.modal.style.display = 'flex';
        document.getElementById('modal-event-id').value = eventId;
        
        // Fetch event metadata details
        const event = await apiHelper.get(`/event/${eventId}`);
        document.getElementById('modal-event-title').innerText = `RSVP for ${event.title}`;
        
        // Refresh dynamically loaded analytics and rosters
        this.refreshStatsAndAttendees(eventId);
    },
    
    close() {
        this.modal.style.display = 'none';
        document.getElementById('rsvp-form').reset();
    },

    async refreshStatsAndAttendees(eventId) {
        const stats = await apiHelper.get(`/stats/${eventId}`);
        const attendees = await apiHelper.get(`/attendees/${eventId}`);
        
        document.getElementById('stat-going').innerText = `🔥 ${stats.count || 0} Going`;
        
        const listContainer = document.getElementById('attendees-list');
        listContainer.innerHTML = '';
        
        if(attendees && attendees.length > 0) {
            attendees.forEach(name => {
                const li = document.createElement('li');
                li.innerText = `✅ ${name}`;
                listContainer.appendChild(li);
            });
        } else {
            listContainer.innerHTML = '<li>No RSVPs yet. Be the first to join!</li>';
        }
    }
};

// Event Observers / Listeners
document.getElementById('close-modal').addEventListener('click', () => eventModal.close());
window.addEventListener('click', (e) => { if(e.target === eventModal.modal) eventModal.close(); });

document.getElementById('rsvp-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const eventId = document.getElementById('modal-event-id').value;
    const name = document.getElementById('attendee-name').value;
    const email = document.getElementById('attendee-email').value;
    
    await apiHelper.post('/rsvp', { eventId, name, email });
    alert("Awesome! Your registration was recorded successfully.");
    eventModal.refreshStatsAndAttendees(eventId);
    document.getElementById('rsvp-form').reset();
});