// Once your API Gateway is ready, replace this empty string with your live AWS URL
const API_BASE_URL = ""; 

const apiHelper = {
    async get(endpoint) {
        if (!API_BASE_URL) return mockDatabase.getMockData(endpoint);
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`);
            return await response.json();
        } catch (error) {
            console.error(`GET request failed for ${endpoint}:`, error);
            throw error;
        }
    },

    async post(endpoint, data) {
        if (!API_BASE_URL) return mockDatabase.saveMockRsvp(data);
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error(`POST request failed for ${endpoint}:`, error);
            throw error;
        }
    }
};

// Local data simulator so you can test your UI locally without AWS connected yet
const mockDatabase = {
    events: [
        { id: "1", title: "Cloud Computing Hackathon 💻", description: "Build scalable apps using AWS Lambda and S3. Mentorship provided by cloud experts!" },
        { id: "2", title: "AI & Deep Learning Seminar 🤖", description: "Explore the futuristic world of Large Language Models and generative neural architecture networks." },
        { id: "3", title: "WebDev BootCamp: UI/UX 🎨", description: "Master responsive CSS grid layouts, component state patterns, and asset pipeline deployment frameworks." }
    ],
    rsvps: { "1": ["Gauri"], "2": [], "3": ["Ananya", "Rahul"] },
    
    getMockData(endpoint) {
        if (endpoint === '/events') return this.events;
        if (endpoint.startsWith('/event/')) {
            const id = endpoint.split('/').pop();
            return this.events.find(e => e.id === id);
        }
        if (endpoint.startsWith('/stats/') || endpoint.startsWith('/attendees/')) {
            const id = endpoint.split('/').pop();
            const list = this.rsvps[id] || [];
            return endpoint.startsWith('/stats/') ? { count: list.length } : list;
        }
    },
    saveMockRsvp(data) {
        if (!this.rsvps[data.eventId]) this.rsvps[data.eventId] = [];
        this.rsvps[data.eventId].push(data.name);
        return { success: true, message: "RSVP saved locally!" };
    }
};