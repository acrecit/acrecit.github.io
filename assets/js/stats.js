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

// X Post Counter
async function fetchXPostCount() {
    const X_BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAHZ3xQEAAAAAxkhaPBtQX3uBFcCW%2BlXIK0AF5uU%3DPJx1fgmo0ERuEsn2f0CY7LHadB1rBvpLzgKDButT5EYvusUArV';
    
    try {
        console.log('Fetching X post count...');
        const response = await fetch('https://api.twitter.com/2/users/by/username/acreciti?user.fields=public_metrics', {
            headers: {
                'Authorization': `Bearer ${X_BEARER_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('API Response:', data);
        
        if (data.data && data.data.public_metrics) {
            document.getElementById('x-post-count').textContent = 
                data.data.public_metrics.tweet_count.toLocaleString();
        } else {
            document.getElementById('x-post-count').textContent = 'API ERROR';
        }
    } catch (error) {
        console.error('Error fetching X post count:', error);
        document.getElementById('x-post-count').textContent = 'ERROR';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchCommitCount();
    fetchXPostCount();
    setInterval(fetchCommitCount, 300000); // Every 5 minutes
    setInterval(fetchXPostCount, 300000);  // Every 5 minutes
    updateUptime();
});
