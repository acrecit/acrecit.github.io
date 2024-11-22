// GitHub API integration
async function fetchCommitCount() {
    try {
        const response = await fetch('https://api.github.com/users/acrecit/events');
        const events = await response.json();
        const pushEvents = events.filter(event => event.type === 'PushEvent');
        let totalCommits = 0;
        pushEvents.forEach(event => {
            totalCommits += event.payload.commits.length;
        });
        document.getElementById('commit-count').textContent = totalCommits;
    } catch (error) {
        document.getElementById('commit-count').textContent = 'Error';
    }
}

// Uptime tracker
function updateUptime() {
    const startTime = localStorage.getItem('pageLoadTime') || Date.now().toString();
    if (!localStorage.getItem('pageLoadTime')) {
        localStorage.setItem('pageLoadTime', startTime);
    }

    function formatUptime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        return `${hours}:${String(minutes % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
    }

    setInterval(() => {
        const currentTime = Date.now();
        const uptime = currentTime - parseInt(startTime);
        document.getElementById('uptime').textContent = formatUptime(uptime);
    }, 1000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchCommitCount();
    setInterval(fetchCommitCount, 300000); // Refresh every 5 minutes
    updateUptime();
});
