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

// Fetch commit count
async function fetchCommitCount() {
    try {
        const response = await fetch('https://api.github.com/users/acrecit/events');
        const data = await response.json();
        const pushEvents = data.filter(event => event.type === 'PushEvent');
        const totalCommits = pushEvents.reduce((total, event) => total + event.payload.commits.length, 0);
        document.getElementById('commit-count').textContent = totalCommits;
    } catch (error) {
        console.error('Error fetching commit count:', error);
        document.getElementById('commit-count').textContent = 'ERROR';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchCommitCount();
    setInterval(fetchCommitCount, 300000); // Refresh every 5 minutes
    updateUptime();
});
