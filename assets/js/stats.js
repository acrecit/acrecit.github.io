const CONFIG = {
    X_BEARER_TOKEN: 'AAAAAAAAAAAAAAAAAAAAAHZ3xQEAAAAAxkhaPBtQX3uBFcCW%2BlXIK0AF5uU%3DPJx1fgmo0ERuEsn2f0CY7LHadB1rBvpLzgKDButT5EYvusUArV',
    X_CLIENT_ID: 'Z091Q0hVcFB2dGdJcGtRblJfVWQ6MTpjaQ',
    X_CLIENT_SECRET: 'p09Dpt9zC2plSGSRCfoZBni5RIDmpAzYvNlDP93u2yR-s9Jixf'
};

// GitHub API integration
async function fetchCommitCount() {
    try {
        // Get all repos first
        const reposResponse = await fetch('https://api.github.com/users/acrecit/repos');
        const repos = await reposResponse.json();
        
        let totalCommits = 0;
        
        // Get commit count for each repo
        for (const repo of repos) {
            const commitsResponse = await fetch(`https://api.github.com/repos/acrecit/${repo.name}/commits?per_page=1`);
            const linkHeader = commitsResponse.headers.get('Link');
            
            if (linkHeader) {
                // Extract last page number from Link header
                const matches = linkHeader.match(/page=(\d+)>; rel="last"/);
                if (matches) {
                    totalCommits += parseInt(matches[1]);
                }
            } else {
                // If no Link header, count commits in response
                const commits = await commitsResponse.json();
                totalCommits += commits.length;
            }
        }
        
        document.getElementById('commit-count').textContent = totalCommits;
    } catch (error) {
        console.error('Error fetching commit count:', error);
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
    fetchXPostCount();
    setInterval(fetchCommitCount, 300000); // Every 5 minutes
    setInterval(fetchXPostCount, 300000);  // Every 5 minutes
    updateUptime();
});

async function fetchXPostCount() {
    try {
        console.log('Fetching X post count...');
        const url = 'https://api.twitter.com/2/users/by/username/acreciti?user.fields=public_metrics';
        console.log('URL:', url);
        console.log('Bearer Token:', CONFIG.X_BEARER_TOKEN.substring(0, 10) + '...');
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${CONFIG.X_BEARER_TOKEN}`,
                'Content-Type': 'application/json',
            }
        });
        
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Full API response:', data);
        
        if (data.data && data.data.public_metrics) {
            const count = data.data.public_metrics.tweet_count;
            console.log('Tweet count:', count);
            document.getElementById('x-post-count').textContent = count.toLocaleString();
        } else {
            console.error('Invalid response format:', data);
            document.getElementById('x-post-count').textContent = 'API ERROR';
        }
    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('x-post-count').textContent = 'FETCH ERROR';
    }
}
